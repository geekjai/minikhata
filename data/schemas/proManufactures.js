//pro_manufactures.js
const Sequelize = require('sequelize');
const sequelize = require('../../config/dbConfig');
const moment = require('moment');

const SCHEMA = sequelize.define('pro_manufactures',
    {
        manufactureId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
        },
        manufactureQuantity: Sequelize.REAL,
        manufactureDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        manufactureNotes: Sequelize.TEXT
    }
);

const processManufactureRequest = (isCreate, isUpdate, requestBody) => {

    if (requestBody == undefined) {
        return {};
    }

    let lManufactureDate = requestBody.manufactureDate;
    if (lManufactureDate !== undefined) {
        const d = new Date(lManufactureDate);
        lManufactureDate = moment(d).format('YYYY-MM-DD');
    }

    if (isUpdate) {
        return {
            manufactureQuantity: requestBody.manufactureQuantity,
            manufactureDate: lManufactureDate,
            manufactureNotes: requestBody.manufactureNotes
        }
    }

    if (isCreate) {
        return {
            manufactureQuantity: requestBody.manufactureQuantity,
            manufactureDate: lManufactureDate,
            manufactureNotes: requestBody.manufactureNotes
        }
    }

    return {};
}

const createManufacture = (t, pManufacture) => {

    return SCHEMA.create(pManufacture, { transaction: t })
}

module.exports = {
    SCHEMA,
    processManufactureRequest,
    createManufacture
};