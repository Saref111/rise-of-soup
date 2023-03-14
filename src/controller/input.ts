import { GameController } from "./game";

interface Command {
    execute(): void;
}

class StartGameCommand implements Command {
    private gameController: GameController;

    constructor(gameController: GameController) {
        this.gameController = gameController;
    }

    execute() {
        this.gameController.startGame();
    }
}

class PauseGameCommand implements Command {
    private gameController: GameController;

    constructor(gameController: GameController) {
        this.gameController = gameController;
    }

    execute() {
        this.gameController.pauseGame();
    }
}

export class InputHandler {
    private startGameCommand: Command;
    private pauseGameCommand: Command;

    constructor(gameController: GameController) {
        this.startGameCommand = new StartGameCommand(gameController);
        this.pauseGameCommand = new PauseGameCommand(gameController);
    }

    handleInput(input: string) {
        switch (input) {
            case "s":
                this.startGameCommand.execute();
                break;
            case "p":
                this.pauseGameCommand.execute();
                break;
            default:
                console.log("Invalid input");
                break;
        }
    }
}
