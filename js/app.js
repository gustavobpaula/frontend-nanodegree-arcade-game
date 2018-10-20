import 'Components/resources';
import 'Components/engine';

import { Enemy } from 'Components/Enemy';
import { Player } from 'Components/Player';

import swal from 'sweetalert2';

// Represente seus objetos como instâncias.
// Coloque todos os objetos inimgos numa array allEnemies
// Coloque o objeto do jogador numa variável chamada jogador.
window.player = new Player();
window.allEnemies = [new Enemy(-103, 60, 100), new Enemy(-103, 145, 150), new Enemy(-103, 230, 125)];


// Isto reconhece cliques em teclas e envia as chaves para seu
// jogador. método handleInput(). Não é preciso mudar nada.
document.addEventListener('keyup', function (e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});

// Ouve pelo evento win que é disparado pela classe Player
document.addEventListener('win', (e) => {
	changeLevel();

	// Alerta de conquista
	swal({
		title: 'Yesss!',
		text: 'You win! You went to the next level.',
		type: 'success',
		confirmButtonText: 'Lets go!'
	});

}, false);

let level = 1;
// Muda o nível do jogo acelerando todos os inimigos
const changeLevel = () => {
	document.getElementById('level').innerHTML = level = level + 1;
	for (const enemy of allEnemies) {

		enemy.speed *= 1.2;
	}

}

// Checa a colisão do Jogador com o Inimigo
window.checkCollisions = (allEnemies, player) => {

	for (const enemy of allEnemies) {

		if ((player.positionX >= enemy.positionX - 75 && player.positionX <= enemy.positionX + 75) && (player.positionY >= enemy.positionY - 50 && player.positionY <= enemy.positionY + 50)) {
			player.reset();
			document.getElementById('level').innerHTML = level = 1;

			// Reseta todos os inimigos
			allEnemies.forEach(element => {
				element.reset();
			});

			// Alerta de derrota.
			swal({
				title: 'Opss!',
				text: 'You Lose! Try again.',
				type: 'error',
				confirmButtonText: 'Lets go!'
			});
		}
	}
}