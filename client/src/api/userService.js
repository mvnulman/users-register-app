import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const API_URL = import.meta.env.VITE_API_URL ?? ''

const createUser = async (payload) => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(
      data.message ?? 'Não foi possível cadastrar o usuário. Tente novamente.',
    )
  }

  return data
}

const fetchUsers = async (name = '') => {
  const query = name.trim() ? `?name=${encodeURIComponent(name.trim())}` : ''
  const response = await fetch(`${API_URL}/users${query}`)

  if (!response.ok) {
    throw new Error('Não foi possível carregar a lista de usuários.')
  }

  return response.json()
}

const useAddUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

const useUsers = (name = '') =>
  useQuery({
    queryKey: ['users', name],
    queryFn: () => fetchUsers(name),
  })

export { useAddUser, useUsers }