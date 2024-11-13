const storage = localStorage;
export const setKey = ({ key, val }) => storage[key]= val || "";
console.log(setKey, "----------set kkey----------");
export const getIndex = i => storage.key(i);
export const getKey = key => storage?.[key];
export const removeKey = key => delete storage[key];
export const clearKeys = () => storage.clear();