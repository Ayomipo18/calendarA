import joi from 'joi';
import {
    ContainerTypes,
    ValidatedRequestSchema
} from 'express-joi-validation'
import { EventType, event } from '../helpers/constants';

export const eventValidator = {
    eventResourceSchema: joi.object({
        pageNumber: joi.number().min(1),
        pageSize: joi.number().min(1),
        search: joi.string(),
        sort: joi.string().regex(/^(-)?[a-zA-Z]+$/)
        .message('Inavlid format, Only formats allowed are -yourSortField or yourSortField'),
        type: joi.array().items(joi.string().valid(...Object.values(EventType)))
    }),
    createEventSchema: joi.object({
        durationInMins: joi.number().min(1).max(event.maxDurationInMins).required(),
        startTime: joi.date().iso().required(),
        endTime: joi.date().min(joi.ref('startTime')).iso().required(),
        type: joi.string().valid(...Object.values(EventType)).required(),
        intervalBreak: joi.number().min(0).max(event.maxIntervalBreak).required(),
        summary: joi.string().required(),
        description: joi.string().required(),
        slug: joi.string().required()
    }),
    idParamsSchema: joi.object({
        id: joi.string().hex().length(24).message('Must be a valid Id')
    }),
}

export interface eventResourceSchema extends ValidatedRequestSchema {
    [ContainerTypes.Query]: {
        pageNumber: number,
        pageSize: number,
        search: string,
        sort: string,
        type: Array<string>
    }
}

export interface createEventSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        durationInMins: number,
        intervalBreak: number,
        startTime: Date,
        endTime: Date,
        type: string,
        summary: string,
        description: string,
        slug: string,
    }
}

export interface updateEventSchema extends createEventSchema{
    [ContainerTypes.Params]: {id: string}
};

export interface getEventSchema extends ValidatedRequestSchema{
    [ContainerTypes.Params]: {id: string}
};