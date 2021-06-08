export const APP_ID = 123;
export const URL = "https://rest.bandsintown.com";
const STORAGE_KEY = "events";

export function fetchData(url) {
  return fetch(url).then((res) => {
    if (res.statusText !== "OK") {
      const err = new Error();
      err.message = res.statusText;
      err.status = res.status;
      return Promise.reject(err);
    }
    return res.json();
  });
}

export function saveFavorites(value) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}

export function getFavorites() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}
