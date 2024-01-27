
import TableNext from "./table";
import { Leads, columns } from "./columns"
import { useState, useEffect } from "react";
import { DataTable } from "./data_table"
import LandingLayout from "/components/landingPage/landingLayout";
import LandingHeader from "/components/landingPage/landingHeader";
import { country_list, revenue_list, platform_list, tech_list, industry_list } from "./selects_value";
import { Button } from "/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "/components/ui/select"
export default  function  Home(){
    const [data, setData] = useState([]);

    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
     
        const response = await fetch('/api/db/get_all_leads');
        const data = await response.json();
        console.log("data", data)
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };  
  

  

    // filters



  const [selected_country, set_country] = useState("");
  const [selected_tech, set_tech] = useState("");
  const [selected_platform, set_platform] = useState("");
  const [selected_revenue, set_revnue] = useState("");
  const [selected_industry, set_industry] = useState("");

  const handleCountrySelect = (selectedOption) => {
    set_country(selectedOption);

  };
  const handleTechSelect = (selectedOption) => {
    set_tech(selectedOption);
  };
  const handlePlatformSelect = (selectedOption) => {
    set_platform(selectedOption);
  };
  const handleRevenueSelect = (selectedOption) => {
    set_revnue(selectedOption);
  };
  const handleIndustrySelect = (selectedOption) => {
    set_industry(selectedOption);
  };

    return (
        <div className="flex flex-col">
<div>
    <LandingHeader/>
</div>

<div className="py-20  px-8 mb-0  ">

    {/* <TableNext/> */}
    {/* selct components */}

<div className="flex flex-row space-x-2 w-full justify-between my-2 py-2">
<div className="flex flex-col w-1/6">
  <div> Domain</div>
<Select
            value={``}
            onValueChange={handleCountrySelect}
          >
            <SelectTrigger className="h-8 ">
              <SelectValue placeholder={selected_country == "" ?  "Choose Country" : selected_country } />
            </SelectTrigger>
            <SelectContent side="bottom" className="bg-white z-40 rounded-lg" >
              {country_list.map((country) => (
                <SelectItem key={country} value={`${country}`}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
</div>
<div className="flex flex-col w-1/6">
  <div> Platform</div>
<Select
            value={``}
            onValueChange={handlePlatformSelect}
          >
            <SelectTrigger className="h-8 ">
              <SelectValue placeholder={selected_platform == "" ? "Choose Platform"  : selected_platform} />
            </SelectTrigger>
            <SelectContent side="bottom" className="bg-white z-40 rounded-lg" >
              {platform_list.map((platform) => (
                <SelectItem key={platform} value={`${platform}`}>
                  {platform}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
</div>
<div className="flex flex-col w-1/6">
  <div> Revenue</div>
<Select
            value={``}
            onValueChange={handleRevenueSelect}
          >
            <SelectTrigger className="h-8 ">
              <SelectValue placeholder={selected_revenue== "" ?"Choose Revenue"  : selected_revenue} />
            </SelectTrigger>
            <SelectContent side="bottom" className="bg-white z-40 rounded-lg" >
              {revenue_list.map((revenue) => (
                <SelectItem key={revenue} value={`${revenue}`}>
                  {revenue}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
</div>
<div className="flex flex-col w-1/6">
  <div> Technology</div>
<Select
            value={``}
            onValueChange={handleTechSelect}
          >
            <SelectTrigger className="h-8 ">
              <SelectValue placeholder={selected_tech == "" ?"Choose Technology" : selected_tech } />
            </SelectTrigger>
            <SelectContent side="bottom" className="bg-white z-40 rounded-lg" >
              {tech_list.map((tech) => (
                <SelectItem key={tech} value={`${tech}`}>
                  {tech}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
</div>
<div className="flex flex-col w-1/6">
  <div> Industry</div>
<Select
            value={``}
            onValueChange={handleIndustrySelect}
          >
            <SelectTrigger className="h-8 ">
              <SelectValue placeholder={selected_industry == "" ? "Choose Industry" : selected_industry } />
            </SelectTrigger>
            <SelectContent side="bottom" className="bg-white z-40 rounded-lg" >
              {industry_list.map((industry) => (
                <SelectItem key={industry} value={`${industry}`}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
</div>
</div>

{/* buttons */}
<div className="flex flex-row space-x-4 justify-center my-2">

<Button
            variant="destructive"
                className="bg-red border-2 w-1/6"
            onClick={async () => {
              // console.log(selected_country, selected_industry,selected_platform,selected_revenue,selected_platform)
              const map_data = {
                country : selected_country,
                industry : selected_industry,
                platform: selected_platform,
                revenue : selected_revenue,
                technology : selected_tech,
                } 
                console.log(map_data);

                
                try {
     
                  const response = await fetch('/api/db/get_filtered_leads', {
                    method: 'POST', // Assuming you're sending data in the request body
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ map_data: map_data }),
                  });
                  const data = await response.json();
                  console.log("data", data)
                  setData(data);
                } catch (error) {
                  console.error('Error fetching data:', error);
                }
            }}
          >
           Filter
           </Button>
<Button
            variant="secondary"
                className="bg-red border-2 w-1/6"
            onClick={() => {}}
          >
           Export
           </Button>
</div>

<div className="py-2 my-2 text-md font-bold">
Leads Available: {data.length}
</div>
    {/* table */}
    <DataTable columns={columns} data={data} />
</div>

        </div>
    );
}