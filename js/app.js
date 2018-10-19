class Characther {
	constructor(x, y, sprite) {
		this.x = x;
		this.y = y;
		this.sprite = sprite;

	}

	get positionX() {
		return this.x;
	}

	get positionY() {
		return this.y;
	}

	// Desenhe o personagem na tela, método exigido pelo jogo
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	};
}


// Inimigos que nosso jogador deve evitar
class Enemy extends Characther {
	// As variáveis aplicadas a nossas instâncias entram aqui.
	// Fornecemos uma a você para que possa começcar.

	// A imagem/sprite de nossos inimigos, isso usa um
	// ajudante que é fornecido para carregar imagens
	// com facilidade.
	constructor(x, y, speed, sprite = 'images/enemy-bug.png') {
		super(x, y, sprite);
		this.speed = this.initialSpeed = speed;
	}

	reset() {
		this.speed = this.initialSpeed;
	}

	// Atualize a posição do inimigo, método exigido pelo jogo
	// Parâmetro: dt, um delta de tempo entre ticks
	update(dt) {
		// Você deve multiplicar qualquer movimento pelo parâmetro
		// dt, o que garantirá que o jogo rode na mesma velocidade
		// em qualquer computador.
		this.x +=  this.speed * dt;

		if(this.x >= 500) {
			this.x = -103;
		}

	};

};


// Agora, escreva sua própria classe de jogador
// Esta classe exige um método update(),
// um render() e um handleInput().
class Player extends Characther {

	constructor(x = 300, y = 400, sprite = 'images/char-boy.png') {
		super(x, y, sprite);
		this.initialX = x;
		this.initialY = y;
		this.eventWin = new Event('win');
	}

	reset() {
		this.x = this.initialX;
		this.y = this.initialY;
	}

	update() {

		if(this.y <= 0) {
			this.reset();
			document.dispatchEvent(this.eventWin);
		}

	};

	handleInput(value) {
		console.log(value);
		if(value === 'up' && this.y > 0) {
			this.y += -84;
		}
		if (value === 'left' && this.x > 0) {
			this.x += -101;
		}
		if (value === 'down' && this.y < 400) {
			this.y += 84;
		}
		if (value === 'right' && this.x < 400) {
			this.x += 101;
		}
	}
}


// Represente seus objetos como instâncias.
// Coloque todos os objetos inimgos numa array allEnemies
// Coloque o objeto do jogador numa variável chamada jogador.
const player = new Player(),
	allEnemies = [new Enemy(-103, 60, 100), new Enemy(-103, 145, 150), new Enemy(-103, 230, 120)];


// Isto reconhece cliques em teclas e envia as chaves para seu
// jogador. método handleInput(). Não é preciso mudar nada.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

let level = 1;

// Ouve pelo evento.
document.addEventListener('win', (e) => {
	console.log('ganhou');
	changeLevel();

}, false);


const changeLevel = () => {
	document.getElementById('level').innerHTML = level = level + 1;
	for (const enemy of allEnemies) {

		enemy.speed *= 1.5;
	}

}

const checkCollisions = (allEnemies, player) => {

	for (const enemy of allEnemies) {

		if ((player.positionX >= enemy.positionX - 75 && player.positionX <= enemy.positionX + 75) && (player.positionY >= enemy.positionY - 50 && player.positionY <= enemy.positionY + 50)) {
			player.reset();
			document.getElementById('level').innerHTML = level = 1;

			allEnemies.forEach(element => {
				element.reset();
			});
		}
	}
}