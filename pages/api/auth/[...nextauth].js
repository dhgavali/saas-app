import NextAuth from 'next-auth';
import authOptions from './authOptions'; // Import the authOptions function from authOptions.js

export default NextAuth(authOptions()); // Call the authOptions function and pass it to NextAuth
