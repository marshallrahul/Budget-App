export default class Expenses {
	constructor(id, title, amount) {
		this.id = id;
		this.title = title;
		this.amount = amount;
		this.percentage = -1;
	}

	calcPercentage(totalInc) {
		if (totalInc > 0) {
			this.percentage = Math.round((parseFloat(this.amount.replace(/,/g, '')) / totalInc) * 100);
		} else {
			this.percentage = -1;
		}
	}
}
