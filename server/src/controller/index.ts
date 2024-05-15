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

const newProgress = async (req: Request, res: Response) => {

  const { userId, newDate, newSpeed, newAccuracy } = req.body;

  try {
    // Parse the newDate and focus only on the date part
    const parsedDate = new Date(newDate);
    const startDate = new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate());
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);

    // Check for existing progress on the same date for this user
    const existingProgress = await prisma.progress.findFirst({
      where: {
        userId: userId,
        date: {
          gte: startDate,
          lt: endDate
        }
      }
    });

    if (existingProgress) {
      // A progress record exists for this date and user
      if (newSpeed > existingProgress.speed) {
        // Update existing record because new speed is greater
        const updatedProgress = await prisma.progress.update({
          where: {
            id: existingProgress.id
          },
          data: {
            speed: newSpeed,
            accuracy: newAccuracy
          }
        });
        return res.status(200).json({
          message: 'New daily record!',
          progress: updatedProgress
        });
      } else {
        // Existing speed is greater or equal, do not update
        return res.status(200).json({
          message: 'Nice try!\nBut you already did better:',
          progress: existingProgress
        });
      }
    } else {
      // No existing record, create a new one
      const newProgress = await prisma.progress.create({
        data: {
          date: new Date(newDate),
          speed: newSpeed,
          accuracy: newAccuracy,
          userId: userId
        }
      });
      return res.status(201).json({
        message: 'Great start!\nThis is your score to beat:',
        progress: newProgress
      });
    }
  } catch (error: any) {
    console.error('Error managing progress:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
}

const getProgressByDay = async (req: Request, res: Response) => {

  const { userId, date } = req.body;

  try {
    // Parse the newDate and focus only on the date part
    const parsedDate = new Date(date);
    const startDate = new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate());
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);

    // Check for existing progress on the same date for this user
    const progress = await prisma.progress.findFirst({
      where: {
        userId: userId,
        date: {
          gte: startDate,
          lt: endDate
        }
      }
    });

    return res.status(201).json({
      message: 'progress fetched successfully.',
      progress: progress
    });

  } catch (error: any) {
    console.error('Error managing progress:', error);

    return res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
}

const fetchDailySentence = async (req: Request, res: Response) => {
  const url = 'https://zenquotes.io/api/today';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    return res.status(200).json({
      message: 'Quote fetched successfully.',
      quote: data[0].q
    });

  } catch (error: any) {
    console.error('Error managing quote:', error);

    return res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
}

const svixHook = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const { id } = payload.data;
    const eventType = payload.type;
    console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
    console.log('Webhook body:', payload.data);

    if (payload.type === 'user.created') {
      console.log('userId:', payload.data.id)
    }

    return res.status(200).json({
      success: true,
      message: 'Webhook received',
    });
  } catch (e) {
    res.status(500);
    res.send('Internal Server Error');
  }
}

export { root, getUsers, newUser, getUsersWithDetails, getShortcuts, newProgress, getProgressByDay, fetchDailySentence, svixHook };
