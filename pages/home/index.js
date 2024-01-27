
import TableNext from "./table";
import { Leads, columns } from "./columns"
import { useState, useEffect } from "react";
import { DataTable } from "./data_table"

export default  function  Home(){
    const [data, setData] = useState([]);

    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
     
        const response = await fetch('/api/db/gel_db');
        const data = await response.json();
        console.log("data", data)
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };  
  
  
    return (
        <>
<div>
    
    {/* <TableNext/> */}
    <DataTable columns={columns} data={data} />
</div>
        </>
    );
}