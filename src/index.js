import axios from "axios";

class App {
  constructor() {
    this.offset = 1;
    //this.spinner = document.querySelector(".spinner-wraper");
    this.charBody = document.querySelector(".results");
    this.button = document.getElementById("bt");
    this.name = document.getElementById("input");
    this.eventosDeButoon();
  }
  eventosDeButoon() {
    this.button.onclick = () => this.searchCharacter();
  }
  loaderEvent() {
    this.spinner = document.querySelector(".spinner-wraper");
    this.spinner.classList.add("d-none");
  }

  async getCharacters() {
    console.log(this.offset);
    try {
      const response = await axios.get(
        `http://localhost:3333/api/${this.offset}`
      );

      this.show(response.data.data.results);

      this.paginate(response.data.data.total);
      this.eventosDeButoon(response.data.data.results);
    } catch (error) {
      console.log(error);
    }
  }
  async searchCharacter() {
    try {
      console.log("teste");
      const response = await axios.get(
        `http://localhost:3333/api/chars/${this.name.value}`
      );

      this.show(response.data.data.results);
    } catch (error) {
      console.log(error);
    }
  }

  show(data) {
    this.charBody.innerHTML = "";

    this.loaderEvent();
    data.map;

    data.forEach((item) => {
      if (item.thumbnail.path.includes("image_not_available")) {
        const output = `<li class="card box1 boxtext col-md-3 ">
          <input type="image" class="img-responsive mt-3 box"  width="100" data-id="${item.id}"src="./img/marvel_logo.jpg">
         <div calss=""><h6>${item.name}</h6></div>
          
            </li>`;
        this.charBody.innerHTML += output;
      } else {
        const output = `<li class="card boxtext box1 col-md-3">
          <input type="image" class="img-responsive mt-3 box  "  width="100"data-id="${item.id}"src="${item.thumbnail.path}.${item.thumbnail.extension}"><h6>${item.name}</h6>
            </li>`;
        this.charBody.innerHTML += output;
      }
    });
    for (let img of document.getElementsByClassName("img-responsive")) {
      img.onclick = (event) => {
        console.log(event.target.dataset.id);
        for (const char of data) {
          this.charBody.innerHTML = "";
          if (parseInt(event.target.dataset.id) === char.id) {
            if (char.thumbnail.path.includes("image_not_available")) {
              let comics = "";
              let description = "";

              for (let index = 0; index < char.comics.items.length; index++) {
                comics += `<li class="card-text">${char.comics.items[index].name}</li>`;
              }
              if (char.description === "") {
                description = "Not Informed";
              } else {
                description = char.description;
              }
              const output = `
              <div class="col-12 d-flex" >
                                <div>
                                    <img class="img-responsive  rounded mb-lg-0   box0" src="./img/marvel_logo.jpg"  width="800" alt="...">
                                </div>
                                <div class="card-body boxtext box box4 box0 h-100 mt-2 mt-lg-0">
                                  <h5 class="card-title ml-3 mt-3">${char.name}</h5>
                                  <p><span class="fw-bold ">Description: </span>${description}</p>
                                  <p class="fw-bold">Comics:</p>
                                  <ul>${comics}</ul>
                                  <a href="http://localhost:8080" class="btn btn-dark text-white box0">Back</a>
                                </div>
                              </div>`;
              this.charBody.innerHTML += output;

              return;
            } else {
              let comics = "";
              let description = "";

              for (let index = 0; index < char.comics.items.length; index++) {
                comics += `<li class="card-text">${char.comics.items[index].name}</li>`;
              }

              if (char.description === "") {
                description = "Not Informed";
              } else {
                description = char.description;
              }
              const output = `<div class="col-12 d-flex" >
                                <div>
                                    <img class="img-responsive rounded mb-lg-0  box0 " src="${char.thumbnail.path}.${char.thumbnail.extension}" class="card-img-top" alt="...">
                                </div>
                                <div class="card-body boxtext  box4  h-100 mt-2 mt-lg-0 ">
                                  <h5 class="card-title">${char.name}</h5>
                                  <p><span class="fw-bold">Description: </span>${description}</p>
                                  <p class="fw-bold">Comics:</p>
                                  <ul>${comics}</ul>
                                  <a href="http://localhost:8080" class="box btn btn-dark text-white">Back</a>
                                </div>
                              </div>`;
              this.charBody.innerHTML += output;

              return;
            }
          }
        }
      };
    }
  }
  paginate(data) {
    document.querySelector(".pagination").innerHTML = "";
    const pages = Math.ceil(data / 100); // aredondamento de ex 20.4 => 21

    for (let i = 1; i <= pages; i++) {
      const li = `<li class="page-item"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;

      document.querySelector(".pagination").innerHTML += li;
    }
    for (let link of document.getElementsByClassName("page-link")) {
      link.onclick = (event) => {
        event.preventDefault();
        const page = event.target.dataset.page;

        this.offset = parseInt(page);

        this.getCharacters();
      };
    }
  }
}

const app = new App();
app.getCharacters();
