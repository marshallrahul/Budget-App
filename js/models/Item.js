import { DOMStrings } from '../views/base';

export const data = {
	allItem: {
		inc: [],
		exp: [],
	},
	totals: {
		inc: 0,
		exp: 0,
	},
	budget: 0,
	percentage: -1,
};

export const getInput = () => {
	return {
		type: DOMStrings.type.value,
		des: DOMStrings.description.value,
		amount: DOMStrings.amount.value,
	};
};

const inputField = [DOMStrings.description, DOMStrings.amount];
export const clearField = () => {
	inputField.forEach((el) => (el.value = ''));
};

export const incClearList = () => (DOMStrings.incomeList.innerHTML = '');

export const expClearList = () => (DOMStrings.expensesList.innerHTML = '');

export const addInput = (el, type) => data.allItem[type].push(el);

export const updateBudget = () => {
	// Calculate total inc budget
	data.totals.inc = 0;
	const incTotal = data.allItem.inc
		.map((el) => parseFloat(el.amount.replace(/,/g, '')))
		.reduce((acc, cur) => {
			return acc + cur;
		}, 0);

	data.totals.inc += incTotal;

	// Calculate total exp budget
	data.totals.exp = 0;
	const expTotal = data.allItem.exp
		.map((el) => parseFloat(el.amount.replace(/,/g, '')))
		.reduce((acc, cur) => {
			return acc + cur;
		}, 0);

	data.totals.exp += expTotal;
};

export const updateTotalBudget = () => {
	data.budget = 0;

	const totalBudget = data.totals.inc - data.totals.exp;
	data.budget += Math.abs(totalBudget);
};

export const deleteItem = (id, type) => {
	const index = data.allItem[type].findIndex((el) => el.id === id);

	data.allItem[type].splice(index, 1);
};

export const updateDtBudget = (id, type) => {
	const index = data.allItem[type].findIndex((el) => el.id === id);
	const dtAmount = data.allItem[type][index].amount.replace(/,/g, '');

	data.totals[type] -= parseFloat(dtAmount);
};

export const updateDtTotalBudget = (data) => {
	data.budget = Math.abs(data.totals.inc - data.totals.exp);
};

export const updatePercentage = () => {
	data.percentage = (data.totals.exp / data.totals.inc) * 100;
};

export const emptyList = (lst) => lst.forEach((el) => el.splice(0, el.length));

const calcPercentage = (totalInc, amount) => {
	let percentage;

	if (totalInc > 0) {
		percentage = Math.round((parseFloat(amount.replace(/,/g, '')) / totalInc) * 100);
	} else {
		percentage = -1;
	}
	return percentage;
};

export const expPercentage = (data) => {
	const amount = data.allItem.exp.map((el) => calcPercentage(data.totals.inc, el.amount));
	amount.forEach((el, i) => (document.querySelectorAll('.item__percentage')[i].innerHTML = `${el}%`));
};
