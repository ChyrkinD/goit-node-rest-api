import Contact from '../db/models/Contact.js';

export const listContacts = (where, limit = 10, offset = 0) => {
    if (where.favorite === undefined) {
        delete where.favorite;
    }
    return Contact.findAll({ where, limit, offset });
};

export const getContact = where => Contact.findOne({ where });

export const addContact = data => Contact.create(data);

export const updateContact = async (where, data) => {
    const contact = await getContact(where);
    if (!contact) return null;
    await contact.update(data);
    return contact;
};

export const updateStatus = async (where, { favorite }) => {
    const contact = await getContact(where);
    if (!contact) return null;
    contact.favorite = favorite;
    await contact.save();
    return contact;
};

export const removeContact = async where => {
    const contact = await getContact(where);
    if (!contact) return null;
    contact.destroy();
    return contact;
};
