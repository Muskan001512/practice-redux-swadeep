import { useSelector } from 'react-redux';

export default function useCustomSelector(args) {
    if (!args) throw new Error(`useCustomSelector: No arguments provided. Please specify a key or an object with a key and state.`);

    const key = typeof args === "string" ? args : args?.key;
    const state = typeof args === "object" ? args?.state : undefined;

    if (!key) throw new Error(`useCustomSelector: Expected a valid store key but received none. Please provide a valid key.`);

    const customState = useSelector(({ [key]: val }) => val);
    // const customState = useSelector(state => state?.[val]);
    if (!customState) throw new Error(`useCustomSelector: Unable to access the store key '${key}'. It may not exist in the Redux store.`);

    return state ? customState[state] : customState;
}