const LOCALSTORAGE_NAME = "filter";

export const loadDataFromLocalStorage = localStorage.getItem(LOCALSTORAGE_NAME);

export const saveDataToLocalStorage = (data) =>
  localStorage.setItem(LOCALSTORAGE_NAME, data);
