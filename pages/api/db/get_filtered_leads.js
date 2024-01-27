

import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const { map_data } = req.body; // Accessing data from request body
  console.log("method called", map_data);

  // Destructuring the map_data object
  const { country, industry, platform, revenue, technology } = map_data;

  try {
    const prisma = new PrismaClient();

    // Constructing the where object dynamically based on the map_data values
    const where = {};
    if (country) where.country = country;
    if (industry) where.industry = industry;
    if (platform) where.platform = platform;
    if (revenue) where.revenue = revenue;
    if (technology) where.technology = technology;

    const data = await prisma.leads.findMany({
   
      where, // Passing the constructed where object to filter the data
    });

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
}
