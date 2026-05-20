// VARIABLES
let currentDepartures = [];
let currentDeparturesIndex = 0;
let currentDeparturesInterval = null;

// CONSTANTS
// > ELEMENTS
const platformLabel = document.getElementById("platform-display-label");
const platformAnnouncementsBody = document.getElementById("platform-display-announcements-body");

const departureRows = document.getElementById("departure-rows");
const departurePages = document.getElementById("departure-pages");

const departureStationSelect = document.getElementById("departure-station-selection");
const departurePlatformSelect = document.getElementById("departure-platform-selection");

const BART_API_KEY = "MW9S-E7SL-26DU-VV8V"; // public key: https://www.bart.gov/schedules/developers/api, will move to private env

// > DATA
let STATIONS_DATA = [];

const MAX_DEPARTURES_COUNT = 2;
const DEPARTURES_ROTATION_INTERVAL = 5000;

// FUNCTIONS
// > GETTERS
async function getAdvisories() {
  const urlSearchParams = new URLSearchParams({
    cmd: "bsa", key: BART_API_KEY, json: "y"
  });

  const url = `https://api.bart.gov/api/bsa.aspx?${urlSearchParams.toString()}`;
  const response = await fetch(url);
  const advisoriesData = await response.json();

  if (!response.ok || !advisoriesData.root) {
    console.error(`Error when fetching from BART API:`, advisoriesData);
    return null;
  }

  const advisories = advisoriesData.root.bsa || [];
  return advisories;
}

async function getStationEtds(stationCode, platform) {
  // fetch from api
  const urlSearchParams = new URLSearchParams({
    cmd: "etd", orig: stationCode.toUpperCase(), plat: platform, key: BART_API_KEY, json: "y"
  });

  const url = `https://api.bart.gov/api/etd.aspx?${urlSearchParams.toString()}`;
  const response = await fetch(url);
  const etdData = await response.json();

  if (!response.ok || !etdData.root?.station?.[0]) {
    console.error(`Error when fetching from BART API:`, etdData);
    return null;
  }

  const stationData = etdData.root.station[0];

  // sort departures
  const departures = [];
  for (const etd of stationData.etd || []) {
    for (const estimate of etd.estimate || []) {
      departures.push({ destination: etd.destination, minutes: estimate.minutes, cars: estimate.length, color: estimate.color });
    }
  }
  departures.sort((departure1, departure2) => {
    const departure1Minutes = departure1.minutes === "Leaving" ? 0 : departure1.minutes;
    const departure2Minutes = departure2.minutes === "Leaving" ? 0 : departure2.minutes;
    return departure1Minutes - departure2Minutes;
  });

  return {
    name: stationData.name, abbr: stationData.abbr, departures: departures
  };
}

function getStationDataFromStationCode(stationCode) {
  return STATIONS_DATA.find(station => station.abbr === stationCode);
}

// > RENDER
function createDepartureRow(destination, minutes, carsCount, color) {
  const departureRow = document.createElement("div");
  departureRow.className = "departure-row";

  const departureText = document.createElement("div");
  departureText.className = "departure-text";

  const departureDestination = document.createElement("span");
  departureDestination.className = "departure-destination";
  departureDestination.textContent = destination;

  const departureMinutes = document.createElement("span");
  departureMinutes.className = "departure-minutes";
  departureMinutes.innerHTML = `${minutes} <span class="departure-minutes-label">min</span>`;

  const departureCars = document.createElement("div");
  departureCars.className = "departure-cars";
  for (let carIndex = 0; carIndex < carsCount; carIndex++) {
    const carBox = document.createElement("div");
    carBox.className = `car-box ${color.toLowerCase()}-line`;
    departureCars.appendChild(carBox);
  }

  departureText.appendChild(departureDestination);
  departureText.appendChild(departureMinutes);

  departureRow.appendChild(departureText);
  departureRow.appendChild(departureCars);

  return departureRow;
}

function renderPlatformDropdowns(stationCode) {
  const stationData = getStationDataFromStationCode(stationCode);
  departurePlatformSelect.innerHTML = "";
  for (const platform of stationData.platforms) {
    const platformOption = document.createElement("option");
    platformOption.value = platform;
    platformOption.textContent = `Platform ${platform}`;
    departurePlatformSelect.append(platformOption);
  }
  departurePlatformSelect.value = stationData.platforms[0];
}

function renderCurrentDeparturePages() {
  departurePages.innerHTML = "";
  const pagesCount = Math.ceil(currentDepartures.length / MAX_DEPARTURES_COUNT);
  const currentPageIndex = Math.floor(currentDeparturesIndex / MAX_DEPARTURES_COUNT);
  
  for (let pageIndex = 0; pageIndex < pagesCount; pageIndex++) {
    const pageBox = document.createElement("div");
    pageBox.className = "departure-page-box";
    if (pageIndex === currentPageIndex) {
      pageBox.classList.add("active");
    }
    departurePages.append(pageBox);
  }
}

function renderCurrentDepartureRows() {
  departureRows.innerHTML = "";
  if (currentDepartures.length === 0) {
    return;
  }
  
  const displayedDepartures = currentDepartures.slice(currentDeparturesIndex, currentDeparturesIndex + MAX_DEPARTURES_COUNT);
  for (const departure of displayedDepartures) {
    const departureRow = createDepartureRow(departure.destination, departure.minutes, departure.cars, departure.color);
    departureRows.append(departureRow);
  }

  renderCurrentDeparturePages();
}

async function renderAdvisories() {
  const advisories = await getAdvisories();
  if (!advisories || advisories.length === 0) {
    platformAnnouncementsBody.textContent = "NO CURRENT ADVISORIES";
  } else {
    platformAnnouncementsBody.textContent = advisories[0].description["#cdata-section"].toUpperCase();
  }
}

// > FUNCTIONALITY
function resetDeparturesInterval() {
  if (currentDeparturesInterval) {
    clearInterval(currentDeparturesInterval);
  }
  if (currentDepartures.length <= MAX_DEPARTURES_COUNT) {
    return;
  }

  currentDeparturesInterval = setInterval(() => {
    currentDeparturesIndex += MAX_DEPARTURES_COUNT;
    if (currentDeparturesIndex >= currentDepartures.length) {
      currentDeparturesIndex = 0;
    }
    renderCurrentDepartureRows();
  }, DEPARTURES_ROTATION_INTERVAL);
}

async function updatePlatformDisplay() {
  const stationCode = departureStationSelect.value;
  const platform = departurePlatformSelect.value;
  
  platformLabel.textContent = `PLATFORM ${platform}`;

  // get station data
  currentDepartures = [];
  currentDeparturesIndex = 0;
  const stationEtds = await getStationEtds(stationCode, platform);
  if (stationEtds) {
    currentDepartures = stationEtds.departures;
  }

  renderCurrentDepartureRows();
  resetDeparturesInterval();
  await renderAdvisories();
}

// > INITIALIZE
async function loadStationsData() {
   try {
        const stationsResponse = await fetch("./data/stations.json");
        STATIONS_DATA = await stationsResponse.json();
    } catch(error) {
        console.log("Failed to fetch stations data:", error);
    }
}

async function loadStationDropdowns() {
  for (const station of STATIONS_DATA) {
    const stationOption = document.createElement("option");
    stationOption.value = station.abbr;
    stationOption.textContent = station.name;
    departureStationSelect.append(stationOption);
  }

  departureStationSelect.addEventListener("change", () => {
    renderPlatformDropdowns(departureStationSelect.value);
    updatePlatformDisplay();
  });
  departurePlatformSelect.addEventListener("change", () => {
    updatePlatformDisplay();
  })

  const defaultStation = STATIONS_DATA[0];
  departureStationSelect.value = defaultStation.abbr;
  renderPlatformDropdowns(defaultStation.abbr);
  updatePlatformDisplay();
}

await loadStationsData();
loadStationDropdowns();