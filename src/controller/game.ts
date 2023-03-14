import { Customer } from "../model/customer.js";
import { Inventory } from "../model/inventory.js";
import { Player } from "../model/player.js";
import { Soup } from "../model/soup.js";
import { StartScreen } from "../view/start.js";
import { Commands, InputHandler } from "./input.js";

export class GameController {
	private static instance: GameController;
	player: Player;
	inventory: Inventory;
	soup: Soup;
	customers: Customer[];

	protected constructor() {
		this.player = new Player('Player', 100);
		this.inventory = new Inventory(0, 0);
		this.soup = new Soup(0, 0);
		this.customers = [
			new Customer("Bob", new Inventory(2, 1)),
			new Customer("Alice", new Inventory(1, 2)),
			new Customer("Charlie", new Inventory(3, 3)),
			new Customer("Dave", new Inventory(2, 2)),
			new Customer("Eve", new Inventory(1, 1)),
		];
	}

	public static getInstance(): GameController {
		if (!GameController.instance) {
		  GameController.instance = new GameController();
		}
		return GameController.instance;
	  }

	start() {
		const startScreen = new StartScreen();
		startScreen.show();
		const inputHandler = new InputHandler(this);
		document.addEventListener("smth", (e) => {
			inputHandler.handleInput('start' as Commands);
		});
	}
	
	updateInventory(tomatoes: number, onions: number) {
		this.inventory.tomatoes += tomatoes;
		this.inventory.onions += onions;
	}
	
	cookSoup() {
		if (this.inventory.tomatoes >= 2 && this.inventory.onions >= 1) {
			this.inventory.tomatoes -= 2;
			this.inventory.onions -= 1;
			this.soup = new Soup(2, 1);
			this.soup.cook();
		}
	}
	
	serveCustomer() {
		const customer = this.customers.pop();

		if (
			customer.preferences.tomatoes === this.soup.tomatoes &&
			customer.preferences.onions === this.soup.onions &&
			this.soup.isCooked
		) {
			const score = Math.floor(
				(customer.preferences.tomatoes + customer.preferences.onions) / 2
			);
			this.player.score += score;
			this.player.money += score * 10;
		} else {
			this.player.money -= 10;
		}

		this.soup = new Soup(0, 0);
	}
	}
