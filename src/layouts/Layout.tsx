import { Outlet } from "react-router-dom"
import Header from "../Components/Header"
import Modal from "../Components/Modal";

export default function Layout() {
  return (
    <>
        <Header />

        <main className="container mx-auto py-16">
            <Outlet />
        </main>
        <Modal />
    </>
  );
}
