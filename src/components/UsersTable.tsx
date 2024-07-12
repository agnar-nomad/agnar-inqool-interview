import { User } from "@/types/entities";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Pencil, RefreshCw, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser, editUser } from "@/lib/api";
import { Link } from "react-router-dom";


type UsersTableProps = {
  users: User[],
}

export default function UsersTable({ users }: UsersTableProps) {

  const queryClient = useQueryClient()

  // Mutations
  const editUserMutation = useMutation({
    mutationFn: editUser,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: () => {
      alert("Something went wrong, please try again.")
    }
  })

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: () => {
      alert("Something went wrong, please try again.")
    }
  })

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
    deleteUserMutation.mutate({ id })
  }

  const isPendingState = editUserMutation.isPending || deleteUserMutation.isPending

  return (
    <Table>
      <TableHeader>
        <TableRow className="font-bold">
          <TableHead className="">Name</TableHead>
          <TableHead className="w-[150px] text-center">Gender</TableHead>
          <TableHead className="w-[150px] text-center">Status</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.length && users.map(user => (
          <TableRow key={user.id} className={`${user.banned ? "text-opacity-60" : ""}`}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell className="text-center">{user.gender}</TableCell>
            <TableCell className="text-center">
              {user.banned ?
                <span className="text-red-400 font-semibold">Banned</span>
                :
                <span>Active</span>
              }
            </TableCell>
            <TableCell className="w-fit px-4">
              <div className="flex items-center gap-4 mx-auto w-fit">
                <Button asChild disabled={isPendingState}>
                  <Link to={`/users/${user.id}`} className="flex gap-2 items-center">
                    <Pencil className="w-4 h-4" />
                    Edit
                  </Link>
                </Button>
                <Button className="flex gap-2 items-center"
                  disabled={isPendingState}
                  onClick={() => handleChangeStatus(user.id)}
                >
                  <RefreshCw className="w-4 h-4" />
                  Status
                </Button>
                <Button variant="destructive"
                  disabled={isPendingState}
                  className="flex gap-2 items-center"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  <Trash className="w-4 h-4" />
                  Delete
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

  )
}