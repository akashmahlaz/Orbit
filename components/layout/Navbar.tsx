import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Navbar(){
    return(
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between">
                <div className="flex gap-2 p-2 items-center">
                    <Image src={"/Logo.png"} alt="Brilion" height={100} width={100} className="h-10 w-10 rounded-xl"/>
                    <div className="h-12 p-2">
                        <h1 className="font-bold text-2xl text-orange-500 tracking-wider">Orbit</h1>
                    </div>
                </div>
                <div className="flex gap-6">
                    <Link href={"/"} className="px-4 py-2 hover:text-orange-500 hover:bg-orange-50 hover:rounded-2xl transition">Home</Link>
                    <Link href={"/"} className="px-4 py-2 hover:text-orange-500 hover:bg-orange-50 hover:rounded-2xl transition">Solutions</Link>
                    <Link href={"/"} className="px-4 py-2 hover:text-orange-500 hover:bg-orange-50 hover:rounded-2xl transition">Services</Link>
                    <Link href={"/"} className="px-4 py-2 hover:text-orange-500 hover:bg-orange-50 hover:rounded-2xl transition">Docs</Link>
                    <Link href={"/"} className="px-4 py-2 hover:text-orange-500 hover:bg-orange-50 hover:rounded-2xl transition">Company</Link>
                </div>
                <div className="flex gap-2">
                    <button className="  px-2 py-2 rounded-3xl font-semibold text-gray-600">Log in</button>
                    <button className="bg-orange-500 px-4 py-2 rounded-4xl text-white font-semibold flex items-center ">Get Started <ArrowRight className="ml-1 w-4 h-4"/> </button>
                </div>
            </div>
        </div>
    )
}