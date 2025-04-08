import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Empty seed script - database will be empty
  console.log('Database is empty and ready for your data')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 