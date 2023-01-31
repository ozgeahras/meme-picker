import { catsData } from "./data.js";

const emotionRadios = document.getElementById("emotion-radios");
const getImageBttnEl = document.getElementById("get-image-btn");
const isGifEl = document.getElementById("gifs-only-option");
const memeModelEl = document.getElementById("meme-modal");
const memeModalInnerEl = document.getElementById("meme-modal-inner");
const memeModalCloseButtonEl = document.getElementById("meme-modal-close-btn");

emotionRadios.addEventListener("change", highlightCheckedOption);
memeModalCloseButtonEl.addEventListener("click", closeModal);
getImageBttnEl.addEventListener("click", renderCat);

function highlightCheckedOption(e) {
  clearRadioButtons();
  document.getElementById(e.target.id).parentElement.classList.add("highlight");
}

function closeModal(e) {
  memeModalInnerEl.innerHTML = "";
  document.getElementById(e.target.id).parentElement.style.display = "none";
}

function renderCat() {
  const cat = getSingleCatObject();
  let imgItem = ``;
  imgItem += `<img src="./images/${cat.image}" class="cat-img" alt="${cat.alt}">`;
  memeModalInnerEl.innerHTML += imgItem;
  memeModelEl.style.display = "flex";
}

function getSingleCatObject() {
  const catsArray = getMatchingCatsArray();
  const randomIndex = Math.floor(Math.random() * catsArray.length);
  return catsArray[randomIndex];
}

function getMatchingCatsArray() {
  const isChecked = document.querySelector('input[type="radio"]:checked');

  if (isChecked) {
    const checked = document.querySelector('input[type="radio"]:checked').value;
    const isGif = isGifEl.checked;

    const filtered = catsData.filter(function (item) {
      if (isGif) {
        return item.isGif && item.emotionTags.includes(checked);
      } else {
        return item.emotionTags.includes(checked);
      }
    });
    return filtered;
  }
}

function clearRadioButtons() {
  let radios = document.getElementsByClassName("radio");
  for (let radio of radios) {
    radio.classList.remove("highlight");
  }
}

function getEmotionsArray(cats) {
  const emotionsArray = [];

  for (let cat of cats) {
    for (let emotion of cat.emotionTags) {
      if (!emotionsArray.includes(emotion)) {
        emotionsArray.push(emotion);
      }
    }
  }
  return emotionsArray;
}

function renderEmotionsRadios(cats) {
  let radioItems = ``;
  const emotions = getEmotionsArray(cats);
  for (let emotion of emotions) {
    radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>`;
  }
  emotionRadios.innerHTML = radioItems;
}

renderEmotionsRadios(catsData);
