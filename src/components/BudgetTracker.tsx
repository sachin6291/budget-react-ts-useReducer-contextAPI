import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../hook/useBudget";
import 'react-circular-progressbar/dist/styles.css'


export default function BudgetTracker() {

    const{state, dispatch, spent, available}=useBudget()

    const percentage=+(spent*100/state.budget).toFixed(2)
    
    
    
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex justify-center">
            <CircularProgressbar 
                value={percentage}
                text={`${percentage}% Spent`}
                styles={buildStyles({
                    pathColor: percentage === 100?'#dd094c':'#279bec',
                    textColor: percentage === 100?'#dd094c':'#279bec',
                    textSize: '12px',
                    trailColor: '#e2e8f0'
                })}
            />
        </div>
        <div className="flex flex-col justify-center items-center gap-8">
            <button
                type='button'
                className=" bg-rose-600 w-full p-2 text-white uppercase font-bold rounded-lg"
                onClick={()=>{dispatch({type:'reset'})}}
            >
                Reset
            </button>
            <AmountDisplay
                label='Budget'
                amount={state.budget}
            />
            <AmountDisplay
                label='Available'
                amount={available}
            />
            <AmountDisplay
                label='Spent'
                amount={spent}
            />
        </div>
    </div>
  )
}
