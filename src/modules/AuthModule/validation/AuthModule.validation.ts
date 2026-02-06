import { z } from 'zod';

export const LoginFormSchema = z.object({
  email: z.email('Введите корректный email адрес').min(1, 'Email обязателен'),
  password: z.string().min(6, 'Пароль должен быть не менее 6 символов'),
});

export type LoginFormInputs = z.infer<typeof LoginFormSchema>;
