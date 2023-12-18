import { storageQuery, storageResolver } from ".";

test('Generates storage sections for hats', () => {
    const generator = storageQuery(20, 'hat', storageResolver);
    const sections = Array.from(generator);
    expect(sections).toEqual([3, 6, 9, 12, 15, 18]);
});

test('Generates storage sections for smartphones', () => {
    const generator = storageQuery(40, 'smartphone', storageResolver);
    const sections = Array.from(generator);
    expect(sections).toEqual([10, 20, 30, 40]);
});

test('Generates storage sections for book', () => {
    const generator = storageQuery(10, 'book', storageResolver);
    const sections = Array.from(generator);
    expect(sections).toEqual([4, 8]);
});

test('Prevents from generating storage sections', () => {
    const generator = storageQuery(3, 'console', () => false);
    const sections = Array.from(generator);
    expect(sections).toEqual([]);
});
