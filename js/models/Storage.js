// Store in Local Storage
export const persistIncData = (data) => {
	window.localStorage.setItem('inc', JSON.stringify(data));
};

export const persistExpData = (data) => {
	window.localStorage.setItem('exp', JSON.stringify(data));
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

export const addInput = () => {
    //...
};