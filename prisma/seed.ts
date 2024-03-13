import { PrismaClient, User, UserRole } from "@prisma/client";
import { faker } from "@faker-js/faker";

/**
 * A global prisma client. It will be disconnecte dregardless of whether
 * seed script has ran successfully OR unsucessfully.
 */
const prisma = new PrismaClient();

async function main() {
  const testUser: User = {
    id: faker.string.alphanumeric(),
    name: faker.person.firstName(),
    email: "testUser1@email.com",
    emailVerified: faker.date.recent({
      days: 100,
      refDate: "2023-07-01T00:00:00.000Z",
    }),
    password: "$2a$10$gTO7o3cdoCNUjVCNnrTeKu7aN5HMJ53ebEIoYZn6qeQIGiww2rjAu",
    role: UserRole.ADMIN,
  };

  const user = await prisma.user.create({
    data: {
      ...testUser,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
