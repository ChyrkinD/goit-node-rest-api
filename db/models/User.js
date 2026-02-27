import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';
import { emailRegex } from '../../constants/authConstants.js';

const User = sequelize.define('user', {
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: 'email already exist',
        },
        validate: {
            is: emailRegex,
        },
    },
    subscription: {
        type: DataTypes.ENUM,
        values: ['starter', 'pro', 'business'],
        defaultValue: 'starter',
    },
    token: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    avatarURL: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

export default User;
