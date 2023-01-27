import { serviceInputValidation, serviceUpdateValidation } from "@utils/input";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { serviceValidation } from "components/service/create";
import { z } from "zod";

export const serviceRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.service.findMany();
  }),
  get: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.service.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  count: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.service.count();
  }),
  getPaged: publicProcedure
    .input(
      z.object({
        skip: z.number().optional(),
        take: z.number().optional(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.service.findMany({
        skip: input.skip || 0,
        take: input.take || 10,
      });
    }),
  del: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.service.delete({
        where: {
          id: input.id,
        },
      });
    }),
  create: protectedProcedure
    .input(serviceInputValidation)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.service.create({
        data: input,
      });
    }),
  update: protectedProcedure
    .input(serviceUpdateValidation)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.service.update({
        where: {
          id: input.id,
        },
        data: input,
      });
    }),
});
