import {useEffect, useRef, useState} from 'react';
import {useRouter} from "next/navigation";
import {createEnterpriseUser, getEnterprises, getEnterpriseUsers, getUsers} from "../../util/APIUtils";
import {alertService} from "../Alert.service";
import dynamic from "next/dynamic";
const Alert = dynamic(() => import("../Alert").then((mod) => mod.Alert),{ ssr: false })
const CardUsers = dynamic(() => import("../Cards/CardUsers"),{ ssr: false })

export default function UserPage({userProp}) {
    const [ loading, setLoading ] = useState(true );
    const [ users, setUsers ] = useState([])
    const router = useRouter()
    useEffect(() => {
        let abortController = new AbortController();
        if( userProp.username === "admin" ) {
            getUsers(abortController.signal)
                .then(response => {
                    setUsers(JSON.parse(JSON.stringify(response)))
                    setLoading(false)
                }).catch(error => {
                if (error.statusCode === 401) {
                    localStorage.clear();
                    router.push('/auth/login');
                }
                if(error.name !== "AbortError") {
                    alertService.error((error && error.message) || 'Oops! Something went wrong. Please try again!', {
                        autoClose: true,
                        keepAfterRouteChange: false
                    })
                    console.log(error)
                }
            });
        }
        else if( userProp.username === "admin" ){
            getEnterpriseUsers(abortController.signal)
                .then(response => {
                    const userSort = JSON.parse(JSON.stringify(response));
                    if(userSort) userSort.sort((x, y) => y.created_at.localeCompare(x.created_at));
                    setUsers(userSort)
                    setLoading(false)
                }).catch(error => {
                if (error.statusCode === 401) {
                    localStorage.clear();
                    router.push('/auth/login');
                }
                if(error.name !== "AbortError"){
                    alertService.error((error && error.message) || 'Oops! Something went wrong. Please try again!', {
                        autoClose: true,
                        keepAfterRouteChange: false
                    })
                    console.log(error);
                }
            });
        }
        return () => abortController.abort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return(
        <div className="bg-white shadow-lg rounded flex flex-col justify-center items-center min-h-screen animate-fade-in-down">
            <main className="flex flex-row justify-center items-center">
                <div className="flex-auto min-w-0 break-words w-full px-4 lg:px-10 py-10 pt-0 mt-6 mb-6  rounded">
                    <div className="bg-slate-700 shadow-xl rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <User createUserProp= {userProp} />
                        </div>
                    </div>
                </div>
            </main>
            <Alert/>
            <div className="flex-row w-full lg:w-3/4">
                { loading ? <div className="text-center font-bold text-slate-700 animate-fade-in-down">Түр хүлээнэ үү...</div>  : <CardUsers cardUserProp={users} roleProp={userProp.username} /> }
            </div>
        </div>
    )
}

export function User({createUserProp}){
    const abortController = useRef(new AbortController);
    const [ buttonLoading, setButtonLoading ] = useState(false)
    const [ form, setForm ] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        
    })
    const [ passInvalid , setPassInvalid ] = useState(false)
    const [ enterprises, setEnterprises ] = useState()
    const router = useRouter()
    const handleInputChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if( form.confirmPassword !== form.password ) setPassInvalid(true);
        else setPassInvalid(false);
        if( form.confirmPassword === form.password ) {
            setButtonLoading(true);
            createEnterpriseUser(form,abortController.current.signal)
                .then(response => {
                    window.location.reload();
                }).catch(error => {
                if( error.statusCode === 401 ){
                    localStorage.clear();
                    router.push('/auth/login');
                }
                if(error.name !== "AbortError"){
                    alertService.error((error && error.message) || 'Oops! Something went wrong. Please try again!', {
                        autoClose: true,
                        keepAfterRouteChange: false
                    })
                    console.log(error)
                }
                setButtonLoading(false);
            });
        }
    }

    useEffect(() => {
        abortController.current = new AbortController();
        if(createUserProp.username === "admin") {
            getEnterprises(abortController.current.signal)
                .then(response => {
                    setEnterprises(JSON.parse(JSON.stringify(response)));
                }).catch(error => {
                if (error.statusCode === 401) {
                    localStorage.clear();
                    router.push('/auth/login');
                }
                if(error.name !== "AbortError"){
                    alertService.error((error && error.message) || 'Oops! Something went wrong. Please try again!', {
                        autoClose: true,
                        keepAfterRouteChange: false
                    })
                    console.log(error)
                }
                setButtonLoading(false);
            });
        }
        return () => abortController.current.abort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form onSubmit={handleSubmit}>
                <div className="relative w-full mb-3">
                    <label className="block uppercase text-slate-200 text-center text-xs font-bold mb-2" htmlFor="grid-password">
                        Хэрэглэгчийн нэр
                    </label>
                    <input
                        type="text" name="username"
                        className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={form.username} placeholder="user name" onChange={handleInputChange} required
                    />
                </div>
                <div className="relative w-full mb-3">
                    <label className="block uppercase text-slate-200 text-center text-xs font-bold mb-2" htmlFor="grid-password">
                        Нууц үг
                    </label>
                    <input
                        type="password" name="password"
                        className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={form.password} placeholder="password" onChange={handleInputChange} required
                    />
                </div>

                <div className="relative w-full mb-3">
                    <label className="block uppercase text-slate-200 text-center text-xs font-bold mb-2" htmlFor="grid-password">
                        Нууц үгээ давтан хийнэ үү { passInvalid ? <small className={"text-red-500"}>*нууц үг таарахгүй байна</small> : null }
                    </label>
                    <input
                        type="password" name="confirmPassword"
                        className={"px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 " + ( passInvalid ? "border-red-500 border-1" : "border-0" ) }
                        placeholder="Confirm Password" value={form.confirmPassword} onChange={handleInputChange} required/>
                </div>

                { createUserProp.username === "admin" ?
                    <div className="relative w-full mb-3">
                        <label className="block uppercase text-slate-200 text-center text-xs font-bold mb-2" htmlFor="grid-password">
                            Компаний id
                        </label>
                        { enterprises ?
                            <select className="w-full border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow ease-linear transition-all" name="enterpriseId" value={form.enterpriseId} onChange={handleInputChange}>
                                { enterprises.map(listValue => {
                                    return( <option value={listValue.id} key={listValue.id}>{listValue.id + ". " + listValue.name}</option> );
                                })}
                            </select>
                            :
                            <></>
                        }
                    </div>
                    :
                    <></>
                }

                <div className="text-center mt-6">
                    <button className="bg-slate-600 text-white active:bg-slate-400 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            type="submit" disabled={buttonLoading}>
                        { buttonLoading ?
                            <>
                                <svg className="justify-center inline mr-2 w-5 h-5 text-white animate-spin" viewBox="0 0 101 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                </svg>
                                <a className="capitalize"> Уншиж байна... </a>
                            </>
                            :
                            "Хэрэглэгч үүсгэх"
                        }
                    </button>
                </div>
            </form>
        </div>
    )
}