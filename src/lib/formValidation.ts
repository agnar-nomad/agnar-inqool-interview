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
  type: z.enum([...animalTypes], {
    required_error: 'You must select an animal type',
  }),
  age: z
    .string({ required_error: 'Age is required' })
    .refine((val) => !isNaN(parseInt(val)), {
      message: 'Age must be a valid number',
    })
    .transform((val) => parseInt(val))
    .refine((val) => Number.isInteger(val) && val >= 0, {
      message: 'Age cannot be a negative number',
    }),
});

export type AnimalSchemaType = z.infer<typeof AnimalSchema>;
