import React, { useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const FooterSmall = dynamic(() => import("../components/Footers/FooterSmall"), { ssr: false });

export default function Index() {
  useEffect(() => {
    if (!localStorage.getItem("currentUser")) localStorage.setItem("currentUser", JSON.stringify({ username: "null" }));
    if (!localStorage.getItem("authenticated")) localStorage.setItem("authenticated", "false");
  }, []);

  return (
    <>
      <main>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-6/12 px-4">
              <h1 className="text-4xl font-semibold text-center">Welcome to Our Website</h1>
              <p className="mt-4 text-lg leading-relaxed text-center">
                This is a sample website built with Next.js. You can customize this text and add your own content.
              </p>
            </div>
          </div>
        </div>
      </main>
      <FooterSmall />
    </>
  );
}