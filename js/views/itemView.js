import { DOMStrings } from './base';
import numeral from 'numeral';
import date from 'date-and-time';

export const renderInc = (obj) => {
	const markup = `
        <div class="item clearfix" id="${obj.id}">
            <div class="item__description">${obj.title}</div>
            <div class="right clearfix">
                <div class="item__value">+ ${obj.amount}</div>
                <div class="item__delete">
                    <button class="item__delete--btn">
                        <i class="ion-ios-close-outline"></i>
                    </button>
                </div>
            </div>
        </div>
    `;

	DOMStrings.incomeList.insertAdjacentHTML('beforeend', markup);
};

export const renderExp = (obj, calc, total) => {
	const markup = `
        <div class="item clearfix" id="${obj.id}">
            <div class="item__description">${obj.title}</div>
            <div class="right clearfix">
                <div class="item__value">- ${obj.amount}</div>
                <div class="item__percentage">${obj.percentage}%</div>
                <div class="item__delete">
                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                </div>
            </div>
        </div>
    `;

	DOMStrings.expensesList.insertAdjacentHTML('beforeend', markup);
};

export const initValues = (data) => {
	(DOMStrings.totalBudget.innerHTML = `- ${numeral(0).format('0,0.00')}`),
	(DOMStrings.incBudget.innerHTML = `+ ${numeral(0).format('0,0.00')}`),
	(DOMStrings.expBudget.innerHTML = `- ${numeral(0).format('0,0.00')}`),
	(DOMStrings.budgetExpPercentage.innerHTML = '---');
};

export const renderTotalInc = (data) =>
	(DOMStrings.incBudget.innerHTML = `+ ${numeral(data.totals.inc).format('0,0.00')}`);

export const renderTotalExp = (data) =>
	(DOMStrings.expBudget.innerHTML = `- ${numeral(data.totals.exp).format('0,0.00')}`);

export const renderPercentage = (data) => {
	if (data.percentage === 0 || isNaN(data.percentage) || data.percentage === Infinity) {
        DOMStrings.budgetExpPercentage.innerHTML = '---';
	} else {
		DOMStrings.budgetExpPercentage.innerHTML = `${Math.round(data.percentage)}%`;
	}
};

export const renderTotalBudget = (data) => {
    const sign = data.totals.exp >= data.totals.inc ? '-' : '+';
	(DOMStrings.totalBudget.innerHTML = `${sign} ${numeral(data.budget).format('0,0.00')}`);
};

export const deleteItem = (id) => {
	const item = document.querySelector(`[id=${id}]`);

	if (item) item.parentElement.removeChild(item);
};

export const renderIncUpdateBudget = (data, type) => {
	DOMStrings.incBudget.innerHTML = `+ ${numeral(data.totals[type]).format('0,0.00')}`;
};

export const renderExpUpdateBudget = (data, type) => {
	DOMStrings.expBudget.innerHTML = `- ${numeral(data.totals[type]).format('0,0.00')}`;
};

export const renderMonth = () => {
	const now = new Date();
	DOMStrings.budgetMonth.innerHTML = date.format(now, 'MMMM, YYYY');
};