import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

// Optimized Prisma client for AWS Amplify/Serverless
if (process.env.NODE_ENV === "production") {
  // In production (Amplify), create a new client for each invocation
  // to avoid connection issues in serverless environment
  prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });
} else {
  // In development, use global instance to avoid exhausting connections
  let globalWithPrisma = global as typeof globalThis & {
    prisma: PrismaClient;
  };
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    });
  }
  prisma = globalWithPrisma.prisma;
}

export default prisma;
