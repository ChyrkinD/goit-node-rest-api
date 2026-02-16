import sequelize from './sequelize.js';

export const db_connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection successful');
    } catch (error) {
        console.log('Connection to database failed', error.message);
        process.exit(1);
    }
};
