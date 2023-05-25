import dynamic from "next/dynamic";
const Sidebar = dynamic(() => import("../components/Sidebar/Sidebar"),{ ssr: false })

export default function Admin({ children }) {
    return (
        <>
          <div className="relative md:ml-64">
              <Sidebar />
          
            <div className="px-4 md:px-10 -py-1 md:py-10 mx-auto w-full bg-zinc-100">
                {children}
            </div>
          </div>
        </>
    );
}
