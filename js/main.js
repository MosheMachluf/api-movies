var movies_ar = [];
var displayPerScroll = 9;
var totalDisplay = 0;
var allDone = false;

window.onload = () => {
  doRestApi();
  init();
};

const init = () => {
  document.onscroll = () => {
    let sc = Math.ceil(window.scrollY || document.documentElement.scrollTop); //כמה גלל
    let wh = window.innerHeight; //גובה החלון
    let dh = document.documentElement.scrollHeight; // גובה כל המסמך

    if (sc + wh == dh) {
      if (movies_ar.length > totalDisplay + 9) totalDisplay += 9;
      else if (movies_ar.length == totalDisplay) allDone = true;
      else totalDisplay += movies_ar.length - totalDisplay;

      if (!allDone) {
        const loader = document.querySelector("#loader");
        loader.classList.remove("d-none");
        console.log(totalDisplay);
        setTimeout(() => {
          createAllVOD(movies_ar, totalDisplay, true);
          loader.classList.add("d-none");
        }, 800);
      }
    }
  };
};

const createAllVOD = (_ar, _len, _remember) => {
  const pr = document.querySelector("main #id_parent");
  pr.innerHTML = "";

  if (!_ar.length) {
    return (pr.innerHTML = `<div class="alert alert-danger" role="alert">Not found results...</div>`);
  }

  if (typeof _remember == "boolean") totalDisplay = _len;

  for (let i = 0; i < _len; i++) {
    let item = _ar[i];
    let {
      title,
      poster_path,
      overview,
      release_date,
      vote_average,
      vote_count,
      backdrop_path,
    } = item;

    let movie = new VOD(
      id_parent,
      title,
      poster_path,
      overview,
      release_date,
      vote_average,
      vote_count,
      backdrop_path
    );
    movie.renderHtml();
  }
};

const doRestApi = (_cat_id = 1) => {
  let myUrl = `https://api.themoviedb.org/3/list/${_cat_id}?api_key=d4bc3c640586e7f90dc68d8b300247ff&language=en-US`;

  fetch(myUrl)
    .then((response) => response.json())
    .then((data) => {
      movies_ar = data.items;
      createAllVOD(movies_ar, 9, true);
    });
};

const onChangeCat = (e) => {
  e.preventDefault();
  let cat_id = e.target.dataset.cat;
  displayPerScroll = 9;
  totalDisplay = 0;
  allDone = false;
  doRestApi(cat_id);
};

const onSearchMovie = () => {
  let searchQ = document.querySelector("#id_search").value.trim();
  let sortQ = document.querySelector("#id_sort").value;

  if (sortQ == "") {
    createAllVOD(movies_ar, movies_ar.length);
  } else {
    let movieSort = movies_ar;
    movieSort.sort(compareValues(sortQ));
    createAllVOD(movieSort, movieSort.length);
  }
  let temp_ar = movies_ar.filter(
    (item) =>
      item.title.toLowerCase().indexOf(searchQ.toLowerCase()) > -1 ||
      item.overview.indexOf(searchQ.toLowerCase()) > -1
  );
  createAllVOD(temp_ar, temp_ar.length);
};

const onCloseDarkWindow = () => {
  document.querySelector("#id_dark").className = "d-none";
  document.querySelector("#dark_box").classList.remove("open");
};

const compareValues = (key, order = "desc") => {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0;
    const comparison = String(a[key]).localeCompare(String(b[key]));

    return order === "desc" ? comparison * -1 : comparison;
  };
};
