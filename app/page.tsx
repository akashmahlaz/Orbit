import Hero from "@/components/layout/Hero";
import Navbar from "@/components/layout/Navbar";

export default async function Home() {
  return (
    <div className="flex flex-col h-dvh">
      <div className="shrink-0">
        <Navbar/>
      </div>
      <Hero />
    </div>
  );
}