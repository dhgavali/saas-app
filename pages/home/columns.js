"use client"

import { ColumnDef } from "@tanstack/react-table"

const Leads = {
    id: "",
    domain: "",
    description: "",
  };
  
  // Defining the columns array
  const columns = [
    {
      accessorKey: "id",
      header:() => <div className="font-bold">Id</div>,
      size: 10,
      
    },
    {
      accessorKey: "domain",
      header:() => <div className="font-bold">Domain</div>,
      size: 150,
    },
    {
      accessorKey: "description",
      header:() => <div className="font-bold">Description</div>,
      size: 250
    },
    {
      accessorKey: "platform",
      header:() => <div className="font-bold">Platform</div>,
      size: 80,
    },
    {
      accessorKey: "revenue",
      header:() => <div className="font-bold">Revenue</div>,
      size: 100
    },
    {
      accessorKey: "country",
      header:() => <div className="font-bold">Country</div>,
      size: 50
    },
  ];
  
  // Exporting the columns array
  module.exports = { columns };