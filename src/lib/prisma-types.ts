import { PrismaClient, Issue, Property, Repair, Tenant, Transaction } from '@prisma/client'

// Re-export the types
export type { Issue, Property, Repair, Tenant, Transaction }

// Create a type-safe Prisma client instance
const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

export const db = globalThis.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db 