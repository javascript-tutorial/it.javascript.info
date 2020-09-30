# Arrow functions, the basics

Esiste un modo più conciso per creare funzioni in javascript spesso  migliore delle espressioni di funzione.

Sono chiamate “funzioni freccia (arrow functions)” e vengono scritte in questo modo:

```js
let func = (arg1, arg2, ...argN) => expression
```

Questo codice crea una funzione `func` che accetta i parametri `arg1..argN`, successivamente valuta `l’espressione` di destra e ne ritorna il risultato

In altre parole è la versione compatta di:

```js
let func = function(arg1, arg2, ...argN) {
  return expression;
};
```

Vediamo un esempio concreto:

```js run
let sum = (a, b) => a + b;

/* Questa funzione freccia è la versione compatta di:

let sum = function(a, b) {
  return a + b;
};
*/

alert( sum(1, 2) ); // 3
```

Come si vede dal codice, `(a, b) => a + b`  è una funzione che accetta due paramentri chiamati `a` e `b`, durante l’esecuzione la funzione valuta l’espressione `a + b` e ne restituisce il risultato.

- Se abbiamo un solo parametro per la funzione, le parentesi intorno al parametro possono essere omesse:

    Per esempio:

    ```js run
    *!*
    let double = n => n * 2;
    // è come scrivere: let double = function(n) { return n * 2 }
    */!*

    alert( double(3) ); // 6
    ```

- Se non ci sono parametri, le parentesi saranno vuote. (ma dovrebbero essere  presenti):

    ```js run
    let sayHi = () => alert("Hello!");

    sayHi();
    ```

Le funzioni freccia possono essere utilizzate nello stesso modo delle espressioni di funzione:

Per esempio, possiamo creare dinamicamente una funzione:

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  () => alert('Hello') :
  () => alert("Greetings!");

welcome();
```

Le funzioni freccia possono apparire poco familiari e poco leggibili all’inizio, ma questo cambia man mano che vengono utilizzate e ci si abitua alla nuova sintassi.

Sono molto pratiche per le azioni che richiedono una solo linea di codice, quando siamo troppo pigri per scrivere.

## Funzioni freccia su più linee

Le funzioni viste negli esempi precedenti accettano dei parametri a sinistra del simbolo `=>` e valutano l’espressione alla sua destra sulla base dei parametri in ingresso.

Qualche volta abbiamo l’esigenza di scrivere funzioni più complesse come espressioni o dichiarazioni multi linea. E’ possibile con le funzioni freccia ma dobbiamo racchiudere le linee in parentesi graffe e usare il `return` per ritornare il risultato.

Come in questo esempio:

```js run
let sum = (a, b) => {  // le parentesi graffe iniziano la funzione multi linea
  let result = a + b;
*!*
  return result; // se usiamo le parentesi graffe dobbiamo esplicitare il valore ritornato con "return"
*/!*
};

alert( sum(1, 2) ); // 3
```

```smart header="C’è dell’altro"

Abbiamo elogiato le funzioni freccia per la loro brevità e compattezza, ma non è tutto.
Le funzioni freccia hanno anche altre caratteristiche interessanti.

Per studiarle in dettaglio, bisogna prima conoscere altri aspetti di Javascript, per cui ritorneremo sull’argomento successivamente nel capitolo <info:arrow-functions>

Per ora possiamo già usare le funzioni freccia per le azioni a singola-linea e le funzioni di callbacks

```

## Riepilogo

Le funzioni freccia sono pratiche per le espressioni in una singola linea. Si presentano in due forme:

1. Senza parentesi graffe: `(...args) => expression` -- il lato destro è un espressione: viene valutata dalla funzione e restituisce un risultato
2. Con parentesi graffe: `(...args) => { body }` -- le parentesi ci permettono di scrivere del codice su più linee dentro la funzione, ma abbiamo bisogno di esplicitare il valore restituito con la parola `return`
