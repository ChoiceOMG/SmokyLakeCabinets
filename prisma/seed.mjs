import { PrismaClient } from '@prisma/client'

import serviceCategories from './service-categories.json' assert { type: "json" };
import users from './users.json' assert { type: "json" };
import appointments from './appointments.json' assert { type: "json" };
import services from './services.json' assert { type: "json" };
import projects from './projects.json' assert { type: "json" };

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


const prisma = new PrismaClient()
async function main() {
  console.log('Seeding service categories...')
  for (const serviceCategory of serviceCategories) {
    await prisma.serviceCategory.upsert({
      where: { categoryName: serviceCategory.categoryName },
      update: {},
      create: serviceCategory,
    })
  }
  console.log('Seeding services...')
  for (const service of services) {
    const randomCategory = serviceCategories[getRandomInt(serviceCategories.length)]
    await prisma.service.upsert({
      where: { serviceName: service.serviceName },
      update: {
        category: {
          connect: { categoryName: randomCategory.categoryName }
        }
      },
      create: {
        serviceName: service.serviceName,
        serviceDescription: service.serviceDescription,
        category: {
          connect: { categoryName: randomCategory.categoryName },
        },
      }
    })
  }
  console.log('Seeding users...')
  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        password: user.password,
      },
    })
  }
  console.log('Seeding projects...')
  for (const project of projects) {
    const randomUser = users[getRandomInt(users.length)]
    const randomUser2 = users[getRandomInt(users.length)]
    const randomImage = `https://dummyimage.com/${getRandomInt(1999)}x${getRandomInt(999)}/${getRandomInt(999999)}/${getRandomInt(999999)};`
    await prisma.project.upsert({
      where: { name: project.name },
      update: {
        users: {
          connect: [
            { email: randomUser.email },
            { email: randomUser2.email }
          ]
        }
      },
      create: {
        name: project.name,
        description: project.description,
        images: {
          connectOrCreate: {
            where: { url: project.url },
            create: { url: project.url },
          },
          create: { url: randomImage },

        },
        slug: project.url,
        users: {
          connect: [
            { email: randomUser.email },
            { email: randomUser2.email }
          ]
        }
      },
    })
  }
  console.log('Seeding appointments...')
  for (const appointment of appointments) {
    const randomUser = users[getRandomInt(users.length)]
    const randomService = services[getRandomInt(services.length)]
    const randomService2 = services[getRandomInt(services.length)]

    const randomProject = projects[getRandomInt(projects.length)]
    await prisma.appointment.create({
      data: {
        preferredDate: appointment.preferredDate,
        services: {
          connect: { serviceName: randomService.serviceName },
          connect: { serviceName: randomService2.serviceName }
        },
        project: {
          connect: { name: randomProject.name }
        }
      },
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
