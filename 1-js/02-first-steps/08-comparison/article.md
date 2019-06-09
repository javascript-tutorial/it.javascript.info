# Confronti

Molti operatori di confronto li conosciamo già dalla matematica:

- Maggiore/minore di: <code>a &gt; b</code>, <code>a &lt; b</code>.
- Maggiore/minore o uguale di: <code>a &gt;= b</code>, <code>a &lt;= b</code>.
- L'uguaglianza viene scritta come `a == b` (da notare che si utilizza due volte il simbolo `=`. Il simbolo unico`a = b` significa assegnazione).
- Non uguale. In matematica la notazione è <code>&ne;</code>, in JavaScript viene scritto come un'assegnazione ma con un punto esclamativo davanti: <code>a != b</code>.

## Il risultato è booleano

Come tutti gli altri operatori, quelli di confronto ritornano un valore. In questo caso il valore di ritorno è di tipo booleano.

- `true` -- significa "si", "corretto" o "vero".
- `false` -- significa "no", "sbagliato" o "falso".

Ad esempio:

```js run
alert( 2 > 1 );  // true (corretto)
alert( 2 == 1 ); // false (sbagliato)
alert( 2 != 1 ); // true (corretto)
```

Il risultato di un confronto può essere assegnato ad una variabile, proprio come qualsiasi altro valore:

```js run
let result = 5 > 4; // assegna il valore del confronto
alert( result ); // true
```

## Confronto di stringhe

Per vedere quale stringa è più lunga di un'altra, viene utilizzato l'ordine "dizionario" o meglio "lessico-grafico".

In altre parole, le stringhe vengono confrontate lettera a lettera.

Ad esempio:

```js run
alert( 'Z' > 'A' ); // true
alert( 'Glow' > 'Glee' ); // true
alert( 'Bee' > 'Be' ); // true
```

L'algoritmo per confrontare due stringhe è semplice:

1. Confronta i primi caratteri di entrambe le stringhe.
2. Se il primo è maggiore(o minore), allora la prima stringa è maggiore(o minore) della seconda. Abbiamo quindi finito.
3. Altrimenti se i primi caratteri sono uguali, vengono comparati i secondi, nella stessa maniera.
4. Viene ripetuto questo procedimento fino alla fine di una delle due stringhe.
5. Se entrambe le stringhe finiscono nello stesso istante, allora sono uguali. Altrimenti la stringa più lunga è maggiore.

Nell'esempio sopra, il confronto `'Z' > 'A'` ritorna il risultato al primo passo dell'algoritmo, mentre le stringhe `"Glow"` e `"Glee"` vengono confrontate carattere per carattere:

1. `G` è uguale a `G`.
2. `l` è uguale a `l`.
3. `o` è maggiore di `e`. Qui si ferma. La prima stringa è maggiore.

```smart header="Non un vero dizionario, ma un ordine Unicode"
L'algoritmo di confronto esaminato sopra è molto simile a quello utilizzato nei dizionari cartacei o nelle agende telefoniche. Ma non è proprio uguale.

Ad esempio, le lettere maiuscole contano. Una lettera maiuscola `"A"` non è uguale alla stessa minuscola `"a"`. Qual'è più grande? In realtà, quella minuscola. Come mai? Perchè le lettere minuscole hanno un indice di encoding maggiore nella tabella(Unicode). Ritorneremo nei dettagli specifici e alle conseguenze che porta nel capitolo <info:string>.
```

## Confronti tra tipi diversi

Quando compariamo valori che appartengono a tipi differenti, questi vengono convertiti in numeri.

Ad esempio:

```js run
alert( '2' > 1 ); // true, la stringa '2' diventa il numero 2
alert( '01' == 1 ); // true, la stringa '01' diventa il numero 1
```

Per i valori booleani, `true` diventa `1` e `false` diventa `0`, quindi:

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

Dal punto di vista di JavaScript questo è abbastanza normale. Un controllo di uguaglianza converte sempre utilizzando la conversione numerica (quindi `"0"` diventa `0`), mentre la conversione `Boolean` utilizza altre regole.
````

## Uguaglianza stretta

Un controllo di uguaglianza standard `==` ha dei problemi. Non distingue tra `0` e `false`:

```js run
alert( 0 == false ); // true
```

La stessa cosa accade con una stringa vuota:

```js run
alert( '' == false ); // true
```

Questo perchè operandi di diversi tipi vengono convertiti a numeri dall'operatore di uguaglianza `==`. Una stringa vuota, come `false`, diventa zero.

Come possiamo fare se vogliamo distinguere tra `0` e `false`?

**Un operatore di uguaglianza stretta `===` controlla l'uguaglianza senza conversione di tipo.**

In altre parole, se `a` e `b` sono di tipi differenti, allora `a === b` ritornerà subito `false` senza tentare di convertirli.

Proviamolo:

```js run
alert( 0 === false ); // false, perché i tipi sono differenti
```

Esiste anche un operatore di "disuguaglianza stretta" `!==`, come analogo per l'operatore `!=`.

L'operatore di uguaglianza stretta è un pò più lungo da scrivere, ma rende ovvio il controllo e lascia meno spazio ad errori.

## Confronto con null e undefined

Diamo un'occhiata ad ulteriori casi limite.

C'è un comportamento non atteso quando `null` o `undefined` vengono comparati con gli altri valori.

Per un controllo di uguaglianza stretta `===`
: Questi valori sono diversi, perchè ognuno di loro appartiene ad un tipo a se stante.

    ```js run
    alert( null === undefined ); // false
    ```

Per un controllo non stretto `==`
: Qui c'è una regola speciale. Questi due sono una "dolce coppia": sono uguali l'uno per l'altro, ma non con gli altri valori.

    ```js run
    alert( null == undefined ); // true
    ```

Per confronti matematici `< > <= >=`
: I valori `null/undefined` vengono convertiti in numeri: `null` diventa `0`, mentre `undefined` diventa `NaN`.

Adesso notiamo una cosa divertente quando proviamo ad applicare queste regole. E, cosa più importante, come non cadere in tranelli a causa di queste caratteristiche.

### Un risultato strano: null vs 0

Proviamo a confrontare `null` con lo zero:

```js run
alert( null > 0 );  // (1) false
alert( null == 0 ); // (2) false
alert( null >= 0 ); // (3) *!*true*/!*
```

Si, matematicamente può sembrare strano. L'ultimo risultato dice che "`null` è maggiore o uguale a zero". Quindi uno dei confronti sopra dovrebbe essere corretto, ma risultano entrambi falsi.

La ragione è che il controllo di uguaglianza `==` e di confronto `> < >= <=` lavorano diversamente. Il confronto converte `null` ad un numero, quindi lo tratta come `0`. Questo è perchè (3) `null >= 0` è vero e (1) `null > 0` è falso.

D'altra parte, il controllo di uguaglianza `==` per `undefined` e `null` viene definito, senza alcuna conversione, loro sono uguali l'un l'altro ma non sono uguali a nient'altro. Questo è il motivo per cui (2) `null == 0` è falsa.

### Undefined è incomparabile

Il valore `undefined` non passa il confronto con nulla:

```js run
alert( undefined > 0 ); // false (1)
alert( undefined < 0 ); // false (2)
alert( undefined == 0 ); // false (3)
```

Perchè non va bene neanche uno zero? Sempre falso!

Noi abbiamo questi risultati perchè:

- Il confronto `(1)` e `(2)` ritorna `false` perchè `undefined` viene convertito a `NaN`, mentre `NaN` è un valore numerico speciale che ritorna `false` con tutti i confronti.
- Il confronto di uguaglianza `(3)` ritorna `false`, perchè `undefined` è uguale solo a `null`, `undefined` e a nessun altro  valore.

### Eludere i problemi

Perchè abbiamo studiato questi esempi? Dovremmo ricordarci queste caratteristiche a memoria? Bhe, in realtà no. Questo tipo di trucchetti diventeranno familiari poco alla volta, ma c'è un modo sicure per eludere i problemi che possono sorgere.

Semplicemente tratte tutti i confronti con `undefined/null` solo con l'operatore di uguaglianza stretta `===`.

Non utilizzate i confronti `>= > < <=` con una variabile che potrebbe valere `null/undefined`, senza essere davvero sicuri di cosa state facendo. Se una variabile può avere questi tipi di valore, è buona norma eseguire un controllo separatamente.

## Riepilogo

- Gli operatori di confronto ritornano un valore booleano.
- Le stringhe vengono confrontate lettera per lettera seguendo l'ordine "lessico-grafico".
- Quando valori di tipi differenti vengono confrontati, questi vengono converiti a numeri (con eccezione per il controllo di uguaglianza stretto).
- I valori `null` e `undefined` sono `==` solo l'uno per l'altro e a nessun altro valore.
- Va prestata attenzione quando si utilizzano gli operatori di confronto come `>` o `<` con variabili che potrebbero contenere `null/undefined`. Una buona idea è eseguire un controllo separato per `null/undefined`.
