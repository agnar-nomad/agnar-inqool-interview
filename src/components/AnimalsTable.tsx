import { useMemo, useState } from "react";
import { Animal } from "@/types/entities";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import AnimalsTableActions from "./AnimalsTableActions";
import AnimalsTableFilters from './AnimalsTableFilters'

type AnimalsTableProps = {
  animals: Animal[],
}

export type AnimalsTableFilters = {
  name: string,
  type: Animal["type"] | "all"
}

export type AnimalsFilterNames = keyof AnimalsTableFilters

export default function AnimalsTable({ animals }: AnimalsTableProps) {

  const [filters, setFilters] = useState<AnimalsTableFilters>({
    name: "",
    type: "all",
  });

  const handleFilterChange = (
    filterType: AnimalsFilterNames,
    value: string
  ) => {
    setFilters((prevFilters) => {
      return { ...prevFilters, [filterType]: value };
    });
  };

  const handleResetFilters = () => {
    setFilters(() => ({
      name: "",
      type: "all"
    }))
  }

  const animalsFiltered = useMemo(() => animals.filter(animal => {

    const nameMatch = (filters.name && filters.name.length) ? animal.name.toLowerCase().includes(filters.name.toLowerCase()) : true;
    const typeMatch = filters.type !== "all" ? animal.type === filters.type : true;
    return nameMatch && typeMatch;

  }), [filters.name, filters.type, animals])

  return (
    <>
      <AnimalsTableFilters
        handleChange={handleFilterChange}
        resetFilters={handleResetFilters}
        filters={filters}
      />
      <Table>
        <TableHeader>
          <TableRow className="font-bold">
            <TableHead className="">Name</TableHead>
            <TableHead className="w-[150px] text-center">Age</TableHead>
            <TableHead className="w-[150px] text-center">Type</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {animalsFiltered.length > 0 && animalsFiltered.map(animal => (
            <TableRow key={animal.id + animal.name + animal.age}>
              <TableCell className="font-medium">
                {animal.name}
              </TableCell>
              <TableCell className="text-center">
                {animal.age}
              </TableCell>
              <TableCell className="text-center">
                {animal.type}
              </TableCell>
              <TableCell className="w-fit px-4">
                <AnimalsTableActions animalId={animal.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}