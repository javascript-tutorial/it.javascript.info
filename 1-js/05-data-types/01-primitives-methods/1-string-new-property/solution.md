
Provate ad eseguirlo:

```js run
let str = "Hello";

str.test = 5; // (*)

alert(str.test);
```

<<<<<<< HEAD
Potrebbero esserci due diversi risultati:
1. `undefined`
2. Un errore.
=======
Depending on whether you have `use strict` or not, the result may be:
1. `undefined` (no strict mode)
2. An error (strict mode).
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

Perché? Proviamo ad esaminare cosa succede nella linea `(*)`:

<<<<<<< HEAD
1. Quando si prova ad accedere ad una proprietà di `str`, viene creato un "oggetto contenitore".
2. L'operazione di accesso viene eseguito su questo. Quindi l'oggetto ottiene la proprietà `test`.
3. L'operazione termina e "l'oggetto contenitore" viene distrutto.

Quindi, nell'ultima riga di codice, `str` non possiede alcuna traccia di quella proprietà. Viene creato un nuovo oggetto per ogni operazione su un tipo stringa.

Alcuni browser potrebbero decidere di limitare ulteriormente le possibilità offerte al programmatore bloccando la possibilità di assegnare proprietà ai tipi primitivi. Questo è il motivo per cui potremmo anche visualizzare un errore alla riga `(*)`. Anche se questo comportamento non rispetta pienamente le specifiche offerte dal linguaggio.
=======
1. When a property of `str` is accessed, a "wrapper object" is created.
2. In strict mode, writing into it is an error.
3. Otherwise, the operation with the property is carried on, the object gets the `test` property, but after that the "wrapper object" disappears.

So, without strict mode, in the last line `str` has no trace of the property.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

**Questo esempio mostra chiaramente che le variabili primitive non sono oggetti.**

<<<<<<< HEAD
Le variabili di tipo primitivo infatti non possono memorizzare dati.

Qualsiasi proprietà/metodo viene eseguita con il supporto di un oggetto temporaneo.

=======
They can't store additional data.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f
