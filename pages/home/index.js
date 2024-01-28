
import TableNext from "./table";
import { Leads, columns } from "./columns"
import { useState, useEffect } from "react";
import { DataTable } from "./data_table"
import LandingLayout from "/components/landingPage/landingLayout";
import LandingHeader from "/components/landingPage/landingHeader";
import { Button } from "/components/ui/button"
import { useSession } from "next-auth/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "/components/ui/select"
import { useRouter } from 'next/router';

export default  function  Home(){
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { data: session, status } = useSession();
  
    useEffect(() => {
      if (status === 'authenticated') {
        setIsAuthenticated(true);
      }
      setLoading(false);
    }, [status]);
  
    useEffect(() => {
      if (!loading && !isAuthenticated) {
        router.push('/api/auth/signin');
      }
    }, [loading, isAuthenticated]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (!isAuthenticated) {
      return null; // or any other UI for unauthenticated users
    }
   
    return (
        <div className="flex flex-col">
<div>
    <LandingHeader/>
</div>

<div className="py-20  px-8 mb-0  ">

    {/* <TableNext/> */}
    {/* selct components */}


    {/* table */}
    <DataTable columns={columns} />
</div>

        </div>
    );
}