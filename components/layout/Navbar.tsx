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
                        <h1 className="font-bold text-2xl tracking-wider">Obitz<span className="text-emerald-500">STACK</span></h1>
                    </div>
                </div>
                <div className="flex gap-6">
                    <Link href={"/"} className="p-2 hover:text-orange-600 transition">Home</Link>
                    <Link href={"/"} className="p-2 hover:text-orange-600 transition">Solutions</Link>
                    <Link href={"/"} className="p-2 hover:text-orange-600 transition">Services</Link>
                    <Link href={"/"} className="p-2 hover:text-orange-600 transition">Docs</Link>
                    <Link href={"/"} className="p-2 hover:text-orange-600 transition">Company</Link>
                </div>
                <div className="flex gap-2">
                    <button className="px-2 py-2 rounded-3xl font-semibold text-gray-600">Log in</button>
                    <button className="bg-orange-600 px-4 py-2 rounded-4xl text-white font-semibold flex items-center ">Get Started <ArrowRight className="ml-1 w-4 h-4"/> </button>
                </div>
            </div>
        </div>
    )
}