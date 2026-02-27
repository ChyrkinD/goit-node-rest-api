import * as authServices from '../services/authServices.js';

export const registerController = async (req, res) => {
    const newUser = await authServices.registerUser(req.body);
    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
        },
    });
};

export const loginController = async (req, res) => {
    const user = await authServices.loginUser(req.body);
    res.json({
        token: user.token,
        user: {
            email: user.email,
            subscription: user.subscription,
        },
    });
};

export const currentController = async (req, res) => {
    const { email, subscription } = req.user;
    res.json({ email, subscription });
};

export const logoutController = async (req, res) => {
    const user = await authServices.logoutUser(req.user);
    res.status(204).send();
};
