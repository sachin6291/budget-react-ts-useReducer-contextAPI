import { Dispatch, ReactNode, createContext, useReducer, useMemo } from "react"
import { BudgetActions, BudgetState, budgetReducer, initialState } from "../reducer/budgetReducer"

type BudgetContextProps={
    state: BudgetState
    dispatch: Dispatch<BudgetActions>
    spent:number
    available:number
}

type BudgetProviderProps={
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>(null!)

export const BudgetProvider = ({children}: BudgetProviderProps)=>{

    const [state, dispatch]= useReducer(budgetReducer,initialState)

    const spent= useMemo(()=>state.expenses.reduce((total, expence)=>total + expence.expenseAmount,0),[state.expenses])
    const available = state.budget-spent
    
    return(
        <BudgetContext.Provider
            value={{
                state,
                dispatch,
                spent,
                available
            }}
        >
            {children}
        </BudgetContext.Provider>
   )
}

