import { Leads, columns } from "../../components/table/columns"
import { useState, useEffect } from "react";
import {DataTable} from "../../components/table/data_table"
import LandingHeader from "/components/landingPage/landingHeader";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "/components/ui/select"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';


export default  function  Home(){
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
  
    const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session && status === 'authenticated') {
      // If the user is not authenticated, redirect to the login page
      router.push('/auth/signin');
    }
  }, [session, status, router]);

  if (status === 'loading') return <p>Loading...</p>;

  // if (!session) {
  //   // If the session is null, user is not authenticated, so render a message or redirect
  //   router.push('/api/auth/signin');
  // }
    // useEffect(() => {
    //   if (status === 'authenticated') {
    //     setIsAuthenticated(true);
    //   }
    //   setLoading(false);
    // }, [status]);
  
    // useEffect(() => {
    //   if (!loading && !isAuthenticated) {
    //     router.push('/api/auth/signin');
    //   }
    // }, [loading, isAuthenticated]);
  
    // if (loading) {
    //   return <div>Loading...</div>;
    // }
  
    // if (!isAuthenticated) {
    //   return null; // or any other UI for unauthenticated users
    // }
   
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