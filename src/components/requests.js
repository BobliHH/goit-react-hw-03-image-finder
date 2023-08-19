export const searchImages = searchTerm => {
  return fetch(
    `https://pixabay.com/api/?key=38601401-11d2d5f97ced9578970ff4161&q=${searchTerm}&image_type=photo&pretty=true`
  ).then(res => res.json());
};
