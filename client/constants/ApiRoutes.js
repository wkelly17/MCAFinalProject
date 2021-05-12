let baseUrl = 'http://localhost:3030/';

const ROUTES = {
  scrapeRecipe: baseUrl.concat('recipes/scrape'),
  getRecipes: baseUrl.concat('recipes'),
  getSingleRecipe: (id) => baseUrl.concat(`recipes/${id}`),
  addRecipe: baseUrl.concat('recipes/add'),
  patchRecipe: (id) => baseUrl.concat(`recipe/${id}`),
  deleteRecipe: (id) => baseUrl.concat(`recipe/${id}`),
  calendarAdd: baseUrl.concat('calendar/update'),
  calendarGet: baseUrl.concat('calendar'),
  calendarMealDelete: (id) => baseUrl.concat(`calendar/${id}`),
  calendarMealEdit: (id) => baseUrl.concat(`calendar/${id}`),
};

export const updateTicketRoute = (id) =>
  baseApiUrl.concat(`tickets/update/${id}`);

export default ROUTES;
