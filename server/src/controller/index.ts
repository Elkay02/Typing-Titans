import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client'
import prismaRandom from 'prisma-extension-random';

const prisma = new PrismaClient().$extends(prismaRandom());

const root = (_: Request, res: Response) => {
  try {
    res.status(200);
    res.send('<style> body { background-color: #333; } </style><h1>TT Server</h1>');
  } catch (e) {
    res.status(500);
    res.send('Internal Server Error');
  }
};

const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany()
  res.json(users)
}

const getUsersWithDetails = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        progress: true,
        friends: true
      }
    });
    res.json(users)
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

const newUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password,
    },
  })
  res.json(user)
}


const getShortcuts = async (req: Request, res: Response) => {
  try {
    // Fetch 15 random shortcuts from the database
    const shortcuts = await prisma.shortcut.findManyRandom(10, {
      select: { name: true, windows: true, mac: true },
    });
    res.status(200).json(shortcuts);
  } catch (error) {
    console.error('Error fetching shortcuts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { root, getUsers, newUser, getUsersWithDetails, getShortcuts };
