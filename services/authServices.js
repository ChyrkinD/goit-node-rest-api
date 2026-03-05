import path from 'node:path';
import fs from 'node:fs/promises';

import bcrypt from 'bcrypt';
import gravatar from 'gravatar';

import User from '../db/models/User.js';
import HttpError from '../helpers/HttpError.js';
import { createToken } from '../helpers/jwtToken.js';

export const findUser = where => User.findOne({ where });

export const registerUser = async payload => {
    const user = await findUser({ email: payload.email });
    if (user) throw HttpError(409, 'Email in use');
    const avatarURL = await gravatar.url(payload.email, { s: '100', r: 'x', d: 'retro' }, true);
    const hashPassword = await bcrypt.hash(payload.password, 10);
    return User.create({ ...payload, password: hashPassword, avatarURL });
};

export const loginUser = async ({ email, password }) => {
    const user = await findUser({ email });
    if (!user) throw HttpError(401, 'Email or password is wrong');
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) throw HttpError(401, 'Email or password is wrong');
    const payload = {
        id: user.id,
    };

    const token = createToken(payload);
    await user.update({ token });
    return user;
};

export const logoutUser = user => {
    return user.update({ token: null });
};

export const changeAvatar = async (user, file) => {
    let avatar = null;
    if (file) {
        const newName = `${user.email.split('@').shift()}_avatar_${file.filename}`;
        const newPath = path.resolve('public', 'avatars', newName);
        await fs.rename(file.path, newPath);
        avatar = path.join('avatars', newName);
    }

    if (user.avatarURL !== null) {
        const avatarPath = path.resolve('public', user.avatarURL);
        const isExist = await fs
            .access(avatarPath)
            .then(() => true)
            .catch(() => false);
        if (isExist) {
            const oldAvatar = path.resolve('public', user.avatarURL);
            await fs.unlink(oldAvatar);
        }
    }

    return user.update({ avatarURL: avatar });
};
