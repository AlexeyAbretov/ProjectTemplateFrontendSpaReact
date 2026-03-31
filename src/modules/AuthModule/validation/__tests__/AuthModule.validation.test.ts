import { LoginFormSchema } from '../AuthModule.validation';

describe('LoginFormSchema', () => {
  it('accepts valid credentials', () => {
    const r = LoginFormSchema.safeParse({
      email: 'user@example.com',
      password: 'secret12',
    });
    expect(r.success).toBe(true);
  });

  it('rejects invalid email', () => {
    const r = LoginFormSchema.safeParse({
      email: 'not-an-email',
      password: 'secret12',
    });
    expect(r.success).toBe(false);
  });

  it('rejects short password', () => {
    const r = LoginFormSchema.safeParse({
      email: 'user@example.com',
      password: '12345',
    });
    expect(r.success).toBe(false);
  });
});
