import { Loader } from "lucide-react";
import UserForm from "@/components/UserForm";
import { useParams } from "react-router-dom";
import { useFetchUser } from "@/lib/hooks";


export default function UsersEditPage() {

  const params = useParams()
  const { id } = params

  const user = useFetchUser(id)
  // const { } = user

  console.log("user", user, user.data, user.error);

  const userData = user.isSuccess && user.data ? user.data : undefined

  return (
    <>
      {JSON.stringify(params)}
      <br />
      {JSON.stringify(user.data)}
      {/* TODO remove */}
      <h1 className='text-3xl text-center mb-8'>
        {id ? "Edit User: " + userData?.name : "New Page"}
      </h1>
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