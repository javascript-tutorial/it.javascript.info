
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

<<<<<<< HEAD
1. Quando si prova ad accedere ad una proprietà di `str`, viene creato un "oggetto contenitore".
2. L'operazione di accesso viene eseguito su questo. Quindi l'oggetto ottiene la proprietà `test`.
3. L'operazione termina e "l'oggetto contenitore" viene distrutto.

Quindi, nell'ultima riga di codice, `str` non possiede alcuna traccia di quella proprietà. Viene creato un nuovo oggetto per ogni operazione su un tipo stringa.
=======
1. When a property of `str` is accessed, a "wrapper object" is created.
2. In strict mode, writing into it is an error.
3. Otherwise, the operation with the property is carried on, the object gets the `test` property, but after that the "wrapper object" disappears, so in the last line `str` has no trace of the property.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

**Questo esempio mostra chiaramente che le variabili primitive non sono oggetti.**

Le variabili di tipo primitivo infatti non possono memorizzare dati.

