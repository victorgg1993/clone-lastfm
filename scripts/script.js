

class Song {

    canciones = [];

    constructor() {
    }

    setItemLi(padre, element_canco) { // Done

        let li_musica = document.createElement('li');
        li_musica.innerHTML =
            `
        <div>
            <img src="./img/icona.png" alt="">
            <p>${parseInt(element_canco["@attr"].rank) + 1}. </p>
            <h1>${element_canco.artist.name}</h1>
            <h2>${element_canco.name}</h2>
        </div>
        
        <div>
            <p>${element_canco.listeners} listeners</p>
        </div>
        `;
        padre.appendChild(li_musica);
    }

    setItemGroupName(group, url) {
    }
    setItemSongTitle(title) {
    }
    setListeners(listeners) {
    }
    getNewElement(group, url, title, listeners) {
    }
}

function loadSongs(lista_canciones) { // Done

    let musica = new Song();
    let ul_musicas = document.getElementsByTagName('ul')[2];
    ul_musicas.innerHTML = '';

    for (let i = 0; i < lista_canciones.length; i++) {
        musica.setItemLi(ul_musicas, lista_canciones[i]);
    }
}

function loadRock(lista_canciones) {
    console.log("rock");
    loadSongs(lista_canciones);
}

function loadHipHop(lista_canciones) {
    console.log("hip hop");
    loadSongs(lista_canciones);
}

function loadIndie(lista_canciones) {
    console.log("indie");
    loadSongs(lista_canciones);
}

function loadJazz(lista_canciones) {
    console.log("indie");
    loadSongs(lista_canciones);
}

function loadReggae(lista_canciones) {
    console.log("reggae");
    loadSongs(lista_canciones);
}

function loadOverview(lista_canciones) { // Done
    loadSongs(lista_canciones);
}

function loadTenListened(lista_canciones) { // Done
    let arr_cancons = lista_canciones.slice(0, 10);
    loadSongs(arr_cancons.sort((a, b) => b.listeners - a.listeners));
}

function loadBiggest(lista_canciones) { // Done

    let arr_noms = lista_canciones.map((element) => element.artist.name);
    let bandes = [...new Set(arr_noms)]; // borrem repetides
    let temporal = [];

    bandes.map((element) => temporal.push({ banda: element, reproduccions: 0 })); // creem els elements dins

    bandes.map((banda, i) => // si la música pertany a la banda, sumem les reproduccions al nº total de la banda
        lista_canciones.map((musica) => (musica.artist.name == banda ?
            temporal[i].reproduccions += parseInt(musica.listeners) : 0))
    );

    let biggest_band = temporal.sort((a, b) => b.reproduccions - a.reproduccions)[0];
    temporal = [];

    lista_canciones.map((musica) => (musica.artist.name == biggest_band.banda ? temporal.push(musica) : 0));

    loadSongs(temporal);
}

function init() { // Done

    fetch(`./db/music.json`)
        .then(respuesta =>
            respuesta.json()
        ).then(
            (respuesta) => {

                main(respuesta);
            }
        );
}

function colorear_opcion(opcion) {  // Done

    const OVERVIEW = 0;
    const TOP10 = 1;
    const BIGGEST = 2;

    let elemento_li = document.getElementsByTagName('ul')[1].children;
    elemento_li[OVERVIEW].id = "";
    elemento_li[TOP10].id = "";
    elemento_li[BIGGEST].id = "";

    elemento_li[opcion].id = "opcion_seleccionada";
}

function listener_opciones(evento) {  // Done

    // canviem el nom del títol 2 pel nom escollit
    document.querySelector('h2').innerHTML = evento.explicitOriginalTarget.textContent;

    switch (evento.explicitOriginalTarget.textContent) {
        case "Overview":
            loadOverview(Song.canciones);
            colorear_opcion(0);
            break;

        case "Top 10 listen":
            loadTenListened(Song.canciones);
            colorear_opcion(1);
            break;

        case "The Biggest":
            loadBiggest(Song.canciones);
            colorear_opcion(2);
            break;
    }
}

function listener_estilos_musicales(evento) { // working

    let t = evento.explicitOriginalTarget.id;
    let id_boto = t.replace(/^\D+/g, '');

    switch (id_boto) {
        case 0:
            break;

        case 1:
            break;

        case 2:
            break;

        case 3:
            break;

        case 4:
            break;
    }

}

function crear_listeners(id, funcio_listener) { // Done

    let tamany = document.getElementsByTagName('ul')[id].children.length;

    for (let i = 0; i < tamany; i++) {
        let n = document.getElementsByTagName('ul')[id].children[i];
        n.addEventListener("click", funcio_listener);
    }
}

function main(texto_json) { // done 3/5

    const IMG_ESTILOS_MUSICALES = 0;
    const OPCIONES_ESTILOS = 1;

    Song.canciones = texto_json;

    crear_listeners(IMG_ESTILOS_MUSICALES, listener_estilos_musicales);
    crear_listeners(OPCIONES_ESTILOS, listener_opciones);

    colorear_opcion(0); // texto Overwiev, colorear en rojo como el predeterminado
    loadOverview(texto_json);
}

window.onload = init;