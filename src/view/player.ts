import { Player } from "../model/player";

export class PlayerScreen {
    protected element: HTMLElement;
    constructor() {
        this.element = document.querySelector('.player') as HTMLElement;
    }
    show(player: Player) {
        this.element.innerHTML = `PLAYER:\n Name: ${player.name}\n  Money: ${player.money} \n Score: ${player.score}`;
    }
}
