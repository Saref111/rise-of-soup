import { Customer } from "../model/customer";
import { Inventory } from "../model/inventory";
import { Player } from "../model/player";
import { Soup } from "../model/soup";
import { StartScreen } from "../view/start";

export class GameController {
    player: Player;
    inventory: Inventory;
    soup: Soup;
    customers: Customer[];
    constructor(playerName: string) {
      this.player = new Player(playerName, 100);
      this.inventory = new Inventory(0, 0);
      this.soup = new Soup(0, 0);
      this.customers = [
        new Customer("Bob", new Inventory(2, 1)),
        new Customer("Alice", new Inventory(1, 2)),
        new Customer("Charlie", new Inventory(3, 3)),
        new Customer("Dave", new Inventory(2, 2)),
        new Customer("Eve", new Inventory(1, 1)),
      ];
    }

    start() {
        const startScreen = new StartScreen();
        startScreen.show();
    
        // Wait for user input
        // TODO: Handle user input
      }
    
      updateInventory(tomatoes: number, onions: number) {
        this.inventory.tomatoes += tomatoes;
        this.inventory.onions += onions;
      }
    
      cookSoup() {
        if (this.inventory.tomatoes >= 2 && this.inventory.onions >= 1) {
          this.inventory.tomatoes -= 2;
          this.inventory.onions -= 1;
          this.soup = new Soup(2, 1);
          this.soup.cook();
        }
      }
    
      serveCustomer(customerIndex: number) {
        const customer = this.customers[customerIndex];
        if (
          customer.preferences.tomatoes === this.soup.tomatoes &&
          customer.preferences.onions === this.soup.onions &&
          this.soup.isCooked
        ) {
          const score = Math.floor(
            (customer.preferences.tomatoes + customer.preferences.onions) / 2
          );
          this.player.score += score;
          this.player.money += score * 10;
        } else {
          this.player.money -= 10;
        }
        this.soup = new Soup(0, 0);
      }
    }
