import { Customer, CustomerFactoryProducer } from "../../model/customer.js";
import { Inventory } from "../../model/inventory.js";
import { Player } from "../../model/player.js";
import { Soup } from "../../model/soup.js";
import { ControlsScreen } from "../../view/controls.js";
import { CustomerScreen } from "../../view/customer.js";
import { InventoryScreen } from "../../view/inventory.js";
import { PlayerScreen } from "../../view/player.js";
import { SoupScreen } from "../../view/soup.js";
import { StartScreen } from "../../view/start.js";
import { Commands, InputHandler } from "../input.js";
import { ServingClientStrategy, ServingStrategyContext, ServingVipClientStrategy } from "./sereving-strategy.js";

export class GameController {
	private static instance: GameController;
	player: Player;
	inventory: Inventory;
	soup: Soup;
	customers: Customer[];

	protected constructor() {
		this.reset();
	}

	public static getInstance(): GameController {
		if (!GameController.instance) {
		  GameController.instance = new GameController();
		}
		return GameController.instance;
	}

	reset() {
		this.player = new Player('Player', 50);
		this.inventory = new Inventory(2, 2);
		this.soup = new Soup(0, 0);
		this.customers = [
			new Customer("Bob", new Inventory(2, 1)),
			new Customer("Alice", new Inventory(1, 2)),
			new Customer("Charlie", new Inventory(3, 3)),
			new Customer("Dave", new Inventory(2, 2)),
			new Customer("Eve", new Inventory(1, 1)),
		];
	}

	start(isFromRestart = false) {
		const startScreen = new StartScreen();
		startScreen.show(isFromRestart);
		const inputHandler = new InputHandler(this);
		const startGame = (e: Event) => {
			startScreen.clear();
			this.reset();
			this.updateView();
			new ControlsScreen().show(inputHandler);
			document.removeEventListener("keypress", startGame);
		}
		document.addEventListener("keypress", startGame);
	}

	checkIsGameOver() {
		const customer = this.customers[0];
		return this.player.money <= 0 && 
				this.inventory.tomatoes <= 0 && 
				this.inventory.onions <= 0 && 
				this.soup.tomatoes < customer.preferences.tomatoes && 
				this.soup.onions < customer.preferences.onions;
	}

	clearView() {
		new PlayerScreen().clear();
		new InventoryScreen().clear();
		new SoupScreen().clear();
		new CustomerScreen().clear();
		new ControlsScreen().clear();
	}

	updateView() {
		if (this.checkIsGameOver()) {
			this.clearView()
			this.start(true);
			return;
		}
		new InventoryScreen().show(this.inventory);
		new CustomerScreen().show(this.customers[0]);
		new SoupScreen().show(this.soup);
		new PlayerScreen().show(this.player);
	}
	
	updateInventory(tomatoes: number, onions: number) {
		const totalPrice = (tomatoes * 10) + (onions * 5);
		if (this.player.money < totalPrice) return;
		this.player.money -= totalPrice; 
		this.inventory.tomatoes += tomatoes;
		this.inventory.onions += onions;
		this.updateView();
	}

	prepareToCook() {
		if (
			this.inventory.tomatoes >= 1 && 
			this.inventory.onions >= 1
		) {
			this.soup = new Soup(this.soup.tomatoes + 1, this.soup.onions + 1);
			this.inventory.onions -= 1;
			this.inventory.tomatoes -= 1;
			this.updateView();
		}
	}
	
	cookSoup() {
		if (this.soup.tomatoes > 0 && this.soup.onions > 0) {
			this.soup.cook();
			new SoupScreen().show(this.soup);
		}
	}
	
	serveCustomer() {
		if (!this.soup.isCooked) return;
		
		const customer = this.customers[0];

		const servingStrategyContext = new ServingStrategyContext();

		if (customer.vip) {
			servingStrategyContext.setStrategy(new ServingVipClientStrategy());
		} else {
			servingStrategyContext.setStrategy(new ServingClientStrategy());
		}

		servingStrategyContext.executeStrategy(customer, this.player, this.soup);
		
		this.customers.shift()

		if (this.customers.length === 0) {
			this.customers = []

			for (let i = 0; i < 5; i++) {
				this.customers.push(CustomerFactoryProducer.getFactory(Math.random() > 0.5).createCustomer());
			}
		}

		this.soup = new Soup(0, 0);
		this.updateView();
	}
}
