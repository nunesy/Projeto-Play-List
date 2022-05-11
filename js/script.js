// vamos selecionar todas as tags ou elementos necessários

const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicNome = wrapper.querySelector(".song-details .nome"),
musicArtista = wrapper.querySelector(".song-details .artista"),
mainAudio = wrapper.querySelector("#main-audio"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next"),
progressArea = wrapper.querySelector(".progress-area"),
progressBar = wrapper.querySelector(".progress-bar");

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
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

//função música anterior
function prevMusic(){
    musicIndex--;
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
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

//atualizar a largura da barra de progresso de acordo com o tempo atual da música
mainAudio.addEventListener("timeupdate", (e)=>{
    const currentTime = e.target.currentTime; // obtendo o tempo atual da música
    const duration = e.target.duration; // obtendo a duração total da música
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = wrapper.querySelector(".current"),
    musicDuration = wrapper.querySelector(".duration");

    mainAudio.addEventListener("loadeddata", ()=>{
        // atualizar duração total da música
        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSeg = Math.floor(audioDuration % 60);
        if(totalSeg < 10){ // Adicionando 0 se o segundo for menor que 10.
            totalSeg = `0${totalSeg}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSeg}`;
    });

    // atualizar duração corrente da música
    let currentMin = Math.floor(currentTime / 60);
    let currentSeg = Math.floor(currentTime % 60);
    if(currentSeg < 10){ // Adicionando 0 se o segundo for menor que 10.
        currentSeg = `0${currentSeg}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSeg}`;
});

//vamos atualizar a hora atual da música de acordo com a largura da barra de progresso
progressArea.addEventListener("click", (e)=>{
    let progressWidthval = progressArea.clientWidth; // obtendo largura da barra de progresso
    let clickedOffSetX = e.offsetX; // obtendo offset x valor
    let songDuration = mainAudio.duration; // obtendo a duração total da música

    mainAudio.currentTime = (clickedOffSetX / progressWidthval) * songDuration;
});
