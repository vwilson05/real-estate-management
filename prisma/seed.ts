import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create a test property
  const property = await prisma.property.create({
    data: {
      address: '123 Test Street',
      city: 'Test City',
      state: 'TS',
      zipCode: '12345',
      type: 'RESIDENTIAL',
      marketValue: 500000,
      purchasePrice: 450000,
      purchaseDate: new Date('2023-01-01'),
      description: 'Test property'
    }
  })

  // Create some test issues
  await prisma.issue.createMany({
    data: [
      {
        title: 'High Priority Issue',
        description: 'This is a high priority test issue',
        status: 'OPEN',
        priority: 'HIGH',
        type: 'MAINTENANCE',
        dueDate: new Date('2024-04-01'),
        propertyId: property.id
      },
      {
        title: 'Medium Priority Issue',
        description: 'This is a medium priority test issue',
        status: 'IN_PROGRESS',
        priority: 'MEDIUM',
        type: 'REPAIR',
        dueDate: new Date('2024-04-15'),
        propertyId: property.id
      },
      {
        title: 'Low Priority Issue',
        description: 'This is a low priority test issue',
        status: 'BLOCKED',
        priority: 'LOW',
        type: 'IMPROVEMENT',
        dueDate: new Date('2024-05-01'),
        propertyId: property.id
      }
    ]
  })

  console.log('Database has been seeded with test data')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 