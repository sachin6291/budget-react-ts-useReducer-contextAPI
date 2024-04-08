import { ChangeEvent } from "react";
import { categories } from "../data/categories";
import { useBudget } from "../hook/useBudget";

export default function FilterCategory() {
    const{dispatch}=useBudget()
    const handleChange=(e : ChangeEvent<HTMLSelectElement>)=>{
        dispatch({type:'selectCategory', payload:{id:e.target.value}})
    }

  return (
    <div className=" bg-white shadow-lg p-10 rounded-lg">
        <form>
            <div className="flex flex-col md:flex-row md:items-center gap-5">
                <label htmlFor="category">Filter Expences</label>
                    <select id="category"
                        className="bg-slate-100 p-3 flex-1 rounded"
                        onChange={handleChange}
                    >
                        <option value="">--All Category--</option>
                        {categories.map(category =>(
                            <option value={category.id} key={category.id}>{category.name}</option>
                        ))}
                    </select>
            </div>
        </form>
    </div>
  )
}
