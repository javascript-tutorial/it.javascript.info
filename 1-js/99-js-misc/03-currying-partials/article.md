libs:
  - lodash

---

# Currying

Il [currying](https://en.wikipedia.org/wiki/Currying) è una tecnica avanzata che si applica alle funzioni. Non viene utilizzata solamente in JavaScript, ma anche in altri linguaggi di programmazione.

Il currying è una trasformazione che traduce una funzione invocabile come `f(a, b, c)` in una invocabile come `f(a)(b)(c)`.

Il currying non invoca la funzione. Si occupa solamente della sua trasformazione.

Come prima cosa vediamo un esempio, in modo da capire di cosa stiamo parlando, e le applicazioni nella pratica.

Creeremo una funzione di supporto `curry(f)` che esegue il currying per una funzione a due argomenti `f`. In altre parole, `curry(f)`, trasformerà `f(a, b)` in una funzione invocabile come `f(a)(b)`:

```js run
*!*
function curry(f) { // curry(f) esegue il currying
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}
*/!*

// utilizzo
function sum(a, b) {
  return a + b;
}

let curriedSum = curry(sum);

alert( curriedSum(1)(2) ); // 3
```

Come potete vedere, l'implementazione è piuttosto semplice: sono due semplici wrappers.

- Il risultato di `curry(func)` è un wrapper `function(a)`.
- Quando viene invocato come `curriedSum(1)`, l'argomento viene memorizzato nel Lexical Environment, e viene ritornato un nuovo wrapper `function(b)`.
- Successivamente questo wrapper viene invocato con `2` come argomento, che passerà l'invocazione a `sum`.

Implementazioni più avanzate del currying, come [_.curry](https://lodash.com/docs#curry) fornito dalla libreria lodash, ritorna un wrapper che consente di invocare una funzione sia nella forma standard che in quella parziale:

```js run
function sum(a, b) {
  return a + b;
}

let curriedSum = _.curry(sum); // utilizzando _.curry della libreria lodash

alert( curriedSum(1, 2) ); // 3, riamane invocabile normalmente
alert( curriedSum(1)(2) ); // 3, invocata parzialmente
```

## Currying? Per quale motivo?

Per poterne comprendere i benefici abbiamo bisogno di un esempio di applicazione reale.

Ad esempio, abbiamo una funzione di logging `log(date, importance, message)` che formatta e ritorna le informazioni. In un progetto reale, una funzione del genere ha diverse funzionalità utili, come l'invio di log in rete; qui useremo semplicemente un `alert`:

```js
function log(date, importance, message) {
  alert(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
}
```

Eseguiamo il currying!

```js
log = _.curry(log);
```

Successivamente al `log`, funzionerà normalmente:

```js
log(new Date(), "DEBUG", "some debug"); // log(a, b, c)
```

...Ma funzionerà anche nella forma parziale:

```js
log(new Date())("DEBUG")("some debug"); // log(a)(b)(c)
```

Ora possiamo creare una funzione utile per registrare i logs:

```js
// logNow sarà la versione parziale di log con il primo argomento fisso
let logNow = log(new Date());

// utilizziamola
logNow("INFO", "message"); // [HH:mm] INFO message
```

Ora `logNow` equivale a `log` con il primo argomento fissato, in altre parole, una "funzione applicata parzialmente" o "parziale" (più breve).

Possiamo anche andare oltre, e creare una funzione utile per registrare i logs di debug:

```js
let debugNow = logNow("DEBUG");

debugNow("message"); // [HH:mm] DEBUG message
```

Quindi:
1. Non perdiamo nulla dopo il currying: `log` rimane invocabile normalmente.
2. Possiamo generare molto semplicemente funzioni parziali per i logs quotidiani.

## Implementazione avanzata del currying

Nel caso in cui vogliate entrare più nel dettaglio, di seguito vediamo un'implementazione "avanzata" del currying per funzioni con più argomenti, che avremmo anche potuto usare sopra.

E' piuttosto breve:

```js
function curry(func) {

  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };

}
```

Esempi di utilizzo:

```js
function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

alert( curriedSum(1, 2, 3) ); // 6, ancora invocabile normalmente
alert( curriedSum(1)(2,3) ); // 6, currying del primo argomento
alert( curriedSum(1)(2)(3) ); // 6, currying completo
```

La funzione `curry` può sembrare complicata, ma in realtà è piuttosto semplice da capire.

Il risultato dell'invocazione `curry(func)` è il wrapper `curried` (che ha subito il processo di currying), ed appare in questo modo:

```js
// func è la funzione trasformata
function curried(...args) {
  if (args.length >= func.length) { // (1)
    return func.apply(this, args);
  } else {
    return function(...args2) { // (2)
      return curried.apply(this, args.concat(args2));
    }
  }
};
```

Quando la eseguiamo, ci sono due percorsi di esecuzione `if`:

1. Se il numero di `args` forniti è uguale o maggiore rispetto a quelli che la funzione originale ha nella sua definizione (`func.length`), allora gli giriamo semplicemente l'invocazione utilizzando `func.apply`. 
2. Altrimenti, otterremo un parziale: non invochiamo ancora `func`. Invece, viene ritornato un altro wrapper, che riapplicherà il `curried` passando gli argomenti precedenti insieme a quelli nuovi. 

Quindi, se la invochiamo, di nuovo, avremo o una nuova funzione parziale (se non vengono forniti abbastanza argomenti) oppure otterremo il risultato.

```smart header="Solo funzioni di lunghezza fissa"
Il currying richiede che la funzione abbia un numero fissato di argomenti.

Una funzione che utilizza i parametri rest, come `f(...args)`, non può passare attraverso il processo di currying in questo modo.
```

```smart header="Un po' più del currying"
Per definizione, il currying dovrebbe convertire `sum(a, b, c)` in `sum(a)(b)(c)`.

Ma la maggior parte delle implementazioni in JavaScript sono più avanzate di così, come descritto: queste mantengono la funzione invocabile nella variante a più argomenti.
```

## Riepilogo

Il *currying* è una trasformazione che rende `f(a,b,c)` invocabile come `f(a)(b)(c)`. Le implementazioni in JavaScript, solitamente, mantengono entrambe le varianti, sia quella normale che quella parziale, se il numero di argomenti non è sufficiente.

Il currying permette di ottenere delle funzioni parziali molto semplicemente. Come abbiamo visto nell'esempio del logging, dopo il currying la funzione universale a tre argomenti `log(date, importance, message)` ci fornisce una funzione parziale quando invocata con un solo argomento (come `log(date)`) o due argomenti (come `log(date, importance)`).  
