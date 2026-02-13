import Joi from 'joi';

export const createContactSchema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'contact name must be exist!',
        'string.base': 'contacts name must be string',
        'string.empty': 'contact name cannot be empty',
    }),
    email: Joi.string().required().messages({
        'any.required': 'contact email must be exist!',
        'string.base': 'contacts email must be string',
        'string.empty': 'contact email cannot be empty',
    }),
    phone: Joi.string().required().messages({
        'any.required': 'contact phone must be exist!',
        'string.base': 'contacts phone must be string',
        'string.empty': 'contact phone cannot be empty',
    }),
});

export const updateContactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
})
    .min(1)
    .messages({
        'object.min': 'Body must have at least one field',
    });
