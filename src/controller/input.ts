import { GameController } from "./game.js";

export enum Commands {
    START = "start",
    COOK = "cook",
    SERVE = "serve",
    BUY = "buy",
}

interface Command {
    execute(): void;
}

class StartGameCommand implements Command {
    private gameController: GameController;

    constructor(gameController: GameController) {
        this.gameController = gameController;
    }

    execute() {
        this.gameController.start();
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
        this.gameController.updateInventory(2, 2);
    }
}

export class InputHandler {
    private commands: Record<string, Command> = {};


    constructor(gameController: GameController) {
        this.commands = {
            [Commands.COOK]: new CookSoupCommand(gameController),
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
}
