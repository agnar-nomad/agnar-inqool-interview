import { Link } from "react-router-dom";
import { Button } from "../ui/button";



export default function AboveTableActions() {
  return (
    <section className="flex items-center justify-between">
      <Button variant="outline">Seed DB</Button>
      <Button asChild variant="outline">
        <Link to={"new"}>Create new entry</Link>
      </Button>
    </section>
  )
}