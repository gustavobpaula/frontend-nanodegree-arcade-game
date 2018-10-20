import { Characther } from 'Components/Characther';

// Inimigos que nosso jogador deve evitar
export class Enemy extends Characther {

	/**
	 * Cria uma instancia de Enemy.
	 * @param {Number} x Referente a posição X
	 * @param {Number} y Referente a posição Y
	 * @param {Number} speed Velocidade do inimigo
	 * @param {String} sprite Imagem do Personagem
	 * @memberof Enemy
	 */
	constructor(x, y, speed, sprite = 'images/enemy-bug.png') {
		super(x, y, sprite);
		this.speed = this.initialSpeed = speed;
	}

	/**
	 * Reinicia a velocidade do inimigo.
	 *
	 * @memberof Enemy
	 */
	reset() {
		this.speed = this.initialSpeed;
	}

	/**
	 * Atualize a posição do inimigo, método exigido pelo jogo
	 *
	 * @param {Number} dt Parâmetro: dt, um delta de tempo entre ticks
	 * @memberof Enemy
	 */
	update(dt) {

		this.x += this.speed * dt;

		if (this.x >= 500) {
			this.x = -103;
		}

	};

};