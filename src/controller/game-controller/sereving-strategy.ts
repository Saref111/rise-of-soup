import { Customer } from "../../model/customer";
import { Player } from "../../model/player";
import { Soup } from "../../model/soup";

interface ServingStrategy {
    execute(customer: Customer, player: Player, soup: Soup): void;
}

export class ServingClientStrategy implements ServingStrategy {
    execute(customer: Customer, player: Player, soup: Soup) {
        if (
			customer.preferences.tomatoes <= soup.tomatoes &&
			customer.preferences.onions <= soup.onions

		) {
			const score = Math.floor(
				(customer.preferences.tomatoes + customer.preferences.onions) / 2
			);
			player.score += score;
			player.money += score * 15;
		} else {
			player.money -= 15;
		}
    }
}

export class ServingVipClientStrategy implements ServingStrategy {
    execute(customer: Customer, player: Player, soup: Soup) {
        if (
            customer.preferences.tomatoes < soup.tomatoes &&
            customer.preferences.onions < soup.onions
        ) {
            const score = Math.floor(
                (customer.preferences.tomatoes + customer.preferences.onions) / 2
            );
            player.score += score;
            player.money += score * 25;
        } else {
            player.money -= 25;
        }
    }
}

export class ServingStrategyContext {
    private strategy: ServingStrategy;

    setStrategy(strategy: ServingStrategy) {
        this.strategy = strategy;
    }

    executeStrategy(customer: Customer, player: Player, soup: Soup) {
        this.strategy.execute(customer, player, soup);
    }
} 
