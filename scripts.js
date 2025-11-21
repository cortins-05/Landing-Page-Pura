/* Navegacion opaca */
let navegacion = $('#navegacion');
let tamañoVentana = window.innerHeight;

function zonaOpacidad() {
    let alpha = window.scrollY / tamañoVentana * 5.5;

    if(alpha > 1) alpha = 1; // límite máximo
    navegacion.css("background-color",`rgba(10,31,68,${alpha})`);
}

zonaOpacidad();

window.addEventListener("scroll", () => {
    if(menu){
        zonaOpacidad();
    }
});


/* Menu Desplegable */
let menuDesplegable = $('#menu-desplegable');
let alturaNavegacion = navegacion.height()-3;

menuDesplegable.css("top",`-${tamañoVentana}px`);
menuDesplegable.css("height", `calc(100vh - ${alturaNavegacion}px)`);

function expander(){
    $('#menu span:first').css("transform","rotateZ(135deg) translateY(-9px)");
    $('#menu span:last').css("transform","rotateZ(-135deg) translateY(10px)");
    $('#menu span:nth-child(2)').css("transform","translateX(6px)");
    navegacion.css("background-color","rgb(10, 31, 68)");
    menuDesplegable.css("display","grid");
    menuDesplegable.css("transform",`translateY(${(alturaNavegacion+tamañoVentana)}px)`);
}
function contraer() {
    $('#menu span:first').css("transform","rotateZ(0) translateY(0)");
    $('#menu span:last').css("transform","rotateZ(0) translateY(0)");
    $('#menu span:nth-child(2)').css("transform","translateX(0px)");
    let alpha = window.scrollY / tamañoVentana * 1.5;
    navegacion.css("background-color",`rgba(10,31,68,${alpha})`);
    menuDesplegable.css("transform",`translateY(0px)`);
}

let menu = true;
$('#menu').click(()=>{
    if(menu){
        expander();
    }else{
        contraer();
    }
    menu = !menu;
})

$('#menu-desplegable a').click(()=>{
    contraer();
    menu = true;
})

$('#logo').click(()=>{
    contraer();
    menu = true;
})

class Carousel {
    constructor(trackSelector, slideSelector, interval = 3000, transitionTime = 400) {
        this.track = $(trackSelector);
        this.slides = $(slideSelector, this.track);
        this.index = 1;
        this.interval = interval;
        this.transitionTime = transitionTime;

        this.init();
        this.start();
        $(window).resize(() => this.updateWidth());
    }

    init() {
        // Clonar el primero y el último
        this.track.prepend(this.slides.last().clone());
        this.track.append(this.slides.first().clone());

        this.updateWidth();
    }

    updateWidth() {
        // Ancho del slide individual
        this.slideWidth = this.slides.first().width();
        this.track.css("transition", "none");
        this.track.css("transform", `translateX(${-this.slideWidth * this.index}px)`);
    }

    nextSlide() {
        this.index++;
        this.track.css("transition", `transform ${this.transitionTime}ms ease`);
        this.track.css("transform", `translateX(${-this.slideWidth * this.index}px)`);

        setTimeout(() => {
            if (this.index === this.slides.length + 1) {
                this.index = 1;
                this.track.css("transition", "none");
                this.track.css("transform", `translateX(${-this.slideWidth * this.index}px)`);
            }
        }, this.transitionTime);
    }

    start() {
        this.intervalId = setInterval(() => this.nextSlide(), this.interval);
    }

    stop() {
        clearInterval(this.intervalId);
    }
}

$(document).ready(function () {
    new Carousel("#carousel-track", ".slide", 3000, 400);
    new Carousel("#contenido-empresa", ".display", 4000, 500);
});


/* Noticias España (Simuladas) */
const url = "https://api.rss2json.com/v1/api.json?rss_url=https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/portada";

fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data.items);
        if(data.status=="ok"&&data.items.length>=3){
            for(let i = 0; i<3 ; i++){
                let elementoDiv = document.createElement("div");
                elementoDiv.className = "noticia";
                
                let tituloNoticia = document.createElement("h3");
                tituloNoticia.className = "anton";
                tituloNoticia.textContent = data.items[i].title;

                let imagenNoticia = document.createElement("img");
                let imagen;
                if(data.items[i].enclosure.thumbnail){
                    imagen = data.items[i].enclosure.thumbnail;
                }else{
                    imagen = data.items[i].enclosure.link;
                }
                imagenNoticia.setAttribute("src",imagen);
                
                let descripcionNoticia = document.createElement("span");
                descripcionNoticia.textContent = data.items[i].description;

                elementoDiv.appendChild(tituloNoticia);
                elementoDiv.appendChild(imagenNoticia);
                elementoDiv.appendChild(descripcionNoticia);

                $("#noticias").append(elementoDiv);
            }
        }
    });

