import { Soup } from "../model/soup.js";

export class SoupScreen {
	protected element: HTMLElement;
	constructor() {
		this.element = document.querySelector('.soup') as HTMLElement;
	}
	show(soup: Soup) {		
		this.element.innerHTML = `SOUP:\n Tomatoes: ${soup.tomatoes}\n Onions: ${soup.onions}\n Cooked: ${soup.isCooked}`; 
	}
}
