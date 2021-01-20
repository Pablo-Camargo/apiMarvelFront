import axios from "axios";
import Char from "./classes/char";
import CharCard from "./classes/charCard";

class App {
  constructor() {
    this.offset = 1;

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
    this.loaderEvent();
    this.charBody.innerHTML = "";

    data.forEach((item) => {
      console.log(item);
      const character = new Char(item);
      this.charBody.innerHTML += character.createChar();
    });
    for (let img of document.getElementsByClassName("img-responsive")) {
      img.onclick = (event) => {
        console.log(event.target.dataset.id);
        for (const char of data) {
          this.charBody.innerHTML = "";
          if (parseInt(event.target.dataset.id) === char.id) {
            const charCard = new CharCard(char);
            this.charBody.innerHTML += charCard.createCardChar();
            return;
          }
        }
      };
    }
  }
  paginate(data) {
    document.querySelector(".pagination").innerHTML = "";
    const pages = Math.ceil(data / 100);
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
