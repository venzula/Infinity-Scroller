const imageContainer = document.getElementById("image-container");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArry = [];

//Unsplash API
const count = 30;
const apiKey = "3HwWo8_vMQgIhgbZrxA05XYMTiH3H2PLEQ6z4XeVi9M";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    console.log("ready =", ready);
  }
}

//Helper Function to Set Atrributes on DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//Create Elements for Links & Photos,add to DOM
function displayPhotos() {
  totalImages = photosArry.length;
  console.log("total image", totalImages);
  //run function for eachobject in photoArry
  photosArry.forEach((photo) => {
    //creating <a> to link to unsplah
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank");
    //creat <img> for photo
    setAttributes(item, {
      href: photo.links.html,
      targets: "_blank",
    });
    //creat <img> for photo
    const img = document.createElement("img");
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    img.addEventListener("load", imageLoaded);

    //put <img> inside inside <a>, then put both inside imgcontainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

//get photos from unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArry = await response.json();
    displayPhotos();
  } catch (error) {
    //catch error here
  }
}

//On Load
getPhotos();
