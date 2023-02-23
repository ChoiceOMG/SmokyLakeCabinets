import { categoryInputs } from '@utils/input';
import { router, publicProcedure, protectedProcedure } from '../trpc';
import { z } from 'zod';

export const categoryRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.serviceCategory.findMany();
  }),
  get: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.serviceCategory.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  del: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.serviceCategory.delete({
        where: {
          id: input.id,
        },
      });
    }),

  create: protectedProcedure
    .input(categoryInputs)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.serviceCategory.create({
        data: input,
      });
    }),
  update: protectedProcedure
    .input(categoryInputs)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.serviceCategory.upsert({
        where: {
          id: input.id,
        },
        create: input,
        update: input,
      });
    }),
});
