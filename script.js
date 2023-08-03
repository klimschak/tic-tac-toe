// Der aktuelle Zustand der Felder
let fields = [
    null,     // Index 0
    null, // Index 1
    null, // Index 2
    null, // Index 3
    null,     // Index 4
    null,     // Index 5
    null,  // Index 6
    null,  // Index 7
    null,     // Index 8
  ];

  let currentPlayer = 'o'; // Startspieler (o oder x)
  let gameEnded = false; // Variable, um das Spielende zu verfolgen
  let winningCells = []; // Array für die gewinnenden Zellen
  let restartButton;
  
  // Funktion zum Erstellen eines animierten Kreises (SVG)
  function createAnimatedCircle() {
    const width = 80;
    const height = 80;
    const color = '#00b0ef';
  
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.style.width = `${width}px`;
    svg.style.height = `${height}px`;
  
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', '50');
    circle.setAttribute('cy', '50');
    circle.setAttribute('r', '28');
    circle.setAttribute('fill', 'none');
    circle.setAttribute('stroke', color);
    circle.setAttribute('stroke-width', '8');
    circle.setAttribute('stroke-dasharray', '0 176');
    circle.setAttribute('stroke-linecap', 'round');
  
    const animation = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    animation.setAttribute('attributeName', 'stroke-dasharray');
    animation.setAttribute('from', '0 176');
    animation.setAttribute('to', '176 0');
    animation.setAttribute('dur', '400ms');
    animation.setAttribute('fill', 'freeze');
  
    circle.appendChild(animation);
    svg.appendChild(circle);
  
    return svg;
  }
  
  // Funktion zum Erstellen eines animierten Kreuzes (SVG)
  function createAnimatedCross() {
    const width = 80;
    const height = 80;
    const color = '#FFC000';
  
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.style.width = `${width}px`;
    svg.style.height = `${height}px`;
  
    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.setAttribute('x1', '20');
    line1.setAttribute('y1', '20');
    line1.setAttribute('x2', '80');
    line1.setAttribute('y2', '80');
    line1.setAttribute('stroke', color);
    line1.setAttribute('stroke-width', '8');
    line1.setAttribute('stroke-linecap', 'round');
  
    const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line2.setAttribute('x1', '80');
    line2.setAttribute('y1', '20');
    line2.setAttribute('x2', '20');
    line2.setAttribute('y2', '80');
    line2.setAttribute('stroke', color);
    line2.setAttribute('stroke-width', '8');
    line2.setAttribute('stroke-linecap', 'round');
  
    const animation1 = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    animation1.setAttribute('attributeName', 'stroke-dasharray');
    animation1.setAttribute('from', '0 100');
    animation1.setAttribute('to', '100 0');
    animation1.setAttribute('dur', '400ms');
    animation1.setAttribute('fill', 'freeze');
  
    line1.appendChild(animation1);
    svg.appendChild(line1);
  
    const animation2 = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    animation2.setAttribute('attributeName', 'stroke-dasharray');
    animation2.setAttribute('from', '0 100');
    animation2.setAttribute('to', '100 0');
    animation2.setAttribute('dur', '400ms');
    animation2.setAttribute('fill', 'freeze');
  
    line2.appendChild(animation2);
    svg.appendChild(line2);
  
    return svg;
  }
  
// Funktion zum Zeigen des Sieges
function showVictory() {
    const cells = document.getElementsByTagName('td');
  
    for (const index of winningCells) {
      const cell = cells[index];
      cell.style.backgroundColor = 'pink';
    }
  }
  
  // Funktion, die das Spielende prüft
  function checkGameEnd() {
    // Gewinnbedingungen prüfen
    const winningConditions = [
      [0, 1, 2], // Erste Reihe
      [3, 4, 5], // Zweite Reihe
      [6, 7, 8], // Dritte Reihe
      [0, 3, 6], // Erste Spalte
      [1, 4, 7], // Zweite Spalte
      [2, 5, 8], // Dritte Spalte
      [0, 4, 8], // Diagonale von oben links nach unten rechts
      [2, 4, 6], // Diagonale von oben rechts nach unten links
    ];
  
    for (const condition of winningConditions) {
      const [a, b, c] = condition;
      if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
        gameEnded = true;
        winningCells = [a, b, c]; // Gewinnende Zellen merken
        showVictory(); // Zeige den Sieg
        break;
      }
    }
  
    // Unentschieden prüfen
    if (!gameEnded && fields.every((field) => field !== null)) {
      gameEnded = true;
      alert('Unentschieden! Das Spiel endet.');
    }
    
    if (gameEnded && restartButton) {
      restartButton.disabled = false;
    } else if (!gameEnded && restartButton) {
      restartButton.disabled = true;
    }
    
  }

  
  
 // Funktion, die aufgerufen wird, wenn ein Zelle angeklickt wird
function handleCellClick(index) {
    if (gameEnded || fields[index] !== null) {
      return; // Wenn das Spiel beendet ist oder das Feld bereits belegt ist, tue nichts
    }
  
    fields[index] = currentPlayer === 'o' ? 'circle' : 'cross';
    const cell = document.getElementsByTagName('td')[index];
    const svg = fields[index] === 'circle' ? createAnimatedCircle() : createAnimatedCross();
  
    cell.innerHTML = '';
    cell.appendChild(svg);
    cell.removeAttribute('onclick');
  
    // Spieleranzeige aktualisieren
    const playerIndicator = document.getElementById('player-indicator');
    playerIndicator.textContent = `Aktueller Spieler: ${currentPlayer === 'o' ? 'x' : 'o'}`;
  
    // Spieler wechseln
    currentPlayer = currentPlayer === 'o' ? 'x' : 'o';
  
    // Das Spielende prüfen
    checkGameEnd();
  }
  
  // Funktion zum Aktualisieren der Spieleranzeige
  function updatePlayerIndicator() {
    const playerIndicator = document.getElementById('player-indicator');
    playerIndicator.textContent = `Aktueller Spieler: ${currentPlayer}`;
  }
  
  // Funktion zum Rendern der Tabelle
  function render() {
    const contentDiv = document.getElementById('content');
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
  
    // Erstelle die 3x3 Tabelle
    for (let i = 0; i < 3; i++) {
      const row = document.createElement('tr');
      for (let j = 0; j < 3; j++) {
        const cell = document.createElement('td');
        const index = i * 3 + j;
  
        // Füge den entsprechenden Wert aus dem 'fields'-Array hinzu (circle oder cross)
        if (fields[index] === 'circle') {
          const animatedCircle = createAnimatedCircle();
          cell.appendChild(animatedCircle);
        } else if (fields[index] === 'cross') {
          const animatedCross = createAnimatedCross();
          cell.appendChild(animatedCross);
        } else {
          cell.textContent = ''; // Leeres Feld, wenn Wert null ist
          cell.setAttribute('onclick', `handleCellClick(${index})`);
        }
  
        row.appendChild(cell);
      }
      tbody.appendChild(row);
    }
  
    table.appendChild(tbody);
    contentDiv.innerHTML = ''; // Leere das Container-Div, falls es bereits etwas enthält
    contentDiv.appendChild(table);
  
    // Fehlende Zeile für die Formatierung des Containers
    contentDiv.style.display = 'flex';
    contentDiv.style.justifyContent = 'center';
    contentDiv.style.alignItems = 'center';
  
    // Spieleranzeige erstellen und initialisieren
    const playerIndicator = document.createElement('div');
    playerIndicator.setAttribute('id', 'player-indicator');
    playerIndicator.innerHTML= /*html*/`<span class="cp">Aktueller Spieler:  ${currentPlayer}</span>`;
    contentDiv.insertBefore(playerIndicator, table);

    restartButton = document.getElementById('restart-button'); // Die Variable restartButton initialisieren

  restartButton.textContent = 'Nochmal spielen';
  restartButton.addEventListener('click', restartGame);
  contentDiv.appendChild(restartButton);

    // Prüfe das Spielende, um den Button zu aktivieren oder deaktivieren
    checkGameEnd();
  }



  function restartGame() {
    // Setze alle Felder zurück auf null
    fields = Array(9).fill(null);
  
    // Setze das Spielende zurück
    gameEnded = false;
    winningCells = [];
  
    // Setze den Startspieler zurück
    currentPlayer = 'o';
  
    // Rendere die Tabelle neu und deaktiviere den Restart-Button
    render();
  }
  
  // Aufruf der render-Funktion beim Laden der Seite
  document.addEventListener('DOMContentLoaded', () => {
    render();
  });