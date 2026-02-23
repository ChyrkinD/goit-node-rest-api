import Joi from 'joi';

export const subscriptionUpdateSchema = Joi.object({
    subscription: Joi.valid('starter', 'pro', 'business').messages({
        'string.empty': 'user subscription cannot be empty',
        'any:only': 'user subscription must be "starter", "pro" or "business"',
    }),
});
