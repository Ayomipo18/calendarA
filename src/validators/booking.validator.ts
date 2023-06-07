import joi from 'joi';
import {
    ContainerTypes,
    ValidatedRequestSchema
} from 'express-joi-validation'

export const bookingValidator = {
    getAvailabilitySchema: joi.object({
        date: joi.date().iso()
    }),
    addInviteeSchema: joi.object({
        email: joi.string().email().required(),
        name: joi.string().required(),
        start: joi.date().min(new Date().setHours(0,0,0,0)).iso().required()
    })
}

export interface getAvailabilitySchema extends ValidatedRequestSchema {
    [ContainerTypes.Query]: {date: Date},
    [ContainerTypes.Params]: {eventId: string}
}

export interface addInviteeSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {email: string, name: string, start: Date},
    [ContainerTypes.Params]: {eventId: string}
}