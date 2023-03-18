export class StartScreen {
	protected element: HTMLElement;
  	constructor() {
		this.element = document.querySelector('.text') as HTMLElement;
    }
    show(isFromRestart?: boolean) {
		this.element.innerHTML = `${isFromRestart ? 'You lose' : 'Welcome to Rise of Soup!'}
								Press any key to start the game.`;	
    }
	clear() {
		this.element.innerHTML = '';
	}
  }
