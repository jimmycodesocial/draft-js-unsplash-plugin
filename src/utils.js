export const buildSearchPhotosUrl = (acessKey, query, page = 1, limit = 9) => {
  return `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=${limit}&client_id=${acessKey}`;
};
