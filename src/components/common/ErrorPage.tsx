import { Link, useRouteError } from 'react-router-dom'
import { Button } from '../ui/button'

export default function ErrorPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error = useRouteError() as any

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 text-left">
      <h1 className='text-2xl'>Oops, sorry!</h1>
      <p className='text-xl'>Something went wrong.</p>
      <p className="font-mono">
        <span className="mr-2">{error?.status}</span>
        <i>{error?.statusText || error?.message}</i>
      </p>
      <Button asChild>
        <Link to="/">Back to homepage</Link>
      </Button>
    </div>
  )
}