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
    favorite: Joi.boolean().messages({
        'boolean.base': 'contacts favorite must be boolean',
    }),
});

export const updateContactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
    favorite: Joi.boolean(),
})
    .min(1)
    .messages({
        'object.min': 'Body must have at least one field',
    });

export const updateFavoriteContactSchema = Joi.object({
    favorite: Joi.boolean().required().messages({
        'any.required': 'contact favorite must be exist!',
        'boolean.base': 'contacts favorite must be boolean',
        'boolean.empty': 'contact favorite cannot be empty',
    }),
});
