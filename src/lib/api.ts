import { Animal, User } from '@/types/entities';
import axios from 'axios';
import { inqoolEndpoint } from './config';

// Users
export const getUsers = async (): Promise<Array<User>> => {
  const { data } = await axios.get(`${inqoolEndpoint}/users`);
  return data;
};

export const getUser =
  (id: User['id'] | 'null') => async (): Promise<User | null> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    if (id === 'null') return new Promise((res, _) => res(null));
    // we use this when we navigate to users/new

    // we use this when we navigate to users/:id
    const { data } = await axios.get(`${inqoolEndpoint}/users/${id}`);
    return data;
  };

export const editUser = async (
  values: Partial<User> & { id: User['id'] } // any User field can be provided but ID is a must
): Promise<User> => {
  const { id, ...rest } = values;
  const { data } = await axios.patch(`${inqoolEndpoint}/users/${id}`, {
    ...rest,
  });

  return data;
};

export const addUser = async (values: Partial<User>): Promise<User> => {
  const { data } = await axios.post(`${inqoolEndpoint}/users`, {
    ...values,
  });

  return data;
};

export const deleteUser = async ({ id }: { id: User['id'] }): Promise<User> => {
  const { data } = await axios.delete(`${inqoolEndpoint}/users/${id}`);
  return data;
};

// Animals

export const getAnimals = async (): Promise<Array<Animal>> => {
  const { data } = await axios.get(`${inqoolEndpoint}/animals`);
  return data;
};

export const getAnimal =
  (id: Animal['id'] | 'null') => async (): Promise<Animal | null> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    if (id === 'null') return new Promise((res, _) => res(null));
    // we use this when we navigate to animals/new

    // we use this when we navigate to animals/:id
    const { data } = await axios.get(`${inqoolEndpoint}/animals/${id}`);
    return data;
  };

export const editAnimal = async (
  values: Partial<Animal> & { id: Animal['id'] } // any Animal field can be provided but ID is a must
): Promise<Animal> => {
  const { id, ...rest } = values;
  const { data } = await axios.patch(`${inqoolEndpoint}/animals/${id}`, {
    ...rest,
  });

  return data;
};

export const addAnimal = async (values: Partial<Animal>): Promise<Animal> => {
  const { data } = await axios.post(`${inqoolEndpoint}/animals`, {
    ...values,
  });

  return data;
};

export const deleteAnimal = async ({
  id,
}: {
  id: Animal['id'];
}): Promise<Animal> => {
  const { data } = await axios.delete(`${inqoolEndpoint}/animals/${id}`);
  return data;
};

// SEED

export const seedDatabase = async () => {
  const { data } = await axios.post(`${inqoolEndpoint}/seed`);

  return data;
};
