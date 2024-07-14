import type { AnimalsFilterNames, AnimalsTableFilters } from "./AnimalsTable"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

type AnimalsTableFiltersProps = {
  handleChange: (filterName: AnimalsFilterNames, value: string) => void
  resetFilters: () => void,
  filters: AnimalsTableFilters
}

export default function AnimalsTableFilters({ handleChange, resetFilters, filters }: AnimalsTableFiltersProps) {

  const onSelectChange = (value: AnimalsTableFilters["type"]) => {
    handleChange("type", value)
  }

  return (
    <section className="flex gap-8 items-center px-4 pt-12 pb-8">
      <div>
        <Label htmlFor="animal-name">Name</Label>
        <Input type="text" id="animal-name" placeholder="Name"
          onChange={(e) => handleChange("name", e.target.value)}
          value={filters.name}
        />
      </div>
      <div>
        <Label>Animal Type</Label>
        <Select onValueChange={onSelectChange} value={filters.type}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Animal Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="cat">Cat</SelectItem>
            <SelectItem value="dog">Dog</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button className="self-end" onClick={resetFilters}>Reset</Button>
    </section>
  )
}