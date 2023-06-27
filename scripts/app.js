const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");
const input = document.getElementById("search-input");
let loaded = false;

const fetchCall = async () => {
  let searchInput = document.getElementById("search-input").value;

  const response = await fetch(`${url}${searchInput}`);
  return response;
};


btn.addEventListener("click", () => {
  loaded = false;
  
  if (input.value == "") {
    result.innerHTML = "";
    result.style.fontFamily = "'Roboto', sans-serif";

    result.innerHTML += `<div class='error animate__animated animate__shakeX'>
        <h3>Please input a word first.</h4>
        </div>`;
  } else {
    let searchInput = document.getElementById("search-input").value;
    result.innerHTML = "";
    if (loaded) {

    } else {
      result.innerHTML = `<div class='error' style='font-family: 'Roboto', sans-serif>
      <p>Loading...</p>
      </div>`;
    }
    fetchCall()
      .then((response) => response.json())
      .then((data) => {
        loaded = true;
      result.innerHTML = '';

        if (data.title == undefined) {
          result.style.fontFamily = "'Times New Roman', Times, serif";

          for (let i = 0; i < data.length; i++) {
            const datas = data[i];
            if (datas.phonetic == undefined) {
              result.innerHTML += `<div class="word">
                                <div class="details">
                                  <h3>${searchInput}</h3>
                                  </div>
  
                                <div class="sound" id='voice'>
                                    <button class="audio-button" onclick="playSound()"><i class="fa-solid fa-volume-up"></i></button>
                                </div>
                              </div>`;
            } else {
              result.innerHTML += `<div class="word">
                                <div class="details" >
                                  <h3>${searchInput}</h3>
                                  <p class="pronounciation" id='punitTik'>${datas.phonetic}</p>
                                </div>
  
                                <div class="sound" id='voice'>
                                    <button class="audio-button" onclick="playSound()"><i class="fa-solid fa-volume-up"></i></button>
                                </div>
                              </div>`;
            }

            i = data.length;

            for (let j = 0; j < datas.meanings.length; j++) {
              const meaningss = datas.meanings[j];
              result.innerHTML += `<div class='partOfSpeech'><i><h4 >${meaningss.partOfSpeech}</h4></i></div>`;

              for (let k = 0; k < meaningss.definitions.length; k++) {
                const definitionss = meaningss.definitions[k];
                result.innerHTML += `<div class="word-definition">
                                  <p class="meaning">${k+1}. ${definitionss.definition}</p>`;
                if (definitionss.example == undefined) {
                  result.innerHTML += ``;
                } else {
                  result.innerHTML += `<div class='ex-container'><b>Example:</b> <p class="example">"${definitionss.example.replace(searchInput, `<span class='wordInExample'>${searchInput}</span>`)}"</p></div>`;
                }
                result.innerHTML += `</div>`;
              }
            }
            if (datas.phonetics.length > 0) {
              document.getElementById("voice").style.display = "block";

              for (let m = 0; m < datas.phonetics.length; m++) {
                const pronuonciation = datas.phonetics[m];
                if (pronuonciation.audio.length > 0) {
                  document.getElementById("voice").style.display = "block";
                  sound.setAttribute("src", pronuonciation.audio);
                  m = datas.phonetics.length;
                } else {
                  sound.setAttribute("src", "");
                  document.getElementById("voice").style.display = "none";
                }
              }
            } else {
              sound.setAttribute("src", "");
              document.getElementById("voice").style.display = "none";
            }
          }
        } else {
          result.style.fontFamily = "'Roboto', sans-serif";

          result.innerHTML += `<div class='error animate__animated animate__shakeX'>
        <h3>${data.title}</h3>
        <p>${data.message}</p>
        <p>${data.resolution}</p>
        </div>`;
        }
      });
  }
});

function clearInput() {
  document.getElementById("search-input").value = "";
  result.innerHTML = ``;
}

function playSound() {
  sound.play();
}
