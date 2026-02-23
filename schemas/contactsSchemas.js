import Joi from 'joi';

// shemas for BODY validation
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

// shemas for QUERY validation
export const getContactsSchema = Joi.object({
    limit: Joi.number().min(1).messages({
        'number.base': 'limit must be number',
        'number.min': 'limit must be greater then 0',
    }),
    offset: Joi.number().min(0).messages({
        'number.base': 'offset must be number',
        'number.min': 'offset must be 0 or greater ',
    }),
    favorite: Joi.valid('true', 'false').messages({
        'string.empty': 'favorite cannot be empty',
        'any:only': 'favorite must be "true" or "false"',
    }),
});
