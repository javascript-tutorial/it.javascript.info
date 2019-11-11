
# Oggetto globale

L'oggetto globale fornisce variabili e funzioni che sono accessibili in qualsiasi punto. Principalmente quelle integrate dal linguaggio o fornite dall'ambiente.

In un browser l'ambiente si chiama `window`, per Node.js viene detto `global`, negli altri ambienti si usano diversi termini.

<<<<<<< HEAD
Recentemente, è stato aggiunto al linguaggio `globalThis`, come nome standart per l'oggetto globale, il quale dovrebbe essere supportato da tutti gli ambienti. In alcuni browser, ad esempio Edge, `globalThis` non è ancora supportato.
=======
Recently, `globalThis` was added to the language, as a standardized name for a global object, that should be supported across all environments. In some browsers, namely non-Chromium Edge, `globalThis` is not yet supported, but can be easily polyfilled.
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

Tutte le proprietà dell'oggetto globale possono essere raggiunte direttamente:

```js run
alert("Hello");

// la stessa cosa
window.alert("Hello");
```

In un browserm le variabili globalo dichiarate con `var` diventano proprietà dell'oggetto globale:

```js run untrusted refresh
var gVar = 5;

alert(window.gVar); // 5 (diventa una proprietà dell'oggetto globale)
```

Non affidatevi a questo! Questo comportamento esiste solamente per retrocompatibilità. Gli script moderni utilizzano i moduli JavaScript, che si comportano in maniera differente. Li studieremo più avanti nel capitolo [](info:modules).

Inoltre, la dichiarazione di variabili in stile moderno, tramite `let` e `const` non hanno questo tipo di comportamento:

```js run untrusted refresh
let gLet = 5;

alert(window.gLet); // undefined (non diventa una proprietà dell'oggetto globale)
```

If a value is so important that you'd like to make it available globally, write it directly as a property:

```js run
*!*
// rendiamo globali le informazioni dell'utente corrente, per rendere accessibili in qualsiasi punto dello script
window.currentUser = {
  name: "John"
};
*/!*

// in un qualsiasi altro punto del codice
alert(currentUser.name);  // John

// oppure, se abbiamo una variabile locale denominata "currentUser"
// la preleviamo da window esplicitamente (più sicuro!)
alert(window.currentUser.name); // John
```

Detto ciò, l'utilizzo di variabili globali è da evitare. Dovrebbero esserci sempre il minor numero di varibili globali possibili. Il design del codice in cui una funzione richiede un `input` e ritorna un `output` risulta essere molto più chiaro, e molto meno propenso ad errori.

## Utilizzo di polyfill

Utilizziamo l'oggetto globale per testare il supporto delle funzionalità introdotte da linguaggio.

Ad esempio, potremmo testare se l'oggetto integrato `Promise` esiste (nei vecchi browser non lo troverete):
```js run
if (!window.Promise) {
  alert("Your browser is really old!");
}
```

Se non è presente (ipotizziamo di trovarci in un vecchio browser), possiamo creare un "polyfill" (contenitore): che consiste nell'aggiungere funzionalità moderne del linguaggio, che non sono supportate.

```js run
if (!window.Promise) {
  window.Promise = ... // implementazione della caratteristica mancante
}
```

## Riepilogo

- L'oggetto globale contiene le variabili che dovrebbero essere accessibili ovunque.

    Incluse quelle integrate in JavaScript, come `Array` e valori specifici dell'ambiente, come `window.innerHeight` -- l'altezza della finestra nei browser.
- L'oggetto globale ha un nome universale `globalThis`.

    ...Ma è più facile trovarne riferimenti alla "vecchia maniera", quindi con nomi specifici dell'ambiente, come `window` (browser) e `global` (Node.js). Poiché `globalThis` è un aggiornamento recente, non è ancora supportato da Edge (ma può essere aggiunto con la tecnica polyfill).
- Dovremmo memorizzare valori nell'oggetto globale solamente se questi hanno realmente uno scopo globale.
- In ambiente browser, senza l'utilizzo dei [moduli](info:modules), una variabile globale dichiarata tramite `var` diventa una proprietà dell'oggetto globale.

    Per rendere il codice più semplice da interpretare e aggiornare, dovremmo accedere all'oggetto globale come `window.x`.
