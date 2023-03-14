import { Inventory } from "./inventory.js";

export class Customer {
	name: string;
	preferences: Inventory;

	constructor(name: string, preferences: Inventory) {
		this.name = name;
		this.preferences = preferences;
	}
}
