import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SearchSchema } from '../validation/userSchema'
import { useDeleteUser, useUsers } from '../api/userService'

const BackIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11 17l-5-5m0 0l5-5m-5 5h12"
    />
  </svg>
)

const TrashIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
)

const UsersPage = () => {
  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(SearchSchema),
  })

  const [searchName, setSearchName] = useState('')
  const [userToDelete, setUserToDelete] = useState(null)
  const usersQuery = useUsers(searchName)
  const deleteUser = useDeleteUser()

  const handleSearch = ({ name }) => {
    setSearchName(name ?? '')
  }

  const handleClearSearch = () => {
    reset()
    setSearchName('')
  }

  const handleCloseModal = () => {
    if (!deleteUser.isPending) {
      setUserToDelete(null)
    }
  }

  const handleConfirmDelete = () => {
    if (userToDelete) {
      deleteUser.mutate(userToDelete.id, {
        onSettled: handleCloseModal,
      })
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-12 dark:bg-slate-950">
      <div className="mx-auto w-full max-w-5xl">
        <header className="mb-8 flex items-center gap-4">
          <Link
            to="/"
            aria-label="Voltar para o cadastro"
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-white dark:focus:ring-offset-slate-900"
          >
            <BackIcon />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Usuários cadastrados
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {usersQuery.data?.length ??
                (usersQuery.isPending
                  ? 'Carregando...'
                  : 'Consulte os usuários do sistema')}{' '}
              {usersQuery.data?.length
                ? `usuário${usersQuery.data.length > 1 ? 's' : ''} encontrado${
                    usersQuery.data.length > 1 ? 's' : ''
                  }`
                : ''}
            </p>
          </div>
        </header>

        <section className="rounded-2xl bg-white p-8 shadow-xl dark:bg-slate-900">
          <form
            onSubmit={handleSubmit(handleSearch)}
            noValidate
            className="flex gap-2"
          >
            <input
              type="text"
              placeholder="Buscar por nome..."
              aria-label="Buscar por nome"
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              {...register('name')}
            />
            <button
              type="submit"
              className="shrink-0 rounded-lg bg-indigo-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
              Buscar
            </button>
          </form>

{searchName && (
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">
                  Filtro ativo: {searchName}
                </span>
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  Limpar busca
                </button>
              </div>
            )}

            {deleteUser.isSuccess && (
              <div
                role="status"
                className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-300"
              >
                <span>Usuário removido com sucesso!</span>
                <button
                  type="button"
                  onClick={deleteUser.reset}
                  className="font-semibold underline hover:no-underline"
                >
                  Fechar
                </button>
              </div>
            )}

            {deleteUser.isError && (
              <div
                role="alert"
                className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-300"
              >
                <span>{deleteUser.error?.message}</span>
                <button
                  type="button"
                  onClick={deleteUser.reset}
                  className="font-semibold underline hover:no-underline"
                >
                  Fechar
                </button>
              </div>
            )}

          <div className="mt-6">
            {usersQuery.isPending && (
              <p className="py-16 text-center text-slate-500 dark:text-slate-400">
                Carregando usuários...
              </p>
            )}

            {usersQuery.isError && (
              <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-300">
                <p>{usersQuery.error?.message}</p>
                <button
                  type="button"
                  onClick={usersQuery.refetch}
                  className="mt-2 font-semibold underline"
                >
                  Tentar novamente
                </button>
              </div>
            )}

            {usersQuery.isSuccess &&
              (usersQuery.data.length === 0 ? (
                <p className="rounded-lg bg-slate-50 px-4 py-16 text-center text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  {searchName
                    ? 'Nenhum usuário encontrado para esta busca.'
                    : 'Nenhum usuário cadastrado até o momento.'}
                </p>
              ) : (
                <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
                      <tr>
                        <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-200">
                          Nome
                        </th>
                        <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-200">
                          E-mail
                        </th>
                        <th className="px-4 py-3 text-right font-semibold text-slate-700 dark:text-slate-200">
                          Idade
                        </th>
                        <th className="px-4 py-3 text-right font-semibold text-slate-700 dark:text-slate-200">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                      {usersQuery.data.map((user) => (
                        <tr
                          key={user.id}
                          className="transition hover:bg-slate-50 dark:hover:bg-slate-800"
                        >
                          <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
                            {user.name}
                          </td>
                          <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                            {user.email}
                          </td>
                          <td className="px-4 py-3 text-right text-slate-600 dark:text-slate-300">
                            {user.age} anos
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button
                              type="button"
                              onClick={() => setUserToDelete(user)}
                              disabled={deleteUser.isPending}
                              aria-label={`Remover usuário ${user.name}`}
                              title={`Remover usuário ${user.name}`}
                              className="inline-flex cursor-pointer items-center justify-center rounded-lg p-2 text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-300 disabled:cursor-not-allowed disabled:opacity-50 dark:text-red-400 dark:hover:bg-red-950"
                            >
                              <TrashIcon />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
          </div>
        </section>

        {userToDelete && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-delete-title"
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"
          >
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900">
              <h2
                id="confirm-delete-title"
                className="text-lg font-bold text-slate-900 dark:text-white"
              >
                Remover usuário
              </h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Tem certeza que deseja excluir{' '}
                <span className="font-semibold text-slate-900 dark:text-white">
                  {userToDelete.name}
                </span>
                ? Esta ação não pode ser desfeita.
              </p>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={deleteUser.isPending}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  disabled={deleteUser.isPending}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {deleteUser.isPending ? 'Excluindo...' : 'Excluir'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default UsersPage