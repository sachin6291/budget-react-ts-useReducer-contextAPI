import { FormEvent, useEffect, useState } from "react";
import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'
import { DraftExpense, Value } from "../types";
import { ChangeEvent } from "react";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hook/useBudget";



export default function ExpenseForm() {
    const [expense, setExpense]=useState<DraftExpense>({
        expenseAmount:0,
        expenseName:'',
        expenseCategory:'',
        date:new Date()
    })

    const[error, setError]=useState('')

    const[previousAmount, setPreviousAmount ]= useState(0)

    const{dispatch, state, available}=useBudget()

    useEffect(()=>{
        if(state.editing){
            const fillFormEdit =state.expenses.filter(expn=>expn.id===state.editing)[0]
            setExpense(fillFormEdit)
            setPreviousAmount(fillFormEdit.expenseAmount)
        }
    },[state.editing])



    const handleChange=(e:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>)=>{
        const {name, value} = e.target
        const isAmountFeild = ['expenseAmount'].includes(name)

        setExpense({
            ...expense,
            [name] : isAmountFeild ? +value : value
        })
        
    }
    const handleChangeDate = (value:Value)=>{
        setExpense({
            ...expense,
            date : value
        })
        
    }

    const handleSubmit= (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        //validation
        if(Object.values(expense).includes('')){
            setError('All Feilds are Required')
            return
        }
        if(available < (expense.expenseAmount - previousAmount)){
            setError(`You are exceeding the budget, remaining(${available}€)`)
            return
        }

        //add new expense
        if(state.editing){
            dispatch({type:'updateExpense',payload:{expense:{id:state.editing, ...expense}}})
        }else{
        dispatch({type: 'addExpense', payload:{expense}})
        }

        //reset state
        setExpense({
            expenseAmount:0,
            expenseName:'',
            expenseCategory:'',
            date:new Date()
        })
        setPreviousAmount(0)
    }



  return (
    <form className=" space-y-5" onSubmit={handleSubmit}>
        
        <legend className="uppercase text-center text-2xl font-bold border-b-4 border-sky-500 py-2">{state.editing?'Edit Expense':'New Expense'}</legend>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <div className="flex flex-col gap-2">
            <label htmlFor="expenseName" className=" text-xl">Expense:</label>
            <input 
                type="text" 
                id='expenseName'
                placeholder="Add the Name of the Expense" 
                className="w-full  border-2 border-sky-600 rounded-md"
                name='expenseName'
                value={expense.expenseName}
                onChange={handleChange}/>
        </div>

        <div className="flex flex-col gap-2">
            <label htmlFor="expenseAmount" className=" text-xl">Amount:</label>
            <input 
                type="number" 
                id='expenseAmount'
                placeholder="Add the Amount Spent" 
                className="w-full  border-2 border-sky-600 rounded-md" 
                name='expenseAmount'
                value={expense.expenseAmount}
                onChange={handleChange}/>
        </div>

        <div className="flex flex-col gap-2">
            <label htmlFor="expenseCategory" className=" text-xl">Category:</label>
            <select
                id='expenseCategory'
                className="w-full  border-2 border-sky-600 rounded-md" 
                name='expenseCategory'
                value={expense.expenseCategory}
                onChange={handleChange}>
                    <option value=''>--Select--</option>
                    {categories.map(category=>(
                    <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
        </div>

        <div className="flex flex-col gap-2">
            <label htmlFor="expenseDate" className=" text-xl">Date:</label>
            <DatePicker 

                className="w-full  border-2 border-sky-600 rounded-md" 

                value={expense.date}
                onChange={handleChangeDate}
                />
        </div>
        <input
            type='submit'
            className=" bg-sky-700 cursor-pointer w-full p-2 text-white uppercase font-semibold text-lg rounded-md"
            value={state.editing?'Edit':'Done'}
        />
    </form>
  )
}
