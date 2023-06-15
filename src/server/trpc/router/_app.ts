import { router } from '../trpc';
import { authRouter } from './auth';
import { categoryRouter } from './category';
import { appointmentRouter } from './appointment';
import { projectRouter } from '@server/trpc/router/project';
import {kitchenQuestionsRouter} from '@server/trpc/router/kitchenQuestions'
export const appRouter = router({
  auth: authRouter,
  category: categoryRouter,
  appointment: appointmentRouter,
  project: projectRouter,
  kitchenQuestions: kitchenQuestionsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
