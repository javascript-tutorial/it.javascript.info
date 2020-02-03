# Numeri

<<<<<<< HEAD
Tutti i numeri in JavaScript sono memorizzati in formato 64-bit [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754-2008_revision), conosciuto anche come "doppia precisione".

Cerchiamo di ricapitolare ed espandere tutto ciò che già conosciamo.
=======
In modern JavaScript, there are two types of numbers:

1. Regular numbers in JavaScript are stored in 64-bit format [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754-2008_revision), also known as "double precision floating point numbers". These are numbers that we're using most of the time, and we'll talk about them in this chapter.

2. BigInt numbers, to represent integers of arbitrary length. They are sometimes needed, because a regular number can't exceed <code>2<sup>53</sup></code> or be less than <code>-2<sup>53</sup></code>. As bigints are used in few special areas, we devote them a special chapter <info:bigint>.

So here we'll talk about regular numbers. Let's expand our knowledge of them.
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4

## Diversi modi di scrivere un numero

Immaginiamo di dover scrivere 1 milione. La via più ovvia è:

```js
let billion = 1000000000;
```

Nella vita reale però cerchiamo di evitare di scrivere lunghe file di zeri per evitare errori. E anche perché siamo pigri. Solitamente scriviamo qualcosa del tipo `"1ml"` per un milione o `"7.3ml"` 7 milioni e 300mila. Lo stesso vale per i numeri più grandi.

In JavaScript, possiamo abbreviare un numero inserendo la lettera `"e"` con il numero di zeri a seguire:

```js run
let billion = 1e9;  // 1 miliardo, letteralmente: 1 e 9 zeri

alert( 7.3e9 );  // 7.3 miliardo (7,300,000,000)
```

In altre parole, `"e"` moltiplica il numero `1` seguito dal numero di zeri dati.

```js
1e3 = 1 * 1000
1.23e6 = 1.23 * 1000000
```

<<<<<<< HEAD

Ora proviamo a scrivere qualcosa di molto piccolo. Ad esempio, 1 microsecondo (un milionesimo di secondo): 
=======
Now let's write something very small. Say, 1 microsecond (one millionth of a second):
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4

```js
let ms = 0.000001;
```

<<<<<<< HEAD
Come prima, l'utilizzo di `"e"` può aiutare. Se volessimo evitare di scrivere esplicitamente tutti gli "0", potremmo scrivere:
=======
Just like before, using `"e"` can help. If we'd like to avoid writing the zeroes explicitly, we could say the same as:
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4

```js
let ms = 1e-6; // sei zeri alla sinistra di 1
```

Se contiamo gli zeri in `0.000001`, ce ne sono 6. Quindi ovviamente `1e-6`.  

In altre parole, un numero negativo dopo `"e"` significa una divisione per 1 seguito dal numero di zeri dati:

```js
// -3 divide 1 con 3 zeri
1e-3 = 1 / 1000 (=0.001)

// -6 divide 1 con 6 zeri
1.23e-6 = 1.23 / 1000000 (=0.00000123)
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

Il metodo `num.toString(base)` ritorna una rappresentazione in stringa del numero `num` con il sistema numerazione fornito `base`.

Ad esempio:
```js run
let num = 255;

alert( num.toString(16) );  // ff
alert( num.toString(2) );   // 11111111
```

La `base` può variare da `2` a `36`. Di default vale `10`.

Altri casi di uso comune sono:

- **base=16** si utilizza per colori in esadecimale, codifiche di caratteri, i caratteri supportati sono `0..9` o `A..F`.
- **base=2** viene utilizzato per debugging o operazioni bit a bit, i caratteri accettati sono `0` o `1`.
- **base=36** la base massima, i caratteri possono andare da `0..9` o `A..Z`. L'intero alfabeto latino viene utilizzato per rappresentare un numero. Un caso divertente di utilizzo per la base `36` è quando abbiamo bisogno che un identificatore molto lungo diventi qualcosa di più breve, come ad esempio per accorciare gli url. Possiamo semplicemente rappresentarlo in base `36`:

    ```js run
    alert( 123456..toString(36) ); // 2n9c
    ```

```warn header="Due punti per chiamare un metodo"
Da notare che i due punti in `123456..toString(36)` non sono un errore. Se vogliamo chiamare un metodo direttamente da un numero, come `toString` nell'esempio sopra, abbiamo bisogno di inseire due punti `..`.

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
: Arrotonda all'intero più vicino: `3.1` diventa `3`, `3.6` diventa `4` e `-1.1` diventa `-1`.

`Math.trunc` (non supportato da Internet Explorer)
: Rimuove tutto dopo la virgola decimale senza arrotondare: `3.1` diventa `3`, `-1.1` diventa `-1`.

Qui abbiamo una tabella che riassume le principali differenze:

|   | `Math.floor` | `Math.ceil` | `Math.round` | `Math.trunc` |
|---|---------|--------|---------|---------|
|`3.1`|  `3`    |   `4`  |    `3`  |   `3`   |
|`3.6`|  `3`    |   `4`  |    `4`  |   `3`   |
|`-1.1`|  `-2`    |   `-1`  |    `-1`  |   `-1`   |
|`-1.6`|  `-2`    |   `-1`  |    `-2`  |   `-1`   |


Queste funzioni coprono tutti i possibili casi quando trattiamo numeri con una parte decimale. Come potremmo fare se volessi arrotondare il numero ad `n` cifre dopo la virgola?

Ad esempio, abbiamo `1.2345` e vogliamo arrotondarlo a due cifre dopo la virgola, tenendo solo `1.23`.

Ci sono due modi per farlo:

1. Moltiplica e dividi.

    Ad esempio, per arrotondare un numero alla seconda cifra decimale, possiamo moltiplicare il numero per `100`,  chiamare la funzione di arrotondamento e dividerlo nuovamente.
    ```js run
    let num = 1.23456;

    alert( Math.floor(num * 100) / 100 ); // 1.23456 -> 123.456 -> 123 -> 1.23
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

    Da notare che il risultato di `toFixed` è una stringa. Se la parte decimale è più breve di quanto richiesto, verranno aggiunti degli zeri:

    ```js run
    let num = 12.34;
    alert( num.toFixed(5) ); // "12.34000", aggiunti gli zeri per renderlo esattamente di 5 cifre decimali
    ```

    Possiamo convertire il risultato al tipo numerico utilizzando la somma unaria o chiamando il metodo `Number()`: `+num.toFixed(5)`.

## Calcoli imprecisi

Internamente, un numero è rappresentato in formato 64-bit [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754-2008_revision), quindi vengono utilizzati esattamente 64 bit per rappresentare un numero: 52 vengono utilizzati per rappresentare le cifre, 11 per la parte decimale, e infine 1 bit per il segno.

Se un numero è troppo grande, tale da superare i 64 bit disponibili, come ad esempio un numero potenzialmente infinito:

```js run
alert( 1e500 ); // Infinity
```

Potrebbe essere poco ovvio, ma quello che accade è la perdita di precisione.

Consideriamo questo test (falso!):

```js run
alert( 0.1 + 0.2 == 0.3 ); // *!*false*/!*
```

Esatto, se provassimo a confrontare il risultato della somma tra `0.1` e `0.2` con `0.3`, otterremmo `false`. 

Strano! Quale può essere il risultato se non `0.3`?

```js run
alert( 0.1 + 0.2 ); // 0.30000000000000004
```

<<<<<<< HEAD
Ouch! Ci possono essere molte conseguenze dovute ad un errato confronto. Immaginate di progettare un sito di e-shop in cui i visitatori aggiungono al carrello articoli da `$0.10` e `$0.20`. Poi come prezzo totale viene mostrato `$0.30000000000000004`. Questo risultato lascerebbe sorpreso chiunque.
=======
Ouch! There are more consequences than an incorrect comparison here. Imagine you're making an e-shopping site and the visitor puts `$0.10` and `$0.20` goods into their cart. The order total will be `$0.30000000000000004`. That would surprise anyone.
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4

Ma perché accade questo?

Un numero viene memorizzato nella sua forma binaria, una sequenza di "1" e "0". I numeri con virgola come `0.1`, `0.2` che visti nella loro forma decimale sembrano semplici, sono in realtà una sequenza infinita di cifre nella forma binaria.

In altre parole, cos'è `0.1`? Vale 1 diviso 10 `1/10`, "un decimo". Nel sistema decimale questi numeri sono facilmente rappresentabili. Prendiamo invece "un terzo": `1/3`. Diventa un numero con infiniti decimali `0.33333(3)`. 

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

PHP, Java, C, Perl, Ruby hanno lo stesso tipo di problema, poiché si basano sullo stesso formato numerico. 
```

Possiamo risolvere questo problema? Certamente, ci sono diverse soluzioni:

1. Possiamo arrotondare il risultato con un metodo [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed):

```js run
let sum = 0.1 + 0.2;
alert( sum.toFixed(2) ); // 0.30
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

    Questo funziona perché quando facciamo `0.1 * 10 = 1` e `0.2 * 10 = 2` entrambi diventano interi, non vi è quindi perdita di precisione. 

3. Se abbiamo a che fare con dei prezzi, la miglior soluzione rimane quella di memorizzare tutti i prezzi in centesimi, evitando quindi di utilizzare i numeri con virgola. Ma cosa succede se proviamo ad applicare uno sconto del 30%? Nella pratica, evadere completamente questo problema è difficile, in alcuni casi possono tornare utili entrambe le soluzioni viste sopra.

Quindi, l'approccio moltiplicazipne/divisione riduce gli errori, ma non li elimina completamente.

Talvolta possiamo evitare le frazioni. Ad esempio se abbiamo a che fare con un negozio, allora possiamo memorizzare i prezzi in centesimi piuttosto che in dollari.  

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

<<<<<<< HEAD
Questo perché il segno viene rappresentato con un solo bit, in questo modo ogni numero può essere positivo o negativo, lo stesso vale per lo zero.
=======
That's because a sign is represented by a single bit, so it can be set or not set for any number including a zero.
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4

Nella maggior parte dei casi questa differenza è impercettibile, poiché gli operatori sono studiati per trattarli allo stesso modo.
```

<<<<<<< HEAD


## Test: isFinite e isNaN
=======
## Tests: isFinite and isNaN
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4

Ricordate questi due valori numerici speciali?

- `Infinity` (e `-Infinity`) è uno speciale valore che è più grande (o più piccolo) di qualsiasi altro numero.
- `NaN` rappresenta un errore.

Questi appartengono al tipo `number`, ma non sono dei numeri "normali", esistono quindi delle funzioni dedicate per la loro verifica:


- `isNaN(value)` converte l'argomento al tipo numerico e successivamente verifica se è un `NaN`:

    ```js run
    alert( isNaN(NaN) ); // true
    alert( isNaN("str") ); // true
    ```

    Ma abbiamo veramente bisogno di questa funzione? Non possiamo semplicemente usare il confronto `=== NaN`? Purtroppo la risposta è no. Il valore `NaN` è unico in questo aspetto, non è uguale a niente, nemmeno a se stesso:

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

```smart header="Confronto con `Object.is`"

Esiste uno speciale metodo integrato [Object.is](mdn:js/Object/is) che confronta valori proprio come `===`, ma risulta molto più affidabile in due casi limite:

1. Funziona con `NaN`: `Object.is(NaN, NaN) === true`, e questo è un bene. 
2. I valori `0` e `-0` sono diversi: `Object.is(0, -0) === false`, tecnicamente sarebbero uguali, però internamente vengono rappresentati con il bit di segno, che in questo caso è diverso.

In tutti gli altri casi, `Object.is(a, b)` equivale a `a === b`. 

Questo metodo di confronto viene spesso utilizzato in JavaScript. Quando un algoritmo interno ha necessità di verificare che due valori siano esattamente la stessa cosa, si utilizza `Object.is` (internamente chiamato [SameValue](https://tc39.github.io/ecma262/#sec-samevalue)).
```


## parseInt e parseFloat

Conversioni numeriche come `+` o `Number()` sono rigorose. Se il valore non è esattamente un numero, falliscono:

```js run
alert( +"100px" ); // NaN
```

L'unica eccezione tollerata è la presenza di spazi all'inizio o alla fine della stringa, poiché vengono ignorati.

Ma nella vita reale spesso abbiamo valori in unità, come `"100px"` o `"12pt"` in CSS. In molti stati il simbolo della valuta va dopo il saldo, quindi abbiamo `"19€"` e vorremmo estrarre un valore numerico.

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

`Math.max(a, b, c...)` / `Math.min(a, b, c...)`
: Ritorna il maggiore/minore fra una lista di argomenti.

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

``````
## Riepilogo

Per scrivere numeri molto grandi:

- Accodate una `"e"` con il numero di zeri. Come: `123e6` che vale `123` con 6 zeri.
- Un numero negativo dopo `"e"` divide il numero dato per 1 seguito dal numero di zeri dati. Per numeri tipo "un milionesimo".

<<<<<<< HEAD
Per diversi sistemi numerici:

- Potete scrivere direttamente in esadecimale (`0x`), ottale (`0o`) e binario (`0b`) 
- `parseInt(str, base)` analizza un numero intero con un qualsiasi sistema numerico con base: `2 ≤ base ≤ 36`.
- `num.toString(base)` converte un numero ad una stringa utilizzando il sistema numerico fornito in `base`.
=======
To write numbers with many zeroes:

- Append `"e"` with the zeroes count to the number. Like: `123e6` is the same as `123` with 6 zeroes `123000000`.
- A negative number after `"e"` causes the number to be divided by 1 with given zeroes. E.g. `123e-6` means `0.000123` (`123` millionths).
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4

Per convertire a numeri valori del tipo `12pt` e `100px`:

<<<<<<< HEAD
- Usate `parseInt/parseFloat` per una conversione "leggera", che legge numeri da una stringa e ritorna il valore che è riuscito a leggere prima dell'errore. 
=======
- Can write numbers directly in hex (`0x`), octal (`0o`) and binary (`0b`) systems
- `parseInt(str, base)` parses the string `str` into an integer in numeral system with given `base`, `2 ≤ base ≤ 36`.
- `num.toString(base)` converts a number to a string in the numeral system with the given `base`.
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4

Per i numeri con la virgola:

- Arrotondate usando `Math.floor`, `Math.ceil`, `Math.trunc`, `Math.round` o `num.toFixed(precision)`.
- Ricordatevi che c'è una perdita di precisione quando operate con numeri decimali.

Altre funzioni matematiche:

- Guardate l'oggetto [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) in caso di necessità. La libreria non è molto ampia, ma è in grado di coprire le necessità di base.


