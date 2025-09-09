import ProdServ from '../models/ProdServ.js';
import Boom from '@hapi/boom';

export const getProdServList = async () => {
  let prodServList;
  try {
    prodServList = await ProdServ.find();
    return prodServList;
  } catch (error) {
    throw Boom.internal(error);
  }
};

export const getProdServItem = async (id, keyType) => {
  let prodServItem;
  try {
    if (keyType === 'OK') {
      prodServItem = await ProdServ.findOne({
        IdProdServOK: id,
      });
    } else if (keyType === 'BK') {
      prodServItem = await ProdServ.findOne({
        IdProdServBK: id,
      });
    }
    return prodServItem;
  } catch (error) {
    throw Boom.internal(error);
  }
};

// export const postProdServItem = async (paProdServItem) => {
//   try {
//     const newProdServItem = new ProdServ(paProdServItem);
//     return await newProdServItem.save();
//   } catch (error) {
//     throw error;
//   }
// };
