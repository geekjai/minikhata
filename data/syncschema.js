const sqlite = require('../config/sqlite');
require('./schemas/pro_metric_units');
require('./schemas/pro_categories');
require('./schemas/pro_products');
require('./schemas/pro_purchases');

sqlite.sync({ force: true })
.then(() => {
    console.log(`Database & tables created!`);
    require('./seed/metric_units');
    require('./seed/categories');
    require('./seed/products');
});