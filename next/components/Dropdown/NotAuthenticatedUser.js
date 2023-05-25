import Link from "next/link";

export default function NotAuthenticatedUser(){
    return(
        <>
            <Link href="/auth/login" legacyBehavior>
                <a className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700">
                    Нэвтрэх
                </a>
            </Link>
        </>
    )
}