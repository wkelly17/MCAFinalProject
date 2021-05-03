export const pagesRoutes = {
  CREATE_EDIT: '/createEdit',
  HOME: '/home',
  LOGIN: '/',
  SINGLE: '/single:id',
  COMPUTESINGLE: (id) => {
    return `/single${id}`;
  },
};
