import { PrismaClient } from "../../generated/prisma/client.js";

const prisma = new PrismaClient();

// Clears the database before each test
export default async () => {
  await prisma.$transaction([prisma.request.deleteMany()]);
};
