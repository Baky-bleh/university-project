import {useEffect, useRef, useState} from 'react';
import {login} from "../../util/APIUtils";
import {useRouter} from "next/navigation";
import {alertService} from "../Alert.service";
import dynamic from "next/dynamic";
const Alert = dynamic(() => import("../Alert").then((mod) => mod.Alert),{ ssr: false })

export default function LoginPage() {
    return (
        <>
            <div className="container mx-auto px-4 h-full">
                <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full lg:w-4/12 px-4">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-200 border-0">
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export function LoginForm(){
    const abortController = useRef(new AbortController())
    const [form, setForm] = useState({
        username: "",
        password: ""
    })
    const router = useRouter()
    const handleInputChange = (event) => {
        const target = event.target
        const inputName = target.name
        const inputValue = target.value
        setForm({
            ...form,
            [inputName]: inputValue
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        login({
            ...form,
            username: form.username.toLowerCase()
        },abortController.current.signal)
            .then(response => {
                localStorage.setItem(process.env.ACCESS_TOKEN, response.access_token);
                localStorage.setItem(process.env.REFRESH_TOKEN, response.refresh_token);
                localStorage.setItem(process.env.EXPIRE_AT, response.expire_at);
                localStorage.setItem("currentUser", JSON.stringify(response.current_user));
                localStorage.setItem("authenticated", "true");
                router.push('/home');
            }).catch(error => {
                if( error.statusCode === 401 ){
                    localStorage.clear();
                }
                if( error.name !== "AbortError" ){
                    alertService.error((error && error.message) || 'Oops! Something went wrong. Please try again!', {
                        autoClose: true,
                        keepAfterRouteChange: false
                    })
                    console.log(error)
                }
            });
    }

    useEffect(() => {
        abortController.current = new AbortController()
        return () => abortController.current.abort()
    },[])

    return(
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0 ">
            <Alert/>
            <div className="text-slate-400 text-center mb-3 font-bold">
                <small>Нэвтрэх</small>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="relative w-full mb-3">
                    <label className="block uppercase text-slate-600 text-xs font-bold mb-2" htmlFor="grid-password">
                        Нэвтрэх нэр
                    </label>
                    <input
                        type="text" name="username"
                        className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={form.username} placeholder="Нэвтрэх нэр" onChange={handleInputChange} required
                    />
                </div>

                <div className="relative w-full mb-3">
                    <label className="block uppercase text-slate-600 text-xs font-bold mb-2" htmlFor="grid-password">
                        Нууц үг
                    </label>
                    <input
                        type="password" name="password"
                        className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Нууц үг" value={form.password} onChange={handleInputChange} required/>
                </div>

                <div className="text-center mt-6">
                    <button className="bg-slate-800 text-white active:bg-slate-900 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="submit" >
                        Нэвтрэх
                    </button>
                </div>
            </form>
        </div>
    )
}