# Numeri

Nella versione moderna di JavaScript ci sono due differenti tipi di numeri:

<<<<<<< HEAD
1. I numeri regolari, che vengono memorizzati nel formato a 64 bit [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754-2008_revision), conosciuti anche come "numeri in virgola mobile con doppia precisione". Questi sono i numeri che utilizziamo la maggior parte del tempo, e sono quelli di cui parleremo in questo capitolo.

2. I BigInt, che vengono utilizzati per rappresentare numeri interi di lunghezza arbitraria. Talvolta possono tornare utili, poiché i numeri regolari non possono eccedere <code>2<sup>53</sup></code> od essere inferiori di <code>-2<sup>53</sup></code>. Poiché i BigInt vengono utilizzati in alcune aree speciali, gli abbiamo dedicato un capitolo <info:bigint>.
=======
1. Regular numbers in JavaScript are stored in 64-bit format [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754), also known as "double precision floating point numbers". These are numbers that we're using most of the time, and we'll talk about them in this chapter.

2. BigInt numbers represent integers of arbitrary length. They are sometimes needed because a regular integer number can't safely exceed <code>(2<sup>53</sup>-1)</code> or be less than <code>-(2<sup>53</sup>-1)</code>, as we mentioned earlier in the chapter <info:types>. As bigints are used in a few special areas, we devote them to a special chapter <info:bigint>.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Quindi in questo capitolo parleremo dei numeri regolari.

## Diversi modi di scrivere un numero

Immaginiamo di dover scrivere 1 milione. La via più ovvia è:

```js
let billion = 1000000000;
```

Possiamo anche usare il carattere underscore `_` come separatore:

```js
let billion = 1_000_000_000;
```

<<<<<<< HEAD
Qui il carattere `_` gioca il ruolo di "zucchero sintattico", cioè rende il numero più leggibile. Il motore JavaScript semplicemente ignorerà i caratteri `_` tra le cifre, quindi è equivalente al milione scritto sopra.
=======
Here the underscore `_` plays the role of the "[syntactic sugar](https://en.wikipedia.org/wiki/Syntactic_sugar)", it makes the number more readable. The JavaScript engine simply ignores `_` between digits, so it's exactly the same one billion as above.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Nella vita reale però cerchiamo di evitare di scrivere lunghe file di zeri per evitare errori. E anche perché siamo pigri. Solitamente scriviamo qualcosa del tipo `"1ml"` per un milione o `"7.3ml"` 7 milioni e 300mila. Lo stesso vale per i numeri più grandi.

In JavaScript, possiamo abbreviare un numero inserendo la lettera `"e"` con il numero di zeri a seguire:

```js run
let billion = 1e9;  // 1 miliardo, letteralmente: 1 e 9 zeri

alert( 7.3e9 );  // 7.3 miliardi (equivale a 7300000000 o 7_300_000_000)
```

In altre parole, `"e"` moltiplica il numero `1` seguito dal numero di zeri dati.


```js
1e3 = 1 * 1000 // e3 significa *1000
1.23e6 = 1.23 * 1000000 // e6 significa *1000000
```

<<<<<<< HEAD
Ora proviamo a scrivere qualcosa di molto piccolo. Ad esempio, 1 microsecondo (un milionesimo di secondo): 
=======
Now let's write something very small. Say, 1 microsecond (one-millionth of a second):
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
let mсs = 0.000001;
```

<<<<<<< HEAD
Come prima, l'utilizzo di `"e"` può aiutare. Se volessimo evitare di scrivere esplicitamente tutti gli "0", potremmo scrivere:

```js
let ms = 1e-6; // sei zeri alla sinistra di 1
=======
Just like before, using `"e"` can help. If we'd like to avoid writing the zeroes explicitly, we could write the same as:

```js
let mcs = 1e-6; // five zeroes to the left from 1
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

Se contiamo gli zeri in `0.000001`, ce ne sono 6. Quindi ovviamente `1e-6`.  

In altre parole, un numero negativo dopo `"e"` significa una divisione per 1 seguito dal numero di zeri dati:

```js
// -3 divide 1 con 3 zeri
1e-3 = 1 / 1000; // 0.001

<<<<<<< HEAD
// -6 divide 1 con 6 zeri
1.23e-6 = 1.23 / 1000000; // 0.00000123
=======
// -6 divides by 1 with 6 zeroes
1.23e-6 === 1.23 / 1000000; // 0.00000123

// an example with a bigger number
1234e-2 === 1234 / 100; // 12.34, decimal point moves 2 times
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

### Numeri esadecimali, binari e ottali

I numeri [esadecimali](https://en.wikipedia.org/wiki/Hexadecimal) (hexadecimal o hex) sono largamente utilizzati in JavaScript per rappresentare colori, codifiche di caratteri, e molte altre cose. Quindi ovviamente esiste un modo per abbreviarli: `0x` e poi il numero.

Ad esempio:

```js run
alert( 0xff ); // 255
alert( 0xFF ); // 255 (equivalente)
```

I sistemi binario e ottale sono utilizzati raramente, ma sono comunque supportati con l'utilizzo dei prefissi `0b` e `0o`:


```js run
let a = 0b11111111; // forma binaria di 255
let b = 0o377; // forma ottale di 255

alert( a == b ); // true, lo stesso numero 255 da entrambe le parti
```

Ci sono solo 3 sistemi di numerazione con questo livello di supporto. Per gli altri sistemi, dovremmo utilizzare la funzione `parseInt` (che vedremo più avanti in questo capitolo).

## toString(base)

Il metodo `num.toString(base)` ritorna una rappresentazione in stringa del numero `num` con il sistema di numerazione fornito `base`.

Ad esempio:
```js run
let num = 255;

alert( num.toString(16) );  // ff
alert( num.toString(2) );   // 11111111
```

<<<<<<< HEAD
La `base` può variare da `2` a `36`. Di default vale `10`.
=======
The `base` can vary from `2` to `36`. By default, it's `10`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Altri casi di uso comune sono:

<<<<<<< HEAD
- **base=16** si utilizza per colori in esadecimale, codifiche di caratteri, i caratteri supportati sono `0..9` o `A..F`.
- **base=2** viene utilizzato per debugging o operazioni bit a bit, i caratteri accettati sono `0` o `1`.
- **base=36** la base massima, i caratteri possono andare da `0..9` o `A..Z`. L'intero alfabeto latino viene utilizzato per rappresentare un numero. Un caso divertente di utilizzo per la base `36` è quando abbiamo bisogno che un identificatore molto lungo diventi qualcosa di più breve, come ad esempio per accorciare gli url. Possiamo semplicemente rappresentarlo in base `36`:
=======
- **base=16** is used for hex colors, character encodings etc, digits can be `0..9` or `A..F`.
- **base=2** is mostly for debugging bitwise operations, digits can be `0` or `1`.
- **base=36** is the maximum, digits can be `0..9` or `A..Z`. The whole Latin alphabet is used to represent a number. A funny, but useful case for `36` is when we need to turn a long numeric identifier into something shorter, for example, to make a short url. Can simply represent it in the numeral system with base `36`:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

    ```js run
    alert( 123456..toString(36) ); // 2n9c
    ```

```warn header="Due punti per chiamare un metodo"
Da notare che i due punti in `123456..toString(36)` non sono un errore. Se vogliamo chiamare un metodo direttamente da un numero, come `toString` nell'esempio sopra, abbiamo bisogno di inserire due punti `..`.

Se inseriamo un solo punto: `123456.toString(36)`, otterremo un errore, perché la sintassi JavaScript implica una parte decimale a seguire del primo punto. Se invece inseriamo un ulteriore punto, allora JavaScript capirà che la parte decimale è vuota e procederà nel chiamare il metodo.

Potremmo anche scrivere `(123456).toString(36)`.
```

## Arrotondare

Una delle operazioni più utilizzate quando lavoriamo con i numeri è l'arrotondamento.

Ci sono diverse funzioni integrate per eseguire questa operazione:

`Math.floor`
: Arrotonda per difetto: `3.1` diventa `3`, e `-1.1` diventa `-2`.

`Math.ceil`
: Arrotonda per eccesso: `3.1` diventa `4`, e `-1.1` diventa `-1`.

`Math.round`
<<<<<<< HEAD
=======
: Rounds to the nearest integer: `3.1` becomes `3`, `3.6` becomes `4`. In the middle cases `3.5` rounds up to `4`, and `-3.5` rounds up to `-3`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

: Arrotonda all'intero più vicino: `3.1` diventa `3`, `3.6` diventa `4`, e `3.5` viene arrotondato anch'esso a `4`.

`Math.trunc` (non supportato da Internet Explorer)
: Rimuove tutto dopo la virgola decimale senza arrotondare: `3.1` diventa `3`, `-1.1` diventa `-1`.

Qui abbiamo una tabella che riassume le principali differenze:

|   | `Math.floor` | `Math.ceil` | `Math.round` | `Math.trunc` |
|---|---------|--------|---------|---------|
|`3.1`|  `3`    |   `4`  |    `3`  |   `3`   |
|`3.5`|  `3`    |   `4`  |    `4`  |   `3`   |
|`3.6`|  `3`    |   `4`  |    `4`  |   `3`   |
|`-1.1`|  `-2`    |   `-1`  |    `-1`  |   `-1`   |
|`-1.5`|  `-2`    |   `-1`  |    `-1`  |   `-1`   |
|`-1.6`|  `-2`    |   `-1`  |    `-2`  |   `-1`   |


Queste funzioni coprono tutti i possibili casi quando trattiamo numeri con una parte decimale. Come potremmo fare se volessimo arrotondare il numero ad `n` cifre dopo la virgola?

Ad esempio, abbiamo `1.2345` e vogliamo arrotondarlo a due cifre dopo la virgola, tenendo solo `1.23`.

Ci sono due modi per farlo:

1. Moltiplica e dividi.

<<<<<<< HEAD
    Ad esempio, per arrotondare un numero alla seconda cifra decimale, possiamo moltiplicare il numero per `100`,  chiamare la funzione di arrotondamento e dividerlo nuovamente.
=======
    For example, to round the number to the 2nd digit after the decimal, we can multiply the number by `100`, call the rounding function and then divide it back.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
    ```js run
    let num = 1.23456;

    alert( Math.round(num * 100) / 100 ); // 1.23456 -> 123.456 -> 123 -> 1.23
    ```

2. Il metodo [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) arrotonda il numero a `n` cifre dopo la virgola e ritorna una rappresentazione in stringa del risultato.
        
    ```js run
    let num = 12.34;
    alert( num.toFixed(1) ); // "12.3"
    ```

    Questo metodo arrotonderà per difetto o per eccesso in base al valore più vicino, similmente a `Math.round`:

    ```js run
    let num = 12.36;
    alert( num.toFixed(1) ); // "12.4"
    ```

<<<<<<< HEAD
    Da notare che il risultato di `toFixed` è una stringa. Se la parte decimale è più breve di quanto richiesto, verranno aggiunti degli zeri:
=======
    Please note that the result of `toFixed` is a string. If the decimal part is shorter than required, zeroes are appended to the end:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

    ```js run
    let num = 12.34;
    alert( num.toFixed(5) ); // "12.34000", aggiunti gli zeri per renderlo esattamente di 5 cifre decimali
    ```

<<<<<<< HEAD
    Possiamo convertire il risultato al tipo numerico utilizzando la somma unaria o chiamando il metodo `Number()`: `+num.toFixed(5)`.
=======
    We can convert it to a number using the unary plus or a `Number()` call, e.g. write `+num.toFixed(5)`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## Calcoli imprecisi

<<<<<<< HEAD
Internamente, un numero è rappresentato in formato 64-bit [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754-2008_revision), quindi vengono utilizzati esattamente 64 bit per rappresentare un numero: 52 vengono utilizzati per rappresentare le cifre, 11 per la parte decimale, e infine 1 bit per il segno.

Se un numero è troppo grande, tale da superare i 64 bit disponibili, come ad esempio un numero potenzialmente infinito:
=======
Internally, a number is represented in 64-bit format [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754), so there are exactly 64 bits to store a number: 52 of them are used to store the digits, 11 of them store the position of the decimal point, and 1 bit is for the sign.

If a number is really huge, it may overflow the 64-bit storage and become a special numeric value `Infinity`:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
alert( 1e500 ); // Infinity
```

Potrebbe essere poco ovvio, ma quello che accade è la perdita di precisione.

<<<<<<< HEAD
Consideriamo questo test (falso!):
=======
Consider this (falsy!) equality test:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
alert( 0.1 + 0.2 == 0.3 ); // *!*false*/!*
```

Esatto, se provassimo a confrontare il risultato della somma tra `0.1` e `0.2` con `0.3`, otterremmo `false`. 

Strano! Quale può essere il risultato se non `0.3`?

```js run
alert( 0.1 + 0.2 ); // 0.30000000000000004
```

<<<<<<< HEAD
Ouch! Un confronto errato di questo tipo può generare diverse conseguenze. Immaginate di progettare un sito di e-shop in cui i visitatori aggiungono al carrello articoli da `$0.10` e `$0.20`. Poi come prezzo totale viene mostrato `$0.30000000000000004`. Questo risultato lascerebbe sorpreso chiunque.
=======
Ouch! Imagine you're making an e-shopping site and the visitor puts `$0.10` and `$0.20` goods into their cart. The order total will be `$0.30000000000000004`. That would surprise anyone.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ma perché accade questo?

Un numero viene memorizzato nella sua forma binaria, una sequenza di "1" e "0". I numeri con virgola come `0.1`, `0.2` che visti nella loro forma decimale sembrano semplici, sono in realtà una sequenza infinita di cifre nella forma binaria.

<<<<<<< HEAD
In altre parole, cos'è `0.1`? Vale 1 diviso 10 `1/10`, "un decimo". Nel sistema decimale questi numeri sono facilmente rappresentabili. Prendiamo invece "un terzo": `1/3`. Diventa un numero con infiniti decimali `0.33333(3)`. 
=======
```js run
alert(0.1.toString(2)); // 0.0001100110011001100110011001100110011001100110011001101
alert(0.2.toString(2)); // 0.001100110011001100110011001100110011001100110011001101
alert((0.1 + 0.2).toString(2)); // 0.0100110011001100110011001100110011001100110011001101
```

What is `0.1`? It is one divided by ten `1/10`, one-tenth. In the decimal numeral system, such numbers are easily representable. Compare it to one-third: `1/3`. It becomes an endless fraction `0.33333(3)`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Quindi, le divisioni per potenze di `10` funzionano molto bene nel sistema decimale, non vale lo stesso con la divisione per `3`. Per la stessa ragione, nel sistema binario le divisioni per potenze di `2` sono una garanzia, ma `1/10` diventa una sequenza infinita di cifre.

Non esiste alcun modo per rappresentare *esattamente 0.1* o *esattamente 0.2* usando il sistema binario, proprio come non è possibile memorizzare "un terzo" come decimale.

Il formato numerico IEEE-754 cerca di risolvere questo arrotondando al più vicino numero possibile. Questo tipo di arrotondamento non ci consente di vedere le "piccole perdite di precisione", quindi il numero viene mostrato come `0.3`. Ma comunque è presente una perdita.

Possiamo vedere un esempio:
```js run
alert( 0.1.toFixed(20) ); // 0.10000000000000000555
```

E quando sommiamo due numeri, la loro "perdita di precisione" viene incrementata.

Questo è il motivo per cui `0.1 + 0.2` non vale esattamente `0.3`.

```smart header="Non solo JavaScript"
Lo stesso problema esiste in molti altri linguaggi di programmazione.

<<<<<<< HEAD
PHP, Java, C, Perl, Ruby hanno lo stesso tipo di problema, poiché si basano sullo stesso formato numerico. 
=======
PHP, Java, C, Perl, and Ruby give exactly the same result, because they are based on the same numeric format.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

Possiamo risolvere questo problema? Certamente, ci sono diverse soluzioni:

1. Possiamo arrotondare il risultato con un metodo [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed):

```js run
let sum = 0.1 + 0.2;
alert( sum.toFixed(2) ); // "0.30"
```

Da notare che `toFixed` ritorna sempre una stringa. Viene cosi garantito che ci siano almeno due cifre dopo la virgola decimale. Questo ci torna molto utile se abbiamo un e-shopping e vogliamo mostrare `$0.30`. Per tutti gli altri casi possiamo semplicemente chiamare la conversione con l'operatore di somma unaria:

```js run
let sum = 0.1 + 0.2;
alert( +sum.toFixed(2) ); // 0.3
```

2. Possiamo temporaneamente convertire i numeri ad interi per eseguire le operazioni e poi riconvertirli. In questo modo:

```js run
alert( (0.1 * 10 + 0.2 * 10) / 10 ); // 0.3
alert( (0.28 * 100 + 0.14 * 100) / 100); // 0.4200000000000001
```

<<<<<<< HEAD
Questo funziona perché quando facciamo `0.1 * 10 = 1` e `0.2 * 10 = 2` entrambi diventano interi, non vi è quindi perdita di precisione. 
=======
So, the multiply/divide approach reduces the error, but doesn't remove it totally.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

3. Se abbiamo a che fare con dei prezzi, la miglior soluzione rimane quella di memorizzare tutti i prezzi in centesimi, evitando quindi di utilizzare i numeri con virgola. Ma cosa succede se proviamo ad applicare uno sconto del 30%? Nella pratica, evitare completamente questo problema è difficile, in alcuni casi possono tornare utili entrambe le soluzioni viste sopra.

Quindi, l'approccio moltiplicazione/divisione riduce gli errori, ma non li elimina completamente.

Talvolta possiamo evitare le frazioni. Ad esempio se abbiamo a che fare con un negozio, allora possiamo memorizzare i prezzi in centesimi piuttosto che in euro.

````smart header="La cosa divertente"
Provate ad eseguire questo:

```js run
// Ciao! Sono un numero autoincrementante!
alert( 9999999999999999 ); // mostra 10000000000000000
```

Questo esempio ha lo stesso problema: perdita di precisione. Per la rappresentazione di un numero sono disponibili 64bit, ne vengono utilizzati 52 per le cifre, questi potrebbero non essere sufficienti. Quindi le cifre meno significative vengono perse.

JavaScript non mostra errori in questi casi. Semplicemente fa del suo meglio per "farci stare" il numero, anche se il formato non è "grande" abbastanza.
````

```smart header="Due zeri"
Un'altra conseguenza divertente della rappresentazione interna è l'esistenza di due zeri: `0` e `-0`.

Questo perché il segno viene rappresentato con un solo bit, in questo modo ogni numero può essere positivo o negativo, lo stesso vale per lo zero.

<<<<<<< HEAD
Nella maggior parte dei casi questa differenza è impercettibile, poiché gli operatori sono studiati per trattarli allo stesso modo.
=======
In most cases, the distinction is unnoticeable, because operators are suited to treat them as the same.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

## Test: isFinite e isNaN

Ricordate questi due valori numerici speciali?

- `Infinity` (e `-Infinity`) è uno speciale valore che è più grande (o più piccolo) di qualsiasi altro numero.
- `NaN` rappresenta un errore.

Questi appartengono al tipo `number`, ma non sono dei numeri "normali", esistono quindi delle funzioni dedicate per la loro verifica:


- `isNaN(value)` converte l'argomento al tipo numerico e successivamente verifica se è un `NaN`:

    ```js run
    alert( isNaN(NaN) ); // true
    alert( isNaN("str") ); // true
    ```

<<<<<<< HEAD
    Ma abbiamo veramente bisogno di questa funzione? Non possiamo semplicemente usare il confronto `=== NaN`? Purtroppo la risposta è no. Il valore `NaN` è unico in questo aspetto, non è uguale a niente, nemmeno a se stesso:
=======
    But do we need this function? Can't we just use the comparison `=== NaN`? Unfortunately not. The value `NaN` is unique in that it does not equal anything, including itself:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

    ```js run
    alert( NaN === NaN ); // false
    ```

- `isFinite(value)` converte l'argomento al tipo numerico e ritorna `true` se questo è un numero diverso da `NaN/Infinity/-Infinity`:

    ```js run
    alert( isFinite("15") ); // true
    alert( isFinite("str") ); // false, perché rappresenta un valore speciale: NaN
    alert( isFinite(Infinity) ); // false, perché rappresenta un valore speciale: Infinity
    ```

In alcuni casi `isFinite` viene utilizzato per verificare se una stringa qualunque è un numero:


```js run
let num = +prompt("Enter a number", '');

// risulterà true se non verrà inserito Infinity, -Infinity o un NaN
alert( isFinite(num) );
```

Da notare che una stringa vuota o contenente solo spazi viene trattata come `0` in qualsiasi funzione numerica, compresa `isFinite`.  

<<<<<<< HEAD
```smart header="Confronto con `Object.is`"

Esiste uno speciale metodo integrato [Object.is](mdn:js/Object/is) che confronta valori proprio come `===`, ma risulta molto più affidabile in due casi limite:

1. Funziona con `NaN`: `Object.is(NaN, NaN) === true`, e questo è un bene. 
2. I valori `0` e `-0` sono diversi: `Object.is(0, -0) === false`, tecnicamente sarebbero uguali, però internamente vengono rappresentati con il bit di segno, che in questo caso è diverso.
=======
````smart header="`Number.isNaN` and `Number.isFinite`"
[Number.isNaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN) and [Number.isFinite](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite) methods are the more "strict" versions of `isNaN` and `isFinite` functions. They do not autoconvert their argument into a number, but check if it belongs to the `number` type instead.

- `Number.isNaN(value)` returns `true` if the argument belongs to the `number` type and it is `NaN`. In any other case, it returns `false`.

    ```js run
    alert( Number.isNaN(NaN) ); // true
    alert( Number.isNaN("str" / 2) ); // true

    // Note the difference:
    alert( Number.isNaN("str") ); // false, because "str" belongs to the string type, not the number type
    alert( isNaN("str") ); // true, because isNaN converts string "str" into a number and gets NaN as a result of this conversion
    ```

- `Number.isFinite(value)` returns `true` if the argument belongs to the `number` type and it is not `NaN/Infinity/-Infinity`. In any other case, it returns `false`.

    ```js run
    alert( Number.isFinite(123) ); // true
    alert( Number.isFinite(Infinity) ); // false
    alert( Number.isFinite(2 / 0) ); // false

    // Note the difference:
    alert( Number.isFinite("123") ); // false, because "123" belongs to the string type, not the number type
    alert( isFinite("123") ); // true, because isFinite converts string "123" into a number 123
    ```

In a way, `Number.isNaN` and `Number.isFinite` are simpler and more straightforward than `isNaN` and `isFinite` functions. In practice though, `isNaN` and `isFinite` are mostly used, as they're shorter to write.
````

```smart header="Comparison with `Object.is`"
There is a special built-in method `Object.is` that compares values like `===`, but is more reliable for two edge cases:

1. It works with `NaN`: `Object.is(NaN, NaN) === true`, that's a good thing.
2. Values `0` and `-0` are different: `Object.is(0, -0) === false`, technically that's correct because internally the number has a sign bit that may be different even if all other bits are zeroes.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

In tutti gli altri casi, `Object.is(a, b)` equivale a `a === b`. 

<<<<<<< HEAD
Questo metodo di confronto viene spesso utilizzato in JavaScript. Quando un algoritmo interno ha necessità di verificare che due valori siano esattamente la stessa cosa, si utilizza `Object.is` (internamente chiamato [SameValue](https://tc39.github.io/ecma262/#sec-samevalue)).
=======
We mention `Object.is` here, because it's often used in JavaScript specification. When an internal algorithm needs to compare two values for being exactly the same, it uses `Object.is` (internally called [SameValue](https://tc39.github.io/ecma262/#sec-samevalue)).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```


## parseInt e parseFloat

Conversioni numeriche come `+` o `Number()` sono rigorose. Se il valore non è esattamente un numero, falliscono:

```js run
alert( +"100px" ); // NaN
```

L'unica eccezione tollerata è la presenza di spazi all'inizio o alla fine della stringa, poiché vengono ignorati.

<<<<<<< HEAD
Ma nella vita reale spesso abbiamo valori in unità, come `"100px"` o `"12pt"` in CSS. In molti stati il simbolo della valuta va dopo il saldo, quindi abbiamo `"19€"` e vorremmo estrarre un valore numerico.
=======
But in real life, we often have values in units, like `"100px"` or `"12pt"` in CSS. Also in many countries, the currency symbol goes after the amount, so we have `"19€"` and would like to extract a numeric value out of that.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Questo è il motivo per cui sono stati pensati `parseInt` e `parseFloat`.

Questi metodi "leggono" numeri dalla stringa finché ne sono in grado. In caso di errore, vengono ritornati i numeri raccolti. La funzione `parseInt` ritorna un intero, analogamente `parseFloat` ritorna un numero in virgola mobile:

```js run
alert( parseInt('100px') ); // 100
alert( parseFloat('12.5em') ); // 12.5

alert( parseInt('12.3') ); // 12, viene ritornata solamente la parte intera
alert( parseFloat('12.3.4') ); // 12.3, il secondo punto interrompe la lettura
```

Ci possono essere situazioni in cui `parseInt/parseFloat` ritornano `NaN`. Questo accade quando non viene letta nessuna cifra:

```js run
alert( parseInt('a123') ); // NaN, il primo simbolo interrompe la lettura
```

````smart header="Il secondo argomento di `parseInt(str, radix)`"
La funzione `parseInt()` possiede un secondo parametro opzionale. Questo specifica la base del sistema numerale utilizzato, quindi `parseInt` può anche analizzare stringhe di numeri esadecimali, binari e cosi via:

```js run
alert( parseInt('0xff', 16) ); // 255
alert( parseInt('ff', 16) ); // 255, senza 0x funziona ugualmente

alert( parseInt('2n9c', 36) ); // 123456
```
````

## Altre funzioni matematiche

JavaScript ha un oggetto integrato [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) che contiene una piccola libreria di funzioni e costanti matematiche.

Un paio di esempi:

`Math.random()`
: Ritorna un numero casuale tra 0 e 1 (1 escluso)

    ```js run
    alert( Math.random() ); // 0.1234567894322
    alert( Math.random() ); // 0.5435252343232
    alert( Math.random() ); // ... (numero casuale)
    ```

<<<<<<< HEAD
`Math.max(a, b, c...)` / `Math.min(a, b, c...)`
: Ritorna il maggiore/minore fra una lista di argomenti.
=======
`Math.max(a, b, c...)` and `Math.min(a, b, c...)`
: Returns the greatest and smallest from the arbitrary number of arguments.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

    ```js run
    alert( Math.max(3, 5, -10, 0, 1) ); // 5
    alert( Math.min(1, 2) ); // 1
    ```

`Math.pow(n, power)`
: Ritorna `n` elevato alla `power`

    ```js run
    alert( Math.pow(2, 10) ); // 2 alla 10 = 1024
    ```

Ci sono molte altre funzioni e costanti nell'oggetto `Math`, incluse quelle trigonometriche, che potete trovare nella [documentazione dell'oggetto Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math).


## Riepilogo

Per scrivere numeri molto grandi:

- Accodate una `"e"` con il numero di zeri. Come: `123e6` che vale `123` con 6 zeri.
- Un numero negativo dopo `"e"` divide il numero dato per 1 seguito dal numero di zeri dati. Per numeri tipo "un milionesimo".

Per diversi sistemi numerici:

- Potete scrivere direttamente in esadecimale (`0x`), ottale (`0o`) e binario (`0b`) 
- `parseInt(str, base)` analizza un numero intero con un qualsiasi sistema numerico con base: `2 ≤ base ≤ 36`.
- `num.toString(base)` converte un numero ad una stringa utilizzando il sistema numerico fornito in `base`.

Per convertire a numeri valori del tipo `12pt` e `100px`:

<<<<<<< HEAD
- Utilizzate parseInt/parseFloat per un conversione "soft", i quali provano a leggere un numero da una stringa e ritornano ciò che sono riusciti ad estrarre prima di interrompersi.
=======
For regular number tests:

- `isNaN(value)` converts its argument to a number and then tests it for being `NaN`
- `Number.isNaN(value)` checks whether its argument belongs to the `number` type, and if so, tests it for being `NaN`
- `isFinite(value)` converts its argument to a number and then tests it for not being `NaN/Infinity/-Infinity`
- `Number.isFinite(value)` checks whether its argument belongs to the `number` type, and if so, tests it for not being `NaN/Infinity/-Infinity`

For converting values like `12pt` and `100px` to a number:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Per i numeri con la virgola:

- Arrotondate usando `Math.floor`, `Math.ceil`, `Math.trunc`, `Math.round` o `num.toFixed(precision)`.
- Ricordatevi che c'è una perdita di precisione quando operate con numeri decimali.

Altre funzioni matematiche:

- Guardate l'oggetto [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) in caso di necessità. La libreria non è molto ampia, ma è in grado di coprire le necessità di base.

<<<<<<< HEAD
=======
- See the [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) object when you need them. The library is very small but can cover basic needs.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
