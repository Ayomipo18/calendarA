import z from 'zod';

export const calendarSchema = z.object({
    query: z.object({
        date: z.coerce.date()
        .optional()
    })
})