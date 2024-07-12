import { User } from '@/types/entities';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addUser, deleteUser, editUser, getUser, getUsers } from './api';
import { useNavigate } from 'react-router-dom';

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

type UserMutationType = 'delete' | 'edit' | 'create';
export const useMutateUser = (type: UserMutationType) => {
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

  console.log('type is', type, 'fn is', mutFn);

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
