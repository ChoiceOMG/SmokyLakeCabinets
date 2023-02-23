import { router } from '../trpc';
import { authRouter } from './auth';
import { categoryRouter } from './category';
import { appointmentRouter } from './appointment';
import { projectRouter } from '@server/trpc/router/project';

export const appRouter = router({
  auth: authRouter,
  category: categoryRouter,
  appointment: appointmentRouter,
  project: projectRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
