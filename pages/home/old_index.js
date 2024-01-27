
import LandingLayout from "/components/landingPage/landingLayout";
import LandingHeader from "/components/landingPage/landingHeader";
import { useEffect } from "react";
import TableBox from "./table";

export default async function Home() {
  return (
    <>
      <LandingLayout>
       
        <LandingHeader />
        <main className="space-y-40 mb-0">
            <h1> hi</h1>
         
            </main>
      </LandingLayout>
    </>
  );
}
