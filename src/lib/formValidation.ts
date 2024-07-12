import { animalTypes, genderTypes } from '@/types/entities';
import { z } from 'zod';

export const UserSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .trim()
    .min(1, { message: 'Name is required' }),
  // min(1) is needed because zod will parse empty strings as valid
  gender: z.enum([...genderTypes], {
    required_error: 'You must select a gender option',
  }),
  banned: z.boolean(),
});

export type UserSchemaType = z.infer<typeof UserSchema>;

export const AnimalSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .trim()
    .min(1, { message: 'Name is required' }),
  // min(1) is needed because zod will parse empty strings as valid
  type: z.enum(animalTypes),
  age: z
    .number({ required_error: 'Age is required' })
    .min(1, { message: 'Age cannot be less than one' }),
});

export type AnimalSchemaType = z.infer<typeof AnimalSchema>;
