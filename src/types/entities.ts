export type User = {
  id: string;
  name: string;
  gender: 'female' | 'male' | 'other';
  banned: boolean;
};

export type Animal = {
  id: string;
  name: string;
  type: 'cat' | 'dog' | 'other';
  age: number;
};
