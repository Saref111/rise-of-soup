import { Inventory } from "../model/inventory.js";

export class InventoryScreen {
    show(inventory: Inventory) {
		console.log(`Tomatoes: ${inventory.tomatoes}`);
		console.log(`Onions: ${inventory.onions}`);
    }
  }
