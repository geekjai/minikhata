const METRICUNIT = require('../schemas/proMetricUnits');

METRICUNIT.SCHEMA.bulkCreate([
    {
        metricId: 1,
        unitType: 'LENGTH',
        unitName: 'Millimeter',
        unitSymbol: 'mm'
    },
    {
        metricId: 2,
        unitType: 'LENGTH',
        unitName: 'Centimeter',
        unitSymbol: 'cm'
    },
    {
        metricId: 3,
        unitType: 'LENGTH',
        unitName: 'Meter',
        unitSymbol: 'm'
    },
    {
        metricId: 4,
        unitType: 'LENGTH',
        unitName: 'Kilometer',
        unitSymbol: 'km'
    },
    {
        metricId: 5,
        unitType: 'MASS',
        unitName: 'Kilogram',
        unitSymbol: 'kg'
    },
    {
        metricId: 6,
        unitType: 'MASS',
        unitName: 'Gram',
        unitSymbol: 'g'
    },
    {
        metricId: 7,
        unitType: 'PACKET',
        unitName: 'Packet',
        unitSymbol: 'packet'
    }
])