import{v4 as uuid}from 'uuid'
import { Category, DraftExpense, Expense } from "../types"

export type BudgetActions=
    {type:'addBudget',payload:{budget:number}}|
    {type:'showModal'}|
    {type:'hideModal'}|
    {type:'addExpense', payload:{expense: DraftExpense}}|
    {type:'removeExpense', payload:{id:Expense['id']}}|
    {type:'editExpense', payload:{id:Expense['id']}}|
    {type:'updateExpense', payload:{expense: Expense}}|
    {type:'reset'}|
    {type:'selectCategory', payload:{id:Category['id']}}

    


export type BudgetState={
    budget:number
    modal:boolean
    expenses:Expense[]
    editing:Expense['id']
    category:Category['id']
}

const initialExpenses = ():Expense[]=>{
    const localStorageExpenses = localStorage.getItem('expenses')
    return localStorageExpenses ? JSON.parse(localStorageExpenses):[]
}

const initialBudget = ():number=>{
    const localStorageBudget = localStorage.getItem('budget')
    return localStorageBudget ? +localStorageBudget : 0
}

export const initialState: BudgetState={
    budget:initialBudget(),
    modal:false,
    expenses: initialExpenses(),
    editing:'',
    category:''
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
            modal:false,
            editing:''
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
    if(action.type === 'removeExpense'){
        const remainingExpense = state.expenses.filter(expense => expense.id !== action.payload.id)
        return{
            ...state,
            expenses: remainingExpense
        }
    }
    if(action.type==='editExpense'){
        return{
            ...state,
            editing:action.payload.id,
            modal:true
        }
    }
    if(action.type === 'updateExpense'){
        return{
            ...state,
            expenses:state.expenses.map(expense=>expense.id===action.payload.expense.id ? action.payload.expense : expense),
            modal:false,
            editing:''
        }
    }
    if(action.type === 'reset'){
        return{
            ...state,
            budget:0,
            expenses: []
        }
    }
    if(action.type === 'selectCategory'){
        return{
            ...state,
            category:action.payload.id
        }
    }
    return state
}


