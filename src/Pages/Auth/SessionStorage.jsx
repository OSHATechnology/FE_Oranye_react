import { useState } from 'react';

export const useSessionStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.sessionStorage.getItem(key);
            if (item) {
                return JSON.parse(item);
            } else {
                window.sessionStorage.setItem(key, JSON.stringify(initialValue));
                return initialValue;
            }
        } catch (error) {
            return initialValue;
        }
    });

    const setValue = value => {
        try {
            window.sessionStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            setStoredValue(value);
        }
    };

    return [storedValue, setValue];
};