import { Customer } from "../model/customer";

export class CustomerScreen {
    show(customer: Customer) {
      console.log(`Name: ${customer.name}`);
      console.log(`Tomatoes: ${customer.preferences.tomatoes}`);
      console.log(`Onions: ${customer.preferences.onions}`);
    }
  }
