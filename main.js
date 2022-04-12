var UrlBase = "";
var UrlTail = "full/843,/0/default.jpg";

window.onload = function() {
    getArtworks();
};

function getArtworks() {
  var randomPage = Math.floor(Math.random() * 500);
  fetch(`https://api.artic.edu/api/v1/artworks?page=${randomPage}&fields=title,thumbnail,image_id`)
    .then((response) => response.json())
    .then((json) => handleArtworks(json));
}

function handleArtworks(artworks) {
  UrlBase = artworks.config.iiif_url;
  
  let randomIndex = Math.floor(Math.random() * (artworks.data.length - 1));
  let img = makeImage(artworks.data[randomIndex]);
  let description = document.createElement("random");

  let img_div = document.querySelector("#art");
  img_div.appendChild(img);

  let description_div = document.querySelector("#description");
  description.innerHTML += `${img.alt}`;
  description_div.appendChild(description);
}

function makeImage(artwork) {
  removeImage();
  removeDescription();

  let img = document.createElement("img");
  
  img.id = artwork.image_id;
  img.alt = `${artwork.title} | ${artwork.thumbnail.alt_text}`;
  img.src = `${UrlBase}/${artwork.image_id}/${UrlTail}`;

  return img;
}

function removeImage() {
  var img = document.querySelector("img");
  
  if (img) {
    img.remove();
  }
}

function removeDescription() {
    var description = document.querySelector("random");
    
    if(description) {
        description.remove();
    }
}
