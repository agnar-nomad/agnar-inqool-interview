import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useSeedDb } from "@/lib/hooks";
import { Loader } from "lucide-react";



export default function AboveTableActions() {

  const { mutate, isPending } = useSeedDb()

  const handleSeedDb = () => {
    mutate()
  }

  return (
    <section className="flex items-center justify-between">
      <Button variant="outline" className="flex items-center gap-2"
        disabled={isPending} onClick={handleSeedDb}>
        {isPending ?
          <Loader className="animate-spin" />
          : null}
        Seed DB
      </Button>
      <Button asChild variant="outline" disabled={isPending}>
        <Link to={"new"} aria-disabled={isPending}>Create new entry</Link>
      </Button>
    </section>
  )
}