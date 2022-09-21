import {useState } from 'react';

export const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            if(item) {
                return JSON.parse(item);
            }else{
                window.localStorage.setItem(key, JSON.stringify(initialValue));
                return initialValue;
            }
        } catch (error) {
            return initialValue;
        }
    });
    
    const setValue = value => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            setStoredValue(value);
        }
    };
    
    return [storedValue, setValue];
};