import uniqid from 'uniqid';
import numeral from 'numeral';
import * as Item from './models/Item';
import { data } from './models/Item';
import Income from './models/Income';
import Expenses from './models/Expenses';
import * as itemView from './views/itemView';
import { DOMStrings } from './views/base';


//! GLOBAL APP CONTROLLER

const controllAddItem = () => {
    
    // 1) Get the input obj
    const input = Item.getInput();
    
    if (input.des !== '' && input.amount !== isNaN) {

        // 2) Clear input field
        Item.clearField();
        
        // Check amount is a number
        let amount = 0;
        if (isNaN(input.amount)) {
            amount += 0;
        } else {
            amount += input.amount;
        }
        
        // 3) Create a instance
        let obj;

        if (input.type === 'inc') {
            obj = new Income(
                uniqid(), 
                input.des, 
                numeral(amount).format('0,0.00'),
            );

            // 4) Add the input to object
            Item.addInput(obj, 'inc');

        } else if (input.type === 'exp') {
            obj = new Expenses(
                uniqid(), 
                input.des, 
                numeral(amount).format('0,0.00'),
            );

            // 4) Add the input to object
            Item.addInput(obj, 'exp');
        }

        // 5) Update total, inc & exp budget
        Item.updateBudget();
        Item.updateTotalBudget();

        // 6) Render to the UI 
        if (input.type === 'inc') {
            
            // Clear list item
            Item.incClearList();
            data.allItem.inc.forEach((el) => itemView.renderInc(el));
        
        } else if (input.type === 'exp') {  
            
            // Clear list item
            Item.expClearList();
            data.allItem.exp.forEach((el) => itemView.renderExp(el));
        }

        // 7) Render the budget to the UI
        itemView.renderTotalInc(data);
        itemView.renderTotalExp(data);
        itemView.renderTotalBudget(data);

        // 8) Update percentages
        Item.updatePercentage();
    
        // 9) Render the updated percentages to the UI
        itemView.renderPercentage(data);

        //TODO: 10) Update expenses percentages
        data.allItem.exp.forEach((el) => el.calcPercentage(data.totals.inc));

        //TODO: 11) Render the expenses percentages to the UI
    };
};


const controllDeleteItem = (e) => {
    
    // 1) Get the current id
    const currentID = (e.target.parentNode.parentNode.parentNode.parentNode.id);

    // 2) Get current type
    let currentType;
    const parent = e.target.parentNode.parentNode.closest('.income__list');
    
    currentType = parent ? 'inc' : 'exp';

    // 3) Update the budget
    Item.updateDtBudget(currentID, currentType);
    Item.updateDtTotalBudget(data);
    
    // 4) Render the update budget to the UI
    itemView.renderIncUpdateBudget(data, 'inc');
    itemView.renderExpUpdateBudget(data, 'exp');
    itemView.renderTotalBudget(data);
    
    // 5) Delete the item from data
    Item.deleteItem(currentID, currentType);

    // 6) Delete the item from UI
    itemView.deleteItem(currentID);   

    // 8) Update percentages & render to the UI
    Item.updatePercentage();
    itemView.renderPercentage(data);
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



//? Testing
window.data = data;