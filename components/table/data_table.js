"use client"
 
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import XLSX from "xlsx";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "/components/ui/select"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "/components/ui/table"
import { Button } from "/components/ui/button"
import { Input } from "/components/ui/input"
import { useState, useEffect } from "react";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { faFilter } from "@fortawesome/free-solid-svg-icons";


import { country_list, revenue_list, platform_list, tech_list, industry_list } from "./selects_value";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function DataTable({ columns }) {
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
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    });
  
  const [startRow, setStartRow] = useState(null);
  const [endRow, setEndRow] = useState(null);
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
 
   let [error_row_range, setRowRangeError] = useState("");

 
   const handleSecondInputBlur = () => {
    if (endRow !== '' && parseInt(endRow) <= parseInt(startRow)) {
     setRowRangeError('End Row must be greater than start Row.');
      // Optionally, you can reset the second input value here
      // setSecondValue('');
    }
    else{
    setRowRangeError("")
    }
  };
   

  const exportToExcel = (jsonData, filename = "test") => {
    const XLSX = require('xlsx');
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  };
    return (
      <>
      <div className="flex flex-row space-x-2 w-full justify-between my-2 py-2">
<div className="flex flex-col w-1/6">
  <div> Country</div>
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


<div>
<label> Enter row count for export</label>
      <div className="flex justify-center py-2 my-2 w-1/3 space-x-4">
       
        <Input type="number" placeholder="Enter Start Row: E.g. 1" onChange={e => { 
          setStartRow(e.currentTarget.value); }}/>
        <Input type="number" placeholder="Enter End Row: E.g. 20" onChange={e => { 
         

            setEndRow(e.currentTarget.value); }}
            onBlur={handleSecondInputBlur}
          />
      </div>
      
      <div className="flex flex-row text-red-400 text-xs">
        {error_row_range}
      </div>
</div>
      {/* buttons */}
<div className="flex flex-row space-x-4 justify-center my-2">

<Button
            variant="destructive"
                className="bg-gray-600 hover:bg-gray-800 w-1/6 flex space-x-2 text-white py-1"
            onClick={async () => {
              // console.log(selected_country, selected_industry,selected_platform,selected_revenue,selected_platform)
              const map_data = {
                country : selected_country,
                industry : selected_industry,
                platform: selected_platform,
                revenue : selected_revenue,
                technology : selected_tech,
                } 
              

                
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
          <FontAwesomeIcon icon={faFilter}/> <span> Filter</span>
           </Button>
<Button
            variant="secondary"
                className="bg-gelBlue600 text-white w-1/6 flex space-x-4 hover:bg-blue-800"
            onClick={() => {
              let startIndex = parseInt(startRow);
              let endIndex = parseInt(endRow);
              
              if(startIndex < endIndex){
  let row_array = [];
  console.log(table.getRowModel(1,10))
  var data  = table.getRowModel(1,10);
  data.rows.map((id)=>{
    row_array.push(id.original)
  })

  exportToExcel(row_array, 'data');
              }
              else{
                setRowRangeError("Please enter valid start and end row")
              }
            
            }}
          >
           <FontAwesomeIcon icon={faDownload}/> <span>Export</span>
           </Button>
</div>

<div className="py-2 my-2 text-md font-bold">
Leads Available: {data.length}
</div>
{/* table data */}
      <div className="rounded-md border">
        <Table style={{tableLayout: 'fixed', width: '100%' }} >
          <TableHeader className={"bg-gray-800 text-white" } >
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}  style={{
                      width:
                        header.getSize(),
                    }}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                        
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index )=> (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : null}
                  className={index % 2 == 0 ? "bg-gray-200" : ""}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        
      </div>
{/* Pagination select boxes */}
      <div className="flex items-center justify-between px-2 py-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8 z-50 ">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top" className="bg-white z-40">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 rounded-lg lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0 rounded-lg"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0 rounded-lg"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 rounded-lg lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div></>
    );
  }
  
  module.exports = { DataTable };
  