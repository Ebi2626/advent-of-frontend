export function usePagination<T>(items: T[], itemsPerPage: number, pageNumber: number) {
  const startingPage = (pageNumber - 1) * itemsPerPage;
  const endingPage = startingPage + itemsPerPage;
  const currentPageItems = items.slice(startingPage, endingPage);
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return {
    currentPageItems,
    totalPages,
    totalItems,
  }
}