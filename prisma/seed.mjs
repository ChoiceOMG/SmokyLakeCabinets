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

const glassStyles = await Promise.all([
  prisma.glassStyle.create({
    data: { id: 1, value: "Clear", img: "/images/kitchen.jpg" },
  }),
  prisma.glassStyle.create({
    data: { id: 2, value: "Frosted", img: "/images/kitchen.jpg" },
  }),
  prisma.glassStyle.create({
    data: { id: 3, value: "Etched", img: "/images/kitchen.jpg" },
  }),
  prisma.glassStyle.create({
    data: { id: 4, value: "Patterned", img: "/images/kitchen.jpg" },
  }),
  prisma.glassStyle.create({
    data: { id: 5, value: "Tinted", img: "/images/kitchen.jpg" },
  }),
  prisma.glassStyle.create({
    data: { id: 6, value: "Other", img: "/images/kitchen.jpg" },
  }),
]);

const pantryTalls = await Promise.all([
  prisma.pantryTall.create({ data: { id: 1, value: "1", img: "/images/kitchen.jpg" } }),
  prisma.pantryTall.create({ data: { id: 2, value: "2", img: "/images/kitchen.jpg" } }),
  prisma.pantryTall.create({ data: { id: 3, value: "3", img: "/images/kitchen.jpg" } }),
  prisma.pantryTall.create({ data: { id: 4, value: "4", img: "/images/kitchen.jpg" } }),
  prisma.pantryTall.create({ data: { id: 5, value: "5", img: "/images/kitchen.jpg" } }),
  prisma.pantryTall.create({ data: { id: 6, value: "6", img: "/images/kitchen.jpg" } }),
]);

const wallHeights = await Promise.all([
  prisma.wallHeight.create({ data: { id: 1, size: "30", img: "/images/kitchen.jpg" } }),
  prisma.wallHeight.create({ data: { id: 2, size: "33", img: "/images/kitchen.jpg" } }),
  prisma.wallHeight.create({ data: { id: 3, size: "38", img: "/images/kitchen.jpg" } }),
  prisma.wallHeight.create({ data: { id: 4, size: "41", img: "/images/kitchen.jpg" } }),
  prisma.wallHeight.create({ data: { id: 5, size: "48", img: "/images/kitchen.jpg" } }),
]);

const boxMaterials = await Promise.all([
  prisma.boxMaterial.create({
    data: {
      id: 1,
      value: "Melamine White",
      img: "/images/kitchen.jpg",
      title: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
    },
  }),
  prisma.boxMaterial.create({
    data: {
      id: 2,
      value: "Prefinished Plywood Standard",
      img: "/images/kitchen.jpg",
      title: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
    },
  }),
  prisma.boxMaterial.create({
    data: {
      id: 3,
      value: "Prefinished Plywood Domestic",
      img: "/images/kitchen.jpg",
      title: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
    },
  }),
]);

const hardwarePackages = await Promise.all([
  prisma.hardwarePackage.create({
    data: {
      id: 1,
      value: "Standard",
      img: "/images/kitchen.jpg",
      title: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
    },
  }),
  prisma.hardwarePackage.create({
    data: {
      id: 2,
      value: "Upgraded",
      img: "/images/kitchen.jpg",
      title: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
    },
  }),
]);

const drawers = await Promise.all([
  prisma.drawer.create({
    data: {
      id: 1,
      value: "Metal Drawers",
      img: "/images/kitchen.jpg",
      title: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
    },
  }),
  prisma.drawer.create({
    data: {
      id: 2,
      value: "Standard Drawers",
      img: "/images/kitchen.jpg",
      title: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
    },
  }),
  prisma.drawer.create({
    data: {
      id: 3,
      value: "Dovetail",
      img: "/images/kitchen.jpg",
      title: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
    },
  }),
]);

const cabinetStyles = await Promise.all([
  prisma.cabinetStyle.create({
    data: {
      value: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
      img: "/images/kitchen.jpg"
    },
  }),
]);

const kitchenQuestions = await prisma.kitchenQuestions.create({
  data: {
    wallHeights: {
      connect: wallHeights.map((item) => ({ id: item.id })),
    },
    glassStyles: {
      connect: glassStyles.map((item) => ({ id: item.id })),
    },
    pantryTalls: {
      connect: pantryTalls.map((item) => ({ id: item.id })),
    },
    boxMaterials: {
      connect: boxMaterials.map((item) => ({ id: item.id })),
    },
    hardwarePackages: {
      connect: hardwarePackages.map((item) => ({ id: item.id })),
    },
    drawers: {
      connect: drawers.map((item) => ({ id: item.id })),
    },
    cabinetStyles: {},
  },
});

await prisma.kitchenQuestions.update({
  where: { id: kitchenQuestions.id },
  data: {
    cabinetStyles: {
      connect: cabinetStyles.map((item) => ({ id: item.id })),
    },
  },
});




console.log("Data seeding completed.");

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
