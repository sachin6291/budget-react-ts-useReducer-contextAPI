import { formatCurrency } from "../helper"

type AmountDisplayProp={
    label:string
    amount:number
}
export default function AmountDisplay({label, amount}:AmountDisplayProp) {
  return (
    <p className="text-2xl font-bold text-sky-600">{label}: <span className="font-black text-black">{formatCurrency(amount)}</span></p>
  )
}
