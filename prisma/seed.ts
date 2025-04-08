import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create a test property
  const property = await prisma.property.create({
    data: {
      address: "123 Test Street",
      city: "Test City",
      state: "TS",
      zipCode: "12345",
      type: "RESIDENTIAL",
      marketValue: 500000,
      purchasePrice: 450000,
      purchaseDate: new Date("2023-01-01"),
      description: "Test property for dashboard metrics"
    }
  });

  // Create test transactions for the last 6 months
  const now = new Date();
  const months = Array.from({ length: 6 }, (_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    return {
      income: Math.floor(Math.random() * 5000) + 2000, // Random income between 2000-7000
      expenses: Math.floor(Math.random() * 2000) + 500, // Random expenses between 500-2500
      date: date
    };
  });

  for (const month of months) {
    // Create income transaction
    await prisma.transaction.create({
      data: {
        date: month.date,
        amount: month.income,
        type: "INCOME",
        category: "RENT",
        description: "Monthly rent payment",
        propertyId: property.id
      }
    });

    // Create expense transaction
    await prisma.transaction.create({
      data: {
        date: month.date,
        amount: month.expenses,
        type: "EXPENSE",
        category: "MAINTENANCE",
        description: "Monthly maintenance expenses",
        propertyId: property.id
      }
    });
  }

  console.log('Test data seeded successfully');
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 