const categoryService = require('../data/service/categoryService');

describe("Verify Seeded Categories", () => {

    let element = null;
    beforeAll(async () => {
        element = await categoryService.fetchAll();
    });

    // test stuff
    test("Total count should be 5", () => {
        // actual test
        expect(element.length).toBe(5);
    });

    test("Verify subCategoryName: 'Raw Material", () => {
        // actual test
        expect(element).toEqual(
            expect.arrayContaining([
                expect.objectContaining(
                    {
                        categoryId: 1,
                        categoryName: 'Incense Stick',
                        subCategoryId: 1,
                        subCategoryName: 'Raw Material',
                    }
                )
            ])
        )
    });
});