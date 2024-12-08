// Calling HTML Elements

const body = document.querySelector("body");
const themeCheckbox = document.querySelector("#theme-checkbox");
const check = document.querySelector(".check");
const botn = document.querySelector(".botn");
const mainApp = document.querySelector(".main-app");
const wordInput = document.querySelector("#word-input");
const searchBtn = document.querySelector("#search-btn");
const word = document.querySelector("#word");
const phonetic = document.querySelector("#phonetic");
const definition = document.querySelector("#definition");
const example = document.querySelector("#example");
const result = document.querySelector(".result");

// Default Mode

body.classList.add("light-mode");
check.classList.add("light-mode");
botn.classList.add("light-mode");
mainApp.classList.add("light-mode");
wordInput.classList.add("light-mode");
searchBtn.classList.add("light-mode");

// Toggle Mode

function toggleMode() {
  body.classList.toggle("dark-mode");
  check.classList.toggle("dark-mode");
  botn.classList.toggle("dark-mode");
  mainApp.classList.toggle("dark-mode");
  wordInput.classList.toggle("dark-mode");
  searchBtn.classList.toggle("dark-mode");
}

themeCheckbox.addEventListener("click", toggleMode);

searchBtn.addEventListener("click", async () => {
  const searchedWord = wordInput.value.trim();
  if (!searchedWord) {
    result.innerHTML = `<p>Please enter a word to search.</p>`;
    return;
  }

  const API_KEY = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchedWord}`;
  try {
    const response = await fetch(API_KEY);
    if (!response.ok) {
      throw new Error("Word not found");
    }
    const data = await response.json();
    const entry = data[0];
    const { word: word, phonetic, meanings } = entry;
    const definition =
      meanings[0]?.definitions[0]?.definition || "No definition found";
    const example = meanings[0]?.definitions[0]?.example || "No example found";
    result.innerHTML = `<div class="word" id="word">${word}</div>
                           <div class="phonetic" id="phonetic">${phonetic}</div>
                           <div class="definition" id="definition">${definition}</div>
                           <div class="example" id="example">${example}</div>`;
    mainApp.classList.add("after-search");
  } catch (error) {
    result.innerHTML = `<p>${error.message}</p>`;
  }
});
