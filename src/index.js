import Notiflix from 'notiflix';
import { refs } from "./refs";
import { makeRequest } from './makeAxiosRequest';
import { createMarkup } from './createMarkup';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
let currentPage = 1;
let inputPhrase = "";
let imageLightBox;
refs.form.addEventListener("submit", onFormSubmit);
refs.loadMoreBtn.addEventListener("click", onLoadMore);
function onLoadMore(evt) {
    currentPage += 1;
    makeRequest(inputPhrase, currentPage).then(async resp => {
            const images = resp.data.hits;
            refs.listOfPhotos.insertAdjacentHTML("beforeend", createMarkup(images));
            if ((refs.listOfPhotos.children.length) >= resp.data.totalHits) {
                refs.loadMoreBtn.hidden = true;
                Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
            }
            imageLightBox.refresh();
        }).catch(err => console.log(err))
}
function onFormSubmit(evt) {
    evt.preventDefault();
    inputPhrase = evt.currentTarget.elements.searchQuery.value.trim();
    refs.loadMoreBtn.hidden = true;
    refs.listOfPhotos.innerHTML = "";
    currentPage = 1;
    if (!inputPhrase) {
        Notiflix.Notify.failure('Oops, something went wrong. Please, type something in.');
        return;
    }
    makeRequest(inputPhrase, currentPage).then(async resp => {
        const totalImages = resp.data.totalHits;
        const images = resp.data.hits;
        if (images.length === 0) {
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
                return;
        }
        Notiflix.Notify.info(`Hooray! We found ${totalImages} images.`);
        if (images.length < totalImages) {
            refs.loadMoreBtn.hidden = false;
        }
        else {
            Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
        }
        refs.listOfPhotos.innerHTML = createMarkup(images);
        imageLightBox = new SimpleLightbox('.gallery a', {
            captionsData: "alt",
            captionDelay: 250,
        });
        }).catch(err => console.log(err))
}
