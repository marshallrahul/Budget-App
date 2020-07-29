// Local Storage
export const persistData = (data) => {
	window.localStorage.setItem('data', JSON.stringify(data));
};
