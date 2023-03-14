export class Soup {
    tomatoes: number;
    onions: number;
    isCooked: boolean;
    constructor(tomatoes: number, onions: number) {
      this.tomatoes = tomatoes;
      this.onions = onions;
      this.isCooked = false;
    }
    cook() {
      this.isCooked = true;
    }
  }
