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
      accessorKey: "domain",
      header:() => <div className="font-bold">Domain</div>,
    },
    {
      accessorKey: "description",
      header:() => <div className="font-bold">Description</div>,
    },
    {
      accessorKey: "platform",
      header:() => <div className="font-bold">Platform</div>,
    },
    {
      accessorKey: "revenue",
      header:() => <div className="font-bold">Revenue</div>,
    },
    {
      accessorKey: "country",
      header:() => <div className="font-bold">Country</div>,
    },
  ];
  
  // Exporting the columns array
  module.exports = { columns };