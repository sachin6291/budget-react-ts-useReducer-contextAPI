import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../hook/useBudget";



export default function BudgetTracker() {

    const{state}=useBudget()
    
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex justify-center">
            <img src="/grafico.jpg" alt="grfic budget" />
        </div>
        <div className="flex flex-col justify-center items-center gap-8">
            <button
                type='button'
                className=" bg-rose-600 w-full p-2 text-white uppercase font-bold rounded-lg"
            >
                Reset
            </button>
            <AmountDisplay
                label='Budget'
                amount={state.budget}
            />
            <AmountDisplay
                label='Available'
                amount={1000}
            />
            <AmountDisplay
                label='Spent'
                amount={2000}
            />
        </div>
    </div>
  )
}
