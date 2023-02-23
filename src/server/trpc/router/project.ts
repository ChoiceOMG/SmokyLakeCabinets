import { projectInputs } from '@utils/input';
import { router, publicProcedure, protectedProcedure } from '../trpc';
import { z } from 'zod';

export const projectRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.project.findMany();
  }),
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.project.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  getForEdit: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.project.findUnique({
        where: {
          id: input.id,
        },
        include: {
          users: true,
          appointments: true,
          images: true,
        },
      });
    }),

  count: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.project.count();
  }),
  getPaged: publicProcedure
    .input(
      z.object({
        skip: z.number().optional(),
        take: z.number().optional(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.project.findMany({
        skip: input.skip || 0,
        take: input.take || 10,
        include: {
          images: true,
        },
      });
    }),
  del: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.project.delete({
        where: {
          id: input.id,
        },
      });
    }),
  // create: protectedProcedure
  //   .input(projectInputValidation)
  //   .mutation(({ ctx, input }) => {
  //     const { users, appointments, ...rest } = input;
  //     const userIds = users?.map((u) => {
  //       return {
  //         id: u,
  //       };
  //     });
  //     if (appointments === undefined) {
  //       return ctx.prisma.project.create({
  //         data: {
  //           user: {
  //             connect: userIds,
  //           },
  //           ...rest,
  //         },
  //       });
  //     } else {
  //       const appointmentIds = appointments?.map((a: string) => {
  //         return {
  //           id: a,
  //         };
  //       });
  //       return ctx.prisma.project.create({
  //         data: {
  //           user: {
  //             connect: userIds,
  //           },
  //           appointments: {
  //             connect: appointmentIds,
  //           },
  //           ...rest,
  //         },
  //       });
  //     }
  //   }),
  update: protectedProcedure.input(projectInputs).mutation(({ ctx, input }) => {
    const { id, ...rest } = input;
    return ctx.prisma.project.update({
      where: { id },
      data: {
        ...rest,
      },
    });
  }),
});
