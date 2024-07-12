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

    const { data } = await axios.get(`${inqoolEndpoint}/users/${id}`);
    return data;
  };

export const editUser = async (
  values: Partial<User> & { id: User['id'] }
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
