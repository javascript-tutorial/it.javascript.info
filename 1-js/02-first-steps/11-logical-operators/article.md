# Operatori logici

In JavaScript ci sono tre operatori logici: `||` (OR), `&&` (AND), e `!` (NOT).

Nonostante si chiamino "logici", possono essere applicati a valori di qualsiasi tipo, non solo ai booleani. Il risultato può essere di qualunque tipo.

Vediamoli nei dettagli.

## || (OR)

L'operatore "OR" viene rappresentato da due linee verticali:

```js
result = a || b;
```

Nella programmazione classica, l'OR logico è pensato per manipolare solo tipi booleani. Se almeno un argomento è `true`, allora il risultato sarà `true`, altrimenti sarà `false`.

In JavaScript questo operatore è un pò più potente. Ma prima vediamo come si comporta con i valori booleani.

Ci sono quattro combinazioni logiche possibili:

```js run
alert( true || true );   // true
alert( false || true );  // true
alert( true || false );  // true
alert( false || false ); // false
```

Come possiamo vedere, il risultato è sempre `true` tranne nei casi in cui entrambi gli operandi sono `false`.

Se un operando non è booleano viene convertito per essere valutato.

Ad esempio, il numero `1` viene considerato come `true`, il numero `0` come `false`:

```js run
if (1 || 0) { // funziona proprio come ( true || false )
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

Si può estendere l'algoritmo come segue.

Dati svariati operandi: 

```js
result = value1 || value2 || value3;
```

L'operatore OR `||` si comporta come segue:

- Valuta gli operandi da sinistra a destra.
- Ogni operando viene convertito in booleano. Se il risultato è `true`, allora si ferma e ritorna il valore originale dell'operando.
- Se tutti gli altri operandi sono stati valutati (ad esempio tutti erano `false`), ritorna l'ultimo operando.

**Un valore viene ritornato nella sua forma originale, non nella sua conversione booleana.

In altra parole, una catena di OR `"||"` ritorna il primo valore vero; se invece non ce ne sono ritorna l'ultimo valore trovato.

Ad esempio:

```js run
alert( 1 || 0 ); // 1 (1 è vero)

alert( null || 1 ); // 1 (1 è il primo valore true)
alert( null || 0 || 1 ); // 1 (il primo valore true)

alert( undefined || null || 0 ); // 0 (tutti falsi, ritorna l'ultimo valore)
```

Questo ci permette alcuni utilizzi interessanti rispetto al "puro e classico OR booleano"boolean-only OR".

1. **Prelevare il primo valore vero da una lista di variabili o espressioni.**

    Immaginiamo di avere diverse variabili, `firstName`, `lastName` e `nickName`, tutte opzionali (possono quindi essere *undefined* o avere valori falsi).

    Possiamo utilizzare OR `||` per selezionare quella che contiene un valore e mostrarlo (oppure mostrare `"Anonymous"` se nessua variabile è definita):

    ```js run
    let firstName = "";
    let lastName = "";
    let nickName = "SuperCoder";

    *!*
    alert( firstName || lastName || nickName || "Anonymous"); // SuperCoder
    */!*
    ```

    Se tutte le variabili sono false, verrà mostrato `"Anonymous"`.

2. **Valutazione a Corto-Circuito.**

    Gli operandi, oltre che valori, possono essere anche espressioni arbitrarie. OR valuta ed esegue i test da sinistra a destra. La valutazione si ferma al primo risultato vero, che viene ritornato. Il processo è chiamato "valutazione a corto-circuito" perchè cerca di concludersi il prima possibile (quando possibile), senza aver toccato l’operando successivo. 

    Questo si nota chiaramente quando il secondo argomento causerebbe un *side-effect* come l'assegnazione di una variabile o una function call.

    Se proviamo ad eseguire l'esempio che segue, `x` non verrà assegnata:

    alert(x); // undefined, perché (x = 1) non viene valutato
    ```

    Se invece il primo argomento è `false`, allora `||` prosegue e valuta il secondo, in questo caso l'assegnazione funziona:

    ```js run no-beautify
    *!*true*/!* || alert("not printed");
    *!*false*/!* || alert("printed");
    ```

    Un'assegnazione è un caso semplice. Potrebbero essere coinvolti altri tipi di side-effect.

    Quello che abbiamo visto, è un "modo breve di fare `if`". Il primo operando viene convertito a booleano e solo se è falso viene eseguito il secondo.

    La maggior parte delle volte è meglio utilizzare un " `if` "regolare", per mantenere il codice leggibile, in alcuni casi però può risultare utile.

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

Proprio come per OR, anche per AND è consentito qualsiasi valore come operando:

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
La precedenza dell'operatore AND `&&` è maggiore di quella dell'OR `||`.

Quindi il codice `a && b || c && d` esegue in maniera analoga all'espressione: `(a && b) || (c && d)`.
````

````warn header="Non rimpiazzate `if` con `||` o `&&`"
Talvolta, le persone utilizzano l'operatore AND `&&` come una "scorcatoia" dell'espressione `if`".
Proprio come l'OR, anche AND `&&` può qualche volta rimpiazzare `if`.

Ad esempio:

```js run
let x = 1;

(x > 0) && alert( 'Greater than zero!' );
```

Le azioni nella parte destra di `&&` vengono eseguite solamente se la valutazione non si ferma prima. Cioè: solo se `(x > 0)` è vera.

Quindi sostanzialmente è analogo a:

```js run
let x = 1;

if (x > 0) alert( 'Greater than zero!' );
```

La variante con `&&` sembra essere più corta. Ma l'istruzione `if` è più ovvia e tende ad essere più leggibile.

Quindi è consigliato usare ogni costrutto solo per i suoi scopi. Usate un `if` se volete imporre una condizione. Utilizzate invece `&&` se volete un AND.

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
