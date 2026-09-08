import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserSchema } from '../validation/userSchema'
import { useAddUser } from '../api/userService'

const UserRegistrationForm = () => {
  const addUser = useAddUser()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(UserSchema),
  })

  const onSubmit = (values) => {
    addUser.mutate(values, {
      onSuccess: () => {
        reset()
      },
    })
  }

  const inputClass = (hasError) =>
    `w-full rounded-lg border bg-white px-4 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 dark:bg-slate-800 dark:text-white ${
      hasError
        ? 'border-red-400 focus:border-red-500 focus:ring-red-200 dark:border-red-600'
        : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-200 dark:border-slate-700'
    }`

  return (
    <section className="h-fit rounded-2xl bg-white p-8 shadow-xl dark:bg-slate-900">
      <header className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600">
          <svg
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Cadastro de Usuários
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Preencha os dados abaixo para criar sua conta
        </p>
      </header>

      {addUser.isSuccess && (
        <div
          role="status"
          className="mb-6 rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-300"
        >
          Usuário {addUser.data?.name} cadastrado com sucesso!
        </div>
      )}

      {addUser.isError && (
        <div
          role="alert"
          className="mb-6 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-300"
        >
          {addUser.error?.message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Nome <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="Ex.: João da Silva"
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              className={inputClass(Boolean(errors.name))}
              {...register('name')}
            />
            {errors.name && (
              <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              E-mail <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="exemplo@email.com"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              className={inputClass(Boolean(errors.email))}
              {...register('email')}
            />
            {errors.email && (
              <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="age"
              className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Idade <span className="text-red-500">*</span>
            </label>
            <input
              id="age"
              type="number"
              placeholder="Ex.: 25"
              min={18}
              max={120}
              aria-invalid={Boolean(errors.age)}
              className={inputClass(Boolean(errors.age))}
              {...register('age')}
            />
            {errors.age && (
              <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                {errors.age.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || addUser.isPending}
          className="mt-8 w-full rounded-lg bg-indigo-600 px-4 py-2.5 font-semibold text-white transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus:ring-offset-slate-900"
        >
          {isSubmitting || addUser.isPending ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
    </section>
  )
}

export default UserRegistrationForm