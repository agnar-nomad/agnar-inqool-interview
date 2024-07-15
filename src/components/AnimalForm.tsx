import { AnimalSchema, AnimalSchemaType } from "@/lib/formValidation"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Animal, animalTypes } from "@/types/entities"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Button } from "./ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import ErrorMessage from "./common/FormErrorMessage"
import { useMutateAnimal } from "@/lib/hooks"


export default function AnimalForm({ animal }: { animal: Animal | undefined }) {

  const form = useForm<AnimalSchemaType>(
    {
      resolver: zodResolver(AnimalSchema),
      defaultValues: {
        name: "",
        type: "other",
        age: undefined
      },
      values: animal ? {
        name: animal.name,
        type: animal.type,
        age: animal.age
      } : undefined,
      shouldFocusError: false,
      mode: "onBlur",
      delayError: 300
    }
  )

  const { formState, handleSubmit } = form
  const { errors, isSubmitting, isSubmitSuccessful } = formState

  const createMutation = useMutateAnimal("create")
  const editMutation = useMutateAnimal("edit")

  const onFormSubmit: SubmitHandler<AnimalSchemaType> = async (data) => {
    if (animal?.id) {
      editMutation.mutate({ id: animal?.id, ...data })
    } else {
      createMutation.mutate({ ...data, id: "" })
    }
  }

  if (Object.keys(errors).length > 0) {
    console.log('FORM ERRORS', errors);
  }

  return (
    <>
      <Form {...form}>
        <form className='grid px-4 py-10 gap-8 max-w-96 mx-auto'
          onSubmit={handleSubmit(onFormSubmit)}>

          <div>
            <Label htmlFor="name">Name</Label>
            <Input type="text" placeholder="Name" {...form.register("name")} />
            {errors["name"] ? <ErrorMessage>{errors["name"]?.message}</ErrorMessage> : null}
          </div>

          <div>
            <Label htmlFor="age">Age</Label>
            <Input type="number" min={0} placeholder="Age" {...form.register("age")} />
            {errors["age"] ? <ErrorMessage>{errors["age"]?.message}</ErrorMessage> : null}
          </div>

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an animal type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {animalTypes.map(type =>
                      <SelectItem key={type} value={type}>
                        {type[0].toUpperCase() + type.slice(1)}
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting}>Submit</Button>

        </form>
      </Form>

      {isSubmitSuccessful && (<p className="font-semibold text-lg text-center text-primary">
        Thank you for your help.
      </p>)}
    </>
  )
}