import type { UsersTableFilters, UsersFilterNames } from "./UsersTable"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

type UsersTableFiltersProps = {
  handleChange: (filterName: UsersFilterNames, value: string | boolean | null) => void
  resetFilters: () => void,
  filters: UsersTableFilters
}

export default function UsersTableFilters({ handleChange, resetFilters, filters }: UsersTableFiltersProps) {

  const onSelectChange = (value: string) => {
    if (value === "ban") {
      handleChange("banned", true)
      return
    }
    if (value === "active") {
      handleChange("banned", false)
      return
    }

    handleChange("banned", null)
  }

  const bannedFilterValue = filters.banned === true ? "ban" : filters.banned === false ? "active" : "all"

  return (
    <section className="flex gap-8 items-center px-4 pt-12 pb-8">
      <div>
        <Label htmlFor="user-name">Name</Label>
        <Input type="text" id="user-name" placeholder="Name"
          onChange={(e) => handleChange("name", e.target.value)}
          value={filters.name}
        />
      </div>
      <div>
        <Label>User Status</Label>
        <Select onValueChange={onSelectChange} value={bannedFilterValue}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="User Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="ban">Banned</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button className="self-end" onClick={resetFilters}>Reset</Button>
    </section>
  )
}