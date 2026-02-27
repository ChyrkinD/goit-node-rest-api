import Joi from 'joi';
import { emailRegex } from '../constants/authConstants.js';

export const authRegisterSchema = Joi.object({
    email: Joi.string().regex(emailRegex).required().messages({
        'any.required': 'user email must be exist!',
        'string.base': 'user email must be string',
        'string.pattern.base': 'user email must contain "@"',
        'string.empty': 'user email cannot be empty',
    }),
    password: Joi.string().min(8).required().messages({
        'any.required': 'user password must be exist!',
        'string.base': 'user password must be string',
        'string.empty': 'user password cannot be empty',
    }),
});

export const authLoginSchema = Joi.object({
    email: Joi.string().regex(emailRegex).required().messages({
        'any.required': 'user email must be exist!',
        'string.base': 'user email must be string',
        'string.pattern.base': 'user email must contain "@"',
        'string.empty': 'user email cannot be empty',
    }),
    password: Joi.string().min(8).required().messages({
        'any.required': 'user password must be exist!',
        'string.base': 'user password must be string',
        'string.empty': 'user password cannot be empty',
    }),
});
