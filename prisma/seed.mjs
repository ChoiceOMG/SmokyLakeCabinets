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
  prisma.glassStyle.create({ data: { value: "Clear", img: "/images/kitchen.jpg" } }),
  prisma.glassStyle.create({ data: { value: "Frosted", img: "/images/kitchen.jpg" } }),
  prisma.glassStyle.create({ data: { value: "Etched", img: "/images/kitchen.jpg" } }),
  prisma.glassStyle.create({ data: { value: "Patterned", img: "/images/kitchen.jpg" } }),
  prisma.glassStyle.create({ data: { value: "Tinted", img: "/images/kitchen.jpg" } }),
  prisma.glassStyle.create({ data: { value: "Other", img: "/images/kitchen.jpg" } }),
]);

const pantryTalls = await Promise.all([
  prisma.pantryTall.create({ data: { value: "1", img: "/images/kitchen.jpg" } }),
  prisma.pantryTall.create({ data: { value: "2", img: "/images/kitchen.jpg" } }),
  prisma.pantryTall.create({ data: { value: "3", img: "/images/kitchen.jpg" } }),
  prisma.pantryTall.create({ data: { value: "4", img: "/images/kitchen.jpg" } }),
  prisma.pantryTall.create({ data: { value: "5", img: "/images/kitchen.jpg" } }),
  prisma.pantryTall.create({ data: { value: "6", img: "/images/kitchen.jpg" } }),
]);

const wallHeights = await Promise.all([
  prisma.wallHeight.create({ data: { size: "30", img: "/images/kitchen.jpg" } }),
  prisma.wallHeight.create({ data: { size: "33", img: "/images/kitchen.jpg" } }),
  prisma.wallHeight.create({ data: { size: "38", img: "/images/kitchen.jpg" } }),
  prisma.wallHeight.create({ data: { size: "41", img: "/images/kitchen.jpg" } }),
  prisma.wallHeight.create({ data: { size: "48", img: "/images/kitchen.jpg" } }),
]);

const boxMaterials = await Promise.all([
  prisma.boxMaterial.create({
    data: {
      value: "Melamine White",
      img: "/images/kitchen.jpg",
      title: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
    },
  }),
  prisma.boxMaterial.create({
    data: {
      value: "Prefinished Plywood Standard",
      img: "/images/kitchen.jpg",
      title: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
    },
  }),
  prisma.boxMaterial.create({
    data: {
      value: "Prefinished Plywood Domestic",
      img: "/images/kitchen.jpg",
      title: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
    },
  }),
]);

const hardwarePackages = await Promise.all([
  prisma.hardwarePackage.create({
    data: {
      value: "Standard",
      img: "/images/kitchen.jpg",
      title: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
    },
  }),
  prisma.hardwarePackage.create({
    data: {
      value: "Upgraded",
      img: "/images/kitchen.jpg",
      title: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
    },
  }),
]);

const drawers = await Promise.all([
  prisma.drawer.create({
    data: {
      value: "Metal Drawers",
      img: "/images/kitchen.jpg",
      title: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
    },
  }),
  prisma.drawer.create({
    data: {
      value: "Standard Drawers",
      img: "/images/kitchen.jpg",
      title: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
    },
  }),
  prisma.drawer.create({
    data: {
      value: "Dovetail",
      img: "/images/kitchen.jpg",
      title: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
    },
  }),
]);

    await prisma.kitchenQuestions.create({  
      data: {
    
        
    wallHeights: {
      connect: wallHeights.map((height) => ({ id: height.id })),
    },
    glassStyles: {
      connect: glassStyles.map((style) => ({ id: style.id })),
    },
    pantryTalls: {
      connect: pantryTalls.map((tall) => ({ id: tall.id })),
    },
    boxMaterials: {
      connect: boxMaterials.map((material) => ({ id: material.id })),
    },
    hardwarePackages: {
      connect: hardwarePackages.map((hardwarePackage) => ({ id: hardwarePackage.id })),
    },
    drawers: {
      connect: drawers.map((drawer) => ({ id: drawer.id })),
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
