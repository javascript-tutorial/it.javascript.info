# Operatori logici

In JavaScript ci sono tre operatori logici: `||` (OR), `&&` (AND), `!` (NOT).

Nonostante si chiamino "logici", possono essere applicati a valori di qualsiasi tipo, non solo ai booleani. Il risultato stesso può essere di qualunque tipo.

Vediamoli nei dettagli.

## || (OR)

L'operatore "OR" viene rappresentato da due linee verticali:

```js
result = a || b;
```

Nella programmazione classica, l'OR logico è pensato per manipolare solo tipi booleani. Se almeno un argomento è `true`, allora il risultato sarà `true`, altrimenti sarà `false`.

In JavaScript questo operatore è un pò più potente. Ma prima guardiamo come si comporta con valori booleani.

Ci sono quattro combinazioni logiche possibili:

```js run
alert( true || true );   // true
alert( false || true );  // true
alert( true || false );  // true
alert( false || false ); // false
```

Come possiamo vedere, il risultato è sempre `true` tranne nei casi in cui entrambi gli operandi sono `false`.

Se un operando non è booleano, allora viene convertito in booleano per essere valutato.

Ad esempio, il numero `1` viene visto come `true`, il numero `0` -- come `false`:

```js run
if (1 || 0) { // fun<iona proprio come ( true || false )
  alert( 'truthy!' );
}
```

La maggior parte delle volte, OR `||` viene utilizzato in un `if` per verificare se *almeno una* delle condizioni è vera.

Ad esempio:

```js run
let hour = 9;

*!*
if (hour < 10 || hour > 18) {
*/!*
  alert( 'The office is closed.' );
}
```

Possiamo passare molteplici condizioni:

```js run
let hour = 12;
let isWeekend = true;

if (hour < 10 || hour > 18 || isWeekend) {
  alert( 'The office is closed.' ); // è il fine settimana
}
```

## OR "||" trova il primo valore vero

La logica descritta sopra è ovvia. Adesso proviamo ad addentrarci in qualche caratteristica "extra" di JavaScript.

Si può estendere l'algoritmo come segue:

Dando molti valori tramite OR:

```js
result = value1 || value2 || value3;
```

L'operatore OR `||` si comporta come segue:

- Valuta gli operandi da sinistra a destra.
- Ogni operando viene converito in booleano. Se il risultato è `true`, allora si ferma e ritorna il valore originale dell'operando.
- Se tutti gli altri operandi sono stati valutati (ad esempio tutti erano `false`), ritorna l'ultimo operando.

Un valore viene ritornato nella sua forma originale, non nella sua conversione booleana.

In altra parole, una catena di OR `"||"` ritorna il primo valore vero, se invece non ce ne sono ritorna l'ultimo valore trovato.

Ad esempio:

```js run
<<<<<<< HEAD
alert( 1 || 0 ); // 1 (1 è vero)
alert( true || 'no matter what' ); // (true è vero)

alert( null || 1 ); // 1 (1 è il primo valore true)
alert( null || 0 || 1 ); // 1 (il primo valore true)
alert( undefined || null || 0 ); // 0 (tutti falsi, ritorna l'ultimo valore)
=======
alert( 1 || 0 ); // 1 (1 is truthy)

alert( null || 1 ); // 1 (1 is the first truthy value)
alert( null || 0 || 1 ); // 1 (the first truthy value)

alert( undefined || null || 0 ); // 0 (all falsy, returns the last value)
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc
```

Questo ci porta ad alcuni utilizzi interessanti rispetto al "puro e classico OR booleano".boolean-only OR".

1. **Prelevare il primo valore vero da una lista di variabili o espressioni.**

<<<<<<< HEAD
    Immaginiamo di avere diverse variabili, che possono contenere sia dati che `null/undefined`. Come potremmo fare per trovare la prima che contione dati?

    Possiamo utilizzare OR `||` per questo:
=======
    For instance, we have `firstName`, `lastName` and `nickName` variables, all optional.

    Let's use OR `||` to choose the one that has the data and show it (or `anonymous` if nothing set):
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

    ```js run
    let firstName = "";
    let lastName = "";
    let nickName = "SuperCoder";

    *!*
    alert( firstName || lastName || nickName || "Anonymous"); // SuperCoder
    */!*
<<<<<<< HEAD

    alert( name ); // seleziona "John" – il primo valore true
    ```

    Se entrambe `currentUser` e `defaultUser` sono false allora il risultato sarà `"unnamed"`.
2. **Valutazione a Corto-Circuito.**

    Gli operandi non possono essere solo valori, ma anche espressioni arbitrarie. OR valuta ed esegue i test da sinistra a destra. La valutazione si ferma quando un viene trovato un valore vero, questo viene poi ritornato. Il processo è chiamata "valutazione a corto-circuito", perchè cerca di terminare il prima possibile partendo da sinistra verso destra.

    Questo si vede chiaramente quando il secondo argomento causerebbe side-effect. Come l'assegnazione di una variabile.

    Se proviamo ad eseguire l'esempio che segue, `x` non verrà assegnata:
=======
    ```

    If all variables were falsy, `Anonymous` would show up.

2. **Short-circuit evaluation.**

    Another feature of OR `||` operator is the so-called "short-circuit" evaluation.
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

    It means that `||` processes its arguments until the first truthy value is reached, and then the value is returned immediately, without even touching the other argument.

    That importance of this feature becomes obvious if an operand isn't just a value, but an expression with a side effect, such as a variable assignment or a function call.

<<<<<<< HEAD
    alert(x); // undefined, perché (x = 1) non viene valutato
    ```

    Se invece il primo argomento è `false`, allora `||` prosegue e valuta il secondo, in questo caso l'assegnazione funziona:
=======
    In the example below, only the second message is printed:
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

    ```js run no-beautify
    *!*true*/!* || alert("not printed");
    *!*false*/!* || alert("printed");
    ```

<<<<<<< HEAD
    Un assegnazione è un caso semplice. Potrebbero essere coinvolti altri tipi di side-effect.

    Quello che abbiamo visto, è un "modo breve di fare `if`". Il primo operando viene convertito a booleano e solo se è falso viene eseguito il secondo.

    La maggior parte delle volte è meglio utilizzare un " `if` "regolare", per mantenere il codice leggibile, in alcuni casi però può risultare utile.
=======
    In the first line, the OR `||` operator stops the evaluation immediately upon seeing `true`, so the `alert` isn't run.

    Sometimes, people use this feature to execute commands only if the condition on the left part is falsy.
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

## && (AND)

L'operatore AND viene rappresentato con `&&`:

```js
result = a && b;
```

Nella programmazione classica AND ritorna `true` se entrambri gli operandi sono veri, altrimenti ritorna `false`:

```js run
alert( true && true );   // true
alert( false && true );  // false
alert( true && false );  // false
alert( false && false ); // false
```

Un esempio con `if`:

```js run
let hour = 12;
let minute = 30;

if (hour == 12 && minute == 30) {
  alert( 'The time is 12:30' );
}
```

Proprio come per OR, qualsiasi valore è consentito come operando per AND:

```js run
if (1 && 0) { // valutato come true && false
  alert( "won't work, because the result is falsy" );
}
```


## AND "&& trova il primo valore falso

Fornire più valori AND:

```js
result = value1 && value2 && value3;
```

L'operatore AND `&&` si comporta come segue:

- Valuta gli operandi da sinistra a destra.
- Ogni operando viene convertito in booleano. Se il risultato è `false`, si ferma e ritorna il valore originale dell'operando.
- Se tutti gli operandi precedenti sono stati valutati (ad esempio nel caso siano tutti veri) , ritorna l'ultimo operando.

In altre parole, AND ritorna il primo valore falso se lo trova, altrimenti ritorna l'ultimo valore.

Le regole sono molto simili a quelle dell'OR. La differenza è che AND ritorna il primo valore *falso* mentre OR ritorna il primo valore *VERO*.

Esempi:

```js run
// se il primo operando è vero,
// AND ritorna il secondo operando:
alert( 1 && 0 ); // 0
alert( 1 && 5 ); // 5

// se il primo operando è falso
// AND lo ritorna. Il secondo operando viene ignorato
alert( null && 5 ); // null
alert( 0 && "no matter what" ); // 0
```

Possiamo anche passare diversi valori in una sola riga. Vediamo come viene ritornato il primo valore falso:

```js run
alert( 1 && 2 && null && 3 ); // null
```

Quando tutti i valori sono veri, viene ritornato l'ultimo valore:

```js run
alert( 1 && 2 && 3 ); // 3, l'ultimo
```

````smart header="Precedenza di AND `&&` è maggiore dell'OR `||`"
La precedenza dell'operatore AND`&&` è maggiore di quella dell'OR `||`.

Quindi il codice `a && b || c && d` esegue in maniera analoga all'espressione: `(a && b) || (c && d)`.
````

<<<<<<< HEAD
Proprio come l'OR, anche AND `&&` può qualche volta rimpiazzare `if`.
=======
````warn header="Don't replace `if` with || or &&"
Sometimes, people use the AND `&&` operator as a "shorter to write `if`".
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

Ad esempio:

```js run
let x = 1;

(x > 0) && alert( 'Greater than zero!' );
```

Le azione nella parte destra di `&&` vengono eseguite solamente se la valutazione non si ferma prima. Cioè: solo se `(x > 0)` è vera.

Quindi sostanzialmente è analogo a:

```js run
let x = 1;

if (x > 0) alert( 'Greater than zero!' );
```

<<<<<<< HEAD
La variante con `&&` sembra essere più corta. Ma l'istruzione `if` è più ovvia e tende ad essere più leggibile.

Quindi è consigliato usare ogni costrutto solo per i suoi scopi. Usate un `if` se volete imporre una condizione. Utilizzate invece `&&` se volete un AND.
=======
Although, the variant with `&&` appears shorter, `if` is more obvious and tends to be a little bit more readable. So we recommend using every construct for its purpose: use `if` if we want if and use `&&` if we want AND.
````

>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

## ! (NOT)

L'operatore booleano NOT viene rappresentato dal punto esclamativo `!`.

La sintassi è piuttosto semplice:

```js
result = !value;
```

L'operatore accetta un solo argomento e si comporta come segue:

1. Converte l'operando al tipo booleano: `true/false`.
2. Ritorna il valore inverso.

Ad esempio:

```js run
alert( !true ); // false
alert( !0 ); // true
```

Un doppio NOT `!!` viene talvolta utilizzato per convertire un valore al tipo booleano:

```js run
alert( !!"non-empty string" ); // true
alert( !!null ); // false
```

Quello che accade è che il primo NOT converte il tipo a booleano e ritorna il suo inverso, il secondo NOT lo inverte nuovamente. Alla fine abbiamo un valore di tipo booleano.

C'è un modo molto più lungo per fare la stessa cosa -- una funzione del linguaggio `Boolean`:

```js run
alert( Boolean("non-empty string") ); // true
alert( Boolean(null) ); // false
```

La precedenza del NOT `!` è la più alta fra tutti gli operatori logici quindi viene sempre eseguita per prima, precede `&&`, `||`.
