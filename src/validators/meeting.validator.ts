import joi from 'joi';
import {
    ContainerTypes,
    ValidatedRequestSchema
} from 'express-joi-validation'
import { EventType } from '../helpers/constants';

export const meetingValidator = {
    meetingResourceSchema: joi.object({
        pageNumber: joi.number().min(1),
        pageSize: joi.number().min(1),
        search: joi.string(),
        sort: joi.string().regex(/^(-)?[a-z]+$/)
        .message('Inavlid format, Only formats allowed are -yourSortValue or yourSortValue'),
        type: joi.array().items(joi.string().valid(...Object.values(EventType))),
        summary: joi.string(),
        description: joi.string(),
        inviteeEmail: joi.array().items(joi.string().email()),
        minStart: joi.date().iso(),
        maxEnd: joi.date().iso()
    })
}

export interface meetingResourceSchema extends ValidatedRequestSchema {
    [ContainerTypes.Query]: {
        pageNumber: number,
        pageSize: number,
        search: string,
        sort: string,
        type: Array<string>,
        summary: string,
        description: string,
        inviteeEmail: Array<string>,
        minStart: Date,
        maxEnd: Date
    }
}