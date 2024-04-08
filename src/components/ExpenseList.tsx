import { useBudget } from "../hook/useBudget"
import { useMemo } from "react"
import ExpenseDetail from "./ExpenseDetail"
export default function ExpenseList() {

    const{state}=useBudget()

    const filterExpense = state.category?state.expenses.filter(expense=>expense.expenseCategory === state.category):state.expenses
    
    const isEmpty = useMemo(()=>filterExpense.length === 0, [filterExpense])
  return (
    <div className=" mt-10 bg-white shadow-lg rounded-lg p-8">
        {isEmpty?<p className=" text-gray-600 text-2xl font-bold">There are no Expenses</p>:(
            <>
                <p className=" text-gray-600 text-2xl font-bold   my-4s">Expense List</p>
                {filterExpense.map(expense=>(
                    <ExpenseDetail
                        key={expense.id}
                        expense={expense}
                    />
                ))}
            </>
            )}
    </div>
  )
}
