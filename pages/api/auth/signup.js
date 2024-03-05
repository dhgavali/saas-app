import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password, website, license, linkedIn } = req.body;

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      // Email already exists, return error response
      return res.status(400).json({ user: null, message: 'Email already exists' });
    }

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Email doesn't exist, create new user with hashed password
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          linkedIn,
          website,
          license
        },
      });

      res.status(201).json({ user: newUser, message: 'Signup successful' });
    } catch (error) {
      console.error('Error signing up:', error);
      res.status(500).json({ user: null, message: 'Signup failed' });
    }
  } else {
    res.status(405).json({ user: null, message: 'Method Not Allowed' });
  }
}
