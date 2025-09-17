import * as ProdServServices from '../services/prodServ.service.js';
import Boom from '@hapi/boom';

export const getProdServList = async (req, res, next) => {
  try {
    const prodServList = await ProdServServices.getProdServList();
    if (!prodServList) {
      throw Boom.notFound('No se encontraron productos/servicios registrados.');
    } else if (prodServList) {
      return res.status(200).json(prodServList);
    }
  } catch (error) {
    next(error);
  }
};

export const getProdServItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const keyType = req.query.keyType || 'OK';
    const prodServItem = await ProdServServices.getProdServItem(id, keyType);
    if (!prodServItem) {
      throw Boom.notFound('No se encontraron productos/servicios registrados.');
    } else if (prodServItem) {
      return res.status(200).json(prodServItem);
    }
  } catch (error) {
    next(error);
  }
};

export const postProdServItem = async (req, res, next) => {
  try {
    const paProdServItem = req.body;
    const newProdServItem = await ProdServServices.postProdServItem(
      paProdServItem
    );
    if (!newProdServItem) {
      throw Boom.badRequest('No se pudo crear el Prodycto y/o Servicio');
    } else if (newProdServItem) {
      return res.status(201).json(newProdServItem);
    }
  } catch (error) {}
};

export const putProdServItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log('FIC: controller id -> ', id);
    const ProdServItem = req.body;
    console.log('FIC: controller body -> ', ProdServItem);
    const updatedProdServItem = await ProdServServices.putProdServItem(
      id,
      ProdServItem
    );
    if (!updatedProdServItem) {
      throw Boom.badRequest('No se pudo actualizar el producto o servicio.');
    } else if (updatedProdServItem) {
      res.status(200).json(updatedProdServItem);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteProdServItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log('FIC: controller id -> ', id);

    const deletedProdServItem = await ProdServServices.deleteProdServItem(id);
    if (!deletedProdServItem) {
      throw Boom.badRequest('No se pudo borrar el producto o servicio.');
    } else if (deletedProdServItem) {
      res.status(200).json(deletedProdServItem);
    }
  } catch (error) {
    next(error);
  }
};
