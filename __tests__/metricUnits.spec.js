const metricUnitService = require('../data/service/metricUnitService');

describe("Verify Seeded Metric Units", () => {

    let element = null;
    beforeAll(async () => {
        element = await metricUnitService.fetchAll();
    });

    // test stuff
    test("Total count should be 7", () => {
        // actual test
        expect(element.length).toBe(7);
    });

    test("Verify Kilogram existence", () => {
        // actual test
        expect(element).toEqual(
            expect.arrayContaining([
                expect.objectContaining(
                    {
                        metricId: 5,
                        unitType: 'MASS',
                        unitName: 'Kilogram',
                        unitSymbol: 'kg'
                    }
                )
            ])
        )
    });
});