import { useQuery } from "@tanstack/react-query"
import UsersTable from "@/components/UsersTable"
import { getUsers } from "@/lib/api"
import { Loader } from "lucide-react";


export default function UsersPage() {

  const { data: userData, error, isFetching, status } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    staleTime: 10 * 60 * 1000,
  })

  console.log("status", status);

  if (error) {
    return (
      <p>Error: {error?.message}</p>
    )
  }

  if (!userData) {
    return <p>No user data</p>
  }

  return (
    <>
      <h1 className='text-3xl text-center mb-8'>Users Page</h1>
      {isFetching &&
        <div className="absolute top-20 right-10 flex gap-2 items-center">
          <Loader className="animate-spin" />&nbsp;
          <span className="font-semibold">Loading...</span>
        </div>}
      <UsersTable users={userData} />
    </>
  )
}