import express from 'express';
import {
    getAllContacts,
    getOneContact,
    deleteContact,
    createContact,
    updateContact,
    updateStatusContact,
} from '../controllers/contactsControllers.js';
import validateBody from '../helpers/validateBody.js';
import validateQuery from '../helpers/validateQuery.js';
import {
    createContactSchema,
    updateContactSchema,
    updateFavoriteContactSchema,
    getContactsSchema,
} from '../schemas/contactsSchemas.js';
import authenticate from '../middlewares/authenticate.js';

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', validateQuery(getContactsSchema), getAllContacts);

contactsRouter.get('/:id', getOneContact);

contactsRouter.delete('/:id', deleteContact);

contactsRouter.post('/', validateBody(createContactSchema), createContact);

contactsRouter.put('/:id', validateBody(updateContactSchema), updateContact);

contactsRouter.patch('/:id/favorite', validateBody(updateFavoriteContactSchema), updateStatusContact);

export default contactsRouter;
