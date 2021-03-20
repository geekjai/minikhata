const Sequelize = require('sequelize');
const sqlite = require('../../config/sqlite');
const PRODUCT = require('../schemas/pro_products');

PRODUCT.bulkCreate([
    {
        productId: 1,
        productCode: 'BAMBOO_INCENSE_STICK',
        productBarcode: null,
        productName: 'Bamboo Incense Stick',
        description: null,
        productLink: null,
        productImage: null,

        categoryId: 1,
        subCategoryId: 1
    }
])