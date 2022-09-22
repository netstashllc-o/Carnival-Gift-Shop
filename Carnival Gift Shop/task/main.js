'use strict';
let input = require('sync-input');
let tickets = 0;
let choice;

const welcome = 'WELCOME TO THE CARNIVAL GIFT SHOP!';
const greeting = 'Hello friend! Thank you for visiting the carnival!';
const heading = "Here's the list of gifts:\n";

const gifts = new Map([
    [1, {name: 'Teddy Bear', price: 10}],
    [2, {name: 'Big Red Ball', price: 5}],
    [3, {name: 'Huge Bear', price: 50}],
    [4, {name: 'Candy', price: 8}],
    [5, {name: 'Stuffed Tiger', price: 15}],
    [6, {name: 'Stuffed Dragon', price: 30}],
    [7, {name: 'Skateboard', price: 100}],
    [8, {name: 'Toy Car', price: 25}],
    [9, {name: 'Basketball', price: 20}],
    [10, {name: 'Scary Mask', price: 75}]
]);

const listGifts = () => {
    let gift;
    for (let id of gifts.keys()) {
        gift = gifts.get(id);
        console.log(`${id}- ${gift.name}, Cost: ${gift.price} tickets`);
    }
};
const showTickets = () => console.log(`Total tickets: ${tickets}`);
const isValidNumber = (number) => {
    if (isNaN(number)) {
        console.log("Please enter a valid number!");
        return false;
    }
    return true;
};
const isValidGiftId = (id) => {
    if (gifts.get(id) === undefined) {
        console.log("There is no gift with that number!");
        return false;
    }
    return true;
};
const hasEnoughTickets = (id) => {
    if (gifts.get(id).price > tickets) {
        console.log("You don't have enough tickets to buy this gift.");
        return false;
    }
    return true;
}
const isInRange = (number) => {
    if (isNaN(number) || number < 0 || number > 1000) {
        console.log('Please enter a valid number between 0 and 1000.');
        return false;
    }
    return true;
}
const isValidMenuOption = (number) => {
    if (number < 1 || number > 5) {
        console.log("Please enter a valid number!");
        return false;
    }
    return true;
}

const menuPrompt = "1-Buy a gift 2-Add tickets 3-Check tickets 4-Show gifts 5-Exit the shop\n";
const menu = new Map([
    [
        1,
        {
            itemPrompt: 'Enter the number of the gift you want to get: ',
            action: function () {
                if (Array.from(gifts.keys()).length > 0) {
                    let id = Number(input(this.itemPrompt));
                    if (isValidNumber(id) && isValidGiftId(id) && hasEnoughTickets(id)) {
                        let gift = gifts.get(id);
                        tickets -= gift.price;
                        console.log(`Here you go, one ${gift.name}!`);
                        showTickets();
                        gifts.delete(id);
                        return true;
                    }
                    return false;
                }

                console.log("Wow! There are no gifts to buy.");
                return false;
            }
        }
    ],
    [
        2,
        {
            itemPrompt: 'Enter the ticket amount: ',
            action: function () {
                let amount = Number(input(this.itemPrompt));
                if(isInRange(amount)) {
                    tickets += amount;
                    showTickets();
                    return true;
                }
                return false;
            }
        }
    ],
    [
        3,
        {
            itemPrompt: null,
            action: function () {
                showTickets();
                return true;
            }
        }
    ],
    [
        4,
        {
            itemPrompt: null,
            action: function () {
                console.log(heading);
                listGifts();
                return true;
            }
        }
    ]
]);

console.log(welcome);
console.log(greeting);
console.log(heading);
listGifts();

do {
    console.log("\nWhat do you want to do?");
    choice = Number(input(menuPrompt));
    if (isValidNumber(choice) && isValidMenuOption(choice)) {
        if (choice === 5) {
            break;
        }
        menu.get(choice).action();
    }
} while (true);

console.log("Have a nice day!");
