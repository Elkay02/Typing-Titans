import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  // const userData = [
  //   {
  //     email: 'alice@example.com',
  //     password: 'password123',
  //     username: 'Alice',
  //     chapter: 0,
  //     progress: {
  //       create: [
  //         {
  //           date: new Date(),
  //           speed: 0.75,
  //           accuracy: 0.85,
  //         },
  //       ],
  //     },
  //   },
  //   {
  //     email: 'charlie@example.com',
  //     password: 'password456',
  //     username: 'Charlie',
  //     chapter: 0,
  //     progress: {
  //       create: [
  //         {
  //           date: new Date(),
  //           speed: 0.85,
  //           accuracy: 0.90,
  //         },
  //       ],
  //     },
  //   },
  //   {
  //     email: 'eve@example.com',
  //     password: 'password789',
  //     username: 'Eve',
  //     chapter: 0,
  //     progress: {
  //       create: [
  //         {
  //           date: new Date(),
  //           speed: 0.80,
  //           accuracy: 0.88,
  //         },
  //       ],
  //     },
  //   },
  // ];

  // const createdUsers = [];
  // console.log('seeding users');
  // for (const u of userData) {
  //   const user = await prisma.user.create({
  //     data: u,
  //   });
  //   createdUsers.push(user);
  // }

  // for (const user of createdUsers) {
  //   console.log('making friends');
  //   await prisma.user.update({
  //     where: { id: user.id },
  //     data: {
  //       friends: {
  //         connect: createdUsers
  //           .filter((friend) => friend.id !== user.id)
  //           .map((friend) => ({ id: friend.id })),
  //       },
  //     },
  //   });
  // }

  // const shortcutData = JSON.parse(fs.readFileSync('shortcuts.json', 'utf-8'));
  // console.log('seeding shortcuts');

  // for (let item of shortcutData) {
  //   await prisma.shortcut.create({
  //     data: {
  //       name: item.name,
  //       windows: item.windows,
  //       mac: item.mac
  //     }
  //   });
  // }

  const movieData = JSON.parse(fs.readFileSync('movies.json', 'utf-8'));
  console.log('seeding movies');

  for (let item of movieData) {
    await prisma.movie.create({
      data: {
        title: item.title,
        image: item.image
      }
    });
  }

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
