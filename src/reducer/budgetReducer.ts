import{v4 as uuid}from 'uuid'
import { DraftExpense, Expense } from "../types"

export type BudgetActions=
    {type:'addBudget',payload:{budget:number}}|
    {type:'showModal'}|
    {type:'hideModal'}|
    {type:'addExpense', payload:{expense: DraftExpense}}
    


export type BudgetState={
    budget:number
    modal:boolean
    expenses:Expense[]
}

export const initialState: BudgetState={
    budget:0,
    modal:false,
    expenses: []
}

const createExpense = (draftExpense:DraftExpense) : Expense=>{
    return{
        ...draftExpense,
        id: uuid()
    }
}


export const budgetReducer=(
    state:BudgetState=initialState,
    action:BudgetActions
)=>{
    if(action.type === "addBudget"){
        return{
            ...state,
            budget : action.payload.budget
        }
    }
    if(action.type === 'showModal'){
        return{
            ...state,
            modal:true
        }
    }
    if(action.type === 'hideModal'){
        return{
            ...state,
            modal:false
        }
    }
    if (action.type === 'addExpense') {
        const expense=createExpense(action.payload.expense)
        return{
            ...state,
            expenses:[...state.expenses, expense ],
            modal:false
        }
    }
    return state
}


