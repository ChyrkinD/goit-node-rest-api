import Contact from '../db/models/Contact.js';

export const listContacts = () => Contact.findAll();

export const getContactById = id => Contact.findByPk(id);

export const addContact = data => Contact.create(data);

export const updateContact = async (id, data) => {
    const contact = await getContactById(id);
    if (!contact) return null;
    await contact.update(data);
    return contact;
};

export const updateStatus = async (id, { favorite }) => {
    const contact = await getContactById(id);
    if (!contact) return null;
    contact.favorite = favorite;
    await contact.save();
    return contact;
};

export const removeContact = async id => {
    const contact = await getContactById(id);
    if (!contact) return null;
    contact.destroy();
    return contact;
};
