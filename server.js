import 'dotenv/config';
import { db_connection } from './db/db_connection.js';
import app from './app.js';

await db_connection();

app.listen(3000, () => {
    console.log('Server is running. Use our API on port: 3000');
});
