import { ReactNode } from "react";

const Layout = ({children }: {children: ReactNode}) => {
    return (  
        <div className="flex items-center h-full justify-center ">
            {children}
        </div>
    );
}
 
export default Layout;