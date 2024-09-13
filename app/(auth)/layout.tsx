import { ReactNode } from "react";
import Image from "next/image";
import { Beaker } from "lucide-react";

const Layout = ({children }: {children: ReactNode}) => {
    return (  
        <div className="flex items-center w-full h-full justify-evenly bg-zinc-800">
            {children}
        </div>
    );
}
 
export default Layout;