import { useMutateAnimal } from "@/lib/hooks"
import { Animal } from "@/types/entities"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"
import { Pencil, Trash } from "lucide-react"

type AnimalsTableActionsProps = {
  animalId: Animal["id"]
}

export default function AnimalsTableActions({ animalId }: AnimalsTableActionsProps) {

  // Mutations
  const deleteAnimalMutation = useMutateAnimal("delete")

  // Event handlers
  const handleDeleteAnimal = (id: Animal["id"]) => {
    if (confirm("Are you sure to delete this Animal? The action is irreversible.")) {
      deleteAnimalMutation.mutate({ id })
    }
  }

  const isPendingState = deleteAnimalMutation.isPending

  return (
    <div className="flex items-center gap-4 mx-auto w-fit">
      <Button asChild disabled={isPendingState}>
        <Link to={`/animals/${animalId}`} className="flex gap-2 items-center">
          <Pencil className="w-4 h-4" />
          Edit
        </Link>
      </Button>
      <Button variant="destructive"
        disabled={isPendingState}
        className="flex gap-2 items-center"
        onClick={() => handleDeleteAnimal(animalId)}
      >
        <Trash className="w-4 h-4" />
        Delete
      </Button>
    </div>
  )
}