"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import SubTablesItems from '../../components/Admins/SubTablesItems'
import { toast } from "react-toastify";

// Define types for email data
interface Email {
  _id: string;
  email: string;
  createdAt: Date | string; // Use createdAt instead of date
}

function SubscriptionPage() {
  const [emailList, setEmailList] = useState<Email[]>([]);

  const fetchEmail = async () => {
    try {
      const response = await axios.get("/api/email");
      console.log("API Response:", response.data);

      // Rename createdAt to date for compatibility in the frontend
      setEmailList(
        (response.data?.emails || []).map((item: any) => ({
          ...item,
          createdAt: item.createdAt, // Ensure we're using createdAt here
        }))
      );
    } catch (error) {
      console.error("Error fetching email data:", error);
    }
  };

  // Delete email functionality

  const deleteEmail = async (mongoId:string)=>{
    const response = await axios.delete("/api/email",{
      params:{
        id:mongoId
      }
    })

    if (response.data.success) {

      toast.success(response.data.msg)
      
    }else{
      toast.error("Error")
    }
  }

  useEffect(() => {
    fetchEmail();
  }, []);

  return (
    <div className="flex-1 pt-5 sm:pt-12 sm:pl-16 ml-[30%]">
      <h1>All Subscriptions</h1>
      <div className="relative max-w-screen-md h-[80vh] overflow-x-auto mt-4 border border-gray-400">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-left text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Email Subscription</th>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {emailList.length > 0 ? (
              emailList.map((item) => (
                <SubTablesItems key={item._id} id={item._id} deleteEmail={deleteEmail} email={item.email} createdAt={item.createdAt} />
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                  No subscriptions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SubscriptionPage;
