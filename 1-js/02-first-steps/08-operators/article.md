# Operatori di base

Molti operatori matematici già li conosciamo dalle scuole. Tra di essi ci sono l'addizione `+`, la moltiplicazione `*`, la sottrazione `-` e coì via.

In questo capitolo inizieremo con gli operatori semplici, quindi ci concentreremo sugli aspetti specifici di Javascript che non vengono trattati a scuola.

## Termini: "unario", "binario", "operando"

Prima di iniziare, cerchiamo di capire la terminologia.

- *Un operando* -- è ciò a cui si applica l'operatore. Ad esempio nella moltiplicazione `5 * 2` ci sono due operandi: l'operando sinistro è il numero `5`, e l'operando di destra è il numero `2`. A volte gli operandi vengo anche chiamati "argomenti".
- Un operatore è *unario* se ha un singolo operando. Ad esempio, la negazione `-` inverte il segno di un numero:

    ```js run
    let x = 1;

    *!*
    x = -x;
    */!*
    alert( x ); // -1, viene applicata la negazione unaria
    ```
- Un operatore è *binario* se ha due operandi. Lo stesso operatore "meno" esiste nella forma binaria:

    ```js run no-beautify
    let x = 1, y = 3;
    alert( y - x ); // 2, la sottrazione binaria sottrae i valori
    ```

    Formalmente, negli esempi precedenti abbiamo due diversi operatori che condividono lo stesso simbolo: la negazione (operatore unario che inverte il segno) e la sottrazione (operatore binario che esegue la sottrazione).

## Operatori matematici

Sono supportati seguenti operatori matematici:

- Addizione `+`,
- Sottrazione `-`,
- Moltiplicazione `*`,
- Divisione `/`,
- Resto `%`,
- Potenza `**`.

I primi quattro sono piuttosto semplici, mentre `%` e `**` richiedono qualche spiegazione.

### Resto %


L'operatore resto `%`, diversamente da quello che si può pensare, non è legato alla percentuale.

Il risultato di `a % b` è il [resto](https://en.wikipedia.org/wiki/Remainder) della divisione intera di `a` diviso `b`.

Ad esempio:

```js run
<<<<<<< HEAD
alert( 5 % 2 ); // 1, è il resto dell'operazione 5 diviso 2
alert( 8 % 3 ); // 2, è il resto dell'operazione 8 diviso 3
=======
alert( 5 % 2 ); // 1, the remainder of 5 divided by 2
alert( 8 % 3 ); // 2, the remainder of 8 divided by 3
alert( 8 % 4 ); // 0, the remainder of 8 divided by 4
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

### Elevamento a Potenza **

The exponentiation operator `a ** b` raises `a` to the power of `b`.
L'operatore di elevamento a potenza `a ** b` eleva a potenza `a` usando `b` come esponente.

In nomenclatura matematica viene scritto come a<sup>b</sup>.

Ad esempio:

```js run
alert( 2 ** 2 ); // 2² = 4
alert( 2 ** 3 ); // 2³ = 8
alert( 2 ** 4 ); // 2⁴ = 16
```

<<<<<<< HEAD
Come in matematica, l'esponente può essere anche un valore numerico non intero.
=======
Just like in maths, the exponentiation operator is defined for non-integer numbers as well.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ad esempio, la radice quadrata può essere vista come un elevamento a potenza con esponente `1/2`:

```js run
alert( 4 ** (1/2) ); // 2 (potenza 1/2 equivale alla radice quadrata)
alert( 8 ** (1/3) ); // 2 (potenza 1/3 equivale alla radice cubica)
```


##  Concatenazione di stringhe, operatore binario +

<<<<<<< HEAD
Adesso diamo un'occhiata alle caratteristiche degli operatori in JavaScript, che vanno oltre l'aritmetica scolastica.
=======
Let's meet the features of JavaScript operators that are beyond school arithmetics.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Solitamente l'operatore di somma `+` viene utilizzato per sommare due numeri.

Ma se l'operatore binario `+` viene applicato a delle stringhe, queste verranno unite (concatenate):

```js
let s = "my" + "string";
alert(s); // mystring
```

Nota che se almeno uno degli operandi è una stringa, anche gli altri verranno convertiti in stringa.

Ad esempio:

```js run
alert( '1' + 2 ); // "12"
alert( 2 + '1' ); // "21"
```

Come puoi vedere, non è importante se la stringa è il primo il secondo operando. La regola è semplice: se uno degli operandi è una stringa, anche gli altri vengono convertiti a stringa.

Comunque, queste operazioni vengono eseguite da sinistra verso destra, Se ci sono due numeri prima di una stringa, prima vengono sommati e il risultato convertito in stringa:

Ora un esempio più complesso:

```js run
alert(2 + 2 + '1' ); // "41" non "221"
```

Qui le operazioni vengo eseguite una di seguito all'altra, da sinistra verso destra. Il primo `+` somma i due numeri e restituisce `4`, quindi il successivo `+` concatena a quest'ultimo la stringa `1`, quindi sarebbe come fare `4 + '1' = 41`.

```js run
alert('1' + 2 + 2 ); // "122" non "14"
```

In questo esempio il primo operando è una stringa, quindi il compilatore tratterà anche i successivi operandi come stringhe. I `2` verranno concatenati alla stringa `1`: `'1' + 2 = 12` quindi `'12' + 2 = '122'`.

L'operatore binario `+` è l'unico che può lavorare con le stringhe in questo modo. Gli altri operatori aritmetici funzionano solo con i numeri. Infatti convertono sempre i loro operandi in numeri.

Questo è un esempio per la sottrazione e la divisione:

```js run
alert( 6 - '2' ); // 4, converte la stringa '2' in numero
alert( '6' / '2' ); // 3, converte entrambi gli operandi in numeri
```

## Conversione numerica, operatore unario +

L'operatore `+` esiste in due forme. La forma binaria che abbiamo utilizzato sopra, e quella unaria.

L'operatore unario `+` viene applicato ad un singolo valore. Nel caso questo sia un numero, non succede nulla. Se invece non è un numero, questo viene convertito in un operando di tipo numerico.

Ad esempio:

```js run
// Nessun effetto sui numeri
let x = 1;
alert( +x ); // 1

let y = -2;
alert( +y ); // -2

*!*
// Converte i valori non numerici
alert( +true ); // 1
alert( +"" );   // 0
*/!*
```

Si ottiene lo stesso risultato di `Number(...)`, ma in un modo più veloce.

La necessità di convertire stringhe in numeri si presenta molto spesso. Ad esempio, se stiamo prelevando un valore da un campo HTML, questo solitamente sarà di tipo stringa. Come procedere in caso volessimo sommare questi valori?

La somma binaria li concatenerebbe come stringhe:

```js run
let apples = "2";
let oranges = "3";

alert( apples + oranges ); // "23", la somma binaria concatena le stringhe
```

Se vogliamo trattarli come numeri, dobbiamo prima convertirli e successivamente sommarli:

```js run
let apples = "2";
let oranges = "3";

*!*
// entrambi i valori vengono convertiti in numeri prima della somma binaria
alert( +apples + +oranges ); // 5
*/!*

// la variante più lunga
// alert( Number(apples) + Number(oranges) ); // 5
```

Dal punto di vista di matematico l'abbondanza `+` può sembrare errato, ma dal punto di vista di un programmatore non c'e nulla di strano: i `+` unari vengono applicati per primi e si occupa di convertire le stringhe in numeri, successivamente il `+` binario esegue la somma.

Perché il `+` unario viene applicato prima di quello binario? Come adesso vedremo, questo accade per via della sua *precedenza più alta*.

## Precedenza degli operatori

Se un espressione ha più di un operatore, l'ordine d'esecuzione viene definito dalla loro *precedenza*, in altre parole, c'è una priorità implicita tra gli operatori.

Fin dalle scuole sappiamo che la moltiplicazione nell'espressione `1 + 2 * 2` viene eseguita prima dell'addizione. E' proprio questo che si intende con precedenza. La moltiplicazione sta dicendo di avere *una precedenza più alta* rispetto all'addizione.

Le parentesi, sovrascrivono qualsiasi precedenza, quindi se non siamo soddisfatti dell'ordine d'esecuzione, possiamo utilizzarle: `(1 + 2) * 2`.

Ci sono molti operatori in JavaScript. Ogni operatore ha un suo grado di precedenza. Quello con il grado più elevato viene eseguito per primo. Se il grado di precedenza è uguale, l'esecuzione andrà da sinistra a destra.

Un estratto della [tabella delle precedenze](https://developer.mozilla.org/en/JavaScript/Reference/operators/operator_precedence) (non è necessario che ve la ricordiate, ma tenete a mente che gli operatori unari hanno una precedenza più elevata rispetto ai corrispondenti binari):

| Precedence | Name | Sign |
|------------|------|------|
| ... | ... | ... |
| 14 | unary plus | `+` |
| 14 | unary negation | `-` |
| 13 | exponentiation | `**` |
| 12 | multiplication | `*` |
| 12 | division | `/` |
| 11 | addition | `+` |
| 11 | subtraction | `-` |
| ... | ... | ... |
| 2 | assignment | `=` |
| ... | ... | ... |

<<<<<<< HEAD
Come possiamo vedere, la "somma unaria"(unary plus) ha una priorità di `17`, che è maggiore del `13` dell'addizione(`+` binario). Questo è il motivo per cui l'espressione `"+apples + +oranges"` esegue prima il `+` unario, e successivamente l'addizione.
=======
As we can see, the "unary plus" has a priority of `14` which is higher than the `11` of "addition" (binary plus). That's why, in the expression `"+apples + +oranges"`, unary pluses work before the addition.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## Assegnazione

<<<<<<< HEAD
Da notare che anche l'assegnazione `=` è un operatore. Viene infatti elencato nella tabella delle precedenze con una priorità molto bassa: `3`.
=======
Let's note that an assignment `=` is also an operator. It is listed in the precedence table with the very low priority of `2`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Questo è il motivo per cui quando assegniamo un valore ad una variabile, come `x = 2 * 2 + 1`, i calcoli vengono eseguiti per primi, e successivamente viene valutato l'operatore `=`, che memorizza il risultato in `x`.

```js
let x = 2 * 2 + 1;

alert( x ); // 5
```

### L'assegnazione = restituisce un valore

Il fatto che il simbolo `=` sia un operatore e non un costrutto "magico" del linguaggio, ha delle interessanti implicazioni.

Tutti gli operatori in Javascript restituiscono un valore. Questo è ovvio per `+` e `-`, ma è altrettanto vero per `=`.

La chiamata `x = value` scrive `value` in `x` *e quindi lo restituisce*.

Di seguito una dimostrazione di come usare un assegnamento come parte di una espressione pù complessa: 


```js run
let a = 1;
let b = 2;

*!*
let c = 3 - (a = b + 1);
*/!*

alert( a ); // 3
alert( c ); // 0
```

Nell'esempio qui sopra, il risultato dell l'espressione `(a = b + 1)` viene assegnato ad `a` (esso è `3`). Quindi questo viene utilizzato per le successive valutazioni.

E' un codice divertente, non trovate? Dovremmo sapere come funziona perché è possibile trovarlo in alcune librerie Javascript.

Comunque, per favore evitate di scrivere codice simile. Questo genere di scorciatoie rende il codice poco chiaro e leggibile.

### Concatenare assegnazioni

Un'altra caratteristica interessante è l'abilità di concatenare assegnazioni:

```js run
let a, b, c;

*!*
a = b = c = 2 + 2;
*/!*

alert( a ); // 4
alert( b ); // 4
alert( c ); // 4
```

Le assegnazioni concatenate vengono valutate da destra a sinistra. Prima viene valutata l'espressione più a destra `2 + 2` e successivamente viene valutata l'assegnazione a sinistra: `c`, `b` e `a`. Alla fine, tutte le variabili condivideranno lo stesso valore.

Ancora una volta, per favorire la leggibilità è meglio dividere il codice su più linee:


```js
c = 2 + 2;
b = c;
a = c;
```

Questo è più facile da leggere, specialmente quando si scorre velocemente il codice.

## Modifica sul posto

Spesso abbiamo bisogno di applicare un operatore ad una variabile ed assegnare il risultato alla variabile stessa.

Per esempio:

```js
let n = 2;
n = n + 5;
n = n * 2;
```

Questa sintassi può essere abbreviata usando `+=` and `*=`:

```js run
let n = 2;
n += 5; // ora n = 7 (equivale a n = n + 5)
n *= 2; // ura n = 14 (equivale a n = n * 2)

alert( n ); // 14
```

Gli operatori "modifica-e-assegna" esistono per tutti gli operatori matematici e sui bit: `/=`, `-=`, etc.

Questi operatori hanno la stessa precedenza delle normali assegnazioni, quindi vengono eseguiti dopo la maggior parte degli altri calcoli.


```js run
let n = 2;

n *= 3 + 5; // right part evaluated first, same as n *= 8

<<<<<<< HEAD
alert( n ); // 16  (prima viene valutata la parte destra, equivale a n *= 8)
=======
alert( n ); // 16
```
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## Incremento/Decremento

<!-- Can't use -- in title, because the built-in parser turns it into a 'long dash' – -->

L'incremento o il decremento di un numero di uno è una delle operazioni numeriche più comuni.

Quindi, ci sono speciali operatori dedicati a questo:

- **Incremento** `++` incrementa la variabile di 1:

    ```js run no-beautify
    let counter = 2;
    counter++;      // sarebbe come fare counter = counter + 1, ma in maniera più breve
    alert( counter ); // 3
    ```
- **Decremento** `--` decrementa la variabile di 1:

    ```js run no-beautify
    let counter = 2;
    counter--;      // equivale a counter = counter - 1, ma è più breve da scrivere
    alert( counter ); // 1
    ```

```warn
L'Incremento/decremento possono essere applicati solo a variabili. Se tentiamo di utilizzarli con un valore, come `5++` si otterrà un errore.
```

Gli operatori `++` e `--` possono essere inseriti sia prima che dopo la variabile.

- Quando l'operatore viene messo dopo la variabile, viene detto "forma post-fissa": `counter++`.
- La "forma pre-fissa" si ottiene inserendo l'operatore prima della variabile: `++counter`.

Entrambi questi metodi portano allo stesso risultato: incrementano `counter` di `1`.

C'è qualche differenza? Si, ma possiamo notarla solo se andiamo ad utilizzare il valore di ritorno di `++/--`.

Facciamo chiarezza. Come sappiamo, tutti gli operatori restituiscono un valore. Incremento e decremento non fanno eccezione. La forma pre-fissa restituisce il nuovo valore, mentre la forma post-fissa restituisce il vecchio valore (prima dell'incremento/decremento).

Per vedere le differenze ecco un esempio:

```js run
let counter = 1;
let a = ++counter; // (*)

alert(a); // *!*2*/!*
```

Nella riga `(*)` la chiamata pre-fissa di `++counter` incrementa `counter` e ritorna il nuovo valore che è `2`. Quindi `alert` mostra `2`.

Adesso proviamo ad utilizzare la forma post-fissa:

```js run
let counter = 1;
let a = counter++; // (*) abbiamo sostituito ++counter con counter++

alert(a); // *!*1*/!*
```

Nella riga `(*)` la forma *post-fissa* `counter++` incrementa `counter`, ma ritorna il *vecchio* valore (prima dell'incremento). Quindi `alert` mostra `1`.

Per ricapitolare:

- Se il risultato di un incremento/decremento non viene utilizzato, non ci sarà differenza qualsiasi forma venga utilizzata:

    ```js run
    let counter = 0;
    counter++;
    ++counter;
    alert( counter ); // 2, le righe sopra fanno la stessa cosa
    ```
- Se l'intenzione è di incrementare il valore *e* utilizzare il valore, allora si utilizza la forma pre-fissa:

    ```js run
    let counter = 0;
    alert( ++counter ); // 1
    ```
- Se si ha intenzione di incrementare, ma utilizzare il valore precedente, allora sarà necessario utilizzare la forma post-fissa:

    ```js run
    let counter = 0;
    alert( counter++ ); // 0
    ```

````smart header="Incremento/decremento contro gli operatori"
Gli operatori `++/--` possono essere utilizzati nello stesso modo all'interno di un espressione. La loro precedenza sarà più alta rispetto alla maggioranza degli altri operatori aritmetici.

Ad esempio:

```js run
let counter = 1;
alert( 2 * ++counter ); // 4
```

Confrontatelo con:

```js run
let counter = 1;
alert( 2 * counter++ ); // 2, perché counter++ ritorna il "vecchio" valore
```

Sebbene sia tecnicamente permesso, questa sintassi rende il codice meno leggibile. Una linea che esegue più operazioni `++` non è mai un bene.

Mentre leggiamo il codice, una rapido scorrimento con lo sguardo in "verticale" può facilmente farci perdere una parte di codice, come ad esempio `counter++`, e potrebbe quindi non essere ovvio che la variabile incrementa.

E' consigliato utilizzare lo stile "una linea -- un'azione":

```js run
let counter = 1;
alert( 2 * counter );
counter++;
```
````

## Operatori sui bit

Gli operatori sui bit trattano gli argomenti come numeri interi rappresentati in 32-bit e lavorano sulla loro rappresentazione binaria.

Questi operatori non sono specifici di JavaScript, ma supportati in molti linguaggi di programmazione.

La lista degli operatori:

- AND ( `&` )
- OR ( `|` )
- XOR ( `^` )
- NOT ( `~` )
- LEFT SHIFT ( `<<` )
- RIGHT SHIFT ( `>>` )
- ZERO-FILL RIGHT SHIFT ( `>>>` )

<<<<<<< HEAD
Questi operatori vengono utilizzati molto raramente, quando abbiamo bisogno di lavorare con i numeri al più basso livello (bit per bit).  Non avremo bisogno di questi operatori molto presto, poiché lo sviluppo web ne fa un uso limitato, ma in alcune aree speciali, come la crittografia, sono utili.In caso di necessità potete leggere l'articolo [operatori BitWise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators) su MDN.

=======
These operators are used very rarely, when we need to fiddle with numbers on the very lowest (bitwise) level. We won't need these operators any time soon, as web development has little use of them, but in some special areas, such as cryptography, they are useful. You can read the [Bitwise Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#bitwise_operators) chapter on MDN when a need arises.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## Virgola

L'operatore virgola `,` è uno degli operatori più rari ed inusuali. Qualche volta viene utilizzato per scrivere codice più breve, quindi è necessario capirlo bene per sapere cosa sta succedendo.

L'operatore virgola ci consente di valutare diverse espressioni, dividendole con `,`. Ogni espressione viene valutata, ma viene restituito solo il  risultato dell'ultima.

Ad esempio:

```js run
*!*
let a = (1 + 2, 3 + 4);
*/!*

alert( a ); // 7 (il risultato di 3 + 4)
```

Qui la prima espressione `1 + 2` viene valutata, ed il suo risultato viene scartato, successivamente viene eseguito `3 + 4` e il suo risultato viene restituito.

```smart header="La virgola ha una precedenza molto bassa"
L'operatore virgola ha una precedenza molto bassa, più bassa di `=`, quindi le parentesi sono importanti nell'esempio sopra.

Senza parentesi: `a = 1 + 2, 3 + 4` verrebbe valutato `+` prima, sommando i numeri in `a = 3, 7`, poi viene valutato l'operatore di assegnazione `=` che assegna `a = 3`, e successivamente il numero `7` dopo la virgola, che viene ignorato.
```

Perché dovremmo avere bisogno di un operatore che non ritorna nulla tranne l'ultima parte?

Qualche volta le persone lo utilizzano in costrutti  più complessi che seguono più azioni in una sola riga.

Ad esempio:

```js
// tre operazioni in un'unica riga
for (*!*a = 1, b = 3, c = a * b*/!*; a < 10; a++) {
 ...
}
```

Questo "trick" viene utilizzato in molti framework JavaScript, per questo l'abbiamo menzionato. Ma solitamente non migliora la leggibilità del codice, quindi dovremmo pensarci bene prima di scrivere questo tipo di espressioni.
