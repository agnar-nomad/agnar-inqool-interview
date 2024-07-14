import { useMutateUser } from "@/lib/hooks"
import { User } from "@/types/entities"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"
import { Pencil, RefreshCw, Trash } from "lucide-react"

type UsersTableActionsProps = {
  users: User[],
  userId: User["id"]
}

export default function UsersTableActions({ userId, users }: UsersTableActionsProps) {

  // Mutations
  const editUserMutation = useMutateUser("edit")

  const deleteUserMutation = useMutateUser("delete")

  // Event handlers
  const handleChangeStatus = (id: User["id"]) => {
    const user = users?.find(user => user.id === id);
    if (user) {
      editUserMutation.mutate({
        id,
        banned: !user.banned
      })
    }
  }

  const handleDeleteUser = (id: User["id"]) => {
    if (confirm("Are you sure to delete this user? The action is irreversible.")) {
      deleteUserMutation.mutate({ id })
    }
  }

  const isPendingState = editUserMutation.isPending || deleteUserMutation.isPending

  return (
    <div className="flex items-center gap-4 mx-auto w-fit">
      <Button asChild disabled={isPendingState}>
        <Link to={`/users/${userId}`} className="flex gap-2 items-center">
          <Pencil className="w-4 h-4" />
          Edit
        </Link>
      </Button>
      <Button className="flex gap-2 items-center"
        disabled={isPendingState}
        onClick={() => handleChangeStatus(userId)}
      >
        <RefreshCw className="w-4 h-4" />
        Status
      </Button>
      <Button variant="destructive"
        disabled={isPendingState}
        className="flex gap-2 items-center"
        onClick={() => handleDeleteUser(userId)}
      >
        <Trash className="w-4 h-4" />
        Delete
      </Button>
    </div>
  )
}