import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("../components/Navbars/AuthNavbar.js"),{ ssr: false })
const FooterSmall = dynamic(() => import("../components/Footers/FooterSmall.js"),{ ssr: false })

export default function Auth({ children }) {
  return (
    <>
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-slate-900 bg-no-repeat bg-full"
            style={{
                backgroundImage: "url('/register_bg_2.png')",
            }}
            />
          {children}
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
