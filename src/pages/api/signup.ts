import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../utils/db';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    const existingUser = await prisma.user.findUnique({ where: { email } });
    
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
      await prisma.user.create({ data: { email, password: hashedPassword } });
      res.status(200).json({ message: 'Signup successful!' });
    } catch (error) {
      res.status(500).json({ error: 'Error creating user' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}