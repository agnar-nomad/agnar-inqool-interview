import { User } from "@/types/entities"
import axios from 'axios'
// import { useQueryClient } from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import { inqoolEndpoint } from "@/lib/config"
import UsersTable from "@/components/UsersTable"



export default function UsersPage() {

  // const queryClient = useQueryClient()

  const { data, error, isFetching, status } = useQuery({
    queryKey: ['users'],
    queryFn: async (): Promise<Array<User>> => {
      const { data } = await axios.get(`${inqoolEndpoint}/users`)
      return data
    },
    staleTime: 10 * 60 * 1000,
  })

  console.log("status", status);


  if (isFetching) {
    return (
      <p>Loading...</p>
    )
  }

  if (error || !data) {
    return (
      <p>Error: {error?.message}</p>
    )
  }

  return (
    <>
      <h1 className='text-3xl text-center'>Users Page</h1>
      <UsersTable users={data} />
    </>
  )
}