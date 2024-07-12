export type User = {
  id: string;
  name: string;
  gender: Gender;
  banned: boolean;
};

export const genderTypes = ['female', 'male', 'other'] as const;
type Gender = 'female' | 'male' | 'other';

export type Animal = {
  id: string;
  name: string;
  type: typeof animalTypes;
  age: number;
};

export const animalTypes = ['cat', 'dog', 'other'] as const;
