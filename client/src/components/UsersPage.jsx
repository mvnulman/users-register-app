import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SearchSchema } from '../validation/userSchema'
import { useUsers } from '../api/userService'

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

const UsersPage = () => {
  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(SearchSchema),
  })

  const [searchName, setSearchName] = useState('')
  const usersQuery = useUsers(searchName)

  const handleSearch = ({ name }) => {
    setSearchName(name ?? '')
  }

  const handleClearSearch = () => {
    reset()
    setSearchName('')
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
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
          </div>
        </section>
      </div>
    </main>
  )
}

export default UsersPage