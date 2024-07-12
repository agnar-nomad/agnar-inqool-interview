import { ReactNode } from "react"

const ErrorMessage = ({ children }: { children: ReactNode }) => (
  <p className={`text-red-600 text-sm mt-1`}>{children}</p>
)

export default ErrorMessage