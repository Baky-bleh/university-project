import {alertService} from "../Alert.service";
import {logout} from "../../util/APIUtils";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {useEffect, useRef} from "react";

export default function AuthenticatedUser(){
    const abortController = useRef(new AbortController())
    const router = useRouter()
    const handleLogout = (event) => {
        event.preventDefault();
        logout(abortController.current.signal).then(response => {
            alertService.success("Баяртай", {
                autoClose: true,
                keepAfterRouteChange: true
            })
        }).catch(error => {
            alertService.error((error && error.message) || 'Oops! Something went wrong. Please try again!', {
                autoClose: true,
                keepAfterRouteChange: true
            })
        }).finally( () => {
                localStorage.clear();
                router.push('/auth/login');
            }
        );
    }

    useEffect(() => {
        abortController.current = new AbortController();
        return () => abortController.current.abort();
    },[])

    return(
        <>
            <Link href="/project" legacyBehavior>
                <a className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700">
                    Админ хэсэг
                </a>
            </Link>
            <Link href="/ongoingConference" legacyBehavior>
                <a className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700">
                    Хурлын хэсэг
                </a>
            </Link>
            <Link href="/auth/changePassword" legacyBehavior>
                <a className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700">
                    Нууц үг солих
                </a>
            </Link>
            <div className="h-0 border border-solid " />
            <a href="" className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700" onClick={handleLogout}>
                Гарах
            </a>
        </>
    )
}