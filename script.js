function afficheHTML() {
  let table = document.querySelector("table");
  table.innerHTML = '';
  for (let i = 0; i < 10; i++) {
      let tr = document.createElement("tr");
      table.append(tr);
      for (let j = 0; j < 10; j++) {
          let num = 10 * i + j;
          let td = document.createElement("td");
          tr.append(td);
          td.setAttribute('id', 'case' + num);
          let img = document.createElement('img');
          img.setAttribute('src', 'carre.jpg');
          img.setAttribute('class', 'image');
          td.append(img);
      }
  }
}

function tirage(grille, nbMines, exclude) {
  let taille = grille.length;
  let minesPlacees = 0;

  while (minesPlacees < nbMines) {
      let position = Math.floor(Math.random() * taille);

      if (grille[position] !== 'x' && position !== exclude) {
          grille[position] = 'x';
          minesPlacees++;
      }
  }
}

function creerEvent() {
  for (let i = 0; i < 100; i++) {
      document.getElementById('case' + i).addEventListener('click', bombe);
  }
}

let isFirstClick = true;
let isGameOver = false;

function bombe(e) {
  if (isGameOver) return; 

  let td = e.target.tagName === 'IMG' ? e.target.parentElement : e.target; 
  let id = td.getAttribute('id');
  let num = parseInt(id.substring(4));

  if (isFirstClick) {
      tirage(grille, 10, num);

      for (let i = 0; i < taille; i++) {
          if (grille[i] !== 'x') {
              let nbBombe = 0;
              if (grille[i - long] === 'x' && i >= long) nbBombe++;
              if (grille[i - long + 1] === 'x' && i >= long && (i + 1) % long !== 0) nbBombe++;
              if (grille[i + 1] === 'x' && (i + 1) % long !== 0) nbBombe++;
              if (grille[i + long + 1] === 'x' && i <= taille - long && (i + 1) % long !== 0) nbBombe++;
              if (grille[i + long] === 'x' && i <= taille - long) nbBombe++;
              if (grille[i + long - 1] === 'x' && i <= taille - long && i % long !== 0) nbBombe++;
              if (grille[i - 1] === 'x' && i % long !== 0) nbBombe++;
              if (grille[i - long - 1] === 'x' && i >= long && i % long !== 0) nbBombe++;
              grille[i] = nbBombe;
          }
      }
  }

  if (grille[num] === 'x') {
      td.innerHTML = 'X';
      td.style.color = 'red';
      alert('Vous avez perdu, essailler encore!');
      isGameOver = true; 
  } else {
      td.innerHTML = grille[num] > 0 ? grille[num] : '';
      td.style.backgroundColor = '#ddd'; 
  }
}

function restartGame() {
  isFirstClick = true;
  isGameOver = false; 
  grille = Array(taille).fill(0); 
  afficheHTML(); 
  creerEvent();
}

let taille = 100;
let long = 10;
let grille = Array(taille).fill(0);

afficheHTML();
creerEvent();
document.getElementById('NouvellePartie').addEventListener('click', restartGame);
