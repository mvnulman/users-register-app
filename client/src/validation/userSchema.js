import { z } from 'zod'

export const UserSchema = z.object({
  name: z
    .string()
    .min(1, 'O nome é obrigatório.')
    .trim()
    .min(2, 'O nome deve ter pelo menos 2 caracteres.'),
  email: z
    .string()
    .min(1, 'O e-mail é obrigatório.')
    .trim()
    .email('Informe um e-mail válido.'),
  age: z.coerce
    .number({ message: 'A idade é obrigatória.' })
    .int('A idade deve ser um número inteiro.')
    .min(18, 'A idade deve estar entre 18 e 120 anos.')
    .max(120, 'A idade deve estar entre 18 e 120 anos.'),
})

export const SearchSchema = z.object({
  name: z.string().trim().optional(),
})