import { Soup } from "../model/soup";

export class SoupScreen {
    show(soup: Soup) {
      console.log(`Tomatoes: ${soup.tomatoes}`);
      console.log(`Onions: ${soup.onions}`);
      console.log(`Cooked: ${soup.isCooked}`);
    }
  }
