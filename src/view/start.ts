export class StartScreen {
	protected screen: HTMLElement;
  	constructor() {
		this.screen = document.querySelector('.screen') as HTMLElement;
    }
    show() {
		this.screen.innerHTML = `Welcome to Rise of Soup!
								Press any key to start the game.`;	
    }	
  }
