import Hero from "@/components/layout/Hero";
import EnterpriseNavbar from "@/components/layout/Navbar";


export default async function Home() {
  return(
    <div className="min-h-screen">
      <EnterpriseNavbar/>
      <Hero/>
    </div>
  )
}