import Image from "next/image";
import SideBar from "../components/Admins/SideBar";
import { Outfit } from "next/font/google";
import { CgProfile } from "react-icons/cg";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const outfit = Outfit({ subsets: ["latin"] });

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className=" flex ">
        <ToastContainer theme="dark"/>
        <SideBar />

        <div className="flex flex-col w-full ml-20 sm:ml-64">
          <div className="flex items-center justify-between w-full py-[22px] px-12 border-b border-black">
            <h3 className="font-medium">Admin Panel</h3>
            <CgProfile size={30} className="text-black" />
          </div>
        </div>


      </div>
      {children}

    </div>
  )
}

export default layout
