import { usePagination } from "./index";

describe("usePagination", () => {
  it("should return the correct page of gifts - page 1", () => {
    const { currentPageItems } = usePagination(["gift1", "gift2", "gift3", "gift4"], 2, 1);
    expect(currentPageItems).toEqual(["gift1", "gift2"]);
  });

  it("should return the correct page of gifts - page 2", () => {
    const { currentPageItems } = usePagination(["gift1", "gift2", "gift3"], 2, 2);
    expect(currentPageItems).toEqual(['gift3']);
  });

  it("should calculate total pages and items correctly", () => {
    const { totalPages, totalItems } = usePagination(["gift1", "gift2", "gift3", "gift4", "gift5"], 2, 2);
    expect(totalPages).toEqual(3);
    expect(totalItems).toEqual(5);
  });

  it("should handle empty gifts array", () => {
    const { currentPageItems } = usePagination([], 2, 1);
    expect(currentPageItems).toEqual([]);
  });

  it("should handle page number out of range", () => {
    const { currentPageItems } = usePagination(["gift1", "gift2", "gift3"], 2, 4);
    expect(currentPageItems).toEqual([]);
  });
});
