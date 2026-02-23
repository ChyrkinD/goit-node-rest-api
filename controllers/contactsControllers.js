import * as contactsService from '../services/contactsServices.js';

import HttpError from '../helpers/HttpError.js';

export const getAllContacts = async (req, res) => {
    const { offset, limit, favorite } = req.query;
    const { id: owner } = req.user;
    const contacts = await contactsService.listContacts({ owner, favorite }, limit, offset);
    res.json(contacts);
};

export const getOneContact = async (req, res) => {
    const { id: owner } = req.user;
    const { id } = req.params;
    const result = await contactsService.getContact({ id, owner });
    if (!result) throw HttpError(404, `Contact with id=${id} not found`);
    res.json(result);
};

export const deleteContact = async (req, res) => {
    const { id: owner } = req.user;
    const { id } = req.params;
    const result = await contactsService.removeContact({ id, owner });
    if (!result) throw HttpError(404, `Contact with id=${id} not found.`);
    res.json(result);
};

export const createContact = async (req, res) => {
    const { id: owner } = req.user;
    const result = await contactsService.addContact({ ...req.body, owner });
    res.status(201).json(result);
};

export const updateContact = async (req, res) => {
    const { id: owner } = req.user;
    const { id } = req.params;
    const result = await contactsService.updateContact({ id, owner }, req.body);
    if (!result) throw HttpError(404, `Contact with id=${id} not found.`);
    res.json(result);
};

export const updateStatusContact = async (req, res) => {
    const { id: owner } = req.user;
    const { id } = req.params;
    const result = await contactsService.updateStatus({ id, owner }, req.body);
    if (!result) throw HttpError(404, `Contact with id=${id} not found.`);
    res.json(result);
};
