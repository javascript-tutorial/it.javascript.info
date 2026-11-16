
Le note sono sotto il codice:

```js run
async function loadJson(url) { // (1)
  let response = await fetch(url); // (2)

  if (response.status == 200) {
    let json = await response.json(); // (3)
    return json;
  }

  throw new Error(response.status);
}

loadJson('https://javascript.info/no-such-user.json')
  .catch(alert); // Error: 404 (4)
```

Note:

1. La funzione `loadJson` diventa `async`.
2. Tutti i `.then` interni sono sostituiti con `await`.
3. Possiamo ritornare `response.json()` invece di aspettarlo (awaiting for it), come qui:

    ```js
    if (response.status == 200) {
      return response.json(); // (3)
    }
    ```

    Poi il codice esterno avrebbe dovuto attendere (`await)` che la promise risolvesse. Nel nostro caso non è importante.
4. L'errore sollevato da `loadJson` è gestito da `.catch`. Non possiamo usare `await loadJson(…)` qui, perchè non siamo in una funzione `async`.
