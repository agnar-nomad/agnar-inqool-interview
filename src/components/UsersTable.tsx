import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "@/types/entities";
import { Pencil, RefreshCw, Trash } from "lucide-react";
import { useMutateUser } from "@/lib/hooks";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import UsersTableFilters from "./UsersTableFilters";
import { cn } from "@/lib/utils";

type UsersTableProps = {
  users: User[],
}

export type UsersTableFilters = {
  name: string,
  banned: boolean | null
}

export type UsersFilterNames = keyof UsersTableFilters

export default function UsersTable({ users }: UsersTableProps) {

  const [filters, setFilters] = useState<UsersTableFilters>({
    name: "",
    banned: null,
  });

  const handleFilterChange = (
    filterType: UsersFilterNames,
    value: string | boolean | null
  ) => {
    setFilters((prevFilters) => {
      return { ...prevFilters, [filterType]: value };
    });
  };

  const handleResetFilters = () => {
    setFilters(() => ({
      name: "",
      banned: null
    }))
  }

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

  const usersFiltered = useMemo(() => users.filter(user => {

    const nameMatch = (filters.name && filters.name.length) ? user.name.toLowerCase().includes(filters.name.toLowerCase()) : true;
    const statusMatch = filters.banned !== null ? user.banned === filters.banned : true;
    return nameMatch && statusMatch;

  }), [filters.name, filters.banned, users])

  return (
    <>
      {JSON.stringify(filters, null, 4)}
      <UsersTableFilters
        handleChange={handleFilterChange}
        resetFilters={handleResetFilters}
        filters={filters}
      />
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
          {usersFiltered.length > 0 && usersFiltered.map(user => (
            <TableRow key={user.id + user.name + user.gender}>
              <TableCell className={cn("font-medium", user.banned ? "text-muted-foreground" : "")}>
                {user.name}
              </TableCell>
              <TableCell className={cn("text-center", user.banned ? "text-muted-foreground" : "")}>
                {user.gender}
              </TableCell>
              <TableCell className="text-center">
                {user.banned ?
                  <span className="text-red-500 font-semibold">Banned</span>
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
    </>
  )
}