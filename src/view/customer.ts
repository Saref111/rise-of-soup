import { Customer } from "../model/customer.js";

export class CustomerScreen {
  	protected element: HTMLElement;
	constructor() {
		this.element = document.querySelector('.costumer') as HTMLElement;
	}
    show(customer: Customer) {
		this.element.innerHTML = `Name: ${customer.name}\n Tomatoes: ${customer.preferences.tomatoes}\n Onions: ${customer.preferences.onions}`;
    }
  }
