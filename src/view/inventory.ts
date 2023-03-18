import { Inventory } from "../model/inventory.js";

export class InventoryScreen {
	protected element: HTMLElement;
	constructor() {
		this.element = document.querySelector('.inventory') as HTMLElement;
	}
	show(inventory: Inventory) {
		this.element.innerHTML = `INVENTORY:\n Tomatoes: ${inventory.tomatoes}\n Onions: ${inventory.onions}`;
	}
}	
 