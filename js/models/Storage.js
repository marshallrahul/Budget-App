// Store in Local Storage
export const persistIncData = (data) => {
	localStorage.setItem('inc', JSON.stringify(data));
};

export const persistExpData = (data) => {
	localStorage.setItem('exp', JSON.stringify(data));
};

// Read data from storage
export const readIncStorage = () => {
	const storage = JSON.parse(localStorage.getItem('inc'));
	return storage;
};

export const readExpStorage = () => {
	const storage = JSON.parse(localStorage.getItem('exp'));
	return storage;
};

// Add the data into data object
export const addItem = (els, data, type) => {
	if (els) els.forEach((el) => data.allItem[type].push(el));
};

// Remove the item from Local Storage
export const removeStorageItem = (id, type) => {
    let items;
	items = JSON.parse(localStorage.getItem(type));
	const index = items.findIndex((el) => el.id === id);
	items.splice(index, 1);
    items = JSON.stringify(items);
    localStorage.setItem(type, items);
};