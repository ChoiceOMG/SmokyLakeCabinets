import { Prisma, PrismaClient } from '@prisma/client';
import { router, publicProcedure, protectedProcedure } from '../trpc';
import { z } from 'zod';

export const kitchenQuestionsRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.kitchenQuestions.findMany({
      include: {
        wallHeights: true,
        glassStyles: true,
        pantryTalls: true,
        boxMaterials: true,
        hardwarePackages: true,
        drawers: true,
        cabinetStyles: true,
      },
    });
  }),

updateQuestion: protectedProcedure
  .input(
    z.object({
      model: z.string(),
      id: z.number(),
      questionUpdateData: z.array(
        z.object({
          id: z.number(),
          img: z.string().optional(),
          value: z.string().optional(),
          size: z.string().optional(),
          title: z.string().optional(),
        })
      ),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const modelName = input.model;
    const modelNamePlural = modelName.slice(0, -1);
    const questionUpdateData = input.questionUpdateData.map((item) => ({
      id: item.id,
      data: {
        img: item.img,
        value: item.value,
        size: item.size,
        title: item.title,
      },
    }));
    console.log(questionUpdateData);
    const updatedEntities: any[] = [];

    const prismaModels: Record<string, any> = {
      wallHeights: ctx.prisma.wallHeight,
      glassStyles: ctx.prisma.glassStyle,
      pantryTalls: ctx.prisma.pantryTall,
      boxMaterials: ctx.prisma.boxMaterial,
      hardwarePackages: ctx.prisma.hardwarePackage,
      drawers: ctx.prisma.drawer,
      CabinetStyles: ctx.prisma.cabinetStyle,
};
    console.log(modelName);
// Step 1: Delete all existing entities in the database
await prismaModels[modelName].deleteMany({
  where: {
    kitchenQuestions: {
      some: { id: input.id },
    },
  },
});
console.log(`Deleted all ${modelNamePlural} for question with id ${input.id}`);

// Step 2: Create new entities based on questionUpdateData
for (const updateData of questionUpdateData) {
  let newEntity: any;

  switch (modelName) {
    case 'wallHeights':
      newEntity = await ctx.prisma.wallHeight.create({
        data: {
          id: updateData.id,
          img: updateData.data.img || '',
          size: updateData.data.size || '',
          kitchenQuestions: { connect: { id: input.id } },
        },
      });
      break;
    case 'glassStyles':
      newEntity = await ctx.prisma.glassStyle.create({
        data: {
          id: updateData.id,
          img: updateData.data.img || '',
          value: updateData.data.value || '',
          kitchenQuestions: { connect: { id: input.id } },
        },
      });
      break;
    case 'pantryTalls':
      newEntity = await ctx.prisma.pantryTall.create({
        data: {
          id: updateData.id,
          img: updateData.data.img || '',
          value: updateData.data.value || '',
          kitchenQuestions: { connect: { id: input.id } },
        },
      });
      break;
    case 'boxMaterials':
      newEntity = await ctx.prisma.boxMaterial.create({
        data: {
          id: updateData.id,
          img: updateData.data.img || '',
          value: updateData.data.value || '',
          title: updateData.data.title || '',
          kitchenQuestions: { connect: { id: input.id } },
        },
      });
      break;
    case 'hardwarePackages':
      newEntity = await ctx.prisma.hardwarePackage.create({
        data: {
          id: updateData.id,
          img: updateData.data.img || '',
          value: updateData.data.value || '',
           title: updateData.data.title || '',
          kitchenQuestions: { connect: { id: input.id } },
        },
      });
      break;
    
    case 'drawers':
      newEntity = await ctx.prisma.drawer.create({
        data: {
          id: updateData.id,
          img: updateData.data.img || '',
          value: updateData.data.value || '',
           title: updateData.data.title || '',
          kitchenQuestions: { connect: { id: input.id } },
        },
      });
      break;
    case 'CabinetStyles':
      newEntity = await ctx.prisma.cabinetStyle.create({
        data: {
          id: updateData.id,
          img: updateData.data.img || '',
          value: updateData.data.value || '',
          kitchenQuestions: { connect: { id: input.id } },
        },
      });
      

    default:
      break;
  }

  console.log(`Created ${modelName} with id ${updateData.id}`);
  console.log(newEntity)
  updatedEntities.push(newEntity);
}


    return updatedEntities;
  }),





});
