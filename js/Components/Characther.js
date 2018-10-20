export class Characther {

	/**
	 * Cria uma instancia de Characther
	 * @param {Number} x Referente a posição X
	 * @param {Number} y Referente a posição Y
	 * @param {String} sprite Imagem do Personagem
	 * @memberof Characther
	 */
	constructor(x, y, sprite) {
		this.x = x;
		this.y = y;
		this.sprite = sprite;
	}

	/**
	 * Retorna a posição X
	 *
	 * @readonly
	 * @memberof Characther
	 */
	get positionX() {
		return this.x;
	}

	/**
	 * Retorna a posição Y
	 *
	 * @readonly
	 * @memberof Characther
	 */
	get positionY() {
		return this.y;
	}

	/**
	 * Desenhe o personagem na tela, método exigido pelo jogo
	 *
	 * @memberof Characther
	 */
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	};
}
