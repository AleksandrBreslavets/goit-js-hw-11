export function createMarkup(arr) {
    return arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
    `<div class="photo-card">
    <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" width="360" height="210" loading="lazy" />
     </a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <span class="item-value">${likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b>
      <span class="item-value">${views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b>
      <span class="item-value">${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <span class="item-value">${downloads}</span>
    </p>
  </div>
</div>`).join("");
}