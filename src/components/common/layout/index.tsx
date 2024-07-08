import { Header } from '../Header'
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div className="h-min-screen text-center">
        <Header />
        <main className="p-4 m-4">
          <Outlet />
        </main>
      </div>
    </>
  );
}