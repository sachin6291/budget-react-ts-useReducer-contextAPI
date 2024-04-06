import { ChangeEvent, useMemo, useState, FormEvent } from "react"
import { useBudget } from "../hook/useBudget"

export default function BudgetForm() {

    
//useState to make it easy to do validation and then pass on
//as payload to reducer through custom Hook and ContextAPI

    const [budget, setBudget]= useState(0)
    
    const{dispatch}= useBudget()

    const handleChange= (e: ChangeEvent<HTMLInputElement>)=>{
        setBudget(+e.target.value)
    }

    const isValid= useMemo(()=>{
        return isNaN(budget) || budget<=0   
    },[budget])

    const handleSubmit=(e : FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        dispatch({type:'addBudget',payload:{budget}})

    }

    

  return (
    <>
        <form className=" space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className=" text-4xl text-sky-700 font-semibold text-center">Budget</label>
                <input 
                    id="budget" 
                    type="number" 
                    className=" w-full bg-white border border-slate-200 p-2"
                    name="budget"
                    placeholder="Set your Budget"
                    value={budget}
                    onChange={handleChange}
                    />
            </div>
            <input
                type="submit"
                value='Set Budget'
                className=" bg-sky-700 hover:bg-sky-600 cursor-pointer w-full p-2 uppercase text-white font-bold disabled:opacity-40"
                disabled={isValid}
                />

        </form>
    </>
  )
}
