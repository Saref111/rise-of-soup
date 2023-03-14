import { Inventory } from "./inventory";

export class Customer {
	name: string;
	preferences: Inventory;

	constructor(name: string, preferences: Inventory) {
		this.name = name;
		this.preferences = preferences;
	}
}
