
Provate ad eseguirlo:

```js run
let str = "Hello";

str.test = 5; // (*)

alert(str.test);
```

Potrebbero esserci due diversi risultati:
1. `undefined`
2. Un errore (strict mode).

Perché? Proviamo ad esaminare cosa succede nella linea `(*)`:

1. Quando si prova ad accedere ad una proprietà di `str`, viene creato un "oggetto contenitore".
2. L'operazione di accesso viene eseguito su questo. Quindi l'oggetto ottiene la proprietà `test`.
3. L'operazione termina e "l'oggetto contenitore" viene distrutto.

Quindi, nell'ultima riga di codice, `str` non possiede alcuna traccia di quella proprietà. Viene creato un nuovo oggetto per ogni operazione su un tipo stringa.

**Questo esempio mostra chiaramente che le variabili primitive non sono oggetti.**

Le variabili di tipo primitivo infatti non possono memorizzare dati.

