import { NextConfig } from "next";                        
const nextConfig: NextConfig={
 typedRoutes: true,
 experimental:{
    turbopackFileSystemCacheForDev:true,
    turbopackFileSystemCacheForBuild:true,
 },
 images:{
    remotePatterns:[ 
        {protocol:"https", hostname : "*", pathname:"/*"},       
     ]
 }
}
export default nextConfig;