
# Oggetto globale

L'oggetto globale fornisce variabili e funzioni che sono accessibili in qualsiasi punto. Principalmente quelle integrate dal linguaggio o fornite dall'ambiente.

In un browser l'ambiente si chiama "window", per Node.js viene detto "global", negli altri ambienti si usano diversi termini.

Ad esempio, potremmo invocare `alert` come metodo di `window`:

```js run
alert("Hello");

// la stessa cosa
window.alert("Hello");
```

LO stesso vale per tutte le altre funzioni integrate, ad esempio possiamo invocare `Array` come `window.Array` e creare le nostre personali proprietà.

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

4. Un ultima cosa, il valore di `this` nello scope globale è `window`.

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

    ```html run
    <script type="module">
      let x = 5;
    </script>

    <script type="module">
      alert(window.x); // undefined
      alert(x); // Error: variabile non dichiarata
    </script>
    ```

- E come ultima cosa, il valore di `this` (al livello globale) in un modulo sarà `undefined` (non avrebbe alcun senso se contenesse `window`?):

    ```html run
    <script type="module">
      alert(this); // undefined
    </script>
    ```

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
