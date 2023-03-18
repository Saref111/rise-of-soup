import { Commands, InputHandler } from "../controller/input.js";

export class ControlsScreen {
    protected element: HTMLElement;
    constructor() {
        this.element = document.querySelector('.controls') as HTMLElement;
    }
    show(inputHandler: InputHandler) {
        const callbacks = inputHandler.getCallbacks();
        const buyButton = document.createElement("button") as HTMLButtonElement;
        buyButton.innerText = "Buy more products";
        buyButton.addEventListener("click", callbacks[Commands.BUY]);

        const cookButton = document.createElement("button") as HTMLButtonElement;
        cookButton.innerText = "Cook soup";
        cookButton.addEventListener("click", callbacks[Commands.COOK]);
        
        const prepareButton = document.createElement("button") as HTMLButtonElement;
        prepareButton.innerText = "Prepare for coocking";
        prepareButton.addEventListener("click", callbacks[Commands.PREPARE]);

        const serveButton = document.createElement("button") as HTMLButtonElement;
        serveButton.innerText = "Serve customer";
        serveButton.addEventListener("click", callbacks[Commands.SERVE]);

        this.element.appendChild(buyButton);
        this.element.appendChild(cookButton);
        this.element.appendChild(prepareButton);
        this.element.appendChild(serveButton);
    }
}
