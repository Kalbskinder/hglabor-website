import * as skinview3d from "skinview3d";

const canvas = document.getElementById("skin-container");
const inv_canvas = document.getElementById("inv-skin-container");
const button = document.getElementById("loadSkin");
const input = document.getElementById("username");

const uuid = getQueryParam("user");
const skinUrl = `https://crafatar.com/skins/${uuid}`;


// Skin-Viewer erstellen
const viewer = new skinview3d.SkinViewer({
    canvas: canvas,
    width: 300,
    height: 400,
    skin: skinUrl
});

const invViewer = new skinview3d.SkinViewer({
  canvas: inv_canvas,
  height: 202,
  width: 140,
  skin: skinUrl
});

invViewer.controls.enableRotate = true;
invViewer.controls.enableZoom = false;

viewer.animation = new skinview3d.IdleAnimation();
viewer.controls.enableRotate = true;
viewer.controls.enableZoom = false;
viewer.zoom = 0.8;

await loadStats(uuid);
await loadCape(uuid);

async function loadCape(uuid) {
  const url = `https://crafatar.com/capes/${uuid}`;
  const res = await fetch(url);
  if (res.status === 400) {
    viewer.loadCape(null); // Kein Cape vorhanden, also null laden
    invViewer.loadCape(null); // Kein Cape vorhanden, also null
  } else if (res.ok) {
    viewer.loadCape(url); // Cape existiert und wird geladen
    invViewer.loadCape(url); // Cape existiert und wird geladen
  } else {
    console.log(`User ${uuid} has no cape.`)
    viewer.loadCape(null); // Setzt das Cape auf null, wenn es nicht geladen werden konnte
    invViewer.loadCape(null); // Setzt das Cape auf null, wenn es nicht geladen werden konnte
  }
}

async function loadStats(uuid) {
  const response = await fetch(`https://api.minetools.eu/uuid/${uuid}`);
  const data = await response.json();  // `await` hinzufügen

  const formattedUuid = formatUUID(uuid);
  const hgStats = await loadHGLaborStats(formattedUuid);

  const statsContainer = document.querySelector('.stats');
  statsContainer.innerHTML = `
    <div><img class="icon" src="/images/items/421-0.png" alt="username"> Username: ${data.name}</div>
    ${hgStats}
  `;

}


async function loadHGLaborStats(uuid) {
  const response = await fetch(`https://api.hglabor.de/stats/ffa/${uuid}`)
  const data = await response.json();
  console.log(data);
  const kdr = (data.deaths === 0) ? data.kills : (data.kills / data.deaths).toFixed(2);

  const stats = `
  <div><img class="icon" src="/images/items/276-0.png" alt="kills"> Kills: ${data.kills}</div>
  <div><img class="icon" src="/images/items/397-0.png" alt="deaths"> Deaths: ${data.deaths}</div>
  <div><img class="icon" src="/images/items/327-0.png" alt="kdr"> KDR: ${kdr}</div>
  <div><img class="icon" src="/images/items/266-0.png" alt="bounty"> Bounty: ${data.bounty}</div>
  <div><img class="icon" src="/images/items/449-0.png" alt="top killstreak"> Highest Killstreak: ${data.highestKillStreak}</div>
  <div><img class="icon" src="/images/items/377-0.png" alt="killstreak"> Current Killstreak: ${data.currentKillStreak}</div>
  `
  return stats;
}

function formatUUID(uuid) {
  return uuid.replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, '$1-$2-$3-$4-$5');
}

// Funktion zum Parsen von URL-Parametern
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}
