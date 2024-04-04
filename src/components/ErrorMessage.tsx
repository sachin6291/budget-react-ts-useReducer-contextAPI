import { ReactNode } from "react"

type ErrorMessageProp={
    children: ReactNode
}

export default function ErrorMessage({children}: ErrorMessageProp) {
  return (
    <p className=" bg-red-600 text-white font-bold text-sm text-center p-2 uppercase">{children}</p>
  )
}
