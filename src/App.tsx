import BudgetForm from "./components/BudgetForm"

function App() {
  
  return (
    <>
      <header className=" bg-sky-700 py-8 max-h-72">
        <h1 className="uppercase text-center font-bold text-white text-3xl">Budget Control</h1>
      </header>
      <div className=" max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10 ">
        <BudgetForm

        />
      </div>
    </>
  )
}

export default App
