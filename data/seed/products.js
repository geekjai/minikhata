const Sequelize = require('sequelize');
const sqlite = require('../../config/sqlite');
const PRODUCT = require('../schemas/pro_products');

PRODUCT.SCHEMA.bulkCreate([
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
    },
    {
        productId: 2,
        productCode: 'AGARBATTI_PREMIX_POWDER',
        productBarcode: null,
        productName: 'Agarbatti Premix Powder',
        description: null,
        productLink: null,
        productImage: null,

        categoryId: 1,
        subCategoryId: 1
    },
    {
        productId: 3,
        productCode: 'BROWN_JOSH_POWDER',
        productBarcode: null,
        productName: 'Brown Josh Powder',
        description: null,
        productLink: null,
        productImage: null,

        categoryId: 1,
        subCategoryId: 1
    },
    {
        productId: 4,
        productCode: 'PREMIX_AND_JOSH_POWDER',
        productBarcode: null,
        productName: 'Premix and Josh Powder',
        description: null,
        productLink: null,
        productImage: null,

        categoryId: 1,
        subCategoryId: 1
    }
])