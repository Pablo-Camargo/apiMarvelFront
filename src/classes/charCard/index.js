export default class CharCard {
  constructor(data) {
    const { thumbnail, comics, name, description } = data;
    this.name = name;
    this.thumbnail = thumbnail;
    this.comics = comics;
    this.description = description;
  }
  createCardChar() {
    let comics = ``;
    let description = ``;
    let output = ``;
    let hasImg = ``;
    if (this.thumbnail.path.includes("image_not_available")) {
      hasImg = `./img/marvel_logo.jpg`;
    } else {
      hasImg = `${this.thumbnail.path}.${this.thumbnail.extension}`;
    }
    const comDes = this.hasComicsDescription(comics, description);
    output = `  <div class="col-12 d-flex  box" >
    <div>
        <img class="img-responsive  rounded mb-lg-0  box4  " src="${hasImg}"  width="100" alt="...">
    </div>
    <div class="card-body   h-100 mt-2 mt-lg-0  box  ">
      <h5 class="card-title  ml-3 mt-3 boxtext">${this.name}</h5>
      <p><span class="fw-bold  box ">Description: </span  ><p class="boxtext  font">${comDes.description}</p>
      <p class="fw-bold box">Comics:</p>
      <ul class="boxtext" >${comDes.comics}</ul>
      <a href="http://localhost:8080" class="btn btn-dark text-white box4">Back</a>
    </div>
  </div>`;

    return output;
  }

  hasComicsDescription(comics, description) {
    for (let index = 0; index < this.comics.items.length; index++) {
      comics += ` <li class="card-text">${this.comics.items[index].name}</li>`;
    }

    if (this.description === "") {
      description = "Not Informed";
    } else {
      description = this.description;
    }
    return {
      comics: comics,
      description: description,
    };
  }
}
