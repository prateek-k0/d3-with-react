import { Outlet } from "react-router-dom";
import Sidebar from '../Sidebar/Sidebar'
import AppBarHeader from "../AppBar";

const AppLayout = () => {
    return (
        <>
            <AppBarHeader />
            <Sidebar />
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default AppLayout;