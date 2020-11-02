class Song {

    canciones = [];

    constructor() {
    }

    setItemLi(padre, element_canco) {

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

function loadSongs(lista_canciones) {

    let musica = new Song();
    let ul_musicas = document.getElementsByTagName('ul')[2];
    ul_musicas.innerHTML = '';

    for (let i = 0; i < lista_canciones.length; i++) {
        musica.setItemLi(ul_musicas, lista_canciones[i]);
    }
}

function loadOverview(lista_canciones) { // Done
    console.log("función overView: ", lista_canciones);
    loadSongs(lista_canciones);
}

function loadTenListened(lista_canciones) { // working

    let arr_cancons = lista_canciones.slice(0, 10);

    arr_cancons = arr_cancons.sort((a, b) => b.listeners - a.listeners);

    console.log("función top 10: ", arr_cancons);

    loadSongs(arr_cancons);
}

function loadBiggest(lista_canciones) { // Done

    let arr_noms = lista_canciones.map((element) => element.artist.name);
    let bandes = [...new Set(arr_noms)]; // borrem repetides
    let temporal = [];

    bandes.map((element) => temporal.push({ banda: element, reproduccions: 0 })); // creem els elements dins

    bandes.map((banda, i) => // si la música pertany a la banda, sumem les reproduccions al nº total de la banda
        lista_canciones.map((element) => (element.artist.name == banda ?
            temporal[i].reproduccions += parseInt(element.listeners) : 0))
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

function main(texto_json) { // done 3/5

    Song.canciones = texto_json;

    for (let i = 0; i < 3; i++) {
        let n = document.getElementsByTagName('ul')[1].children[i];
        n.addEventListener("click", listener_opciones);
    }

    document.getElementsByTagName('ul')[1].children[0].id = "opcion_seleccionada"; // color rojo predeterminado
    loadSongs(texto_json);
}

window.onload = init;