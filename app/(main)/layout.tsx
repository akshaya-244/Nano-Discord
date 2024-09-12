import NavigationSidebar from "@/components/navigation/navigation-sidebar";

const MainLayout = async ({
    children
}:{
    children: React.ReactNode
}) => {
    return ( 
        <div className="h-full">
              
                    <div className=" md:flex flex-col h-full w-[72px] z-30  fixed  inset-y-0">
                        <NavigationSidebar />
                        {/* Navigation Sidebar */}
                    </div>
            <div className="md:pl-[72px] h-full">
                {children}
            </div>
        </div>
     );
}
 
export default MainLayout;