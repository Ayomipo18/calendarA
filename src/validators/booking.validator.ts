import joi from 'joi';
import {
    ContainerTypes,
    ValidatedRequestSchema
} from 'express-joi-validation'

export const bookingValidator = {
    getAvailabilitySchema: joi.object({
        date: joi.date().iso()
    }),
    eventIdParamsSchema: joi.object({
        eventId: joi.string().hex().length(24).message('Must be a valid Id')
    }),
    addUserSchema: joi.object({
        email: joi.string().email().required(),
        name: joi.string().required(),
        date: joi.date().min(new Date().setHours(0,0,0,0)).iso().required(),
        startTime: joi.date().iso().required()
    })
}

export interface getAvailabilitySchema extends ValidatedRequestSchema {
    [ContainerTypes.Query]: {date: Date},
    [ContainerTypes.Params]: {eventId: string}
}

export interface addUserSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {email: string, name: string, date: Date, startTime: Date},
    [ContainerTypes.Params]: {eventId: string}
}