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

const profileSchema = z.object({
  displayName: z.string(),
  phoneNumber: z.string().length(9),
  openHours: scheduleSchema,
});

