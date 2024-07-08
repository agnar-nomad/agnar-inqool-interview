import { useMemo } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from "react-router-dom";
import appRouter from './router'


function App() {

  const queryClient = useMemo(() => new QueryClient({}), [])

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={appRouter} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  )
}

export default App
