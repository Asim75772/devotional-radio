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

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

let currentStation = null;


/* =========================================
   CREATE RADIO CARD
========================================= */

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


    const button = card.querySelector(".listen-btn");


    button.addEventListener("click", function () {

        playStation(station);

    });


    return card;
}


/* =========================================
   DISPLAY ALL RADIO
========================================= */

function renderStations(list = stations) {

    radioGrid.innerHTML = "";

    list.forEach(function (station) {

        radioGrid.appendChild(
            createCard(station)
        );

    });


    /* Bengali */

    renderCategory(
        bengaliGrid,

        list.filter(function (station) {

            return station.language === "Bengali";

        })
    );


    /* Hindi */

    renderCategory(
        hindiGrid,

        list.filter(function (station) {

            return station.language === "Hindi";

        })
    );


    /* Deity */

    renderCategory(
        deityGrid,

        list.filter(function (station) {

            return [

                "Shiva",
                "Krishna",
                "Devi",
                "Ganesha",
                "Hanuman",
                "Sai Baba"

            ].includes(station.category);

        })
    );


    /* Mantra / Spiritual */

    renderCategory(
        mantraGrid,

        list.filter(function (station) {

            return [

                "Vedic & Mantra",
                "Kirtan",
                "Bhajan & Spiritual"

            ].includes(station.category);

        })
    );

}


/* =========================================
   CATEGORY DISPLAY
========================================= */

function renderCategory(element, list) {

    element.innerHTML = "";

    list.forEach(function (station) {

        element.appendChild(
            createCard(station)
        );

    });

}


/* =========================================
   CHECK STREAM
========================================= */

function stationHasStream(station) {

    return (

        station &&
        station.stream &&
        station.stream.trim() !== ""

    );

}


/* =========================================
   PLAY RADIO
========================================= */

function playStation(station) {

    currentStation = station;


    /* Update player information */

    playerName.textContent =
        station.name;

    playerCategory.textContent =
        station.category;

    playerIcon.textContent =
        station.icon;


    /* If direct stream is not available */

    if (!stationHasStream(station)) {

        alert(
            "এই Radio-র Live Stream এখনো যোগ করা হয়নি।"
        );

        return;

    }


    /* Stop previous radio */

    audio.pause();


    /* Set new stream */

    audio.src = station.stream;

    audio.load();


    /* Set volume */

    audio.volume =
        Number(volume.value);


    /* Start radio */

    audio.play()

        .then(function () {

            playBtn.textContent = "⏸";

        })

        .catch(function (error) {

            console.log(
                "Radio playback error:",
                error
            );

            alert(
                "Radio চালু করা যাচ্ছে না। Stream URL পরীক্ষা করুন।"
            );

            playBtn.textContent = "▶";

        });

}


/* =========================================
   PLAY / PAUSE BUTTON
========================================= */

playBtn.addEventListener(
    "click",

    function () {

        /* No station selected */

        if (!currentStation) {

            alert(
                "প্রথমে একটি Radio নির্বাচন করুন।"
            );

            return;

        }


        /* No stream */

        if (!stationHasStream(currentStation)) {

            alert(
                "এই Radio-র Live Stream এখনো যোগ করা হয়নি।"
            );

            return;

        }


        /* PAUSE */

        if (!audio.paused) {

            audio.pause();

            playBtn.textContent = "▶";

            return;

        }


        /* PLAY */

        audio.play()

            .then(function () {

                playBtn.textContent = "⏸";

            })

            .catch(function (error) {

                console.log(
                    "Playback error:",
                    error
                );

                alert(
                    "Radio চালু করা যাচ্ছে না।"
                );

            });

    }
);


/* =========================================
   VOLUME CONTROL
========================================= */

volume.addEventListener(
    "input",

    function () {

        audio.volume =
            Number(volume.value);

    }
);


/* =========================================
   RADIO ENDED
========================================= */

audio.addEventListener(
    "ended",

    function () {

        playBtn.textContent = "▶";

    }
);


/* =========================================
   RADIO ERROR
========================================= */

audio.addEventListener(
    "error",

    function () {

        playBtn.textContent = "▶";

        console.log(
            "Radio stream error"
        );

    }
);


/* =========================================
   SEARCH
========================================= */

search.addEventListener(
    "input",

    function () {

        const query =
            search.value
                .toLowerCase()
                .trim();


        /* Empty search */

        if (!query) {

            renderStations();

            return;

        }


        /* Search */

        const filtered =
            stations.filter(function (station) {

                return (

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

            });


        renderStations(filtered);

    }
);


/* =========================================
   MOBILE MENU
========================================= */

menuBtn.addEventListener(
    "click",

    function () {

        nav.classList.toggle("show");

    }
);


/* =========================================
   CLOSE MENU AFTER CLICK
========================================= */

const navLinks =
    nav.querySelectorAll("a");


navLinks.forEach(function (link) {

    link.addEventListener(
        "click",

        function () {

            nav.classList.remove("show");

        }
    );

});


/* =========================================
   START APPLICATION
========================================= */

renderStations();


/* =========================================
   DEFAULT VOLUME
========================================= */

audio.volume =
    Number(volume.value);
