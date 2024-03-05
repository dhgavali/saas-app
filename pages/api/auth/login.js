// import prisma from "/lib/prismaClient";
// export default async (req, res) => {
//     const method = req;

//     try{
//         const data = await prisma.user.create({ data: req.body });
//         res.status(201).json({ data});
//     }
//     catch(error){
//         res.status(500).json({ error: error.message });
//     }
// }