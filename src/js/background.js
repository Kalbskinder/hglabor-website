const body = document.body;

// Liste der Hintergrundbilder
const backgrounds = [
  'url("/images/bg/1.jpg")',
  'url("/images/bg/2.jpg")',
  'url("/images/bg/3.jpg")',
  'url("/images/bg/4.jpg")'
];

let currentIndex = 0; // Startindex

function changeBackground() {
  currentIndex = (currentIndex + 1) % backgrounds.length; // Nächstes Bild setzen
  const newBg = backgrounds[currentIndex];

  // Neues Bild als zweite Ebene setzen
  const bgDiv = document.createElement("div");
  bgDiv.classList.add("background-fade");
  bgDiv.style.backgroundImage = newBg;

  // Zum Body hinzufügen
  document.body.appendChild(bgDiv);

  // Verzögerung einbauen, um den Fade-In-Effekt für das neue Bild zu starten
  setTimeout(() => {
    bgDiv.classList.add("show"); // Fade-In für das neue Bild
  }, 10); // Kurze Verzögerung, um den Übergangseffekt zu ermöglichen

  // Verzögerung einbauen, damit der Fade-Out-Effekt für das alte Bild sichtbar ist
  setTimeout(() => {
    const oldBg = document.querySelectorAll(".background-fade");
    if (oldBg.length > 1) {
      const oldImage = oldBg[0];
      oldImage.classList.remove("show"); // Fade-Out für das alte Bild
      setTimeout(() => {
        oldImage.remove(); // Entfernen des alten Bildes nach dem Fade-Out
      }, 1000); 
    }
  }, 1000);
}

changeBackground();

setInterval(changeBackground, 10000);
