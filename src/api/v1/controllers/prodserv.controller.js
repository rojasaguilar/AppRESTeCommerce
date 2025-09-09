import * as ProdServServices from '../services/prodServ.service.js';
import  Boom  from '@hapi/boom';

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
