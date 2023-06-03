import joi from 'joi';
import {
    ContainerTypes,
    ValidatedRequestSchema
} from 'express-joi-validation'

export const authValidator = {
    refreshTokenSchema: joi.object({
        accessToken: joi.string().required(),
        refreshToken: joi.string().required()
    })
}

export interface refreshTokenSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {accessToken: string, refreshToken: string}
}