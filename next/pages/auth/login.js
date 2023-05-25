import Auth from "../../layouts/Auth";
import dynamic from "next/dynamic";
const LoginPage = dynamic(() => import("../../components/Auth/LoginPage"),{ ssr: false })

export default function Login(){
    return(
        <LoginPage />
    )
}
Login.layout = Auth;