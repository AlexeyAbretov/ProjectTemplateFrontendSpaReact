import { z } from 'zod';

export const FullNameFormSchema = z.object({
  lastName: z.string().min(1, 'Фамилия обязательна'),
  firstName: z.string().min(1, 'Имя обязательно'),
  middleName: z.string().optional(),
});

export type FullNameFormInputs = z.infer<typeof FullNameFormSchema>;
