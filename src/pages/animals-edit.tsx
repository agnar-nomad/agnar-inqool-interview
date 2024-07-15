import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";
import { useFetchAnimal } from "@/lib/hooks";
import AnimalForm from "@/components/AnimalForm";


export default function AnimalsEditPage() {

  const params = useParams()
  const { id } = params
  // returns id if the route includes an id, however if the route is /new, it returns undefined

  const animal = useFetchAnimal(id)

  const animalData = animal.isSuccess && animal.data ? animal.data : undefined

  return (
    <>
      <h1 className='text-3xl text-center mb-8'>
        {id ? "Edit Animal: " + animalData?.name : "New Animal"}
      </h1>

      {/* the API returns a weird 200 OK when entity not found  */}
      {animal.data && !animal.data?.name ?
        <p className="text-center text-destructive">Animal not found</p>
        : null}

      {animal.isFetching &&
        <div className="absolute top-20 right-10 flex gap-2 items-center">
          <Loader className="animate-spin" />&nbsp;
          <span className="font-semibold">Loading...</span>
        </div>
      }
      <AnimalForm animal={animalData} />
    </>
  )
}