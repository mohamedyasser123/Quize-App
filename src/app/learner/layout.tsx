import Navbar from "@/src/components/layout/Navbar";
import Sidebar from "@/src/components/layout/Sidebar";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
   return (
     <div className="flex h-screen w-screen overflow-hidden bg-white relative">
       <Sidebar />
 
       <div className="flex flex-col flex-1 overflow-hidden w-full">
         <Navbar />
 
         <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
           {children}
         </main>
       </div>
     </div>
   );
}
