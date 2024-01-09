window.addEventListener("DOMContentLoaded", function () {
  const searchInputEl = document.querySelector("#searchResultsPage-input");
  const searchResultsPageSearchIcon = document.querySelector(".search__icon");
  const searchResultEl = document.querySelector(".searchResult--wrapper");
  const errorMsgEl = document.querySelector(".searchErrorMessage");

  let version = "kjv";

  let keyword = localStorage.getItem("keyword");

  if (!keyword) {
    searchResultEl.innerHTML = `<p>You did not enter a Bible reference.</p> <p>No search results.</p>
    <p>Search for a Bible reference above 👆</p>
    `;
    errorMsgEl.innerHTML = "";
    this.localStorage.clear();
  } else {
    renderVersesFromHomePage(keyword);
  }

  searchInputEl.addEventListener("keydown", function (event) {
    if (event.key === "Enter") renderVerses();
  });
  searchResultsPageSearchIcon.addEventListener("click", renderVerses);

  async function renderVerses() {
    searchResultEl.classList.remove("loading");
    errorMsgEl.innerHTML = "";
    try {
      if (searchInputEl.value === "" || searchInputEl.value === null) {
        searchResultEl.innerHTML = `<p>Please enter a Bible reference 👆</p>`;
        errorMsgEl.innerHTML = "";
        return;
      }
      searchResultEl.classList.add("loading");
      searchResultEl.innerHTML = swapSvg();
      let verse = searchInputEl.value.replace(/:\s/g, ":");
      const response = await fetch(
        `https://bible-api.com/${verse}?translation=${version}`
      );
      if (response.status !== 200) throw new Error();
      const referenceData = await response.json();
      errorMsgEl.innerHTML = "";
      searchResultEl.classList.remove("loading");
      searchResultEl.innerHTML = referenceHTML(referenceData);
      searchResultEl.innerHTML += referenceData.verses
        .map(verse => versesHTML(verse))
        .join("");
      searchResultEl.innerHTML += bibleVersionHTML(referenceData);
    } catch (error) {
      searchResultEl.innerHTML = "";
      errorMsgEl.innerHTML = errorMsgHTML();
      console.log(error.stack);
    }
  }

  function referenceHTML(referenceData) {
    return `
      <h3 class="bible--reference"><b>🌟 Reference: </b>${referenceData.reference} 🌟</h3>
    `;
  }

  function bibleVersionHTML(referenceData) {
    return `<h3 class="bibleVersion"><b>Bible Version: </b>${referenceData.translation_name}</h3>`;
  }

  function versesHTML(referenceData) {
    return `
    <p class="bibleVerse"><b><span class="yellow">${referenceData.book_name} ${referenceData.chapter}:
    ${referenceData.verse}</span> - </b>${referenceData.text}</p>`;
  }

  function errorMsgHTML() {
    return `
      <p>This Bible reference you entered does not exist ❌</p>
      <p>You entered: ${searchInputEl.value || keyword}</p>
      <p> Please search again 👆</p>
    `;
  }

  async function renderVersesFromHomePage(keyword) {
    searchResultEl.classList.add("loading");
    searchResultEl.innerHTML = swapSvg();
    try {
      let verse = keyword.replace(/:\s/g, ":");
      const response = await fetch(
        `https://bible-api.com/${verse}?translation=${version}`
      );
      if (response.status !== 200) throw new Error();
      const referenceData = await response.json();
      localStorage.clear();
      errorMsgEl.innerHTML = "";
      searchResultEl.classList.remove("loading");
      searchResultEl.innerHTML = referenceHTML(referenceData);
      searchResultEl.innerHTML += referenceData.verses
        .map(verse => versesHTML(verse))
        .join("");
      searchResultEl.innerHTML += bibleVersionHTML(referenceData);
    } catch (error) {
      searchResultEl.innerHTML = "";
      errorMsgEl.innerHTML = errorMsgHTML();
      console.log(error.stack);
    }
  }

  function swapSvg() {
    return `<svg data-v-cf78a876="" data-v-2a11e7ca="" aria-hidden="true" focusable="false"
    data-prefix="fas" data-icon="spinner" role="img" xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512" class="svg-inline--fa fa-spinner fa-w-16"><path data-v-cf78a876=""
    fill="currentColor" d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49
    48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51
    0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0
    229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48
    48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49
    48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"
    class=""></path></svg>`;
  }
});
