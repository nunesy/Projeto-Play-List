// vamos selecionar todas as tags ou elementos necessários

const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicNome = wrapper.querySelector(".song-details .nome"),
musicArtista = wrapper.querySelector(".song-details .artista"),
mainAudio = wrapper.querySelector("#main-audio"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next");

let musicIndex = 1;

window.addEventListener("load", ()=>{
    loadMusic(musicIndex); //chamando a função (carregar musica) assim que a janela for carregada.
})
// função carregar música
function loadMusic(indexNumb){
    musicNome.innerText = allMusic[indexNumb - 1].nome;
    musicArtista.innerText = allMusic[indexNumb - 1].artista;
    musicImg.src =`fotos/${allMusic[indexNumb - 1].img}.jpg`;
    mainAudio.src = `sons/${allMusic[indexNumb - 1].src}.mp3`;
}


//função tocar música.
function playMusic(){
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
}

//função parar música.
function pauseMusic(){
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
}

//função próxima música
function nextMusic(){
    musicIndex++;
    loadMusic(musicIndex);
    playMusic();
}

//função música anterior
function prevMusic(){
    musicIndex--;
    loadMusic(musicIndex);
    playMusic();
}

//evento de botão de reprodução ou música
playPauseBtn.addEventListener("click", ()=>{
    const isMusicPaused = wrapper.classList.contains("paused");
    //Se isMusicPaused for verdade chame pauseMusic ou então chame playMusic.
    isMusicPaused ? pauseMusic() : playMusic();
    });

//evento de próxima música
nextBtn.addEventListener("click", ()=>{
    nextMusic(); // ligação com a função próxima música.
});

//evento de música anterior
prevBtn.addEventListener("click", ()=> {
    prevMusic(); // ligação com a função música anterior
});