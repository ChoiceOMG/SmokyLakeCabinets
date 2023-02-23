import { router, publicProcedure, protectedProcedure } from '../trpc';
import { z } from 'zod';
import {
  appointmentInputValidation,
  appointmentUpdateValidation,
} from '@utils/input';

export const appointmentRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.appointment.findMany();
  }),
  count: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.appointment.count();
  }),
  getPaged: protectedProcedure
    .input(
      z.object({
        skip: z.number().optional(),
        take: z.number().optional(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.appointment.findMany({
        skip: input.skip || 0,
        take: input.take || 10,
      });
    }),
  getDates: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.appointment.findMany({
      where: {
        AND: [
          { completed: undefined || false },
          { cancelled: undefined || false },
        ],
      },
      select: {
        actualDate: true,
      },
    });
  }),
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.appointment.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  del: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.appointment.delete({
        where: {
          id: input.id,
        },
      });
    }),
  delMany: protectedProcedure
    .input(z.array(z.object({ id: z.string() })))
    .mutation(async ({ ctx, input }) => {
      const ids: string[] = input.map((id) => id.id);

      return ctx.prisma.appointment.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });
    }),
  update: protectedProcedure
    .input(appointmentUpdateValidation)
    .mutation(({ ctx, input }) => {
      const { projectId, connectServiceIds, ...rest } = input;

      return ctx.prisma.appointment.create({
        data: {
          ...rest,
          services: {
            connect: connectServiceIds.map((connectServiceId) => ({
              id: connectServiceId,
            })),
          },
          project: {
            connect: {
              id: projectId,
            },
          },
        },
      });
    }),

  create: protectedProcedure
    .input(appointmentInputValidation)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.appointment.create({
        data: {
          ...input,
          services: {
            connect: input.connectServiceIds.map((connectServiceId) => ({
              id: connectServiceId,
            })),
          },
          project: {
            connect: {
              id: input.connectProjectName,
            },
          },
        },
      });
    }),
});
