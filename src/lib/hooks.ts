import { Animal, User } from '@/types/entities';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addAnimal,
  addUser,
  deleteAnimal,
  deleteUser,
  editAnimal,
  editUser,
  getAnimal,
  getAnimals,
  getUser,
  getUsers,
  seedDatabase,
} from './api';
import { useNavigate } from 'react-router-dom';

type MutationTypes = 'delete' | 'edit' | 'create';

// Users
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });
};

export const useFetchUser = (id: User['id'] = 'null') => {
  return useQuery({
    queryKey: [`user/${id}`],
    queryFn: getUser(id),
  });
};

export const useMutateUser = (type: MutationTypes) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutFn =
    type === 'delete'
      ? deleteUser
      : type === 'edit'
      ? editUser
      : type === 'create'
      ? addUser
      : undefined;

  return useMutation({
    mutationFn: mutFn,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['users'] });
      navigate('/users');
    },
    onError: () => {
      alert('Something went wrong, please try again.');
    },
  });
};

// Animals
export const useAnimals = () => {
  return useQuery({
    queryKey: ['animals'],
    queryFn: getAnimals,
  });
};

export const useFetchAnimal = (id: Animal['id'] = 'null') => {
  return useQuery({
    queryKey: [`animal/${id}`],
    queryFn: getAnimal(id),
  });
};

export const useMutateAnimal = (type: MutationTypes) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutFn =
    type === 'delete'
      ? deleteAnimal
      : type === 'edit'
      ? editAnimal
      : type === 'create'
      ? addAnimal
      : undefined;

  return useMutation({
    mutationFn: mutFn,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['animals'] });
      navigate('/animals');
    },
    onError: () => {
      alert('Something went wrong, please try again.');
    },
  });
};

// SeedDB
export const useSeedDb = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: seedDatabase,
    onSuccess: () => {
      // Invalidate and refetch everything
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['animals'] });
      // navigate('/animals');
    },
    onError: () => {
      alert('Something went wrong, please try again.');
    },
  });
};
