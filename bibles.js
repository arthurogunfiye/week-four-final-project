window.addEventListener("DOMContentLoaded", function () {
  const searchInputEl = document.querySelector("#search-bar");
  const searchIcon = document.querySelector(".search__icon");
  const searchResultEl = document.querySelector(".searchResult--wrapper");
  const errorMsgEl = document.querySelector(".searchErrorMessage");

  let version = "kjv";

  let keyword = localStorage.getItem("keyword");

  if (!keyword) {
    searchResultEl.innerHTML = `<p>You did not enter a Bible reference. No search results.</p>
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
  searchIcon.addEventListener("click", renderVerses);

  async function renderVerses() {
    try {
      if (searchInputEl.value === "" || searchInputEl.value === null) {
        searchResultEl.innerHTML = `<p>Please enter a Bible reference 👆</p>`;
        errorMsgEl.innerHTML = "";
        return;
      }
      searchResultEl.innerHTML = "";
      let verse = searchInputEl.value.replace(/:\s/g, ":");
      const response = await fetch(
        `https://bible-api.com/${verse}?translation=${version}`
      );
      if (response.status !== 200) throw new Error();
      const referenceData = await response.json();
      errorMsgEl.innerHTML = "";
      searchResultEl.innerHTML = referenceHTML(referenceData);
      searchResultEl.innerHTML += referenceData.verses
        .map(verse => versesHTML(verse))
        .join("");
      searchResultEl.innerHTML += bibleVersionHTML(referenceData);
    } catch (error) {
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
    searchResultEl.innerHTML = "";
    try {
      let verse = keyword.replace(/:\s/g, ":");
      const response = await fetch(
        `https://bible-api.com/${verse}?translation=${version}`
      );
      if (response.status !== 200) throw new Error();
      const referenceData = await response.json();
      localStorage.clear();
      errorMsgEl.innerHTML = "";
      searchResultEl.innerHTML = referenceHTML(referenceData);
      searchResultEl.innerHTML += referenceData.verses
        .map(verse => versesHTML(verse))
        .join("");
      searchResultEl.innerHTML += bibleVersionHTML(referenceData);
    } catch (error) {
      errorMsgEl.innerHTML = errorMsgHTML();
      console.log(error.stack);
    }
  }
});
