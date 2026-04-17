import { Metadata } from "next";
import {Geist, Geist_Mono} from "next/font/google"
import "./global.css"


const geistSans = Geist({variable:"--font-geist-sans", subsets:["latin"]})
const geist_mono = Geist_Mono({variable:"--font-geist-mono", subsets:["latin"]})

export const metadata:Metadata = {
    title:"Orbiz : Esay Lead Management and project Management ",
    description:"Orbit is a unified project management and CRM platform built for modern developers, freelancers, and agencies who need complete clarity across project execution and client acquisition. It combines project tracking, GitHub-based development visibility, and lead management into a single clean interface. Designed to eliminate decision fatigue, Orbit helps users prioritize tasks, manage client relationships, track leads from outreach to conversion, and make data-driven decisions every day.",
    authors:{ name:"Akashdeep Singh, Email: akashdalla406@gmail.com phone:+917814002784", url:"https.orbitz.in" }
}

export default function Rootlayout({children,}:Readonly<{children:React.ReactNode;}>){
    return(
         <html lang="en">
        <body className={`${geistSans.variable}, ${geist_mono.variable}`}>
            {children}
        </body>
       </html> 
    )
}