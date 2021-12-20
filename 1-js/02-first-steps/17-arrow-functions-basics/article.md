# Arrow functions, le basi

Esiste un'altra sintassi molto semplice e concisa per creare funzioni e che spesso è migliore delle Function Expressions.

E' chiamata "arrow functions", perché si presenta in questo modo:

```js
let func = (arg1, arg2, ..., argN) => expression;
```

<<<<<<< HEAD
Questo codice crea una funzione `func` che accetta gli argomenti `arg1..argN` e li utilizza per valutare `expression` e restituirne il risultato.
=======
This creates a function `func` that accepts arguments `arg1..argN`, then evaluates the `expression` on the right side with their use and returns its result.
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831

In altre parole è una versione abbreviata di:

```js
let func = function(arg1, arg2, ..., argN) {
  return expression;
};
```

Vediamo un esempio concreto:

```js run
let sum = (a, b) => a + b;

/* Questa arrow function è una versione abbreviata di:

let sum = function(a, b) {
  return a + b;
};
*/

alert( sum(1, 2) ); // 3
```

Come puoi vedere `(a, b) => a + b` rappresenta una funzione che accetta due argomenti `a` e `b`. Al momento dell'esecuzione, questa valuta l'espressione `a + b` e restituisce il risultato.

- Se abbiamo un solo argomento, le parentesi che racchiudono gli argomenti possono essere omesse, abbreviando ulteriormente il codice.

    Ad esempio:

    ```js run
    *!*
    let double = n => n * 2;
    // più o meno lo steso di: let double = function(n) { return n * 2 }
    */!*

    alert( double(3) ); // 6
    ```

- Se non ci sono argomenti, le parentesi saranno vuote (ma devono essere presenti):

    ```js run
    let sayHi = () => alert("Hello!");

    sayHi();
    ```

Le arrow functions possono essere usate allo stesso modo delle Function Expressions.

Ad esempio, per creare dinamicamente una funzione:

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  () => alert('Hello') :
  () => alert("Greetings!");

welcome();
```

Le arrow functions possono apparire poco familiari e leggibili all'inizio, ma ciò cambia rapidamente man mano che gli occhi si abitueranno alla struttura.

Esse sono molto comode per semplici azioni su una riga, se siamo troppo pigri per scrivere più parole.

## Arrow functions su più linee

Gli esempi precedenti hanno preso argomenti alla sinistra di "=>" e con essi hanno valutato l'espressione a destra.

A volte abbiamo bisogno di qualcosa di un po' più complesso, come espressioni o dichiarazioni multiple. Anche questo è possibile, ma dovremo racchiuderle tra parentesi graffe ed usare un normale return.

In questo modo:

```js run
let sum = (a, b) => {  // le parentesi graffe aprono una funzione multilinea
  let result = a + b;
*!*
  return result; // se usiamo le parentesi graffe abbiamo bisogno di un esplicito "return" 
*/!*
};

alert( sum(1, 2) ); // 3
```

```smart header="Molto di più..."

Qui abbiamo presentato le arrow functions in breve, ma questo non è tutto!

Le arrow functions possiedono altre interessanti caratteristiche.

Per studiarle approfonditamente dobbiamo prima conoscere qualche altro aspetto di JavaScript, quindi torneremo alle arrow functions più avanti, nel capitolo <info:arrow-functions>.

Per ora possiamo già utilizzarle per azioni su una riga sola e per callbacks.
```

## Summary

Le arrow functions sono utili per azioni su una riga sola. Possono essere scritte in due modi:

1. Senza parentesi graffe: `(...args) => expression` -- la parte destra è un'espressione: la funzione la valuta e restituisce il risultato.
2. Con parentesi graffe: `(...args) => { body }` -- le parentesi ci permettono di scrivere comandi multipli all'interno della funzione, ma abbiamo bisogno di dichiarare esplicitamente
`return` affinché sia ritornato qualcosa.
