export default class Char {
  constructor(data) {
    const { id, name, thumbnail } = data;
    this.id = id;
    this.name = name;
    this.thumbnail = thumbnail;
  }
  createChar() {
    let newChar = ``;

    if (this.thumbnail.path.includes("image_not_available")) {
      newChar = `<li class="card box1 boxtext col-md-3 ">
        <input type="image" class="img-responsive mt-3 box"  width="100" data-id="${this.id}"src="./img/marvel_logo.jpg">
       <div calss=""><h6 class="box0 box">${this.name}</h6></div>
        
          </li>`;
    } else {
      newChar = `<li class="card boxtext box1 col-md-3">
        <input type="image" class="img-responsive mt-3 box  "  width="100"data-id="${this.id}"src="${this.thumbnail.path}.${this.thumbnail.extension}"><h6>${this.name}</h6>
          </li>`;
    }
    return newChar;
  }
}
