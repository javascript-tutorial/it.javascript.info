# Promisification

<<<<<<< HEAD
Promisification -- è una parola lunga per una trasformazione semplice. È la conversione di una funzione che accetta una callback in una funzione che ritorna una promise.

Per essere più precisi, creiamo una funzione wrapper che fa lo stesso, chiamando internamente quella originale, ma ritornando una promise.
=======
"Promisification" is a long word for a simple transformation. It's the conversion of a function that accepts a callback into a function that returns a promise.

Such transformations are often required in real-life, as many functions and libraries are callback-based. But promises are more convenient, so it makes sense to promisify them.
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874

Queste trasformazioni sono spesso necessarie nella vita reale, dato che molte funzioni e librerie sono basate su callback. Ma le promise sono più pratiche. Per questo motivo ha senso trasformarle in promise.

Per esempio, abbiamo `loadScript(src, callback)` dal capitolo <info:callbacks>.

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
Let's promisify it. The new `loadScriptPromise(src)` function achieves the same result, but it accepts only `src` (no `callback`) and returns a promise.
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874

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

Ora `loadScriptPromise` si adatta bene al nostro codice basato sulle promise.

Come possiamo vedere, delega tutto il lavoro alla `loadScript` originale, passando la sua callback che si traduce nel `resolve/reject` della promise.

<<<<<<< HEAD
Dato che abbiamo bisogno di trasformare in (promisify) molte funzione, ha senso usare un helper.

Questo è molto semplice -- `promisify(f)` sotto prende una funzione da trasformare in promise `f` e ritorna una funzione wrapper.
=======
In practice we'll probably need to promisify many functions, so it makes sense to use a helper. We'll call it `promisify(f)`: it accepts a to-promisify function `f` and returns a wrapper function.
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874

Quel wrapper fa la stessa cosa del codice sopra: ritorna una promise e passa la chiamata alla `f` originale, tracciando il risultato in una sua callback:

```js
function promisify(f) {
  return function (...args) { // ritorna una funzione wrapper
    return new Promise((resolve, reject) => {
      function callback(err, result) { // la nostra callback f
        if (err) {
          return reject(err);
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

Qui diamo per scontato che la funzione originale aspetti una callback con due argomenti `(err, result)`. Questo è quello che troveremo più spesso. Poi la nostra callback custom è esattamente nel formato corretto, e `promisify` funziona perfettamente per questo caso.

Ma cosa succederebbe se `f` aspettasse una callback con più argomenti `callback(err, res1, res2)`?

Ecco una modifica di `promisify` che ritorna un array di diversi risultati della callback:

```js
// promisify(f, true) per avere un array di risultati
function promisify(f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function *!*callback(err, ...results*/!*) { // la nostra callback custom per f
        if (err) {
          return reject(err);
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
For more exotic callback formats, like those without `err` at all: `callback(result)`, we can promisify such functions manually without using the helper.
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874

Ci sono anche moduli con delle funzioni per trasformare in promise un po' più flessibili, ad esempio [es6-promisify](https://github.com/digitaldesignlabs/es6-promisify). In Node.js è presente una funzione `util.promisify`.

```smart
La trasformazione in promise (promisification) è un ottimo approccio, specialmente quando si utilizza `async/await` (nel prossimo capitolo), ma non è un sostituto totale per le callback.

Ricorda, una promise può avere un solo risultato, ma una callback può tecnicamente essere chiamata più volte.

Così la trasformazione in (promisification) è intesa solo per le funzioni che chiameranno la callback una volta sola. Le chiamate successive saranno ignorate.
```
