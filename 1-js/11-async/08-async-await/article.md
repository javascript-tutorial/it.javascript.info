# Async/await

Esiste una sintassi speciale per lavorare con le promise in un modo più comodo, chiamata asnyc/await. È sorprendentemente facile da capire e usare.


## Async functions

Iniziamo con la parola chiave `async`. Può essere messa prima di una funzione, come nell'esempio sotto:

```js
async function f() {
  return 1;
}
```

La parola "async" prima di una funzione significa una cosa semplice: la funzione ritorna sempre una promise. Gli altri valori sono "avvolti" wrapped in una promise risolta automaticamente.

<<<<<<< HEAD
Per esempio, questa funzione ritorna una promise risolta con il risultato di `1`, proviamola:
=======
For instance, this function returns a resolved promise with the result of `1`; let's test it:
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

```js run
async function f() {
  return 1;
}

f().then(alert); // 1
```

<<<<<<< HEAD
...Possiamo anche ritornare esplicitamente una promise, sarebbe lo stesso:
=======
...We could explicitly return a promise, which would be the same:
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

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
<<<<<<< HEAD
  let result = await promise; // attende fino a quando la promise si risolve (*)
=======
  let result = await promise; // wait until the promise resolves (*)
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a
*/!*

  alert(result); // "fatto!"
}

f();
```

L'esecuzione della funzione "va in pausa" alla linea `(*)` e riprende quando la promise si ferma (settles), con `result` che diventa il suo risultato. Così il codice sopra mostra "fatto!" in un secondo.

<<<<<<< HEAD
Enfatizziamo: `await` fa letteralmente attendere JavaScript fino a quando la promise si ferma, poi va avanti con il risultato. Questo non costa alcuna risorsa della CPU, perché il motore può fare altri lavori nel frattempo: eseguire altri script, gestire eventi etc.
=======
Let's emphasize: `await` literally suspends the function execution until the promise settles, and then resumes it with the promise result. That doesn't cost any CPU resources, because the JavaScript engine can do other jobs in the meantime: execute other scripts, handle events, etc.
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

È giusto una sintassi più elegante per ottenere il risultato della promise di `promise.then`, più facile da leggere e da scrivere.

````warn header="Can't use `await` in regular functions"
Se proviamo ad utilizzare `await` in una funzione non asincrona, ci sarebbe un errore di sintassi:

```js run
function f() {
  let promise = Promise.resolve(1);
*!*
  let result = await promise; // Syntax error
*/!*
}
```

<<<<<<< HEAD
Avremo questo errore se non mettiamo `async` prima di una funzione. Come detto, `await` funziona solo dentro una funzione asincrona (`async function`).
=======
We may get this error if we forget to put `async` before a function. As said, `await` only works inside an `async` function.
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a
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

```js run
// syntax error in top-level code
let response = await fetch('/article/promise-chaining/user.json');
let user = await response.json();
```

<<<<<<< HEAD
Possiamo "avvolgerlo" wrap in una funzione async anonima, come qui:
=======
But we can wrap it into an anonymous async function, like this:
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

```js
(async () => {
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();
  ...
})();
```
````
<<<<<<< HEAD
````smart header="`await` accetta i \"thenables\""
Come `promise.then`, `await` permette di usare gli oggetti "thenable" (quelli con un metodo `then` chiamabile). L' idea è che un oggetto di terze parti possa non essere una promise, ma essere promise-compatibile: se supporta `.then`, è abbastanza per usarlo con `await`.

Ecco una dimostrazione: la classe `Thenable` class, l'`await` sotto accetta:
=======

````smart header="`await` accepts \"thenables\""
Like `promise.then`, `await` allows us to use thenable objects (those with a callable `then` method). The idea is that a third-party object may not be a promise, but promise-compatible: if it supports `.then`, that's enough to use it with `await`.

Here's a demo `Thenable` class; the `await` below accepts its instances:
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

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
};

async function f() {
  // attende per 1 secondo, poi il risultato diventa 2
  let result = await new Thenable(1);
  alert(result);
}

f();
```

<<<<<<< HEAD
Se `await` riceve un oggetto non-promise con `.then`, chiama quel metodo passando le funzioni native `resolve`, `reject` come argomenti. Poi `await` fino a quando una delle due viene chiamata (nell'esempio sopra avviene nella linea `(*)`) e poi procede con il risultato.
=======
If `await` gets a non-promise object with `.then`, it calls that method providing the built-in functions `resolve` and `reject` as arguments (just as it does for a regular `Promise` executor). Then `await` waits until one of them is called (in the example above it happens in the line `(*)`) and then proceeds with the result.
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a
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
  .then(alert); // 1
```
Il significato è lo stesso: assicura che il valore ritornato sia una promise ed abilita `await`.

````
## Gestione degli errori

<<<<<<< HEAD
Se una promise si risolve normalmente, allora `await promise` ritorna il risultato. Ma nel caso di un rigetto (rejection), solleva l'errore, proprio come se in quella linea ci fosse stato un `throw`.
=======
If a promise resolves normally, then `await promise` returns the result. But in the case of a rejection, it throws the error, just as if there were a `throw` statement at that line.
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

Questo codice:

```js
async function f() {
*!*
  await Promise.reject(new Error("Whoops!"));
*/!*
}
```

<<<<<<< HEAD
...È lo stesso di questo:
=======
...is the same as this:
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

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

<<<<<<< HEAD
In caso di errore, il controllo salta al blocco `catch`. Possiamo anche "avvolgere" (wrap) più linee:
=======
In the case of an error, the control jumps to the `catch` block. We can also wrap multiple lines:
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

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

<<<<<<< HEAD
Se ci dimentichiamo di aggiungere `.catch` qui, allora otteremo un errore di una promise non gestito (visibile nella console). Possiamo catturare usando un gestore di eventi globale come descritto nel capitolo <info:promise-error-handling>.


```smart header="`async/await` and `promise.then/catch`"
Quando usiamo `async/await`, raramente abbiamo bisogno di `.then`, perchè `await` gestisce l'attesa per noi. E possiamo usare un normale `try..catch` invece di `.catch`. Questo è spesso (non sempre) più conveniente.

Ma al livello più alto del codice, quando siamo fuori da qualunque funzione `async`, non siamo sintatticamente in grado id usare `await`, così è una pratica normale usare `.then/catch` per gestire il risultato finale degli errori che "cadono attraverso" (falling-through).

Come nella linea `(*)` dell'esempio sopra.
=======
If we forget to add `.catch` there, then we get an unhandled promise error (viewable in the console). We can catch such errors using a global `unhandledrejection` event handler as described in the chapter <info:promise-error-handling>.


```smart header="`async/await` and `promise.then/catch`"
When we use `async/await`, we rarely need `.then`, because `await` handles the waiting for us. And we can use a regular `try..catch` instead of `.catch`. That's usually (but not always) more convenient.

But at the top level of the code, when we're outside any `async` function, we're syntactically unable to use `await`, so it's a normal practice to add `.then/catch` to handle the final result or falling-through error, like in the line `(*)` of the example above.
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a
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

<<<<<<< HEAD
In caso di errore, si propaga come di solito: dalla promise fallita a `Promise.all`, poi diventa una eccezione che possiamo catturare usando `try..catch` attorno alla chiamata.
=======
In the case of an error, it propagates as usual, from the failed promise to `Promise.all`, and then becomes an exception that we can catch using `try..catch` around the call.
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

````

## Riassunto

La parola chiave `async` prima di una funzione ha due effetti:

<<<<<<< HEAD
1. Fa sempre ritornare una promise.
2. Permette di usare `await` al suo interno.
=======
1. Makes it always return a promise.
2. Allows `await` to be used in it.
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

La parola chiave `await` prima di una promise fa attendere JavaScript fino a quando la promise è ferma, e poi:

<<<<<<< HEAD
1. Se c'è un errore, l'eccezione è generata, come se `throw error` fosse stato chiamato in quel punto.
2. Altrimenti, ritorna il risultato.

Insieme forniscono una ottima struttura per scrivere codice asincrono che sia facile sia da leggere che da scrivere.

Con `async/await` raramente avremo bisogno di scrivere `promise.then/catch`, ma comunque non dovremo dimenticare che sono sempre basate su promise, perché a volte (e.s. nello scope più esterno) dovremo usare questi metodi. Inoltre `Promise.all` è una buona cosa per attendere per più task contemporaneamente.
=======
1. If it's an error, the exception is generated — same as if `throw error` were called at that very place.
2. Otherwise, it returns the result.

Together they provide a great framework to write asynchronous code that is easy to both read and write.

With `async/await` we rarely need to write `promise.then/catch`, but we still shouldn't forget that they are based on promises, because sometimes (e.g. in the outermost scope) we have to use these methods. Also `Promise.all` is nice when we are waiting for many tasks simultaneously.
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a
