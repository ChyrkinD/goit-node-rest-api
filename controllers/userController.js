import { changeSubscription } from '../services/userServices.js';

export const changeSubscriptionController = async (req, res) => {
    const { subscription } = req.body;
    const updatedUser = await changeSubscription(req.user, subscription);
    res.json({
        email: updatedUser.email,
        subscription: updatedUser.subscription,
    });
};
