const BREEDS_URL = "https://dog.ceo/api/breeds/image/random";
const BREEDS_ALL = "https://dog.ceo/api/breeds/list/all";
const image = document.querySelector("img");
const select = document.getElementById("options");
const loadImg = document.querySelector("p");

async function getRandomDoggo(url) {
  console.log("here");
  const res = await fetch(url);
  const resJson = await res.json();

  image.src = resJson.message;
  //loadImg.classList.add("not-show");
}

getRandomDoggo(BREEDS_URL);

async function populateSelect(url) {
  const res = await fetch(url);
  const resJson = await res.json();
  const breedsObject = resJson.message;
  const breedsArray = Object.keys(breedsObject);

  breedsArray.forEach((breed) => {
    const option = document.createElement("option");
    option.value = breed;
    option.innerText = breed;
    select.appendChild(option);
  });
}

populateSelect(BREEDS_ALL);

async function getSelectedBreed(event) {
  console.log(event.target.value);
  image.src = "";
  loadImg.classList.remove("not-show");
  const selectedValue = event.target.value;
  const res = await fetch(
    `https://dog.ceo/api/breed/${selectedValue}/images/random`
  );
  const resJson = await res.json();

  image.src = resJson.message;
}

select.addEventListener("change", getSelectedBreed);

image.addEventListener("load", (event) => {
  console.log(event);
  loadImg.classList.add("not-show");
});
