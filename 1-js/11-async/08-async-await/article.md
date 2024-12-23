# Async/await

Esiste una sintassi speciale per lavorare con le promise in un modo più comodo, chiamata async/await. È sorprendentemente facile da capire e usare.


## Async functions

Iniziamo con la parola chiave `async`. Può essere messa prima di una funzione, come nell'esempio sotto:

```js
async function f() {
  return 1;
}
```

La parola "async" prima di una funzione significa una cosa semplice: la funzione ritorna sempre una promise. Gli altri valori sono "avvolti" wrapped in una promise risolta automaticamente.

Per esempio, questa funzione ritorna una promise risolta con il risultato di `1`, proviamola:

```js run
async function f() {
  return 1;
}

f().then(alert); // 1
```

...Possiamo anche ritornare esplicitamente una promise, sarebbe lo stesso:

```js run
async function f() {
  return Promise.resolve(1);
}

f().then(alert); // 1
```

Così, `async` assicura che la funzione ritorni una promise, e "avvolge" (wraps) le non-promise al suo interno. Abbastanza semplice, vero? Ma non sono quello. C'è un'altra parola chiave, `await`, che funziona solo nelle funzioni `async`, ed è piuttosto cool.

## Await

La sintassi:

```js
// funziona solo all'interno delle funzioni async
let value = await promise;
```

La parola chiave `await` fa attendere JavaScript fino a quando la promise è ferma (settles) e ritorna il suo risultato.

Ecco un esempio con una promise che si risolve in un secondo:
```js run
async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("fatto!"), 1000)
  });

*!*
  let result = await promise; // attende fino a quando la promise si risolve (*)
*/!*

  alert(result); // "fatto!"
}

f();
```

L'esecuzione della funzione "va in pausa" alla linea `(*)` e riprende quando la promise si ferma (settles), con `result` che diventa il suo risultato. Così il codice sopra mostra "fatto!" in un secondo.

Enfatizziamo: `await` fa letteralmente attendere JavaScript fino a quando la promise si ferma, poi va avanti con il risultato. Questo non costa alcuna risorsa della CPU, perché il motore può fare altri lavori nel frattempo: eseguire altri script, gestire eventi etc.

È solo una sintassi più elegante per ottenere il risultato della promise `promise.then`, più facile da leggere e da scrivere.

````warn header="Non possiamo usare `await` nelle normali funzioni"
Se proviamo ad utilizzare `await` in una funzione non asincrona, otterremmo un errore di sintassi:

```js run
function f() {
  let promise = Promise.resolve(1);
*!*
  let result = await promise; // Syntax error
*/!*
}
```

Avremo questo errore se non mettiamo `async` prima di una funzione. Come detto, `await` funziona solo all'interno di una funzione asincrona (`async function`).
````

Prendiamo l'esempio `showAvatar()` dal capitolo <info:promise-chaining> e riscriviamolo usando `async/await`:

1. Avremo bisogno di sostituire le chiamate `.then` con `await`.
2. Inoltre dovremo rendere la funzione asincrona (`async`) per farli lavorare.

```js run
async function showAvatar() {

  // legge il nostro JSON
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();

  // legge l'utente GitHub
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubResponse.json();

  // show the avatar
  let img = document.createElement('img');
  img.src = githubUser.avatar_url;
  img.className = "promise-avatar-example";
  document.body.append(img);

  // wait 3 seconds
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));

  img.remove();

  return githubUser;
}

showAvatar();
```

Piuttosto pulito e facile da leggere, vero? Molto meglio che prima.

````smart header="`await` Non funzionerà nel codice di livello più alto"
Le persone che hanno appena iniziato ad utilizzare `await` tendono a dimenticare il fatto che non possiamo utilizzare `await` nel codice di livello piú alto. Per esempio, questo non funzionerà:

For instance:

```js run module
// we assume this code runs at top level, inside a module
let response = await fetch('/article/promise-chaining/user.json');
let user = await response.json();

console.log(user);
```

<<<<<<< HEAD
Possiamo "avvolgerlo" wrap in una funzione async anonima, come qui:
=======
If we're not using modules, or [older browsers](https://caniuse.com/mdn-javascript_operators_await_top_level) must be supported, there's a universal recipe: wrapping into an anonymous async function.

Like this:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
(async () => {
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();
  ...
})();
```

````
````smart header="`await` accetta i \"thenables\""
Come `promise.then`, `await` permette di usare gli oggetti "thenable" (quelli con un metodo `then`). L' idea è che un oggetto di terze parti possa non essere una promise, ma essere promise-compatibile: se supporta `.then`, è abbastanza per usarlo con `await`.

Ecco una dimostrazione: la classe `Thenable` class, l'`await` sotto accetta:

```js run
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve);
    // risolve con this.num*2 dopo 1000ms
    setTimeout(() => resolve(this.num * 2), 1000); // (*)
  }
}

async function f() {
  // attende per 1 secondo, poi il risultato diventa 2
  let result = await new Thenable(1);
  alert(result);
}

f();
```

Se `await` riceve un oggetto non-promise con `.then`, chiama quel metodo passando le funzioni native `resolve`, `reject` come argomenti. Poi `await` fino a quando una delle due viene chiamata (nell'esempio sopra avviene nella linea `(*)`) e poi procede con il risultato.
````

````smart header="Methods async delle classi"
Per dichiarare un metodo async di una classe, basta precederlo con `async`:

```js run
class Waiter {
*!*
  async wait() {
*/!*
    return await Promise.resolve(1);
  }
}

new Waiter()
  .wait()
  .then(alert); // 1 (this is the same as (result => alert(result)))
```
Il significato è lo stesso: assicura che il valore ritornato sia una promise ed abilita `await`.

````
## Gestione degli errori

Se una promise si risolve normalmente, allora `await promise` ritorna il risultato. Ma nel caso di un rigetto (rejection), solleva l'errore, proprio come se in quella linea ci fosse stato un `throw`.

Questo codice:

```js
async function f() {
*!*
  await Promise.reject(new Error("Whoops!"));
*/!*
}
```

...È lo stesso di questo:

```js
async function f() {
*!*
  throw new Error("Whoops!");
*/!*
}
```

Nelle situazioni reali, la promise può prendere del tempo prima di venire rigettata. In quel caso ci sarà un ritardo prima che `await` sollevi un errore.

Possiamo catturare l'errore utilizzando `try..catch`, allo stesso modo che con un regolare `throw`:

```js run
async function f() {

  try {
    let response = await fetch('http://no-such-url');
  } catch(err) {
*!*
    alert(err); // TypeError: failed to fetch
*/!*
  }
}

f();
```

In caso di errore, il controllo salta al blocco `catch`. Possiamo anche "avvolgere" (wrap) più linee:

```js run
async function f() {

  try {
    let response = await fetch('/no-user-here');
    let user = await response.json();
  } catch(err) {
    // cattura gli errori sia in fetch che in response.json
    alert(err);
  }
}

f();
```

Se non abbiamo `try..catch`, allora la promise generata dalla chiamata della funzione async `f()` viene rigettata. Possiamo aggiungere `.catch` per gestirla:

```js run
async function f() {
  let response = await fetch('http://no-such-url');
}

// f() diventa una promise rigettata
*!*
f().catch(alert); // TypeError: failed to fetch // (*)
*/!*
```

Se ci dimentichiamo di aggiungere `.catch` qui, allora otterremo un errore di una promise non gestito (visibile nella console). Possiamo catturare usando un gestore di eventi globale come descritto nel capitolo <info:promise-error-handling>.


```smart header="`async/await` and `promise.then/catch`"
Quando usiamo `async/await`, raramente abbiamo bisogno di `.then`, perché `await` gestisce l'attesa per noi. E possiamo usare un normale `try..catch` invece di `.catch`. Questo è spesso (non sempre) più conveniente.

Ma al livello più alto del codice, quando siamo fuori da qualunque funzione `async`, non siamo sintatticamente in grado id usare `await`, così è una pratica normale usare `.then/catch` per gestire il risultato finale degli errori che "cadono attraverso" (falling-through).

Come nella linea `(*)` dell'esempio sopra.
```

````smart header="`async/await` funziona bene con `Promise.all`"
Quando dobbiamo attendere per più promise, possiamo avvolgerle (wrap) in `Promise.all` e poi attendere (`await`):

```js
// attende per l'array dei risultati
let results = await Promise.all([
  fetch(url1),
  fetch(url2),
  ...
]);
```

In caso di errore, si propaga come di solito: dalla promise fallita a `Promise.all`, poi diventa una eccezione che possiamo catturare usando `try..catch` attorno alla chiamata.

````

## Riepilogo

La parola chiave `async` prima di una funzione ha due effetti:

1. Fa sempre ritornare una promise.
2. Permette di usare `await` al suo interno.

La parola chiave `await` prima di una promise fa attendere JavaScript fino a quando la promise è ferma, e poi:

1. Se c'è un errore, l'eccezione è generata, come se `throw error` fosse stato chiamato in quel punto.
2. Altrimenti, ritorna il risultato.

Insieme forniscono una ottima struttura per scrivere codice asincrono che sia facile sia da leggere che da scrivere.

Con `async/await` raramente avremo bisogno di scrivere `promise.then/catch`, ma comunque non dovremo dimenticare che sono sempre basate su promise, perché a volte (e.s. nello scope più esterno) dovremo usare questi metodi. Inoltre `Promise.all` è una buona cosa per attendere per più task contemporaneamente.
