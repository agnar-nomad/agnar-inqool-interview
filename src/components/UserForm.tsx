import { UserSchema, UserSchemaType } from "@/lib/formValidation"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { User, genderTypes } from "@/types/entities"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Checkbox } from "./ui/checkbox"
import { Button } from "./ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import ErrorMessage from "./common/FormErrorMessage"
import { useMutateUser } from "@/lib/hooks"


export default function UserForm({ user }: { user: User | undefined }) {

  const form = useForm<UserSchemaType>(
    {
      resolver: zodResolver(UserSchema),
      defaultValues: {
        name: "",
        banned: false,
        gender: undefined
      },
      values: user ? {
        name: user.name,
        gender: user.gender,
        banned: user.banned
      } : undefined,
      shouldFocusError: false,
      mode: "onBlur",
      delayError: 300
    }
  )

  const { formState, handleSubmit, getValues } = form
  const { errors, isSubmitting, isSubmitSuccessful } = formState

  const createMutation = useMutateUser("create")
  const editMutation = useMutateUser("edit")

  const onFormSubmit: SubmitHandler<UserSchemaType> = async (data) => {
    if (user?.id) {
      editMutation.mutate({ id: user?.id, ...data })
    } else {
      createMutation.mutate({ ...data, id: "" })
    }
  }

  if (Object.keys(errors).length > 0) {
    console.log('FORM ERRORS', errors);
  }

  console.log("getValues", getValues());

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

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {genderTypes.map(gender =>
                      <SelectItem key={gender} value={gender}>
                        {gender[0].toUpperCase() + gender.slice(1)}
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="banned"
            render={({ field }) => (
              <div>
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>User is banned</FormLabel>
                </FormItem>
                {errors["banned"] ? <ErrorMessage>{errors["banned"]?.message}</ErrorMessage> : null}
              </div>
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


