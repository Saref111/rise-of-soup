import { GameController } from "./game-controller/game.js";

export enum Commands {
    PREPARE = "prepare",
    COOK = "cook",
    SERVE = "serve",
    BUY = "buy",
}

interface Command {
    execute(): void;
}

class PrepareToCookCommand implements Command {
    private gameController: GameController;

    constructor(gameController: GameController) {
        this.gameController = gameController;
    }

    execute() {
        this.gameController.prepareToCook();
    }
}
class CookSoupCommand implements Command {
    private gameController: GameController;

    constructor(gameController: GameController) {
        this.gameController = gameController;
    }

    execute() {
        this.gameController.cookSoup();
    }
}

class ServeCostumerCommand implements Command {
    private gameController: GameController;

    constructor(gameController: GameController) {
        this.gameController = gameController;
    }

    execute() {
        this.gameController.serveCustomer();
    }
}
class BuyProductsCommand implements Command {
    private gameController: GameController;

    constructor(gameController: GameController) {
        this.gameController = gameController;
    }

    execute() {
        this.gameController.updateInventory(1, 1);
    }
}

export class InputHandler {
    private commands: Record<string, Command> = {};


    constructor(gameController: GameController) {
        this.commands = {
            [Commands.COOK]: new CookSoupCommand(gameController),
            [Commands.PREPARE]: new PrepareToCookCommand(gameController),
            [Commands.SERVE]: new ServeCostumerCommand(gameController),
            [Commands.BUY]: new BuyProductsCommand(gameController),
        };
    }

    handleInput(input: Commands) {
        try {
            this.commands[input].execute();
        } catch (error) {
            console.log("Invalid input", error);
        }
    }

    getCallbacks() {
        return {
            [Commands.BUY]: () => {
                this.handleInput(Commands.BUY);
            },
            [Commands.COOK]: () => {
                this.handleInput(Commands.COOK);
            },
            [Commands.PREPARE]: () => {
                this.handleInput(Commands.PREPARE);
            },
            [Commands.SERVE]: () => {
                this.handleInput(Commands.SERVE);
            }
        } as Record<Commands, () => void>;
    }
}
