const proCategories = require('../schemas/proCategories');

const fetchAll = () => {
    return proCategories.SCHEMA.findAll().then(categories => {
        return categories;
    });
}

module.exports = {
    fetchAll
};