export class Player {
	name: string;
	money: number;
	score: number;

	constructor(name: string, money: number) {
		this.name = name;
		this.money = money;
		this.score = 0;
	}
}
