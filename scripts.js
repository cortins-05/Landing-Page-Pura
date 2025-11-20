/* Navegacion opaca */
let navegacion = $('#navegacion');
let tamañoVentana = window.innerHeight;
window.addEventListener("scroll", () => {
    if(menu){
        let alpha = window.scrollY / tamañoVentana * 5.5;

        if(alpha > 1) alpha = 1; // límite máximo
        navegacion.css("background-color",`rgba(0,0,0,${alpha})`);
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
    navegacion.css("background-color","black");
    menuDesplegable.css("display","grid");
    menuDesplegable.css("transform",`translateY(${(alturaNavegacion+tamañoVentana)}px)`);
}
function contraer() {
    $('#menu span:first').css("transform","rotateZ(0) translateY(0)");
    $('#menu span:last').css("transform","rotateZ(0) translateY(0)");
    $('#menu span:nth-child(2)').css("transform","translateX(0px)");
    let alpha = window.scrollY / tamañoVentana * 1.5;
    navegacion.css("background-color",`rgba(0,0,0,${alpha})`);
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

/* Carousel */
$(document).ready(function () {
    const track = $(".carousel-track");
    const slides = $(".slide");

    track.prepend(slides.last().clone());
    track.append(slides.first().clone());

    let index = 1;
    let slideWidth = slides.first().width();

    track.css("transform", `translateX(${-slideWidth * index}px)`);

    function updateWidth() {
        slideWidth = $(".slide").first().width();
        track.css("transition", "none"); // quitar transición temporalmente
        track.css("transform", `translateX(${-slideWidth * index}px)`);
    }

    $(window).resize(updateWidth);

    function nextSlide() {
        index++;
        track.css("transition", "transform 0.4s ease");
        track.css("transform", `translateX(${-slideWidth * index}px)`);

        setTimeout(() => {
            if (index === slides.length + 1) { // fin real
                index = 1;
                track.css("transition", "none");
                track.css("transform", `translateX(${-slideWidth * index}px)`);
            }
        }, 400);
    }

    setInterval(nextSlide, 3000);
});



