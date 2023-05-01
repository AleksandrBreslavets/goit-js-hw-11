import axios from 'axios';
export async function makeRequest(wordToSearch, pages) {
    const BASE_URL = "https://pixabay.com/api/";
    const API_KEY = "35917814-1222498717b1f5a240e2b1908";
    const options = {
    params: {
        q: wordToSearch,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",
        page: pages,
        per_page:40,
    },
    headers: {
        'Content-Type': "application/json",
    }
    }
    const response = await axios.get(`${BASE_URL}?key=${API_KEY}`, options);
    return response;
}