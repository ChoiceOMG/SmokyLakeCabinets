import { z } from 'zod';
import type Project from '@prisma/client';
import type { Image, User, Appointment } from '@prisma/client';

// this is a zod schema for validating an Image object
export const imageInputs = z.object({
  id: z.string().optional(),
  url: z.string(),
  projectId: z.string().nullable(),
});
export type ImageInput = z.infer<typeof imageInputs>;

// this is a zod schema for validating an User object
export const userInputs = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  emailVerified: z.date().optional(),
  phone: z.string().optional(),
  phoneVerified: z.date().optional(),
  password: z.string().optional(),
  role: z.string().optional(),
  image: z.string().optional(),
  projects: z.array(z.string()).optional(),
  appointments: z.array(z.string()).optional(),
});
export type UserInput = z.infer<typeof userInputs>;

// this is a zod schema for validating an Appointment object
export const appointmentInputs = z.object({
  id: z.string().optional(),
  preferredDate: z.date().optional(),
  createdAt: z.date().optional(),
  actualDate: z.date().optional(),
  estimatedDuration: z.number().optional(),
  actualDuration: z.number().optional(),
  cancelled: z.boolean().optional(),
  completed: z.boolean().optional(),
  materialsCost: z.number().optional(),
  laborCost: z.number().optional(),
  projectId: z.string().optional(),
});
export type AppointmentInput = z.infer<typeof appointmentInputs>;

export const projectInputs = z.object({
  id: z.string().optional(),
  name: z.string().min(1).max(50),
  description: z.string(),
  slug: z.string(),
  // images: z.array(imageInputs).optional(),
  // users: z.array(userInputs).optional(),
  // appointments: z.array(appointmentInputs).optional(),
});
export type ProjectInput = z.infer<typeof projectInputs>;

export const categoryInputs = z.object({
  id: z.number(),
  categoryName: z.string().min(1).max(50),
  categoryDescription: z.string(),
});
export type CategoryInput = z.infer<typeof categoryInputs>;

// Refactor below this line so that it uses less input objects and then move above this line when done.

export const serviceInputValidation = z.object({
  serviceName: z.string().min(3, { message: 'min 3 characters' }),
  serviceDescription: z.string(),
  timeRequired: z.number().default(0),
  categoryId: z.number(),
});
export type CreateServiceInput = z.infer<typeof serviceInputValidation>;

export const serviceUpdateValidation = z.object({
  id: z.number(),
  serviceName: z.string().min(3, { message: 'min 3 characters' }),
  serviceDescription: z.string(),
  timeRequired: z.number().default(0),
  categoryId: z.number(),
});
export type UpdateServiceInput = z.infer<typeof serviceUpdateValidation>;

export const appointmentInputValidation = z.object({
  preferredDate: z.date(),
  createdAt: z.date().nullable(),
  actualDate: z.date().nullable(),
  estimatedDuration: z.number().nullable(),
  actualDuration: z.number().nullable(),
  cancelled: z.boolean().nullable(),
  completed: z.boolean().nullable(),
  materialsCost: z.number().nullable(),
  laborCost: z.number().nullable(),
  connectProjectName: z.string(),
  connectServiceIds: z.array(z.number()).min(1, { message: 'min 1 service' }),
});
export type CreateAppointmentInput = z.infer<typeof appointmentInputValidation>;

export const appointmentUpdateValidation = z.object({
  id: z.string(),
  preferredDate: z.date(),
  actualDate: z.date().nullable(),
  estimatedDuration: z.number().nullable(),
  actualDuration: z.number().nullable(),
  cancelled: z.boolean().nullable(),
  completed: z.boolean().nullable(),
  materialsCost: z.number().nullable(),
  laborCost: z.number().nullable(),
  projectId: z.string().optional(),
  connectServiceIds: z.array(z.number()).min(1, { message: 'min 1 service' }),
});
export type UpdateAppointmentInput = z.infer<
  typeof appointmentUpdateValidation
>;
