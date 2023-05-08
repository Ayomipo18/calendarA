import z from 'zod';

export const calendarSchema = z.object({
    query: z.object({
        date: z.coerce.date()
        .min(new Date(new Date().setHours(0,0,0,0)), { message: "Minimum date is today" })
        .optional()
    })
})