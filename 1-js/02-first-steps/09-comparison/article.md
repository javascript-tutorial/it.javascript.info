# Confronti

Molti operatori di confronto già li conosciamo dalla matematica:

- Maggiore/minore: <code>a &gt; b</code>, <code>a &lt; b</code>.
- Maggiore/minore o uguale: <code>a &gt;= b</code>, <code>a &lt;= b</code>.
- Uguaglianza: `a == b` (da notare che il doppio simbolo `=` indica un test di uguaglianza, mentre il simbolo unico `a = b` rappresenta un' assegnazione).
- Disuguaglianza. In matematica la notazione è <code>&ne;</code>, mentre in JavaScript viene scritto come <code>a != b</code>.

<<<<<<< HEAD
In questo articolo impareremo più approfonditamente i vari tipi di confronto, come vengono gestiti in JavaScript, incluse alcune importanti peculiarità
=======
- Greater/less than: <code>a &gt; b</code>, <code>a &lt; b</code>.
- Greater/less than or equals: <code>a &gt;= b</code>, <code>a &lt;= b</code>.
- Equals: `a == b`, please note the double equality sign `==` means the equality test, while a single one `a = b` means an assignment.
- Not equals: In maths the notation is <code>&ne;</code>, but in JavaScript it's written as <code>a != b</code>.
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269

## Il risultato è booleano

Tutti gli operatori di confronto restituiscono un valore booleano.

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

Per vedere quale stringa è maggiore di un'altra, viene utilizzato il cosiddetto ordine "dizionario" o "lessicografico".

In altre parole, le stringhe vengono confrontate lettera per lettera.

Ad esempio:

```js run
alert( 'Z' > 'A' ); // true
alert( 'Glow' > 'Glee' ); // true
alert( 'Bee' > 'Be' ); // true
```

L'algoritmo per confrontare due stringhe è semplice:

1. Confronta il primo carattere di entrambe le stringhe.
2. Se il primo carattere della prima stringa è maggiore(o minore) di quello della seconda stringa, allora la prima stringa è maggiore(o minore) della seconda. Abbiamo quindi finito.
3. Altrimenti, se il primo carattere di entrambe le stringhe è identico, viene comparato il secondo nella stessa maniera.
4. Viene ripetuto questo procedimento fino alla fine di una delle due stringhe.
5. Se entrambe le stringhe hanno la medesima lunghezza, allora sono uguali. Altrimenti la stringa più lunga è quella maggiore.

Nell'esempio sopra, il confronto `'Z' > 'A'` porta ad un risultato al primo passo dell'algoritmo.

Mentre il secondo confronto tra `"Glow"` e `"Glee"` richiede più passi poiché le stringhe vengono confrontate carattere per carattere:

1. `G` è uguale a `G`.
2. `l` è uguale a `l`.
3. `o` è maggiore di `e`. Qui si ferma. La prima stringa è maggiore.

```smart header="Non un vero e proprio dizionario, ma un ordine Unicode"
L'algoritmo di confronto esaminato sopra è molto simile a quello utilizzato nei dizionari cartacei o nelle agende telefoniche, ma non è esattamente lo stesso.

Ad esempio, le lettere maiuscole e minuscole contano. La lettera maiuscola `"A"` non è uguale alla lettera minuscola `"a"`. Qual'è la più grande? La maggiore è  quella minuscola. Come mai? Perché le lettere minuscole hanno un indice maggiore nella tabella di encoding utilizzata JavaScript (Unicode). Ritorneremo nei dettagli specifici e alle conseguenze nel capitolo <info:string>.
```

## Confronti tra tipi diversi

Quando compariamo valori che appartengono a tipi differenti, questi vengono convertiti in numeri.

Ad esempio:

```js run
alert( '2' > 1 ); // true, la stringa '2' diventa il numero 2
alert( '01' == 1 ); // true, la stringa '01' diventa il numero 1
```

Per i valori di tipo booleano, `true` diventa `1` e `false` diventa `0`, quindi:

```js run
alert( true == 1 ); // true
alert( false == 0 ); // true
```

````smart header="Una conseguenza divertente"
E' possibile, contemporaneamente, che:

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

Dal punto di vista di JavaScript questo è abbastanza normale. Un controllo di uguaglianza converte sempre utilizzando la conversione numerica (quindi `"0"` diventa `0`), mentre la conversione esplicita a booleano `Boolean` utilizza altre regole.
````

## Uguaglianza stretta

Il normale controllo di uguaglianza `==` ha dei problemi. Non distingue tra `0` e `false`:

```js run
alert( 0 == false ); // true
```

La stessa cosa accade con una stringa vuota:

```js run
alert( '' == false ); // true
```

Questo perché operandi di tipo diverso vengono convertiti in numerici dall'operatore di uguaglianza `==`. Una stringa vuota, così come un booleano `false`, diventa zero.

Come possiamo fare se vogliamo distinguere tra `0` e `false`?

**Un operatore di uguaglianza stretta `===` controlla l'uguaglianza senza conversione di tipo.**

In altre parole, se `a` e `b` sono di tipo differente, allora `a === b` restituirà subito `false` senza tentare di convertirli.

Proviamolo:

```js run
alert( 0 === false ); // false, perché il tipo è differente
```

Esiste anche un operatore di "disuguaglianza stretta" `!==`, analogo all'operatore `!=`.

L'operatore di uguaglianza stretta è un pò più lungo da scrivere, ma rende ovvio il controllo e lascia meno spazio ad errori.

## Confronto con null e undefined

C'è un comportamento poco intuitivo quando `null` o `undefined` vengono comparati con gli altri valori.

**Per un controllo di uguaglianza stretta `===`**

Questi valori sono diversi, perché non appartengono allo stesso tipo.

    ```js run
    alert( null === undefined ); // false
    ```

**Per un controllo non stretto `==`**

Qui c'è una regola speciale. Questi due sono una "dolce coppia": tra di loro sono uguali (riferito a `==`), ma non lo sono con con nessun altro valore.

    ```js run
    alert( null == undefined ); // true
    ```

**Per confronti matematici `< > <= >=`**

I valori `null/undefined` vengono convertiti in numeri: `null` diventa `0`, mentre `undefined` diventa `NaN`.

Adesso notiamo una cosa divertente quando proviamo ad applicare queste regole. E, cosa più importante, come non cadere in tranelli a causa di queste caratteristiche.

### Un risultato strano: null vs 0

Proviamo a confrontare `null` con lo zero:

```js run
alert( null > 0 );  // (1) false
alert( null == 0 ); // (2) false
alert( null >= 0 ); // (3) *!*true*/!*
```

Matematicamente questo è strano. L'ultimo risultato dice che "`null` è maggiore o uguale a zero". Quindi uno dei confronti sopra dovrebbe essere corretto, eppure risultano entrambi falsi.

La ragione è che il controllo di uguaglianza `==` e di confronto `> < >= <=` lavorano diversamente. Il confronto converte `null` in valore numerico, quindi lo tratta come `0`. Questo è il motivo per cui (3) `null >= 0` è vero e (1) `null > 0` è falso.

D'altra parte, il controllo di uguaglianza `==` per `undefined` e `null` viene eseguito, come detto, senza alcuna conversione. Essi sono uguali tra di loro, ma diversi a qualsiasi altro valore. Questo è il motivo per cui (2) `null == 0` è falso.

### Undefined è incomparabile

Il valore `undefined` non può essere confrontato con nessun altro valore:

```js run
alert( undefined > 0 ); // false (1)
alert( undefined < 0 ); // false (2)
alert( undefined == 0 ); // false (3)
```

Perché non va bene neanche lo zero? E' sempre falso!

Otteniamo questi risultati perché:

- I confronti `(1)` e `(2)` restituiscono `false` perché `undefined` viene convertito a `NaN`, e `NaN` è un valore numerico speciale che restituisce `false` in tutte le operazioni di confronto.
- Il confronto di uguaglianza `(3)` restituisce `false`, perché `undefined` è uguale solo a `null`, `undefined`, ma a nessun altro valore.

### Evitare i problemi

Perché abbiamo studiato questi esempi? Dovremmo ricordarci queste peculiarità tutte le volte? Bhe, in realtà no. Questo tipo di trucchetti diventeranno familiari col tempo, ma c'è un modo sicuro per evitare i problemi che possono sorgere:

- Trattate tutti i confronti con `undefined/null`, ad eccezione del confronto stretto `===`, con particolare attenzione.
- Non utilizzate i confronti `>= > < <=` con variabili che potrebbero essere `null/undefined`, se non siete più che sicuri di ciò che state facendo. Se una variabile può avere questo tipo di valore, è buona norma eseguire un controllo separatamente.

## Riepilogo

- Gli operatori di confronto restituiscono sempre un valore booleano.
- Le stringhe vengono confrontate lettera per lettera seguendo l'ordine "lessicografico".
- Quando valori di tipo differente vengono confrontati, questi vengono convertiti in numeri (ad eccezione del controllo di uguaglianza stretto).
- I valori `null` e `undefined` sono `==` solo tra di loro, e a nessun altro valore.
- Va prestata attenzione quando si utilizzano gli operatori di confronto come `>` o `<` con variabili che potrebbero contenere `null/undefined`. Controllare separatamente l'assegnazione di `null/undefined` è una buona idea.