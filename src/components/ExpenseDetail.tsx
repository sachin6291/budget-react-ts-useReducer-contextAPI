import { useMemo } from "react";
import {LeadingActions,SwipeableList,SwipeableListItem,SwipeAction,TrailingActions,}from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { Expense } from "../types";
import { formatDate } from "../helper";
import AmountDisplay from "./AmountDisplay";
import { categories } from "../data/categories";
import { useBudget } from "../hook/useBudget";
type ExpenseDetailProp={
    expense: Expense
}
export default function ExpenseDetail({expense}:ExpenseDetailProp) {

    const{expenseAmount,expenseName,expenseCategory,date, id} = expense

    const{dispatch}=useBudget()
    
    const categoryInfo = useMemo(()=> categories.filter(category => category.id === expenseCategory)[0],[expense])

    const leadingActions =()=>(
        <LeadingActions>
            <SwipeAction
                onClick={()=>dispatch({type:'editExpense', payload:{id}})}
            >Edit
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions =()=>(
        <TrailingActions>
            <SwipeAction
                onClick={()=>dispatch({type:'removeExpense',payload:{id}})}
                destructive={true}
            >Delete
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem
                maxSwipe={1}
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className=" bg-white shadow-lg p-10 border-b w-full border-gray-200 flex gap-5 items-center mb-2">
                    <div>
                        <img src={`/icono_${categoryInfo.icon}.svg`} alt="icon expense" className=" w-20"/>
                    </div>
                    
                    <div className=" flex-1 space-y-2">
                        <p className=" text-sm font-semibold uppercase text-slate-400">{categoryInfo.name}</p>
                        <p className="uppercase text-black">{expenseName}</p>
                        <p className=" text-slate-400 text-sm">{formatDate(date!.toString())}</p>
                    </div>
                    <AmountDisplay
                        amount={expenseAmount}
                    />
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}
