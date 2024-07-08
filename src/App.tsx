import { useMemo, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {

  const queryClient = useMemo(() => new QueryClient({}), [])

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <h1 className='text-3xl'>Vite + React</h1>
        <div className="card">
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  )
}

export default App
