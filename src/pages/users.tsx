import UsersTable from "@/components/UsersTable"
import { Loader } from "lucide-react";
import { useUsers } from "@/lib/hooks";
import AboveTableActions from "@/components/common/AboveTableActions";


export default function UsersPage() {

  const { data: userData, error, isFetching } = useUsers()

  if (error) {
    return (
      <p>Error: {error?.message}</p>
    )
  }

  if (!userData) {
    return <p className="flex justify-center items-center gap-4">
      <span>No user data</span>
      <Loader className="animate-spin" />
    </p>
  }

  return (
    <>
      <h1 className='text-3xl text-center mb-8'>Users Page</h1>
      {isFetching &&
        <div className="absolute top-20 right-10 flex gap-2 items-center">
          <Loader className="animate-spin" />&nbsp;
          <span className="font-semibold">Loading...</span>
        </div>}
      <AboveTableActions />
      <UsersTable users={userData} />
    </>
  )
}