// // import prisma from "/lib/prismaClient";
import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {

  const {query} = req;
  console.log("method called", query);
  try {
    const prisma = new PrismaClient()
    const data = await prisma.leads.findMany({
      
    }); // Replace with your actual model name
    // console.log("data", data);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
}