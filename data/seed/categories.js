const CATEGORY = require('../schemas/pro_categories');

CATEGORY.SCHEMA.bulkCreate([
    {
        categoryId: 1,
        categoryName: 'Incense Stick',
        subCategoryId: 0,
        subCategoryName: null,
    },
    {
        categoryId: 1,
        categoryName: 'Incense Stick',
        subCategoryId: 1,
        subCategoryName: 'Raw Material',
    },
    {
        categoryId: 1,
        categoryName: 'Incense Stick',
        subCategoryId: 2,
        subCategoryName: 'Unscented Incense Stick',
    },
    {
        categoryId: 1,
        categoryName: 'Incense Sticks',
        subCategoryId: 3,
        subCategoryName: 'Scented Incense Stick',
    },
    {
        categoryId: 1,
        categoryName: 'Incense Sticks',
        subCategoryId: 4,
        subCategoryName: 'Packed Incense Stick',
    }
])