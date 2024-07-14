export const genderTypes = ['female', 'male', 'other'] as const;
type Gender = 'female' | 'male' | 'other';
// had to do it separately because zod and TS were fighting over what is correct for validation

export type User = {
  id: string;
  name: string;
  gender: Gender;
  banned: boolean;
};

export const animalTypes = ['cat', 'dog', 'other'] as const;
type AnimalType = 'cat' | 'dog' | 'other';

export type Animal = {
  id: string;
  name: string;
  type: AnimalType;
  age: number;
};
