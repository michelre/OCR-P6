"use strict";

var grid = new Grid(10, 10, 10, 5, 2);
grid.createGrid();
grid.createObstacles();
grid.createWeapons();
grid.createPlayers();
grid.drawObstacles();
grid.drawPlayers();
grid.drawWeapons();
var cells = grid.getMovableCells();
grid.drawMovableCells(cells); // Swal.fire({
//     title: '<strong>Bienvenue</strong>',
//     icon: '',
//     html: `
//     <div class="game-details">
//             <div class="game-details-body">
//                 <p>Bienvenue sur ce jeu dans lequel 2 joueurs évoluent chacun leur tour pour s'affronter.
//                     Comme dans Highlander, il ne peut en rester qu'un !<br>Voici les règles de la bataille :
//                 </p><ul>
//                     <li>Les obstacles, les armes et les joueurs sont placés aléatoirement sur la carte à chaque partie</li>
//                     <li>Le premier joueur est tiré au sort et chaque joueur joue chacun son tour</li>
//                     <li>Un joueur peut se déplacer horizontalement ou verticalement de une à trois cases. Il ne peut évidemment pas passer à travers un obstacle</li>
//                     <li>Quand un joueur passe sur une case contenant une arme, il laisse son arme actuelle et la remplace par la nouvelle</li>
//                     <li>Chaque arme provoque des points de dégâts différents, indiqués dans la liste à droite de la carte</li>
//                 </ul>
//                 <p>Les déplacements :
//                 </p><ul>
//                     <li>le joueur clique sur le bouton "Se déplacer" ou sur la touche M du clavier</li>
//                     <li>Les cases dans lesquelles le joueur peut se déplacer sont mises en surbrillance</li>
//                     <li>Le joueur avance son personnage avec les flèches directionnelles du clavier ou en cliquant sur une case avec la souris : attention, pas de retour en arrière possible !</li>
//                     <li>Une fois le déplacement terminé, le joueur doit le valider pour passer la main : soit en cliquant sur le bouton "Valider", soit avec la touche "Entrée" du clavier (le déplacement souris est automatiquement validé)</li>
//                 </ul>
//                 <p>La bataille :
//                 </p><ul>
//                     <li>Une fois côte à côte, les joueurs peuvent livrer bataille.</li>
//                     <li>Chacun leur tour, ils peuvent choisir d'attaquer (bouton "Attaquer" ou touche A), ou se défendre contre le prochain coup (bouton "Se défendre" ou touche D)</li>
//                     <li>Les dégâts infligés à l'adversaire dépendent de l’arme possédée par le joueur</li>
//                     <li>Lorsque le joueur se défend, il encaisse 50% de dégâts en moins qu’en temps normal</li>
//                     <li>Dès que les points de vie d’un joueur (initialement à 100) tombent à 0 , celui-ci a perdu. Un message s’affiche et la partie est terminée.</li>
//                 </ul>
//             </div>
//         </div>
//       `,
//     showCloseButton: true,
//     showCancelButton: true,
//     focusConfirm: false,
//     confirmButtonText:
//       '<i class="fa fa-thumbs-up"></i> Jouer !',
//     confirmButtonAriaLabel: 'Thumbs up, great!',
//     cancelButtonText:
//       '<i class="fa fa-thumbs-down"></i>Abandonner',
//     cancelButtonAriaLabel: 'Thumbs down'
//   })