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

    const updatedEntities: any[] = [];

    for (const updateData of questionUpdateData) {
      const question = await ctx.prisma.kitchenQuestions.findUnique({
        where: { id: input.id },
        include: { [modelName]: true },
      });

      if (!question) {
        throw new Error(`The ${updateData.id} question was not found.`);
      }

      const entities = (question[modelName] || []) as any[];

      if (!entities) {
        throw new Error(`${modelName} with id ${updateData.id} is not found.`);
      }

      const entity = entities.find((item: { id: number }) => item.id === updateData.id);

      if (!entity) {
        let newEntity: any;

        switch (modelName) {
          case 'wallHeights':
            newEntity = await ctx.prisma.wallHeight.create({
              data: {
                size: updateData.data.size || '',
                img: updateData.data.img || '',
                 kitchenQuestions: {
                  connect: { id: input.id },
                  },
              },
            });
            break;
          case 'glassStyles':
            newEntity = await ctx.prisma.glassStyle.create({
              data: {
                value: updateData.data.value || '',
                img: updateData.data.img || '',
                kitchenQuestions: {
                  connect: { id: input.id },
                  },
              },
            });
            break;
          case 'pantryTalls':
            newEntity = await ctx.prisma.pantryTall.create({
              data: {
                value: updateData.data.value || '',
                img: updateData.data.img || '',
                kitchenQuestions: {
                  connect: { id: input.id },
                  },
              },
            });
            break;
          case 'boxMaterials':
            newEntity = await ctx.prisma.boxMaterial.create({
              data: {
                value: updateData.data.value || '',
                img: updateData.data.img || '',
                title: updateData.data.title || '',
                kitchenQuestions: {
                  connect: { id: input.id },
                  },
              },
            });
            break;
          case 'hardwarePackages':
            newEntity = await ctx.prisma.hardwarePackage.create({
              data: {
                value: updateData.data.value || '',
                img: updateData.data.img || '',
                title: updateData.data.title || '',
                kitchenQuestions: {
                  connect: { id: input.id },
                  },
              },
            });
            break;
          case 'drawers':
            newEntity = await ctx.prisma.drawer.create({
              data: {
                value: updateData.data.value || '',
                img: updateData.data.img || '',
                title: updateData.data.title || '',
                kitchenQuestions: {
                  connect: { id: input.id },
                  },
              },
            });
            break;
          default:
            break;
        }

        updatedEntities.push(newEntity);
      } else {
        Object.assign(entity, updateData.data);

        let updatedEntity: any;

        switch (modelName) {
          case 'wallHeights':
            updatedEntity = await ctx.prisma.wallHeight.update({
              where: { id: updateData.id },
              data: updateData.data,
            });
            break;
          case 'glassStyles':
            updatedEntity = await ctx.prisma.glassStyle.update({
              where: { id: updateData.id },
              data: updateData.data,
            });
            break;
          case 'pantryTalls':
            updatedEntity = await ctx.prisma.pantryTall.update({
              where: { id: updateData.id },
              data: updateData.data,
            });
            break;
          case 'boxMaterials':
            updatedEntity = await ctx.prisma.boxMaterial.update({
              where: { id: updateData.id },
              data: updateData.data,
            });
            break;
          case 'hardwarePackages':
            updatedEntity = await ctx.prisma.hardwarePackage.update({
              where: { id: updateData.id },
              data: updateData.data,
            });
            break;
          case 'drawers':
            updatedEntity = await ctx.prisma.drawer.update({
              where: { id: updateData.id },
              data: updateData.data,
            });
            break;
          default:
            break;
        }

        console.log(`The data for ${modelNamePlural} with id ${updateData.id} has been successfully updated`);
        updatedEntities.push(updatedEntity);
      }
    }

    return updatedEntities;
  }),


});
