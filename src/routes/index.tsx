import { useApp } from "../context/App";
import AppRoutes from "./app.route";
import AuthRoutes from "./auth.route";

export default function Routes() {
    const { user } = useApp()
    return <>
        {
            !!user ? <AppRoutes /> : <AuthRoutes />
        }
    </>
}