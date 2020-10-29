# Clon Lastfm

## Descripción

Generar un fake de la web  **[last.fm](https://www.last.fm/home)**, web de playlists de canciones. El resultado se deberá parecer al que se muestra a continuación:

![Lastfm](https://imgur.com/7qw3dW1.png)


## Instrucciones


Las canciones se encuentran dentro del fichero `music.json` (**-Este fichero no es necesario tocarlo-**). Fichero con las 50 canciones más escuchadas la semana pasada. 

El formato del fichero es el siguiente:

```json
[
    {
        "name": "The Less I Know the Better",
        "duration": "0",
        "listeners": "439958",
        "mbid": "",
        "url": "https://www.last.fm/music/Tame+Impala/_/The+Less+I+Know+the+Better",
        "artist": {
            "name": "Tame Impala",
            "mbid": "63aa26c3-d59b-4da4-84ac-716b54f1ef4d",
            "url": "https://www.last.fm/music/Tame+Impala"
        },
        "@attr": {
            "rank": "0"
        },
        "genre": "reggae"
    },
  ```

Las iteraciones a realizar son:

1. Construir la clase **Song**.
2. Crear la función de carga de las canciones: **loadSong()**
3. Cargar el listado de canciones con la carga de la página
4. Crear la función **loadTenListened()**
5. Crear la función **loadOverview()**
6. Crear la función **The Biggest**
7. Crear al menos una función de carga de canciones por género.

### Iteración 1: Construir la clase Song

Tendrás que crear una clase para construir los elementos del DOM del listado de canciones, de forma dinámica:
La estructura del elemento de la lista que tendrás que generar es la siguiente:

```html
<li class="far fa-play-circle">
    <a class="group-name" title="Ir al Grupo" href="https://www.last.fm/music/Tame+Impala">Tame Impala</a>
    <a class="song-title">The Less I Know the Better</a>
    <div class="listeners">439958</div>
</li>
```
La clase tendrá un método `getNewElement()` que devolverá el elemento de lista `<li>` preparado para ser añadido al elemento `<div class="lista">`

### Iteración 2: Crear la función loadSong()

La función loadSong recibirá por parámetro el array de canciones y realizará las siguientes tareas:
- Obtendrá de cada canción los valores de los campos `  artist.name, artist.url, name, listeners` 
- pasará al objeto instanciado de la clase `Song` los campos anteriores para completar cada uno de los list item de la lista.
- añadirá el list item creado al elemento `<div class="lista">`

### Iteración 3: Cargar el listado de canciones con la carga de la página

Crea una función `init()` asociada al evento `onload` de la página. Esta función realizará las siguientes tareas:
- Asociará al título ` <h2 class=menu-item-selected></h2>` el nombre del elemento 'Overview'.
- El elemento 'Overview' quedará enfocado al cargar la página.
- Cargará el listado general de canciones.
- Asociará un callback a cada uno de los elementos `onclick` del menú principal. Los callbacks serán los siguientes:
- `loadOverview`, que cargará el listado general.
- `loadTenListened`,  cargará las 10 canciones más escuchadas.
- `loadBiggest`, cargará la información del artista con más canciones en el ranking.

### Iteración 4: Crear la función **loadTenListened()**

La función loadTenListened deberá filtrar las 10 canciones más escuchadas de la lista y mostrarlas por pantalla.
Las tareas a realizar son:
- Realizar una copia del array para no modificar el array original.
- Ordenar los elementos del nuevo array.
- Filtrar los primeros 10 elementos
- Invocar al método loadSong pasándole el nuevo array.

### Iteración 5: Crear la función **loadOverview()**

Esta función invocará a la función `loadSong()` con el array original.

### Iteración 6: Crear la función loadBiggest()

Esta función deberá devolver un elemento div con el nombre del artista, canciones y número de escuchas totales.

Las tareas a realizar son:
- Obtener un nuevo array con la información agrupada por artista y número de escuchas.
- Filtrar el array con el nombre del artista para obtener las canciones.
- Generar el elemento div con la información.

### Iteración 7: Crear al menos una función de carga de canciones por género

Asociar un callback a uno de los elementos de la barra superior de géneros musicales.

Programar el callback `loadGenre()` para pasarle el género y filtrar las canciones que tengan ese género asociado.
