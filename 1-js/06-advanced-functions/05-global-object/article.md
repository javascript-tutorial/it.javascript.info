
# Oggetto globale

<<<<<<< HEAD
L'oggetto globale fornisce variabili e funzioni che sono accessibili in qualsiasi punto. Principalmente quelle integrate dal linguaggio o fornite dall'ambiente.

In un browser l'ambiente si chiama "window", per Node.js viene detto "global", negli altri ambienti si usano diversi termini.

Ad esempio, potremmo invocare `alert` come metodo di `window`:
=======
The global object provides variables and functions that are available anywhere. Mostly, the ones that are built into the language or the environment.

In a browser it is named `window`, for Node.js it is `global`, for other environments it may have another name.

Recently, `globalThis` was added to the language, as a standartized name for a global object, that should be supported across all environments. In some browsers, namely non-Chromium Edge, `globalThis` is not yet supported, but can be easily polyfilled.

All properties of the global object can be accessed directly:
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

```js run
alert("Hello");

// la stessa cosa
window.alert("Hello");
```

<<<<<<< HEAD
Lo stesso vale per tutte le altre funzioni integrate, ad esempio possiamo invocare `Array` come `window.Array` e creare le nostre personali proprietà.

## Browser: l'oggetto "window" 

Per ragioni storiche, l'oggetto `window` è leggermente incasinato.

1. Fornisce la funzionalità di "finestra del browser", oltre a svolgere il ruolo di oggetto globale.

    Possiamo utilizzare `window` per accedere a proprietà e metodi, specifici di una finestra del browser:

    ```js run
    alert(window.innerHeight); // mostra l'altezza della window 

    window.open('http://google.com'); // apre una nuova browser window
    ```

2. Le variabili `var` e le dichiarazioni di funzioni diventano automaticamente delle proprietà di `window`.

    Ad esempio:
    ```js untrusted run no-strict refresh
    var x = 5;

    alert(window.x); // 5 (var x diventa una proprietà di window)

    window.x = 0;

    alert(x); // 0, variabile modificata
    ```

    Da notare che tutto ciò non vale per le dichiarazioni `let/const`:

    ```js untrusted run no-strict refresh
    let x = 5;

    alert(window.x); // undefined ("let" non crea proprietà sull'oggetto window)
    ```

3. Inoltre, tutti gli script condividono lo stesso scope globale, quindi le variabili dichiarate all'interno di uno `<script>` diventano visibili anche negli altri:

    ```html run
    <script>
      var a = 1;
      let b = 2;
    </script>

    <script>
      alert(a); // 1
      alert(b); // 2
    </script>
    ```

4. Un'ultima cosa, il valore di `this` nello scope globale è `window`.

    ```js untrusted run no-strict refresh
    alert(this); // window
    ```

Perché è stato fatto cosi? Nel momento in cui è stato creato il linguaggio, l'idea era quella di fondere diversi aspetti in un unico oggetto `window` per "rendere le cose più semplici". Ma da quel momento sono cambiate molte cose. Da piccoli script si è passati a grandi applicazioni le quali richiedono una propria architettura.

E' una cosa buona che diversi script (eventualmente anche provenienti da altri sviluppatori) si vedano le variabili a vicenda?

Ovviamente no, questa caratteristica potrebbe portare ad errori dovuti a conflitti tra nomi: due variabili (di script diversi) con uno stesso nome potrebbero aver scopi differenti nei diversi script in cui vengono utilizzate.

Ad oggi, questa caratteristica di `window` viene considerata un errore nel design del linguaggio.

Fortunatamente esiste una soluzione per "aggirare" questo problema, ed è chiamata "JavaScript module".

Se impostiamo `type="module"` come attributo su un tag `<script>`, allora questo script verrà considerato un "modulo" separato con il suo suo personale scope globale (lexical environment), e non interferirà con `window`.

- In un modulo, `var x` non diventerà una proprietà di `window`:

    ```html run
    <script type="module">
      var x = 5;

      alert(window.x); // undefined
    </script>
    ```

- Due moduli diversi non condividono le variabili:
=======
In a browser, global functions and variables declared with `var` become the property of the global object:

```js run untrusted refresh
var gVar = 5;

alert(window.gVar); // 5 (became a property of the global object)
```
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

Please don't rely on that! This behavior exists for compatibility reasons. Modern scripts use JavaScript modules where such thing doesn't happen. We'll cover them later in the chapter  [](info:modules).

<<<<<<< HEAD
    <script type="module">
      alert(window.x); // undefined
      alert(x); // Error: variabile non dichiarata
    </script>
    ```

- E come ultima cosa, il valore di `this` (al livello globale) in un modulo sarà `undefined` (non avrebbe alcun senso se contenesse `window`?):
=======
Also, more modern variable declarations `let` and `const` do not exhibit such behavior at all:

```js run untrusted refresh
let gLet = 5;
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

alert(window.gLet); // undefined (doesn't become a property of the global object)
```

<<<<<<< HEAD
**L'utilizzo di `<script type="module">` risolve i difetti di design del linguaggio, separando il livello massimo (top-level) da `window`.**

Più avanti tratteremo più in dettaglio questo argomento, nel capitolo [](info:modules).

## Utilizzi sensati dell'oggetto globale

1. L'utilizzo delle variabili globali, solitamente è sconsigliato. Dovrebbero esserci il minor numero di variabili globali possibili, ma se proprio ne avessimo bisogno possiamo comunque sfruttare l'oggetto globale `window` (o `global` in Node.js).

    Qui inseriamo delle informazioni riguardo l'utente nell'oggetto globale, in modo tale da renderle accessibili anche agli altri script:

    ```js run
    // assegnazione esplicita a `window`
    window.currentUser = {
      name: "John",
      age: 30
    };

    // poi, in un qualsiasi punto di un altro script
    alert(window.currentUser.name); // John
    ```

2. Possiamo testare l'oggetto globale per verificare la presenza di caratteristiche moderne.

    Ad esempio, testiamo se esiste l'oggetto `Promise` (nei vecchi browser non era presente):
    ```js run
    if (!window.Promise) {
      alert("Your browser is really old!");
    }
    ```

3. Possiamo creare "polyfills": aggiungere funzioni che non sono supportate dall'ambiente, ma che sono supportate dagli standard moderni.

    ```js run
    if (!window.Promise) {
      window.Promise = ... // implementazione di una caratteristica moderna
    }
    ```

...E ovviamente, se ci troviamo in ambiente browser, possiamo utilizzare `window` per accedere alle caratteristiche della finestra (senza utilizzarlo come oggetto globale).
=======
If a value is so important that you'd like to make it available globally, write it directly as a property:

```js run
*!*
// make current user information global, to let all scripts access it
window.currentUser = {
  name: "John"
};
*/!*

// somewhere else in code
alert(currentUser.name);  // John

// or, if we have a local variable with the name "currentUser"
// get it from window explicitly (safe!)
alert(window.currentUser.name); // John
```

That said, using global variables is generally discouraged. There should be as few global variables as possible. The code design where a function gets "input" variables and produces certain "outcome" is  clearer, less prone to errors and easier to test.

## Using for polyfills

We use the global object to test for support of modern language features.

For instance, test if a built-in `Promise` object exists (it doesn't in really old browsers):
```js run
if (!window.Promise) {
  alert("Your browser is really old!");
}
```

If there's none (say, we're in an old browser), we can create "polyfills": add functions that are not supported by the environment, but exist in the modern standard.

```js run
if (!window.Promise) {
  window.Promise = ... // custom implementation of the modern language feature
}
```

## Summary

- The global object holds variables that should be available everywhere.

    That includes JavaScript built-ins, such as `Array` and environment-specific values, such as `window.innerHeight` -- the window height in the browser.
- The global object has a universal name `globalThis`.

    ...But more often is referred by "old-school" environment-specific names, such as `window` (browser) and `global` (Node.js). As `globalThis` is a recent proposal, it's not supported in non-Chromium Edge (but can be polyfilled).
- We should store values in the global object only if they're truly global for our project. And keep their number at minimum.
- In-browser, unless we're using [modules](info:modules), global functions and variables declared with `var` become a property of the global object.
- To make our code future-proof and easier to understand, we should access properties of the global object directly, as `window.x`.
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d
