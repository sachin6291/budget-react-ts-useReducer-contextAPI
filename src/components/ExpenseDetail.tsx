import { Expense } from "../types"
import { formatDate } from "../helper";
import AmountDisplay from "./AmountDisplay";

type ExpenseDetailProp={
    expense: Expense
}
export default function ExpenseDetail({expense}:ExpenseDetailProp) {
    const{expenseAmount,expenseName,expenseCategory,date} = expense
    console.log(expenseAmount);

    console.log(expenseCategory);
  return (
    <div className=" bg-white shadow-lg p-10 border-b border-gray-200 flex gap-5 items-center ">
        <div></div>
        <div>
            <p>{expenseName}</p>
            <p className=" text-slate-600 text-sm">{formatDate(date!.toString())}</p>
        </div>
        <AmountDisplay
            amount={expenseAmount}
        />
    </div>
  )
}
