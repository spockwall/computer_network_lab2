export const logout = () => {
	localStorage.clear();
	window.location.reload(); // auth in userContext will be set to false if localstorage is cleared.
};
