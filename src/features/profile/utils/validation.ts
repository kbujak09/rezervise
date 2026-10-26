import * as z from 'zod';

const daySchema = z.object({
  isOpen: z.boolean().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
})

const scheduleSchema = z.object({
  poniedziałek: daySchema,
  wtorek: daySchema,
  środa: daySchema,
  czwartek: daySchema,
  piątek: daySchema,
  sobota: daySchema,
  niedziela: daySchema,
}).partial();

export const profileSchema = z.object({
  displayName: z.string(),
  phoneNumber: z.string().length(9),
  schedule: scheduleSchema,
});

export type ProfileData = z.infer<typeof profileSchema>;

export function validateProfileData(data: unknown) {
  return profileSchema.safeParse(data);
}