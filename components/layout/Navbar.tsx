import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Navbar(){
    return(
        <nav className="w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
                <div className="flex items-center gap-2">
                    <Image src={"/Logo.png"} alt="Orbit" height={40} width={40} className="size-9 rounded-xl"/>
                    <span className="text-xl font-bold tracking-tight">Orbit</span>
                </div>
                <div className="hidden md:flex items-center gap-1">
                    <Link href={"/"} className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md">Home</Link>
                    <Link href={"/"} className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md">Solutions</Link>
                    <Link href={"/"} className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md">Services</Link>
                    <Link href={"/"} className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md">Docs</Link>
                    <Link href="/pricings" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md">Pricing</Link>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/api/auth/signin" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Log in</Link>
                    <Link href="/api/auth/signin" className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
                        Get Started <ArrowRight className="size-3.5" />
                    </Link>
                </div>
            </div>
        </nav>
    )
}