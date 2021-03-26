const proProducts = require('../schemas/proProducts');

const fetchAll = () => {
    return proProducts.SCHEMA.findAll().then(products => {
        return products;
    });
}

module.exports = {
    fetchAll
};