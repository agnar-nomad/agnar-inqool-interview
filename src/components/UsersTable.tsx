import { User } from "@/types/entities";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";


type UsersTableProps = {
  users: User[]
}

export default function UsersTable({ users }: UsersTableProps) {
  return (
    <Table>
      {/* <TableCaption>A list of your users.</TableCaption> */}
      <TableHeader>
        <TableRow className="font-bold">
          <TableHead className="">Name</TableHead>
          <TableHead className="w-[100px] ">Gender</TableHead>
          <TableHead className="">Banned</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.length && users.map(user => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.gender}</TableCell>
            <TableCell>{String(user.banned)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

  )
}