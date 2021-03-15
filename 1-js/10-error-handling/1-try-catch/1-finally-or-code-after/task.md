importance: 5

---

# Finally o solamente il codice?

Confronta i due frammenti di codice.

<<<<<<< HEAD
1. Il primo utilizza `finally` per eseguire il codice dopo `try..catch`:

    ```js
    try {
      lavoro lavoro
    } catch (e) {
      gestisci gli errori
=======
1. The first one uses `finally` to execute the code after `try...catch`:

    ```js
    try {
      work work
    } catch (err) {
      handle errors
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69
    } finally {
    *!*
      ripulisci lo spazio di lavoro
    */!*
    }
    ```
<<<<<<< HEAD
2. Il secondo posiziona la puliza subito dopo il `try..catch`:

    ```js
    try {
      lavoro lavoro
    } catch (e) {
      gestisci gli errori
=======
2. The second fragment puts the cleaning right after `try...catch`:

    ```js
    try {
      work work
    } catch (err) {
      handle errors
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69
    }

    *!*
    ripulisci lo spazio di lavoro
    */!*
    ```

Abbiamo decisamente bisogno di ripulire dopo il lavoro, sia che si verifichi un errore o meno.

Esiste un vantaggio nell'usare `finally` o ambedue i frammenti di codice sono equivalenti? Se c'è qualche vantaggio, allora fornisci un esempio di quanto sia importante.
