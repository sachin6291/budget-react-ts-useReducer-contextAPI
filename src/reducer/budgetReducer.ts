export type BudgetActions=
    {type:'addBudget',payload:{budget:number}}
    


export type BudgetState={
    budget:number
}

export const initialState: BudgetState={
    budget:0
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
    return state
}

