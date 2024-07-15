import { Loader } from "lucide-react";
import UserForm from "@/components/UserForm";
import { useParams } from "react-router-dom";
import { useFetchUser } from "@/lib/hooks";


export default function UsersEditPage() {

  const params = useParams()
  const { id } = params
  // returns id if the route includes an id, however if the route is /new, it returns undefined (because of how React Router works )
  // this way we can use the same page for adding OR editing a user

  const user = useFetchUser(id)

  const userData = user.isSuccess && user.data ? user.data : undefined

  return (
    <>
      <h1 className='text-3xl text-center mb-8'>
        {id ? "Edit User: " + userData?.name : "New User"}
      </h1>

      {/* the API returns a weird 200 OK when entity not found, I think should be a 404  */}
      {user.data && !user.data?.name ?
        <p className="text-center text-destructive">User not found</p>
        : null}

      {user.isFetching &&
        <div className="absolute top-20 right-10 flex gap-2 items-center">
          <Loader className="animate-spin" />&nbsp;
          <span className="font-semibold">Loading...</span>
        </div>}
      <UserForm user={userData} />
    </>
  )
}