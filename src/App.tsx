import BudgetForm from "./components/BudgetForm"
import BudgetTracker from "./components/BudgetTracker";
import ExpenseModal from "./components/ExpenseModal";
import { useBudget } from "./hook/useBudget"
import { useMemo } from "react";

function App() {

  const{state}=useBudget()
  const isValidBudget=useMemo(()=>state.budget>0,[state.budget])
  console.log(isValidBudget);
  
  return (
    <>
      <header className=" bg-sky-700 py-8 max-h-72">
        <h1 className="uppercase text-center font-bold text-white text-3xl">Budget Control</h1>
      </header>
      <div className=" max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10 ">
        {isValidBudget?<BudgetTracker/>:<BudgetForm/>}
      </div>
      {isValidBudget && (
        <main className=" max-w-3xl mx-auto py-10">
          <ExpenseModal/>
        </main>
        )}
    </>
  )
}

export default App
