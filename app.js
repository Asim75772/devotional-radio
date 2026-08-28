const radioGrid = document.getElementById("radioGrid");
const bengaliGrid = document.getElementById("bengaliGrid");
const hindiGrid = document.getElementById("hindiGrid");
const deityGrid = document.getElementById("deityGrid");
const mantraGrid = document.getElementById("mantraGrid");

const audio = document.getElementById("audio");

const playBtn = document.getElementById("playBtn");

const playerName = document.getElementById("playerName");
const playerCategory = document.getElementById("playerCategory");
const playerIcon = document.getElementById("playerIcon");

const volume = document.getElementById("volume");

const search = document.getElementById("search");

let currentStation = null;
let isPlaying = false;


/* CREATE CARD */

function createCard(station) {

  const card = document.createElement("div");

  card.className = "radio-card";

  card.innerHTML = `

    <div class="radio-icon">
      ${station.icon}
    </div>

    <h3>${station.name}</h3>

    <p>
      ${station.language} • ${station.category}
    </p>

    <span class="live">
      ● LIVE RADIO
    </span>

    <button class="listen-btn">
      ▶ Listen
    </button>

  `;


  card.querySelector(".listen-btn")
      .addEventListener("click", () => {

        playStation(station);

      });


  return card;
}


/* RENDER */

function renderStations(list = stations) {

  radioGrid.innerHTML = "";

  list.forEach(station => {

    radioGrid.appendChild(
      createCard(station)
    );

  });


  renderCategory(
    bengaliGrid,
    list.filter(
      station =>
        station.language === "Bengali"
    )
  );


  renderCategory(
    hindiGrid,
    list.filter(
      station =>
        station.language === "Hindi"
    )
  );


  renderCategory(
    deityGrid,
    list.filter(
      station =>
        [
          "Shiva",
          "Krishna",
          "Devi",
          "Ganesha",
          "Hanuman",
          "Sai Baba"
        ].includes(station.category)
    )
  );


  renderCategory(
    mantraGrid,
    list.filter(
      station =>
        [
          "Vedic & Mantra",
          "Kirtan",
          "Bhajan & Spiritual"
        ].includes(station.category)
    )
  );

}


/* CATEGORY */

function renderCategory(element, list) {

  element.innerHTML = "";

  list.forEach(station => {

    element.appendChild(
      createCard(station)
    );

  });

}


/* PLAY RADIO */

function playStation(station) {

  currentStation = station;

  playerName.textContent =
    station.name;

  playerCategory.textContent =
    station.category;

  playerIcon.textContent =
    station.icon;


  if (!station.stream) {

    window.open(
      station.website,
      "_blank"
    );

    return;
  }


  audio.src = station.stream;

  audio.volume =
    Number(volume.value);

  audio.play()
    .then(() => {

      isPlaying = true;

      playBtn.textContent = "⏸";

    })
    .catch(error => {

      console.log(
        "Radio playback error:",
        error
      );

    });

}


/* PLAY / PAUSE */

playBtn.addEventListener(
  "click",
  () => {

    if (!currentStation) {
      return;
    }


    if (!stationHasStream(currentStation)) {

      window.open(
        currentStation.website,
        "_blank"
      );

      return;
    }


    if (audio.paused) {

      audio.play();

      isPlaying = true;

      playBtn.textContent = "⏸";

    } else {

      audio.pause();

      isPlaying = false;

      playBtn.textContent = "▶";

    }

  }
);


/* CHECK STREAM */

function stationHasStream(station) {

  return (
    station &&
    station.stream &&
    station.stream.trim() !== ""
  );

}


/* VOLUME */

volume.addEventListener(
  "input",
  () => {

    audio.volume =
      Number(volume.value);

  }
);


/* SEARCH */

search.addEventListener(
  "input",
  () => {

    const query =
      search.value
        .toLowerCase()
        .trim();


    if (!query) {

      renderStations();

      return;

    }


    const filtered =
      stations.filter(station =>

        station.name
          .toLowerCase()
          .includes(query)

        ||

        station.language
          .toLowerCase()
          .includes(query)

        ||

        station.category
          .toLowerCase()
          .includes(query)

      );


    renderStations(filtered);

  }
);


/* MOBILE MENU */

const menuBtn =
  document.getElementById("menuBtn");

const nav =
  document.getElementById("nav");


menuBtn.addEventListener(
  "click",
  () => {

    nav.classList.toggle("show");

  }
);


/* START */

renderStations();
