import {useEffect, useRef, useState} from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import dynamic from "next/dynamic";
import logo from "../../public/logo.png"
const UserDropdown = dynamic(() => import("../Dropdown/UserDropdown.js"),{ ssr: false })

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = useState(false);
  const router = useRouter();
  const [ user, setUser ] = useState({ user: "user" });
  const dropdown = useRef(null);

  useEffect(() => {
    if( localStorage["currentUser"] && localStorage["currentUser"] !== "undefined" ){
      const userInfo = JSON.parse(localStorage["currentUser"])
      if (userInfo.username !== "null") {
        setUser({ user: userInfo.username });
      }
    }
    function handleClick(event) {
      if (dropdown.current && !dropdown.current.contains(event.target)) {
        setCollapseShow(false);
      }
    }
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <>
      <nav className="bg-slate-900 md:bg-white shadow-lg md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button ref={dropdown}
            className="cursor-pointer text-white md:hidden px-3 py-1 text-xl leading-none rounded border border-solid border-transparent"
            type="button"
            onClick={(e) => {
              e.preventDefault()
              setCollapseShow(!collapseShow);
            }}
          >
            <i className="fas fa-bars"/>
          </button>
          {/* Brand */}
          <Link href="/" legacyBehavior>
            <a className="md:block md:pb-2 md:text-slate-700 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold px-0">
              <Image
                  alt="logo"
                  className="w-28 border-none mr-4 inline-block whitespace-nowrap leading-relaxed"
                  src={logo}
                  width={404}
                  height={180}
              />
            </a>
          </Link>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "bg-white md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              (collapseShow ? "m-2 py-3 px-6" : "hidden")
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-slate-700">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link href="/home" legacyBehavior>
                    <a className="md:block text-left md:pb-2 text-slate-700 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
                      Их сургуулийн платформ
                    </a>
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-slate-700 md:hidden px-3 py-1 text-xl leading-none"
                    onClick={() =>{
                      setCollapseShow(false)
                    }}
                  >
                    <i className="fas fa-times"/>
                  </button>
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-slate-800 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Админ хэсэг
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className={"items-center " + ( router.pathname === "/project" ? "bg-slate-100 rounded-lg shadow-md pl-4 animate-fade-in-right" : "")}>
                <Link href="/project" legacyBehavior>
                  <a className="text-slate-700 hover:text-slate-500 text-xs uppercase py-3 font-bold block">
                    <i className="fas fa-business-time fa-fw text-slate-700 mr-2 text-sm"/>
                    Тун удахгүй
                  </a>
                </Link>
              </li>
              { user.role !== "user" ?
                    <li className={"items-center " + ( router.pathname === "/user" ? "bg-slate-100 rounded-lg shadow-md pl-4 animate-fade-in-right" : "")}>
                      <Link href="/user" legacyBehavior>
                        <a className="text-slate-700 hover:text-slate-500 text-xs uppercase py-3 font-bold block">
                          <i className="fas fa-user fa-fw text-slate-700 mr-2 text-sm"/>
                          Хэрэглэгчид
                        </a>
                      </Link>
                    </li>
                  :
                  <></>
              }
              { user.role === "admin" ?
                <li className={"items-center " + ( router.pathname === "/enterprise" ? "bg-slate-100 rounded-lg shadow-md pl-4 animate-fade-in-right" : "")}>
                  <Link href="/enterprise" legacyBehavior>
                    <a className="text-slate-700 hover:text-slate-500 text-xs uppercase py-3 font-bold block">
                      <i className="fas fa-building fa-fw text-slate-700 mr-2 text-sm"/>
                      Их сургууль
                    </a>
                  </Link>
                </li>
                  :
                <></>
              }
              <li className={"items-center " + ( router.pathname === "/University" ? "bg-slate-100 rounded-lg shadow-md pl-4 animate-fade-in-right" : "")}>
                <Link href="/billing" legacyBehavior>
                  <a className="text-slate-700 hover:text-slate-500 text-xs uppercase py-3 font-bold block">
                    <i className="fas fa-dollar-sign fa-fw text-slate-700 mr-2 text-sm"/>
                    Их сургууль
                  </a>
                </Link>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
