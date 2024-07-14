import { useMemo, useState } from "react";
import { User } from "@/types/entities";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import UsersTableFilters from "./UsersTableFilters";
import { cn } from "@/lib/utils";
import UsersTableActions from "./UsersTableActions";

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
                <UsersTableActions userId={user.id} users={usersFiltered} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}