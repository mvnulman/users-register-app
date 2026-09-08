import { Link } from 'react-router-dom'
import UserRegistrationForm from './UserRegistrationForm'

const HomePage = () => (
  <main className="flex min-h-screen bg-slate-100 px-4 py-12 dark:bg-slate-950">
    <div className="mx-auto w-full max-w-md">
      <div className="mb-4 flex justify-end">
        <Link
          to="/usuarios"
          className="inline-flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-white dark:focus:ring-offset-slate-900"
        >
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
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Usuários cadastrados
        </Link>
      </div>

      <UserRegistrationForm />
    </div>
  </main>
)

export default HomePage