import {createRef, useEffect, useRef, useState} from "react";
import { createPopper } from "@popperjs/core";
import Image from "next/image";
import UserImage from "../../public/user.png"
import dynamic from "next/dynamic";
const AuthenticatedUser = dynamic(() => import("./AuthenticatedUser"),{ ssr: false })
const NotAuthenticatedUser = dynamic(() => import("./NotAuthenticatedUser"),{ ssr: false })

function UserDropdown(){
    const [ user, setUser ] = useState({
        name: "Username",
        authenticated: false
    });
  // dropdown props
    const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
    const btnDropdownRef = createRef();
    const popoverDropdownRef = createRef();
    const dropdown = useRef(null);
    const openDropdownPopover = () => {
        setDropdownPopoverShow(true);
        createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
          placement: "bottom-start",
        });
    };

    const closeDropdownPopover = () => {
        setDropdownPopoverShow(false);
    };

    useEffect(() => {
      if(localStorage["currentUser"] && localStorage["currentUser"] !== "undefined") {
        const userInfo = JSON.parse(localStorage["currentUser"])
        if(userInfo.username !== "null") {
          setUser({ ...user, name: userInfo.username, authenticated: true });
        } else {
          setUser({ ...user, authenticated: false });
        }
      }
        function handleClick(event) {
            if (dropdown.current && !dropdown.current.contains(event.target)) {
                setDropdownPopoverShow(false);
            }
        }
        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div ref={dropdown} >
          <a
            className="text-slate-500 block"
            ref={btnDropdownRef}
            onClick={(e) => {
              e.preventDefault();
              dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
            }}
          >
            <button className="items-center flex hover:opacity-75" >
              <span className="w-12 h-12 text-sm text-white bg-slate-200 inline-flex items-center justify-center rounded-full">
                <Image
                  alt="..."
                  id="userDropDownButton"
                  className="w-full align-middle border-none"
                  src={UserImage}
                  width={512}
                  height={512}
                />
              </span>
            </button>
          </a>
          <div
            ref={popoverDropdownRef}
            className={
              (dropdownPopoverShow ? "block " : "hidden ") +
              "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48 animate-fade-in"
            }
          >
              {user.authenticated ? <AuthenticatedUser/> : <NotAuthenticatedUser/>}
          </div>
        </div>
    );
}

export default UserDropdown;
