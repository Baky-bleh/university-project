import {useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import DarkCallpro from '../../public/dark-callpro-platform.png';
import dynamic from "next/dynamic";
// components
const UserDropdown = dynamic(() => import("../Dropdown/UserDropdown"),{ ssr: false })

export default function IndexNavbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    if(localStorage.getItem("authenticated") === "true"){
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link href="/">
                <Image
                    alt="dark-callpro"
                    className="w-28 border-none mr-4 py-2 inline-block whitespace-nowrap leading-relaxed"
                    src={DarkCallpro}
                    width={404}
                    height={180}
                />
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"/>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none mr-auto">
            </ul>
            <ul className="flex flex-col lg:flex-row list-none">
              <li className="flex items-center animate-fade-in">
                <Link href="https://github.com/beegi22/platform-android-sdk" prefetch={false} legacyBehavior>
                  <a className="hover:text-slate-500 text-slate-700 px-3 py-4 lg:py-2 flex items-center text-sm uppercase font-bold">
                    <i className="fab fa-github text-lg leading-lg mr-2" />
                     Github
                  </a>
                </Link>
              </li>

              {loading ?
                  <>
                    <li className="flex items-center px-3 py-4 lg:py-2 animate-fade-in">
                      <Link href="/auth/login" legacyBehavior>
                        <a className="bg-slate-600 text-white active:bg-slate-800 font-bold uppercase text-sm px-6 py-1 rounded-full shadow hover:shadow-lg outline-none focus:outline-none">
                          Нэвтрэх
                        </a>
                      </Link>
                    </li>
                  </>
                  :
                  <li className="flex items-center px-3 py-4 lg:py-2 animate-fade-in">
                    <UserDropdown/>
                  </li>
              }
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}