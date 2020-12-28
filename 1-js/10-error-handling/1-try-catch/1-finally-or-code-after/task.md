importanza: 5

---

# Finally o solamente il codice?

Confronta i due frammenti di codice.

1. Il primo utilizza `finally` per eseguire il codice dopo `try..catch`:

    ```js
    try {
      lavoro lavoro
    } catch (e) {
      gestisci gli errori
    } finally {
    *!*
      ripulisci lo spazio di lavoro
    */!*
    }
    ```
2. Il secondo posiziona la puliza subito dopo il `try..catch`:

    ```js
    try {
      lavoro lavoro
    } catch (e) {
      gestisci gli errori
    }

    *!*
    ripulisci lo spazio di lavoro
    */!*
    ```

Abbiamo decisamente bisogno di ripulire dopo il lavoro, sia che si verifichi un errore o meno.

Esiste un vantaggio nell'usare `finally` o ambedue i frammenti di codice sono equivalenti? Se c'è qualche vantaggio, allora fornisci un esempio di quanto sia importante.
