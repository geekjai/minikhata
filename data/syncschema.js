const sequelize = require('../config/dbConfig');
require('./schemas/pro_metric_units');
require('./schemas/pro_categories');
require('./schemas/pro_products');
require('./schemas/pro_purchases');
require('./schemas/pro_manufactures');
require('./schemas/pro_manufacture_products');

sequelize.sync({ force: true })
.then(() => {
    console.log(`Database & tables created!`);
    require('./seed/metric_units');
    require('./seed/categories');
    require('./seed/products');
});