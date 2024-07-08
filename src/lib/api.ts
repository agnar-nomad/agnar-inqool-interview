import { Animal, User } from '@/types/entities';
import axios from 'axios';
import { inqoolEndpoint } from './config';

export const getUsers = async (): Promise<Array<User>> => {
  const { data } = await axios.get(`${inqoolEndpoint}/users`);
  return data;
};
export const getAnimals = async (): Promise<Array<Animal>> => {
  const { data } = await axios.get(`${inqoolEndpoint}/animals`);
  return data;
};
