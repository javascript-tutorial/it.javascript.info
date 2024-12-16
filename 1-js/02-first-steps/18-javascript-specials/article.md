# Specialità di JavaScript

Questo capitolo ricapitola brevemente le caratteristiche di JavaScript apprese fino ad ora, prestando particolare attenzioni ai punti più sottili.

## Struttura del codice

Le istruzioni sono delimitate da un punto e virgola:

```js run no-beautify
alert('Hello'); alert('World');
```

Solitamente, un "a capo" viene considerato come nuova riga, quindi questo codice funzionerebbe ugualmente:

```js run no-beautify
alert('Hello')
alert('World')
```

Questo viene definito "inserimento automatico del punto e virgola". In qualche caso non funziona, ad esempio:

```js run
alert("There will be an error after this message")

[1, 2].forEach(alert)
```

Molte linee guida che descrivono lo stile del codice consigliano di mettere un punto e virgola alla fine di ogni istruzione.

Il punto e virgola non è richiesto dopo un blocco di codice `{...}` e i costrutti sintattici che le utilizzano, come i cicli:

```js
function f() {
  // non è richiesto il punto e virola dopo la dichiarazione di funzione
}

for(;;) {
  // non è richiesto il punto e virgola dopo il ciclo
}
```

...Anche se mettessimo un punto e virgola "extra" da qualche parte, non sarebbe un errore. Sarà semplicemente ignorato.

Più dettagli: <info:structure>.

## Strict mode
 
Per abilitare completamente tutte le caratteristiche del moderno JavaScript, dovremmo iniziare lo script con `"use strict"`.

```js
'use strict';

...
```

La direttiva deve essere posta all'inizio di ogni script o all'inizio di una funzione.

<<<<<<< HEAD
Senza `"use strict"`, tutto continuerebbe a funzionare, ma alcune caratteristiche si comporterebbero in vecchio-stile, per retrocompatibilità. Generalmente si preferisce la modalità con i comportamenti moderni.
=======
Without `"use strict"`, everything still works, but some features behave in the old-fashioned, "compatible" way. We'd generally prefer the modern behavior.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Alcune caratteristiche moderne del linguaggio (come le classi che studieremo più avanti) attivano automaticamente la modalità script.

Di più: <info:strict-mode>.

## Variabili

Possono essere dichiarate utilizzando:

- `let`
- `const` (costante, non può essere modificata)
- `var` (vecchio stile, lo vedremo più avanti)

Il nome di una variabile può includere:
- Lettere e numeri, il primo carattere non può però essere un numero.
- I caratteri come `$` e `_` vengono considerati normalmente, come se fossero lettere.
- Alfabeti non-latini e geroglifici sono comunque consentiti, ma non vengono comunemente utilizzati.

Le variabili vengono tipizzate dinamicamente. Possono memorizzare qualsiasi valore:

```js
let x = 5;
x = "John";
```

Ci sono 7 tipi di dato:

- `number` si per i numeri in virgola mobile, che per quelli interi,
- `bigint` per valori numerici di lunghezza arbitraria,
- `string` per le stringhe,
- `boolean` per i valori logici: `true/false`,
- `null` -- un tipo con un singolo valore `null`, che ha il significato di "vuoto" o "non esistente",
- `undefined` -- un tipo con un singolo valore `undefined`, che significa "non assegnato",
- `object` e `symbol` -- per strutture dati più complesse e identificatori unici, non li abbiamo ancora studiati.

L'operatore `typeof` ritorna il tipo di un valore, con due eccezioni:
```js
typeof null == "object" // errore nel linguaggio
typeof function(){} == "function" // le funzioni vengono trattate diversamente
```

Di più in: <info:variables> e <info:types>.

## Interazioni

Abbiamo utilizzato solo il browser come ambiente di sviluppo, quindi le interfacce di base saranno:

<<<<<<< HEAD
[`prompt(question[, default])`](mdn:api/Window/prompt)
: Pone una domanda `question`, e ritorna quello che l'utente ha inserito oppure `null` se ha premuto "cancel".

[`confirm(question)`](mdn:api/Window/confirm)
: Pone una domanda `question` e fornisce la possibilità di scegliere tra Ok e Cancel. La scelta viene ritornata come `true/false`.

[`alert(message)`](mdn:api/Window/alert)
: Stampa un messaggio `message`.
=======
[`prompt(question, [default])`](https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt)
: Ask a `question`, and return either what the visitor entered or `null` if they clicked "cancel".

[`confirm(question)`](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm)
: Ask a `question` and suggest to choose between Ok and Cancel. The choice is returned as `true/false`.

[`alert(message)`](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert)
: Output a `message`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Tutte queste funzioni sono dei *modal*, interrompono l'esecuzione e impediscono all'utente di interagire con una pagina fino a che il visitatore non risponde.

Ad esempio:

```js run
let userName = prompt("Your name?", "Alice");
let isTeaWanted = confirm("Do you want some tea?");

alert( "Visitor: " + userName ); // Alice
alert( "Tea wanted: " + isTeaWanted ); // true
```

Di più: <info:alert-prompt-confirm>.

## Operatori

JavaScript supporta i seguenti operatori:

Aritmetici
: Regolari: `* + - /`, anche `%` per la divisione con resto e `**` per le potenze.

    La somma binaria `+` che concatena stringhe. E se almeno uno degli operandi è una stringa, anche gli altri vengono convertiti a stringa:

    ```js run
    alert( '1' + 2 ); // '12', string
    alert( 1 + '2' ); // '12', string
    ```

Assegnazione
: Ci sono le assegnazioni semplici: `a = b` e quelle combinate `a *= 2`.

<<<<<<< HEAD
Bit a Bit
: Gli operatori bit a bit funzionano con gli interi a livello di bit: guarda la [documentazione](mdn:/JavaScript/Reference/Operators/Bitwise_Operators) se ne avrai bisogno.
=======
Bitwise
: Bitwise operators work with 32-bit integers at the lowest, bit-level: see the [docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#bitwise_operators) when they are needed.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ternari
: C'è un solo operatore con tre parametri: `cond ? resultA : resultB`. Se `cond` è vera, ritorna `resultA`, altrimenti `resultB`.

Operatori logici
: AND logico `&&` e OR `||` eseguono delle valutazioni locali e ritornano un valore quando si fermano. La negazione logica NOT `!` converte il valore a tipo booleano e ne ritorna l'inverso.

Operatore di nullità
: L'operatore `??` fornisce un modo per scegliere un valore definito tra una lista di valori. Il risultato dell'espressione `a ?? b` sarà sempre `a`, salvo che non sia `null/undefined`, in questo caso il risultato sarà `b`.

Confronto
: Confronto di uguaglianza `==` valori di tipi diversi vengono convertiti in numeri (ad eccezione di `null` e `undefined` che si eguagliano tra di loro e con nient'altro), quindi questi sono uguali:

    ```js run
    alert( 0 == false ); // true
    alert( 0 == '' ); // true
    ```

    Anche gli altri confronti convertono i valori in numeri.

    L'operatore di uguaglianza stretta `===` non esegue la conversione: tipi differenti vengono interpretati com valori differenti.

    I valori `null` e `undefined` sono speciali: sono uguali `==` tra di loro ma non con nessun altro.

    Maggiore/minore confrontano le stringhe carattere per carattere, gli altri valori vengono convertiti a numeri.

Operatori logici
: Ce ne sono altri, come l'operatore virgola.

Di più in: <info:operators>, <info:comparison>, <info:logical-operators>, <info:nullish-coalescing-operator>.

## Cicli

- Abbiamo studiato tre tipi di ciclo:

    ```js
    // 1
    while (condition) {
      ...
    }

    // 2
    do {
      ...
    } while (condition);

    // 3
    for(let i = 0; i < 10; i++) {
      ...
    }
    ```

- La variabile dichiarata nel ciclo `for(let...)` è visibile solo internamente al ciclo. Possiamo anche omettere `let` e riutilizzare una variabile esistente.
- Le direttive `break/continue` permettono di uscire dall'intero ciclo/iterazione. Con l'utilizzo di etichette si possono saltare cicli annidati.

Maggiori dettagli in: <info:while-for>.

Più avanti studieremo più tipi di ciclo per lavorare con gli oggetti.

## Il costrutto "switch" 

Il costrutto "switch" può rimpiazzare controlli multipli con `if`. Utilizza `===` (uguaglianza stretta) per i confronti.

Ad esempio:

```js run
let age = prompt('Your age?', 18);

switch (age) {
  case 18:
    alert("Won't work"); // il risultato di prompr è una stringa, non un numero
    break;

  case "18":
    alert("This works!");
    break;

  default:
    alert("Any value not equal to one above");
}
```

Più dettagli in: <info:switch>.

## Funzioni

Abbiamo studiato tre modi per creare funzioni in JavaScript:

1. Dichiarazione di funzione: la funzione nel flusso principale

    ```js
    function sum(a, b) {
      let result = a + b;

      return result;
    }
    ```

2. Espressione di funzione: la funzione nel contesto di un espressione

    ```js
    let sum = function(a, b) {
      let result = a + b;

      return result;
    };
    ```

    Le espressioni di funzione possono avere un nome, come `sum = function name(a, b)`, questo `name` è visibile solamente all'interno della funzione.

3. Funzione freccia:

    ```js
<<<<<<< HEAD
    // espressione dalla parte destra
=======
    // expression on the right side
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
    let sum = (a, b) => a + b;

    // oppure la sintassi multi-riga con { ... }, è necessario esplicitare return
    let sum = (a, b) => {
      // ...
      return a + b;
    }

    // senza argomenti
    let sayHi = () => alert("Hello");

    // con un solo argomento
    let double = n => n * 2;
    ```


- Le funzioni possono avere variabili locali: queste vengono dichiarate all'interno della funzione stessa o nella lista parametri. Queste variabili sono visibili solamente all'interno della funzione.
- I parametri possono avere valori di default: `function sum(a = 1, b = 2) {...}`.
- Le funzioni ritornano sempre qualcosa. Se non c'è nessuna istruzione `return`, allora viene restituito `undefined`.

Per più informazioni: vedi <info:function-basics>, <info:arrow-functions-basics>.

## C'è di più

Questa era solo una breve lista delle caratteristiche di JavaScript. Per ora abbiamo studiato solo le basi. Più avanti nel tutorial troverai caratteristiche più avanzate di JavaScript.
