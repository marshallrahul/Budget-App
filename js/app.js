import uniqid from 'uniqid';
import numeral from 'numeral';
import * as Item from './models/Item';
import { data } from './models/Item';
import Income from './models/Income';
import Expenses from './models/Expenses';
import { persistData, readStorage } from './models/Storage';
import * as itemView from './views/itemView';
import { DOMStrings } from './views/base';


// GLOBAL APP CONTROLLER

let datsSet = [];

const controllAddItem = () => {
    
    // Get the input obj
    const input = Item.getInput();
    
    if (input.des !== '' && input.amount !== isNaN) {

        // Clear input field
        Item.clearField();
        
        // Check amount is a number
        let amount = 0;
        if (isNaN(input.amount)) {
            amount += 0;
        } else {
            amount += input.amount;
        }
        
        // Create a instance
        let obj;

        if (input.type === 'inc') {
            obj = new Income(
                uniqid(), 
                input.des, 
                numeral(amount).format('0,0.00'),
            );

            // Add the input to object
            Item.addInput(obj, 'inc');

        } else if (input.type === 'exp') {
            obj = new Expenses(
                uniqid(), 
                input.des, 
                numeral(amount).format('0,0.00'),
            );

            // Add the input to object
            Item.addInput(obj, 'exp');
        }

        // Store in Local Storage    
        datsSet.push(obj);    
        persistData(datsSet);

        // Update total, inc & exp budget
        Item.updateBudget();
        Item.updateTotalBudget();

        // Calculate percentages
        Item.calcPercentage();

        // Render to the UI 
        if (input.type === 'inc') {
            
            // Clear list item
            Item.incClearList();
            data.allItem.inc.forEach((el) => itemView.renderInc(el));
        
        } else if (input.type === 'exp') {  
            
            // Clear list item
            Item.expClearList();
            data.allItem.exp.forEach((el) => itemView.renderExp(el));
        }

        // Render the budget to the UI
        itemView.renderTotalInc(data);
        itemView.renderTotalExp(data);
        itemView.renderTotalBudget(data);

        // Update percentages
        Item.updatePercentage();
    
        // Render the updated percentages to the UI
        itemView.renderPercentage(data);
    };
};


const controllDeleteItem = (e) => {
    
    // Get the current id
    const currentID = (e.target.parentNode.parentNode.parentNode.parentNode.id);

    // Get current type
    let currentType;
    const parent = e.target.parentNode.parentNode.closest('.income__list');
    
    currentType = parent ? 'inc' : 'exp';

    // Update the budget
    Item.updateDtBudget(currentID, currentType);
    Item.updateDtTotalBudget(data);
    
    // Render the update budget to the UI
    itemView.renderIncUpdateBudget(data, 'inc');
    itemView.renderExpUpdateBudget(data, 'exp');
    itemView.renderTotalBudget(data);
    
    // Delete the item from data
    Item.deleteItem(currentID, currentType);

    // Delete the item from UI
    itemView.deleteItem(currentID);   

    // Update percentages & render to the UI
    Item.updatePercentage();
    itemView.renderPercentage(data);

    // Update expenses percentages
    data.allItem.exp.forEach((el) => el.calcPercentage(data.totals.inc));
};

const loadItems = () => {
    // Read from Local Storage
    const item = readStorage()

    // TODO: Append the items to the data

    // TODO: Render to the UI

};


// Set inital values
itemView.initValues(data);

// Set month
itemView.renderMonth();

// Add item to budget list
document.querySelector('.add__btn, .add__btn *').addEventListener('click', controllAddItem);
window.addEventListener('keypress', (event) => {
	if (event.keyCode == 13 || event.which == 13) {
		controllAddItem();
	}
});

// Delete item
DOMStrings.container.addEventListener('click', (event) => {
    if (event.target.matches('.ion-ios-close-outline')) {
        controllDeleteItem(event);
    }
});

// Load items 
window.addEventListener('load', loadItems());


//? Testing
window.data = data;