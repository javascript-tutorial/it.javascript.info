
# Concatenamento opzionale '?.'

[recent browser="new"]

Il concatenamento opzionale (optional chaining), `?.`, è un modo sicuro di accedere alle proprietà annidate di un oggetto, anche nel caso in cui una proprietà intermedia non dovesse esistere.

## Il problema della "proprietà inesistente"

Se avete appena cominciato a leggere questo tutorial e a imparare JavaScript, forse questo problema non lo avete ancora affrontato, ma è piuttosto comune.

Ad esempio, ipotizziamo di avere un oggetto `user`, in cui sono memorizzate le informazioni relative ai nostri utenti.

La maggior parte dei nostri utenti possiedono l'indirizzo nella proprietà `user.address`, la via in `user.address.street`, ma qualcuno potrebbe non averle fornite.

In questo caso, quando proviamo ad accedere a `user.address.street`, e l'utente non possiede un indirizzo, avremo un errore:

```js run
let user = {}; // un utente senza la proprietà "address"


alert(user.address.street); // Errore!
```

Questo è il risultato che ci si aspetta. JavaScript funziona in questo modo. Se `user.address` è `undefined`, un tentativo di accesso a `user.address.street` fallirà con un errore.

Nella maggior parte dei casi, preferiremmo avere `undefined` piuttosto di un errore (in questo caso con il significato "nessuna via").

<<<<<<< HEAD
... Un altro esempio. Il metodo `document.querySelector('.elem')` ritorna un oggetto che corrisponde ad un elemento della pagina web, che ritorna `null` quando l'elemento non esiste.
=======
...and another example. In Web development, we can get an object that corresponds to a web page element using a special method call, such as `document.querySelector('.elem')`, and it returns `null` when there's no such element.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
// document.querySelector('.elem') è null se non esiste l'elemento
let html = document.querySelector('.elem').innerHTML; // errore se è null
```

<<<<<<< HEAD
Di nuovo, se un elemento non esiste, otterremo un errore nel tentativo di accedere a `.innerHTML` di `null`. In alcuni casi, in cui l'assenza di un elemento è normale, vorremo evitare l'errore e accettare come risultato `html = null`.
=======
Once again, if the element doesn't exist, we'll get an error accessing `.innerHTML` property of `null`. And in some cases, when the absence of the element is normal, we'd like to avoid the error and just accept `html = null` as the result.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Come possiamo farlo?

La soluzione più ovvia sarebbe di controllare il valore utilizzando `if` o l'operatore condizionale `?` prima di accedere alle proprietà, come nell'esempio:

```js
let user = {};

alert(user.address ? user.address.street : undefined);
```

<<<<<<< HEAD
Funziona, nessun errore... Ma è poco elegante. Come potete vedere , `"user.address"` appare due volte nel codice. Per proprietà molto più annidate, potrebbe diventare un problema, in quanto saranno necessarie molte più ripetizioni.

Ad esempio, proviamo a recuperare il valore di `user.address.street.name`.

Dobbiamo verificare sia `user.address` che `user.address.street`:
=======
It works, there's no error... But it's quite inelegant. As you can see, the `"user.address"` appears twice in the code.

Here's how the same would look for `document.querySelector`:

```js run
let html = document.querySelector('.elem') ? document.querySelector('.elem').innerHTML : null;
```

We can see that the element search `document.querySelector('.elem')` is actually called twice here. Not good.

For more deeply nested properties, it becomes even uglier, as more repetitions are required.

E.g. let's get `user.address.street.name` in a similar fashion.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
let user = {}; // l'utente non ha address

alert(user.address ? user.address.street ? user.address.street.name : null : null);
```

Questo è semplicemente terribile, un codice del genere potrebbe essere difficile da comprendere.

<<<<<<< HEAD
Ci sarebbe un modo migliore per riscriverlo, utilizzando l'operatore `&&`:
=======
There's a little better way to write it, using the `&&` operator:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
let user = {}; // l'utente non ha address

alert( user.address && user.address.street && user.address.street.name ); // undefined (nessun errore)
```

Concatenare con `&&` l'intero percorso verso la proprietà ci assicura che tutti i componenti esistano (in caso contrario, la valutazione si interrompe), ma non è comunque l'ideale.

Come potete vedere, i nome delle proprietà sono ancora duplicate nel codice. Ad esempio, nel codice sopra, `user.address` è ripetuto tre volte.

Questo è il motivo per cui la concatenazione opzionale `?.` è stata aggiunta al linguaggio. Per risolvere questo problema una volta per tutte!

## Concatenazione opzionale

La concatenazione opzionale `?.` interrompe la valutazione se il valore prima di `?.` è `undefined` o `null`, e ritorna `undefined`.

**D'ora in poi, in questo articolo, per brevità diremo che qualcosa "esiste" se non è né `null` né `undefined`.**

In altre parole, `value?.prop`:
- funziona come `value.prop`, se `value` esiste,
- altrimenti (quando `value` è `undefined/null`) ritorna `undefined`.

Vediamo un modo sicuro per accedere a `user.address.street` utilizzando `?.`:

```js run
let user = {}; // user non possiede l'address

alert( user?.address?.street ); // undefined (nessun errore)
```

Il codice è corto e pulito, non c'è alcuna duplicazione.

<<<<<<< HEAD
Leggere l'indirizzo con `user?.address` funzionerebbe anche se l'oggetto `user` non esistesse:
=======
Here's an example with `document.querySelector`:

```js run
let html = document.querySelector('.elem')?.innerHTML; // will be undefined, if there's no element
```

Reading the address with `user?.address` works even if `user` object doesn't exist:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
let user = null;

alert( user?.address ); // undefined
alert( user?.address.street ); // undefined
```

Da notare: la sintassi `?.` rende opzionale il valore che la precede, nulla di più.

Ad esempio in `user?.address.street.name` il costrutto `?.` permette alla proprietà `user` di essere `null/undefined` in sicurezza (e ritornare `undefined` in questo caso), ma questo vale solamente per `user`. Si accederà alle altre proprietà normalmente. Se vogliamo che anche altre proprietà siano opzionali, dobbiamo rimpiazzare `.` con `?.`.

```warn header="Non abusate della concatenazione opzionale"
Dovremmo utilizzare `?.` solamente quando va bene che una proprietà possa non esistere.

<<<<<<< HEAD
Ad esempio, considerando la logica del nostro codice, l'oggetto `user` deve necessariamente esistere, mentre `address` è opzionale, quindi dovremmo scrivere `user.address?.street`, non `user?.address?.street`.

Quindi, se `user` dovesse essere `undefined` per errore, otterremo un errore e potremmo sistemarlo. Altrimenti, gli errori di programmazione potrebbero essere silenziati in modo non appropriato, rendendo il debug molto difficile.
=======
For example, if according to our code logic `user` object must exist, but `address` is optional, then we should write `user.address?.street`, but not `user?.address?.street`.

Then, if `user` happens to be undefined, we'll see a programming error about it and fix it. Otherwise, if we overuse `?.`, coding errors can be silenced where not appropriate, and become more difficult to debug.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

````warn header="La variabile che precede `?.` deve essere dichiarata"
Se non esiste alcuna variabile `user`, allora `user?.anything` provocherà un errore:

```js run
// ReferenceError: user is not defined
user?.address;
```
La variabile deve essere dichiarata (ad esempio come `let/const/var user` o come parametro di funzione). La concatenazione opzionale funziona solamente con le variabili dichiarate.
````

## Corto circuito

Come detto in precedenza, il costrutto `?.` interrompe immediatamente (manda in "corto circuito") la valutazione se la proprietà a destra non esiste.

<<<<<<< HEAD
Quindi, nel caso ci siano ulteriori chiamate a funzione o side-effects, questi non verranno eseguiti.
=======
So, if there are any further function calls or operations to the right of `?.`, they won't be made.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ad esempio:

```js run
let user = null;
let x = 0;

<<<<<<< HEAD
user?.sayHi(x++); // non esiste "sayHi", quindi l'esecuzione non raggiungerà x++
=======
user?.sayHi(x++); // no "user", so the execution doesn't reach sayHi call and x++
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

alert(x); // 0, valore non incrementato
```

## Altre varianti: ?.(), ?.[]

La concatenazione opzionale `?.` non è un operatore, ma uno speciale costrutto sintattico, che funziona anche con le funzioni e le parentesi quadre.

Ad esempio, `?.()` viene utilizzato per invocare una funzione che potrebbe non esistere.

Nel codice sotto, alcuni dei nostri utenti possiedono il metodo `admin`, mentre altri no:

```js run
let userAdmin = {
  admin() {
    alert("I am admin");
  }
};

let userGuest = {};

*!*
userAdmin.admin?.(); // I am admin
*/!*

*!*
<<<<<<< HEAD
userGuest.admin?.(); // niente (il metodo non esiste)
*/!*
```

Qui, in entrambe le righe, come prima cosa abbiamo utilizzato il punto (`user1.admin`) per ottenere la proprietà `admin`, poiché l'oggetto `user` deve necessariamente esistere, quindi l'accesso è sicuro.

Successivamente `?.()` controlla la parte sinistra: se la funzione `admin` esiste, allora viene eseguita (ciò che accade con `user1`). Altrimenti (con `user2`) la valutazione si interrompe senza errori.
=======
userGuest.admin?.(); // nothing happens (no such method)
*/!*
```

Here, in both lines we first use the dot (`userAdmin.admin`) to get `admin` property, because we assume that the `user` object exists, so it's safe read from it.

Then `?.()` checks the left part: if the `admin` function exists, then it runs (that's so for `userAdmin`). Otherwise (for `userGuest`) the evaluation stops without errors.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

La sintassi `?.` funziona anche con le parentesi `[]` (invece del punto `.`). Come nei casi precedenti, possiamo accedere con sicurezza alla proprietà di un oggetto che potrebbe non esistere.

```js run
let key = "firstName";

let user1 = {
  firstName: "John"
};

let user2 = null;

alert( user1?.[key] ); // John
alert( user2?.[key] ); // undefined
```

Possiamo anche utilizzare `?.` con `delete`:

```js run
delete user?.name; // cancella user.name se l'utente esiste
```

<<<<<<< HEAD
````warn header="Possiamo utilizzare `?.` per l'accesso e la rimozione sicura, ma non per la scrittura"
La concatenazione opzionale `?.` non ha alcun significato alla sinistra di un'assegnazione.
=======
````warn header="We can use `?.` for safe reading and deleting, but not writing"
The optional chaining `?.` has no use on the left side of an assignment.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ad esempio:
```js run
let user = null;

<<<<<<< HEAD
user?.name = "John"; // Errore, non funziona
// poiché valuta undefined = "John"
```

Non è cosi intelligente.
=======
user?.name = "John"; // Error, doesn't work
// because it evaluates to: undefined = "John"
```

>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
````

## Riepilogo

La concatenazione opzionale `?.` ha tre forme:

1. `obj?.prop` -- ritorna `obj.prop` se `obj` esiste, altrimenti ritorna `undefined`.
2. `obj?.[prop]` -- ritorna `obj[prop]` se `obj` esiste, altrimenti ritorna `undefined`.
3. `obj.method?.()` -- invoca `obj.method()` se `obj.method` esiste, altrimenti ritorna `undefined`.

Come possiamo vedere, le tre forme sono semplici da utilizzare. Il costrutto `?.` verifica che la parte sinistra non sia `null/undefined`; se non lo è, permette alla valutazione di proseguire, altrimenti la interrompe immediatamente.

La concatenazione di `?.` permette di accedere in sicurezza a proprietà annidate.

<<<<<<< HEAD
In ogni caso, dovremmo applicare `?.` con prudenza, solamente nei casi in cui è accettabile che la parte sinistra possa non esistere. In questo modo evitiamo di nascondere errori di programmazione, nel caso ce ne siano.
=======
Still, we should apply `?.` carefully, only where it's acceptable, according to our code logic, that the left part doesn't exist. So that it won't hide programming errors from us, if they occur.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
