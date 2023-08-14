import { publicProcedure, t } from '$lib/trpc/t';
import { z } from 'zod';
const signupInput = z.object({ email: z.string().email(), password: z.string().min(6, 'Password must be longer than 6 characters') });
const loginSchema = z.object({ email: z.string().email(), password: z.string().min(6, 'Password must be longer than 6 characters') });

export const authRouter = t.router({
});
