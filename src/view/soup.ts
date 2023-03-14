import { Soup } from "../model/soup.js";

export class SoupScreen {
    show(soup: Soup) {
		console.log(`Tomatoes: ${soup.tomatoes}`);
		console.log(`Onions: ${soup.onions}`);
		console.log(`Cooked: ${soup.isCooked}`);
    }
  }
