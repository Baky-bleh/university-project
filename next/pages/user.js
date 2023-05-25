import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Admin from "../layouts/Admin";
import dynamic from "next/dynamic";
const UserPage = dynamic(() => import("../components/Page/UserPage"), {
  ssr: false,
});

export default function User() {
  const [user, setUser] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (localStorage.length === 0) {
      console.log("Local storage is empty");
    } else {
      console.log("Local storage has data");
    }

    if (localStorage.getItem("authenticated") === "true") {
      setUser(localStorage["currentUser"]);
    } else {
      setUser("");
      localStorage.clear();
      router.push("/auth/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{user && user !== "undefined" ? <UserPage userProp={JSON.parse(user)} /> : <></>}</>;
}

User.layout = Admin;