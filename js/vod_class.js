class VOD {
  constructor(_parent, _name, _img, _info, _date, _rating, _views, _cover) {
    this.parent = _parent;
    this.name = _name;
    this.img = _img;
    this.info = _info;
    this.date = _date;
    this.rating = _rating;
    this.views = _views;
    this.cover = _cover;
  }

  renderHtml() {
    let newDiv = document.createElement("div");
    newDiv.className = "col-md-6 col-lg-4 my-3";
    this.parent.appendChild(newDiv);

    newDiv.innerHTML += `<img src="https://image.tmdb.org/t/p/w500${this.img}" class="w-25 float-left mr-3" alt="${this.name}">
                    <h2 class="lead truncate">${this.name}</h2>
                    <div>Date: ${this.date}</div>
                    <div>Rating: ${this.rating}</div>`;

    let newBtn = document.createElement("button");
    newBtn.className = "btn btn-info mt-2";
    newDiv.appendChild(newBtn);
    newBtn.innerHTML = "More Info";

    newBtn.addEventListener("click", this.showMovieInfo);
  }

  showMovieInfo = () => {
    document.querySelector("#id_dark").className =
      "dark container-fluid center";
    document.querySelector("#dark_box").classList.add("open");

    document.querySelector(
      ".dark-box img"
    ).src = `https://image.tmdb.org/t/p/w500${this.cover}`;
    document.querySelector(".dark-box h2").innerHTML = this.name;
    document.querySelector(".dark-box .views").innerHTML =
      "Views: " + this.views;
    document.querySelector("#id_dark p").innerHTML = this.info;
  };
}
