import AnimalsTable from "@/components/AnimalsTable"
import AboveTableActions from "@/components/common/AboveTableActions"
import { useAnimals } from "@/lib/hooks"
import { Loader } from "lucide-react"

export default function AnimalsPage() {

  const { data: animalData, error, isFetching } = useAnimals()

  if (error) {
    return (
      <p>Error: {error?.message}</p>
    )
  }

  if (!animalData) {
    return <p className="flex justify-center items-center gap-4">
      <span>No animals data</span>
      <Loader className="animate-spin" />
    </p>
  }

  return (
    <>
      <h1 className='text-3xl text-center mb-8'>Animals Page</h1>
      {isFetching &&
        <div className="absolute top-20 right-10 flex gap-2 items-center">
          <Loader className="animate-spin" />&nbsp;
          <span className="font-semibold">Loading...</span>
        </div>}
      <AboveTableActions />
      <AnimalsTable animals={animalData} />
    </>
  )
}