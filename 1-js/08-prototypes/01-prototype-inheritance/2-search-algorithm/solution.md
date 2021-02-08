
1. Aggiungiamo `__proto__`:

    ```js run
    let head = {
      glasses: 1
    };

    let table = {
      pen: 3,
      __proto__: head
    };

    let bed = {
      sheet: 1,
      pillow: 2,
      __proto__: table
    };

    let pockets = {
      money: 2000,
      __proto__: bed
    };

    alert( pockets.pen ); // 3
    alert( bed.glasses ); // 1
    alert( table.money ); // undefined
    ```

2. Nei moderni engine, che valutano la performance, non c'è alcuna differenza tra il prelevare una proprietà dall'oggetto oppure direttamente dal suo prototype. Sono in grado di ricordare da dove è stata presa la proprietà e riutilizzarla alla prossima richiesta.

    Ad esempio, per `pockets.glasses` ricordano dove hanno trovato `glasses` (in `head`), quindi la prossima volta la cercheranno proprio li. Sono anche abbastanza intelligenti da aggiornare la cache interna nel caso qualcosa cambi, quindi questa ottimizzazione è sicura.
