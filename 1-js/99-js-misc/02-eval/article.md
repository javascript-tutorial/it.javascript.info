# Eval: eseguire una stringa di codice

La funzione integrata `eval` consente di eseguire stringhe di codice.

La sintassi da utilizzare è:

```js
let result = eval(code);
```

Ad esempio:

```js run
let code = 'alert("Hello")';
eval(code); // Hello
```

Una stringa di codice potrebbe essere molto lunga, potrebbe contenere interruzioni di riga, dichiarazioni di funzione, variabili e cosi via.

Il risultato ritornato da `eval` corrisponde a quello dell'ultima istruzione.

Ad esempio:
```js run
let value = eval('1+1');
alert(value); // 2
```

```js run
let value = eval('let i = 0; ++i');
alert(value); // 1
```

Il codice valutato viene eseguito nel lexical environment corrente, quindi può accedere alle variabili esterne:

```js run no-beautify
let a = 1;

function f() {
  let a = 2;

*!*
  eval('alert(a)'); // 2
*/!*
}

f();
```

Può quindi modificare le variabili esterne:

```js untrusted refresh run
let x = 5;
eval("x = 10");
alert(x); // 10, valore modificato
```

In strict mode, `eval` viene eseguito in un lexical environment separato. Quindi le funzioni e le variabili dichiarate internamente, non sono visibili all'esterno:

```js untrusted refresh run
// reminder: 'use strict' è abilitato di default negli esempio che stiamo eseguendo

eval("let x = 5; function f() {}");

alert(typeof x); // undefined (variabile inesistente)
// anche la funzione f non è visibile
```

Senza `use strict`, `eval` non viene eseguito in un lexical environment separato, quindi saremo in grado di vedere `x` e `f` dall'esterno.

## Utilizzare "eval"

Nella programmazione moderna `eval` viene utilizzato di rado. Spesso si dice "eval is evil" ("eval è il diavolo").

La motivazione è piuttosto semplice: molto tempo fa, JavaScript era un linguaggio molto povero, molte cose potevano essere fatte solamente tramite `eval`. Ma quei tempi, ormai sono passati da un decennio.

Al momento, non esiste alcuna ragione per cui utilizzare `eval`. Se qualcuno lo sta utilizzando, c'è una buona possibilità che questo sia rimpiazzabile con un costrutto del linguaggio oppure con un [modulo JavaScript](info:modules).

Fate attenzione che la sua capacità di accedere alle variabile esterne, può generare side-effects.

I code minifiers (strumenti utilizzati sugli script JS prima di spostarli in produzione, per comprimerli) rinominano le variabili locali con nomi più brevi (come `a`, `b` etc) in modo da rendere il codice più breve. Questa operazione, solitamente, è sicura. Non lo è, però, se stiamo utilizzando `eval`, poiché al suo interno potremmo provare ad accedere alle variabili locali. Quindi i minifiers non rinominano tutte le variabili che sono potenzialmente accessibili da `eval`. Questo comporta una perdita di qualità della compressione del codice.

L'utilizzo delle variabili locali all'interno di `eval` è considerata una bad practice nella programmazione, poiché rende il codice molto più complesso da mantenere.

Esistono due modi per mettersi al sicuro da questi problemi.

**Se il codice all'interno di eval non richiede variabili esterne, allora invocate `eval` come `window.eval(...)`:**

In questo modo il codice viene eseguito nello scope globale:

```js untrusted refresh run
let x = 1;
{
  let x = 5;
  window.eval('alert(x)'); // 1 (variabile globale)
}
```

**Se il codice all'interno di eval ha bisogno di variabili locali, sostituite `eval` con `new Function` e passategliele come argomenti:**

```js run
let f = new Function('a', 'alert(a)');

f(5); // 5
```

Il costrutto `new Function` viene spiegato più nel dettaglio nel capitolo <info:new-function>. Crea una nuova funzione a partire da una stringa, sempre nello scope globale. Quindi può accedere alle variabili locali. Questo è molto più semplice passargliele esplicitamente come argomenti, come nell'esempio visto sopra.

## Riepilogo

L'invocazione di `eval(code)` esegue una stringa di codice e ne ritorna il risultato dell'ultima istruzione.
- Viene raramente utilizzano in JavaScript moderno, quindi in genere non ne avremo bisogno.
- Può accedere alle variabili locali. Questa è considerata una bad practice.
- Piuttosto di utilzzare `eval` nello scope globale, utilizzate `window.eval(code)`.
- Oppure, se il codice dovesse avere bisogno di data dallo scope esterno, utilizzate il costrutto `new Function` e passategliele come argomenti.
