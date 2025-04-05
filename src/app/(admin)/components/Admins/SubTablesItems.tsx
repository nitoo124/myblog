type SubTablesItemsProps = {
  email?: string;
  id: string;
  createdAt: string | number | Date; 
  deleteEmail:Function 
    
  }


function SubTablesItems({ email, id, createdAt,deleteEmail }: SubTablesItemsProps) {
  const emailDate = new Date(createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <tr className="border-b text-left bg-white">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        {email || "No Email"}
      </th>
      <td className="px-6 py-4">{emailDate}</td>
      <td onClick={()=>{
        deleteEmail(id)
      }} className="px-6 py-4 font-bold text-xl cursor-pointer text-red-600">
        x
      </td>
    </tr>
  );
}

export default SubTablesItems;
