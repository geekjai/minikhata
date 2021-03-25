const sequelize = require('../config/dbConfig');
require('./schemas/proMetricUnits');
require('./schemas/proCategories');
require('./schemas/proProducts');
require('./schemas/proPurchases');
require('./schemas/proManufactures');
require('./schemas/proManufactureProducts');

sequelize.sync({ force: true })
    .then(() => {
        console.log(`Database & tables created!`);
        require('./seed/metricUnitsSeed');
        require('./seed/categoriesSeed');
        require('./seed/productsSeed');
    });