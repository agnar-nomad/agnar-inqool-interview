import { Animal, User } from '@/types/entities';
import axios from 'axios';
import { inqoolEndpoint } from './config';

export const getUsers = async (): Promise<Array<User>> => {
  const { data } = await axios.get(`${inqoolEndpoint}/users`);
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

export const deleteUser = async ({ id }: { id: User['id'] }): Promise<User> => {
  const { data } = await axios.delete(`${inqoolEndpoint}/users/${id}`);
  return data;
};

export const getAnimals = async (): Promise<Array<Animal>> => {
  const { data } = await axios.get(`${inqoolEndpoint}/animals`);
  return data;
};
