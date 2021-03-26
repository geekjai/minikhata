const proMetricUnits = require('../schemas/proMetricUnits');

const fetchAll = () => {
    return proMetricUnits.SCHEMA.findAll().then(metricUnits => {
        return metricUnits;
    });
}

module.exports = {
    fetchAll
};