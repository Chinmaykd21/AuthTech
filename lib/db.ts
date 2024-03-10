import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// The reason we store in globalThis is because
// its not affected by next js hot reload
// functionality
export const db = globalThis.prisma || new PrismaClient();

if (process?.env?.NODE_ENV !== "production") globalThis.prisma = db;
