const productService = require('../data/service/productService');

describe("Verify Seeded Products", () => {

    let element = null;
    beforeAll(async () => {
        element = await productService.fetchAll();
    });

    // test stuff
    test("Total count should be 4", () => {
        // actual test
        expect(element.length).toBe(4);
    });

    test("Verify Bamboo Incense Stick", () => {
        // actual test
        expect(element).toEqual(
            expect.arrayContaining([
                expect.objectContaining(
                    {
                        productName: 'Bamboo Incense Stick',
                        categoryId: 1,
                        subCategoryId: 1
                    }
                )
            ])
        )
    });

    test("Verify Brown Josh Powder", () => {
        // actual test
        expect(element).toEqual(
            expect.arrayContaining([
                expect.objectContaining(
                    {
                        productId: 3,
                        productCode: 'BROWN_JOSH_POWDER',
                        productName: 'Brown Josh Powder',
                        categoryId: 1,
                        subCategoryId: 1
                    }
                )
            ])
        )
    });

});