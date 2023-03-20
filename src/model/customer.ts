import { Inventory } from "./inventory.js";

const NAMES = ["Bob", "Alice", "Charlie", "Dave", "Eve"];

export class Customer {
	name: string;
	preferences: Inventory;
	vip: boolean = false;

	constructor(name: string, preferences: Inventory) {
		this.name = name;
		this.preferences = preferences;
	}
}

class VIPCustomer extends Customer {
	vip: boolean = true;
	
	constructor(name: string, preferences: Inventory) {
		super(name, preferences);
	}
}

interface CustomerFactory {
	createCustomer(name?: string): Customer;
}

class BasicCustomerFactory implements CustomerFactory {
	createCustomer(name?: string): Customer {
		const inventory = new Inventory(
			Math.floor(Math.random() * 3) + 1,
			Math.floor(Math.random() * 3) + 1
		);
		return new Customer(name ? name : NAMES[Math.floor(Math.random() * NAMES.length)], inventory);
	}
}

class VIPCustomerFactory implements CustomerFactory {
	createCustomer(name?: string): Customer {
		const inventory = new Inventory(
			Math.floor(Math.random() * 5) + 1,
			Math.floor(Math.random() * 5) + 1
		);
		return new VIPCustomer(name ? name : NAMES[Math.floor(Math.random() * NAMES.length)], inventory);
	}
}

export class CustomerFactoryProducer {
	static getFactory(vip: boolean): CustomerFactory {
		if (vip) {
			return new VIPCustomerFactory();
		}
		return new BasicCustomerFactory();
	}
}
  