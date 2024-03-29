window.addEventListener("DOMContentLoaded", function (event) {
  const searchInput1 = document.querySelector("#search__bar1");
  const searchBtn = document.querySelector("#search__btn");
  const findBibleScriptureLink = this.document.querySelector(
    ".nav__link--homePage:nth-of-type(2)"
  );

  const homePageSearchIcon = document.querySelector(".second-search-icon");
  const searchInput2 = document.querySelector("#search__bar2");

  findBibleScriptureLink.addEventListener("click", function () {
    localStorage.clear();
  });

  searchBtn.addEventListener("click", main1);

  searchInput1.addEventListener("keydown", function (event) {
    if (event.key === "Enter") main1();
  });

  function main1() {
    const searchKeyword = searchInput1.value;
    redirectToSearchResultsPage(searchKeyword);
  }

  homePageSearchIcon.addEventListener("click", main2);

  searchInput2.addEventListener("keydown", function (event) {
    if (event.key === "Enter") main2();
  });

  function main2() {
    const searchKeyword = searchInput2.value;
    redirectToSearchResultsPage(searchKeyword);
  }

  function redirectToSearchResultsPage(searchKeyword) {
    localStorage.setItem("keyword", searchKeyword);
    searchBtn.classList.remove("not-loading");
    searchBtn.classList.add("loading");
    searchBtn.innerHTML = swapSvg();
    let hostName = window.location.hostname;
    if (hostName === "localhost" || hostName === "127.0.0.1") {
      window.location.href = `${window.location.origin}/bibles.html`;
    }
    setTimeout(() => {
      window.location.href = `${window.location.origin}/week-four-final-project/bibles.html`;
    }, 1500);
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
