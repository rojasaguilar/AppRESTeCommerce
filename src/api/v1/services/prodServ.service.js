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

//POST

export const postProdServItem = async (paProdServItem) => {
  try {
    const newProdServItem = new ProdServ(paProdServItem);
    return await newProdServItem.save();
  } catch (error) {
    throw error;
  }
};

//PUT

export const putProdServItem = async (id, paProdServItem) => {
  try {
    //console.log("FIC: PUT API INSTITUTO", id);
    return await ProdServ.findOneAndUpdate(
      { IdProdServOK: id },
      paProdServItem,
      {
        new: true,
      }
    );
  } catch (error) {
    throw Boom.badImplementation(error);
  }
};

//DELETE
export const deleteProdServItem = async (id) => {
  try {
    //console.log("FIC: PUT API INSTITUTO", id);
    return await ProdServ.findOneAndDelete({ IdProdServOK: id });
  } catch (error) {
    throw Boom.badImplementation(error);
  }
};

//FIC: UPDATE ARRAY[OBJECT] INFO ADICIONAL NO EXPORT USE INTERNAL
const setObjInfoAdCO = async (id, objInfoAd) => {
  try {
    const contractUpdatedCO = await Contratos.findOneAndUpdate(
      {
        IdContratoBK: id,
        contratos_info_adicional: {
          $elemMatch: { IdEtiqueta: objInfoAd.IdEtiqueta },
        },
      },
      { $set: { [`contratos_info_adicional.$`]: objInfoAd } },
      { new: true }
    );
    return { succes: true, contractUpdatedCO };
  } catch (error) {
    return { succes: false, error };
  }
};

//FIC: UPDATE ARRAY[OBJECT] INFO ADICIONAL
export const setArrInfoAdCO = async (id, arrInfoAdicional) => {
  try {
    const contractUpdatedCO = await Contratos.findOneAndUpdate(
      {
        IdContratoBK: id,
        contratos_info_adicional: {
          $elemMatch: { IdEtiqueta: arrInfoAdicional.IdEtiqueta },
        },
      },
      { $set: { [`contratos_info_adicional.$`]: arrInfoAdicional } },
      {
        //upsert: true,
        new: true,
      }
    );
    return { succes: true, contractUpdatedCO };
  } catch (error) {
    return { succes: false, error };
  }
};

//FIC: PUSH OR SET ONE BY ONE ARRAY[OBJECT] INFO ADICIONAL NO EXPORT USE INTERNAL
export const getPushSetArrInfoAdCO = async (id, arrInfoAd) => {
  //const fieldName = `${IdField}`;
  //const arrayModel = `Model.${ArrayModel}`;

  try {
    //arrInfoAd.forEach(objInfoAd)
    for (let objInfoAd of arrInfoAd) {
      //const query = `contratos_info_adicional.IdEtiqueta : "IdAutorizaCA1"`;
      const modelResult = await Contratos.findOne({
        IdContratoBK: id,
        contratos_info_adicional: {
          $elemMatch: { IdEtiqueta: objInfoAd.IdEtiqueta },
        },
      });
      if (!modelResult) {
        const saveInContractInfoAd = await pushObjInfoAdCO(id, objInfoAd);
      } else {
        const saveInContractInfoAd = await setObjInfoAdCO(id, objInfoAd);
      }
    }
    return { succes: true, saveInContractInfoAd };
  } catch (error) {
    return { succes: false, error };
  }
};
