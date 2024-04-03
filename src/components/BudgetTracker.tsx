import AmountDisplay from "./AmountDisplay";

export default function BudgetTracker() {
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
                amount={3000}
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