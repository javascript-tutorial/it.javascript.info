# Confronti

<<<<<<< HEAD
Molti operatori di confronto li conosciamo già dalla matematica:

- Maggiore/minore di: <code>a &gt; b</code>, <code>a &lt; b</code>.
- Maggiore/minore o uguale di: <code>a &gt;= b</code>, <code>a &lt;= b</code>.
- L'uguaglianza viene scritta come `a == b` (da notare che si utilizza due volte il simbolo `=`. Il simbolo unico`a = b` significa assegnazione).
- Non uguale. In matematica la notazione è <code>&ne;</code>, in JavaScript viene scritto come un'assegnazione ma con un punto esclamativo davanti: <code>a != b</code>.
=======
We know many comparison operators from maths:

- Greater/less than: <code>a &gt; b</code>, <code>a &lt; b</code>.
- Greater/less than or equals: <code>a &gt;= b</code>, <code>a &lt;= b</code>.
- Equals: `a == b` (please note the double equals sign `=`. A single symbol `a = b` would mean an assignment).
- Not equals. In maths the notation is <code>&ne;</code>, but in JavaScript it's written as an assignment with an exclamation sign before it: <code>a != b</code>.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

## Il risultato è booleano

<<<<<<< HEAD
Come tutti gli altri operatori, quelli di confronto ritornano un valore. In questo caso il valore di ritorno è di tipo booleano.

- `true` -- significa "si", "corretto" o "vero".
- `false` -- significa "no", "sbagliato" o "falso".
=======
Like all other operators, a comparison returns a value. In this case, the value is a boolean.

- `true` -- means "yes", "correct" or "the truth".
- `false` -- means "no", "wrong" or "not the truth".
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Ad esempio:

```js run
alert( 2 > 1 );  // true (correct)
alert( 2 == 1 ); // false (wrong)
alert( 2 != 1 ); // true (correct)
```

Il risultato di un confronto può essere assegnato ad una variabile, proprio come qualsiasi altro valore:

```js run
let result = 5 > 4; // assign the result of the comparison
alert( result ); // true
```

## Confronto di stringhe

<<<<<<< HEAD
Per vedere quale stringa è più lunga di un'altra, viene utilizzato l'ordine "dizionario" o meglio "lessico-grafico".
=======
To see whether a string is greater than another, JavaScript uses the so-called "dictionary" or "lexicographical" order.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

In altre parole, le stringhe vengono confrontate lettera a lettera.

Ad esempio:

```js run
alert( 'Z' > 'A' ); // true
alert( 'Glow' > 'Glee' ); // true
alert( 'Bee' > 'Be' ); // true
```

L'algoritmo per confrontare due stringhe è semplice:

<<<<<<< HEAD
1. Confronta i primi caratteri di entrambe le stringhe.
2. Se il primo è maggiore(o minore), allora la prima stringa è maggiore(o minore) della seconda. Abbiamo quindi finito.
3. Altrimenti se i primi caratteri sono uguali, vengono comparati i secondi, nella stessa maniera.
4. Viene ripetuto questo procedimento fino alla fine di una delle due stringhe.
5. Se entrambe le stringhe finiscono nello stesso istante, allora sono uguali. Altrimenti la stringa più lunga è maggiore.

Nell'esempio sopra, il confronto `'Z' > 'A'` ritorna il risultato al primo passo dell'algoritmo.

Le stringhe `"Glow"` e `"Glee"` vengono confrontate carattere per carattere:
=======
1. Compare the first character of both strings.
2. If the first character from the first string is greater (or less) than the other string's, then the first string is greater (or less) than the second. We're done.
3. Otherwise, if both strings' first characters are the same, compare the second characters the same way.
4. Repeat until the end of either string.
5. If both strings end at the same length, then they are equal. Otherwise, the longer string is greater.

In the examples above, the comparison `'Z' > 'A'` gets to a result at the first step while the strings `"Glow"` and `"Glee"` are compared character-by-character:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

1. `G` è uguale a `G`.
2. `l` è uguale a `l`.
3. `o` è maggiore di `e`. Qui si ferma. La prima stringa è maggiore.

<<<<<<< HEAD
```smart header="Non un vero dizionario, ma un ordine Unicode"
L'algoritmo di confronto esaminato sopra è molto simile a quello utilizzato nei dizionari cartacei o nelle agende telefoniche. Ma non è proprio uguale.

Ad esempio, le lettere maiuscole contano. Una lettera maiuscola `"A"` non è uguale alla stessa minuscola `"a"`. Qual'è più grande? In realtà, quella minuscola. Come mai? Perchè le lettere minuscole hanno un indice di encoding maggiore nella tabella(Unicode). Ritorneremo nei dettagli specifici e alle conseguenze che porta nel capitolo <info:string>.
=======
```smart header="Not a real dictionary, but Unicode order"
The comparison algorithm given above is roughly equivalent to the one used in dictionaries or phone books, but it's not exactly the same.

For instance, case matters. A capital letter `"A"` is not equal to the lowercase `"a"`. Which one is greater? The lowercase `"a"`. Why? Because the lowercase character has a greater index in the internal encoding table JavaScript uses (Unicode). We'll get back to specific details and consequences of this in the chapter <info:string>.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb
```

## Confronti tra tipi diversi

<<<<<<< HEAD
Quando compariamo valori che appartengono a tipi differenti, questi vengono convertiti in numeri.
=======
When comparing values of different types, JavaScript converts the values to numbers.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Ad esempio:

```js run
alert( '2' > 1 ); // true, string '2' becomes a number 2
alert( '01' == 1 ); // true, string '01' becomes a number 1
```

<<<<<<< HEAD
Per i valori booleani, `true` diventa `1` e `false` diventa `0`, quindi:
=======
For boolean values, `true` becomes `1` and `false` becomes `0`. 

For example:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js run
alert( true == 1 ); // true
alert( false == 0 ); // true
```

````smart header="Una conseguenza divertente"
Questo avviene anche quando:

- Due valori sono uguali.
- Uno dei due è `true` come booleano e l'altro è `false` come booleano.

Ad esempio:

```js run
let a = 0;
alert( Boolean(a) ); // false

let b = "0";
alert( Boolean(b) ); // true

alert(a == b); // true!
```

<<<<<<< HEAD
Dal punto di vista di JavaScript questo è abbastanza normale. Un controllo di uguaglianza converte sempre utilizzando la conversione numerica (quindi `"0"` diventa `0`), mentre la conversione `Boolean` utilizza altre regole.
=======
From JavaScript's standpoint, this result is quite normal. An equality check converts values using the numeric conversion (hence `"0"` becomes `0`), while the explicit `Boolean` conversion uses another set of rules.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb
````

## Uguaglianza stretta

<<<<<<< HEAD
Un controllo di uguaglianza standard `==` ha dei problemi. Non distingue tra `0` e `false`:
=======
A regular equality check `==` has a problem. It cannot differentiate `0` from `false`:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js run
alert( 0 == false ); // true
```

<<<<<<< HEAD
La stessa cosa accade con una stringa vuota:
=======
The same thing happens with an empty string:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js run
alert( '' == false ); // true
```

<<<<<<< HEAD
Questo perchè operandi di diversi tipi vengono convertiti a numeri dall'operatore di uguaglianza `==`. Una stringa vuota, come `false`, diventa zero.
=======
This happens because operands of different types are converted to numbers by the equality operator `==`. An empty string, just like `false`, becomes a zero.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Come possiamo fare se vogliamo distinguere tra `0` e `false`?

**Un operatore di uguaglianza stretta `===` controlla l'uguaglianza senza conversione di tipo.**

In altre parole, se `a` e `b` sono di tipi differenti, allora `a === b` ritornerà subito `false` senza tentare di convertirli.

Proviamolo:

```js run
alert( 0 === false ); // false, because the types are different
```

<<<<<<< HEAD
Esiste anche un operatore di "disuguaglianza stretta" `!==`, come analogo per l'operatore `!=`.

L'operatore di uguaglianza stretta è un pò più lungo da scrivere, ma rende ovvio il controllo e lascia meno spazio ad errori.
=======
There is also a "strict non-equality" operator `!==` analogous to `!=`.

The strict equality operator is a bit longer to write, but makes it obvious what's going on and leaves less room for errors.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

## Confronto con null e undefined

Diamo un'occhiata ad ulteriori casi limite.

<<<<<<< HEAD
C'è un comportamento non atteso quando `null` o `undefined` vengono comparati con gli altri valori.

Per un controllo di uguaglianza stretta `===`
: Questi valori sono diversi, perchè ognuno di loro appartiene ad un tipo a se stante.
=======
There's a non-intuitive behavior when `null` or `undefined` are compared to other values.


For a strict equality check `===`
: These values are different, because each of them is a different type.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

    ```js run
    alert( null === undefined ); // false
    ```

Per un controllo non stretto `==`
: Qui c'è una regola speciale. Questi due sono una "dolce coppia": sono uguali l'uno per l'altro, ma non con gli altri valori.

    ```js run
    alert( null == undefined ); // true
    ```

<<<<<<< HEAD
Per confronti matematici `< > <= >=`
: I valori `null/undefined` vengono convertiti in numeri: `null` diventa `0`, mentre `undefined` diventa `NaN`.

Adesso notiamo una cosa divertente quando proviamo ad applicare queste regole. E, cosa più importante, come non cadere in tranelli a causa di queste caratteristiche.
=======
For maths and other comparisons `< > <= >=`
: `null/undefined` are converted to numbers: `null` becomes `0`, while `undefined` becomes `NaN`.

Now let's see some funny things that happen when we apply these rules. And, what's more important, how to not fall into a trap with them.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

### Un risultato strano: null vs 0

Proviamo a confrontare `null` con lo zero:

```js run
alert( null > 0 );  // (1) false
alert( null == 0 ); // (2) false
alert( null >= 0 ); // (3) *!*true*/!*
```

<<<<<<< HEAD
Si, matematicamente può sembrare strano. L'ultimo risultato dice che "`null` è maggiore o uguale a zero". Quindi uno dei confronti sopra dovrebbe essere corretto, ma risultano entrambi falsi.

La ragione è che il controllo di uguaglianza `==` e di confronto `> < >= <=` lavorano diversamente. Il confronto converte `null` ad un numero, quindi lo tratta come `0`. Questo è perchè (3) `null >= 0` è vero e (1) `null > 0` è falso.
=======
Mathematically, that's strange. The last result states that "`null` is greater than or equal to zero", so in one of the comparisons above it must be `true`, but they are both false.

The reason is that an equality check `==` and comparisons `> < >= <=` work differently. Comparisons convert `null` to a number, treating it as `0`. That's why (3) `null >= 0` is true and (1) `null > 0` is false.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

D'altra parte, il controllo di uguaglianza `==` per `undefined` e `null` viene definito, senza alcuna conversione, loro sono uguali l'un l'altro ma non sono uguali a nient'altro. Questo è il motivo per cui (2) `null == 0` è falsa.

### Undefined è incomparabile

<<<<<<< HEAD
Il valore `undefined` non passa il confronto con nulla:
=======
The value `undefined` shouldn't be compared to other values:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js run
alert( undefined > 0 ); // false (1)
alert( undefined < 0 ); // false (2)
alert( undefined == 0 ); // false (3)
```

<<<<<<< HEAD
Perchè non va bene neanche uno zero? Sempre falso!

Noi abbiamo questi risultati perchè:

- Il confronto `(1)` e `(2)` ritorna `false` perchè `undefined` viene convertito a `NaN`. Mentre `NaN` è un valore numerico speciale che ritorna `false` con tutti i confronti.
- Il confronto di uguaglianza `(3)` ritorna `false`, perchè `undefined` è uguale solo a `null` e a nessun altro  valore.
=======
Why does it dislike zero so much? Always false!

We get these results because:

- Comparisons `(1)` and `(2)` return `false` because `undefined` gets converted to `NaN` and `NaN` is a special numeric value which returns `false` for all comparisons.
- The equality check `(3)` returns `false` because `undefined` only equals `null` and no other value.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

### Eludere i problemi

<<<<<<< HEAD
Perchè abbiamo studiato questi esempi? Dovremmo ricordarci queste caratteristiche a memoria? Bhe, in realtà no. Questo tipo di trucchetti diventeranno familiari poco alla volta, ma c'è un modo sicure per eludere i problemi che possono sorgere.
=======
Why did we go over these examples? Should we remember these peculiarities all the time? Well, not really. Actually, these tricky things will gradually become familiar over time, but there's a solid way to evade problems with them:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Semplicemente tratte tutti i confronti con `undefined/null` solo con l'operatore di uguaglianza stretta `===`.

<<<<<<< HEAD
Non utilizzate i confronti `>= > < <=` con una variabile che potrebbe valere `null/undefined`, senza essere davvero sicuri di cosa state facendo. Se una variabile può avere questi tipi di valore, è buona norma eseguire un controllo separatamente.
=======
Don't use comparisons `>= > < <=` with a variable which may be `null/undefined`, unless you're really sure of what you're doing. If a variable can have these values, check for them separately.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

## Riepilogo

<<<<<<< HEAD
- Gli operatori di confronto ritornano un valore booleano.
- Le stringhe vengono confrontate lettera per lettera seguendo l'ordine "lessico-grafico".
- Quando valori di tipi differenti vengono confrontati, questi vengono converiti a numeri (con eccezione per il controllo di uguaglianza stretto).
- I valori `null` e `undefined` sono `==` solo l'uno per l'altro e a nessun altro valore.
- Va prestata attenzione quando si utilizzano gli operatori di confronto come `>` o `<` con variabili che potrebbero contenere `null/undefined`. Una buona idea è eseguire un controllo separato per `null/undefined`.
=======
- Comparison operators return a boolean value.
- Strings are compared letter-by-letter in the "dictionary" order.
- When values of different types are compared, they get converted to numbers (with the exclusion of a strict equality check).
- The values `null` and `undefined` equal `==` each other and do not equal any other value.
- Be careful when using comparisons like `>` or `<` with variables that can occasionally be `null/undefined`. Checking for `null/undefined` separately is a good idea.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb
