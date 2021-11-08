import { useState } from "react";

const useLocalStorage = (key: string, initialValue: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
      /*fetch("http://localhost:9000/getState", {
          method: "GET",
        }).then((res) => {
          res.json().then((res) => {
            // @ts-ignore
            let countries = Object.values(res)[0].countries;
            setLocalStorage((countries) => {});
          });
        });*/
    } catch (err) {
      console.error(err);
      return initialValue;
    }
  });

  const setLocalStorage = (value: (arg0: any) => any) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      if (valueToStore.length > 0) {
        fetch("http://localhost:9000/saveState", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(valueToStore),
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setLocalStorage];
};

export default useLocalStorage;
