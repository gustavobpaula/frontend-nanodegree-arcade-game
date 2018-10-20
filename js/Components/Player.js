import { Characther } from 'Components/Characther';

export class Player extends Characther {

	/**
	 *Cria uma instancia de Player.
	 * @param {Number} x Referente a posição X
	 * @param {Number} y Referente a posição Y
	 * @param {String} sprite Imagem do Personagem
	 * @memberof Player
	 */
	constructor(x = 300, y = 400, sprite = 'images/char-boy.png') {
		super(x, y, sprite);
		this.initialX = x;
		this.initialY = y;
		this.eventWin = new Event('win');
	}

	/**
	 * Reinicia a posição do personagem
	 *
	 * @memberof Player
	 */
	reset() {
		this.x = this.initialX;
		this.y = this.initialY;
	}

	/**
	 * Verifica se a posição do personagem é na linha de chegada
	 * e dispara um evento
	 *
	 * @memberof Player
	 */
	update() {

		if (this.y <= 0) {
			this.reset();
			document.dispatchEvent(this.eventWin);
		}
	};

	/**
	 * Verifica a tecla clicada
	 *
	 * @param {Number} value
	 * @memberof Player
	 */
	handleInput(value) {
		if (value === 'up' && this.y > 0) {
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