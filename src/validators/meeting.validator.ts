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
        sort: joi.string().regex(/^(-)?[a-zA-Z]+$/)
        .message('Inavlid format, Only formats allowed are -yourSortField or yourSortField'),
        type: joi.alternatives(
            joi.array().items(joi.string().valid(...Object.values(EventType))),
            joi.string().valid(...Object.values(EventType))
        ),
        inviteeEmail: joi.alternatives(
            joi.array().items(joi.string().email()),
            joi.string().email()
        ),
        minStart: joi.date().iso(),
        maxEnd: joi.date().min(joi.ref('minStart')).iso(),
    })
}

export interface meetingResourceSchema extends ValidatedRequestSchema {
    [ContainerTypes.Query]: {
        pageNumber: number,
        pageSize: number,
        search: string,
        sort: string,
        type: Array<string> | string,
        inviteeEmail: Array<string> | string,
        minStart: Date,
        maxEnd: Date
    }
}