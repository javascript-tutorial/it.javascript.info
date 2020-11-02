# Promisification

Promisification -- è una parola lunga per una trasformazione semplice. È la conversione di una funzione che accetta una callback in una funzione che ritorna una promise.

Per essere più precisi, creiamo una funzione wrapper che fa lo stesso, chiamando internamente quella originale, ma ritornando una promise.

<<<<<<< HEAD
Queste trasformazioni sono spesso necessarie nella vita reale, dato che molte funzioni e librerie sono basate su callback. Ma le promise sono più pratiche. Per questo motivo ha senso trasformarle in promise.

Per esempio, abbiamo `loadScript(src, callback)` dal capitolo <info:callbacks>.
=======
For better understanding, let's see an example.

For instance, we have `loadScript(src, callback)` from the chapter <info:callbacks>.
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d

```js run
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Errore caricamento script per ${src}`));

  document.head.append(script);
}

// utilizzo:
// loadScript('path/script.js', (err, script) => {...})
```

<<<<<<< HEAD
Trasformiamolo in una promise. La nuova funzione `loadScriptPromise(src)` farà lo stesso, ma accetta solo `src` (senza callback) e ritorna una promise.
=======
The function loads a script with the given `src`, and then calls `callback(err)` in case of an error, or `callback(null, script)` in case of successful loading. That's a widespread agreement for using callbacks, we saw it before.

Let's promisify it. 

We'll make a new function `loadScriptPromise(src)`, that does the same (loads the script), but returns a promise instead of using callbacks.

In other words, we pass it only `src` (no `callback`) and get a promise in return, that resolves with `script` when the load is successful, and rejects with the error otherwise.
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d

Here it is:
```js
let loadScriptPromise = function(src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err)
      else resolve(script);
    });
  })
}

// uso:
// loadScriptPromise('path/script.js').then(...)
```

<<<<<<< HEAD
Ora `loadScriptPromise` si adatta bene al nostro codice basato sulle promise.

Come possiamo vedere, delega tutto il lavoro alla `loadScript` originale, passando la sua callback che si traduce nel `resolve/reject` della promise.

Dato che abbiamo bisogno di trasformare in (promisify) molte funzione, ha senso usare un helper.

Questo è molto semplice -- `promisify(f)` sotto prende una funzione da trasformare in promise `f` e ritorna una funzione wrapper.

Quel wrapper fa la stessa cosa del codice sopra: ritorna una promise e passa la chiamata alla `f` originale, tracciando il risultato in una sua callback:

```js
function promisify(f) {
  return function (...args) { // ritorna una funzione wrapper
    return new Promise((resolve, reject) => {
      function callback(err, result) { // la nostra callback f
=======
As we can see, the new function is a wrapper around the original `loadScript` function. It calls it providing its own callback that translates to promise `resolve/reject`.

Now `loadScriptPromise` fits well in promise-based code. If we like promises more than callbacks (and soon we'll see more reasons for that), then we will use it instead.

In practice we may need to promisify more than one function, so it makes sense to use a helper. 

We'll call it `promisify(f)`: it accepts a to-promisify function `f` and returns a wrapper function.

```js
function promisify(f) {
  return function (...args) { // return a wrapper-function (*)
    return new Promise((resolve, reject) => {
      function callback(err, result) { // our custom callback for f (**)
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }

      args.push(callback); // aggiunge la nostra callback custom alla fine degli argomenti

      f.call(this, ...args); // chiama la funzione originale
    });
  };
};

// uso:
let loadScriptPromise = promisify(loadScript);
loadScriptPromise(...).then(...);
```

<<<<<<< HEAD
Qui diamo per scontato che la funzione originale aspetti una callback con due argomenti `(err, result)`. Questo è quello che troveremo più spesso. Poi la nostra callback custom è esattamente nel formato corretto, e `promisify` funziona perfettamente per questo caso.
=======
The code may look a bit complex, but it's essentially the same that we wrote above, while promisifying `loadScript` function.

A call to `promisify(f)` returns a wrapper around `f` `(*)`. That wrapper returns a promise and forwards the call to the original `f`, tracking the result in the custom callback `(**)`.

Here, `promisiefy` assumes that the original function expects a callback with exactly two arguments `(err, result)`. That's what we encounter most often. Then our custom callback is in exactly the right format, and `promisify` works great for such a case.
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d

Ma cosa succederebbe se `f` aspettasse una callback con più argomenti `callback(err, res1, res2)`?

<<<<<<< HEAD
Ecco una modifica di `promisify` che ritorna un array di diversi risultati della callback:
=======
We can improve our helper. Let's make a more advanced version of `promisify`.

- When called as `promisify(f)` it should work similar to the version above.
- When called as `promisify(f, true)`, it should return the promise that resolves with the array of callback results. That's exactly for callbacks with many arguments.
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d

```js
// promisify(f, true) per avere un array di risultati
function promisify(f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function *!*callback(err, ...results*/!*) { // la nostra callback custom per f
        if (err) {
          reject(err);
        } else {
          // risolve con tutti i risultati della callback se manyArgs è specificato
          *!*resolve(manyArgs ? results : results[0]);*/!*
        }
      }

      args.push(callback);

      f.call(this, ...args);
    });
  };
};

// usage:
f = promisify(f, true);
f(...).then(arrayOfResults => ..., err => ...)
```

<<<<<<< HEAD
In alcuni casi, `err` può essere del tutto assente: `callback(result)`, o c'è qualcosa di particolare nel formato della callback, allora possiamo trasformare in promise (promisify)  queste funzioni senza usare un helper, manualmente.
=======
As you can see it's essentially the same as above, but `resolve` is called with only one or all arguments depending on whether `manyArgs` is truthy.

For more exotic callback formats, like those without `err` at all: `callback(result)`, we can promisify such functions manually without using the helper.
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d

Ci sono anche moduli con delle funzioni per trasformare in promise un po' più flessibili, ad esempio [es6-promisify](https://github.com/digitaldesignlabs/es6-promisify). In Node.js è presente una funzione `util.promisify`.

```smart
La trasformazione in promise (promisification) è un ottimo approccio, specialmente quando si utilizza `async/await` (nel prossimo capitolo), ma non è un sostituto totale per le callback.

Ricorda, una promise può avere un solo risultato, ma una callback può tecnicamente essere chiamata più volte.

Così la trasformazione in (promisification) è intesa solo per le funzioni che chiameranno la callback una volta sola. Le chiamate successive saranno ignorate.
```
