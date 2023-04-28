const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn")
const input = document.getElementById("inp-word");

function playSound() {
    sound.play();
}

input.addEventListener("keypress", (event) => {
    if(event.key == "Enter"){
        event.preventDefault();
        btn.click();
    }
});

btn.addEventListener("click", () => {
    let aud;
    let phtex;
    let mean;
    let ex;
    let pos;
    let inpWord = document.getElementById("inp-word").value;
    fetch(`${url}${inpWord}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data[0]);
        for(val in data[0].phonetics){
            if('audio' in data[0].phonetics[val]){
                if(data[0].phonetics[val].audio.length != 0){
                    aud = data[0].phonetics[val].audio;
                }
            }
            if('text' in data[0].phonetics[val])
            {
                if(data[0].phonetics[val].text.length != 0){
                    phtex = data[0].phonetics[val].text;
                }
            }     
        }
        let broke = false;
        for(x in data[0].meanings)
        {
            for(y in data[0].meanings[x].definitions){
                if('definition' in data[0].meanings[x].definitions[y] && 'example' in data[0].meanings[x].definitions[y])
                {
                    pos = data[0].meanings[x].partOfSpeech;
                    mean = data[0].meanings[x].definitions[y].definition;
                    ex = data[0].meanings[x].definitions[y].example;
                    broke = true;
                    break;
                }
            }
            if (broke){break;}
        }
        result.innerHTML = `
            <div class="word">
                    <h3>${inpWord}</h3>
                    <button onclick = "playSound()">
                        <i class="fa-solid fa-volume-high"></i>
                    </button>
                </div>
                <div class="detail">
                    <p>${pos}</p>
                    <p>${phtex}</p>
                </div>
                <p class="word-meaning">
                    ${mean}
                </p>
                <p class="word-example">
                    ${ex}
                </p>
            </div>`;
        sound.setAttribute("src",`${aud}`);
    })
    .catch(() => {
        result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`
    });
});

//DARK MODE Toggle
const r = document.querySelector(':root');
let rs = getComputedStyle(r);

function myToggle(){
    if(rs.getPropertyValue('--button-color') == rs.getPropertyValue('--bt-light-mode')){
        r.style.setProperty('--primary-color', rs.getPropertyValue('--p-dark-mode'));
        r.style.setProperty('--secondary-color', rs.getPropertyValue('--s-dark-mode'));
        r.style.setProperty('--text-color', rs.getPropertyValue('--t-dark-mode'));
        r.style.setProperty('--indent-color', rs.getPropertyValue('--i-dark-mode'));
        r.style.setProperty('--error-color', rs.getPropertyValue('--e-dark-mode'));
        r.style.setProperty('--button-color', rs.getPropertyValue('--bt-dark-mode'));
        r.style.setProperty('--button-color-alt', rs.getPropertyValue('--bt-alt-dark-mode'));
    }
    else if(rs.getPropertyValue('--button-color') == rs.getPropertyValue('--bt-dark-mode')){
        r.style.setProperty('--primary-color', rs.getPropertyValue('--p-light-mode'));
        r.style.setProperty('--secondary-color', rs.getPropertyValue('--s-light-mode'));
        r.style.setProperty('--text-color', rs.getPropertyValue('--t-light-mode'));
        r.style.setProperty('--indent-color', rs.getPropertyValue('--i-light-mode'));
        r.style.setProperty('--error-color', rs.getPropertyValue('--e-light-mode'));
        r.style.setProperty('--button-color', rs.getPropertyValue('--bt-light-mode'));
        r.style.setProperty('--button-color-alt', rs.getPropertyValue('--bt-alt-light-mode'));
    }
}