// Local Storage
export const persistData = (data) => {
	window.localStorage.setItem('item', JSON.stringify(data));
};

export const readStorage = () => {
    const storage = JSON.parse(localStorage.getItem('item'));
    return storage;
};