import UsersTable from "@/components/UsersTable"
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useUsers } from "@/lib/hooks";


export default function UsersPage() {

  const { data: userData, error, isFetching, status } = useUsers()

  console.log("status", status);

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
      <div className="flex items-center justify-between">
        <Button variant="ghost">Seed DB</Button>
        <Button asChild variant="outline">
          <Link to={"new"}>Create new user</Link>
        </Button>
      </div>
      <UsersTable users={userData} />
    </>
  )
}