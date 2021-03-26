//proProductManufactureMap.js.js
const Sequelize = require('sequelize');
const sequelize = require('../../config/dbConfig');

const SCHEMA = sequelize.define('pro_product_manufacture_map',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
        },
        manufactureId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        productId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        productQuantity: Sequelize.REAL
    }
);

const bulkCreateProductManufactureMap = (t, pProductManufactureMaps) => {

    return SCHEMA.bulkCreate(pProductManufactureMaps, { transaction: t });
}

module.exports = {
    bulkCreateProductManufactureMap
};