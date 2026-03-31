import { FullNameFormSchema } from '../FullNameModule.validation';

describe('FullNameFormSchema', () => {
  it('accepts valid payload', () => {
    const r = FullNameFormSchema.safeParse({
      lastName: 'Иванов',
      firstName: 'Иван',
      middleName: 'Иванович',
    });
    expect(r.success).toBe(true);
  });

  it('rejects empty required fields', () => {
    const r = FullNameFormSchema.safeParse({
      lastName: '',
      firstName: '',
    });
    expect(r.success).toBe(false);
  });
});
