# Operatori

Molti operatori già li conosciamo dalle scuole. Tra cui l'addizione `+`, la moltiplicazione `*`, la sottrazione `-` e molti altri.

In questo capitolo ci concentreremo sugli aspetti che non vengono descritti a scuola.

## Termini: "unario", "binario", "operando"

Prima di procedere, cerchiamo di capire la terminologia.

- *Un operando* -- è quello su cui si applica l'operatore. Ad esempio nella moltiplicazione `5 * 2` ci sono due operandi: l'operando sinistro cioè il `5`, e l'operando di destra cioè il `2`. Qualche volta le persone dicono "argomenti" piuttosto che "operandi".
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

<<<<<<< HEAD
    Formalmente, stiamo parlando di due operatori diversi: la negazione unaria (un singolo operando, inverte il segno) e la sottrazione binaria (due operandi, si esegue la sottrazione).
=======
    Formally, in the examples above we have two different operators that share the same symbol: the negation operator, a unary operator that reverses the sign, and the subtraction operator, a binary operator that subtracts one number from another.
>>>>>>> 524d59884650be539544c34f71d821432b7280fd

##  Concatenazione di stringhe, operatore binario +

Adesso diamo un'occhiata alle caratteristiche degli operatori in JavaScript, che vanno oltre l'aritmetica scolastica.

L'operatore di somma `+` viene utilizzato per sommare due numeri.

Ma se l'operatore binario `+` viene applicato a delle stringhe, queste verranno unite (concatenate):

```js
let s = "my" + "string";
alert(s); // mystring
```

Nota che se almeno uno degli operandi è una stringa, anche gli altri verrano convertiti a stringa.

Ad esempio:

```js run
alert( '1' + 2 ); // "12"
alert( 2 + '1' ); // "21"
```

Come hai visto, non è importante se la stringa è il primo operando o il secondo. La regola è semplice: se uni degli operandi è una stringa, anche gli altri vengono convertiti a stringa.

Comunque, queste operazioni vengono eseguite da sinistra verso destra, Se ci sono due numeri prima di una stringa, prima vengono sommati e il risultato convertito in stringa:


```js run
alert(2 + 2 + '1' ); // "41" non "221"
```

La concatenazione di stringhe e la conversione è una caratteristica particolare dell'operatore binario `+`. Gli altri operatori aritmetici funzionano solamente con i numeri. Infatti convertono sempre i loro operandi a numeri.

Ad esempio, la sottrazione e la divisione:

```js run
alert( 2 - '1' ); // 1
alert( '6' / '2' ); // 3
```

## Conversione numerica, operatore unario +

L'operatore somma `+` esiste in due forme. La forma binaria che abbiamo utilizzato sopra, e quella unaria.

L'operatore unario di somma `+` viene applicato ad un singolo valore, non fa nulla con i numero, ma se l'operando non è un numero, viene convertito in un operando di tipo numerico.

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

La necessità di convertire stringhe in numeri si presenta molto spesso. Ad esempio, se stiamo prelevando un valore da un campo HTML, questo solitamente sarà di tipo stringa.

Come procedere in caso volessimo sommare questi valori?

La somma binaria li concatena come stringhe:

```js run
let apples = "2";
let oranges = "3";

alert( apples + oranges ); // "23", la somma binaria concatena le stringhe
```

Se invece vogliamo trattarli come numeri, possiamo prima convertirli e successivamente sommarli:

```js run
let apples = "2";
let oranges = "3";

*!*
// entrambi i valori vengono convertiti a nuemri prima della solla binaria
alert( +apples + +oranges ); // 5
*/!*

// la variante più lunga
// alert( Number(apples) + Number(oranges) ); // 5
```

Dal punto di vista di matematico l'abbondanza di operatori di somma può risultare strano. Diversamente, dal punto di vista informatico, non c'e nulla di speciale: la somma unaria viene applicata per prima, si occupa di convertire stringhe in numeri, successivamente la somma binaria esegue l'addizione.

Perchè la somma unaria viene applicata prima di quella binaria? Come adesso vedremo, questo accade per via della *precedenza maggiore*.

## Precedenza degli operatori

Se un espressione ha più di un operatore, l'ordine d'esecuzione viene definito dalla loro *precedenza*, in altre parole, c'è una priorità implicita tra gli operatori.

Fin dalle scuole sappiamo che la moltiplicazione nell'espressione `1 + 2 * 2` viene eseguita prima dell'addizione. E' proprio questo che si intende con precedenza. La moltiplicazione sta dicendo di avere *una precedenza più alta* rispetto all'addizione.

Le parentesi, superano qualsiasi precedenza, quindi se non siamo soddisfatti dell'ordine d'esecuzione, possiamo utilizzarle: `(1 + 2) * 2`.

Ci sono molti operatori in JavaScript. Ogni operatore ha un suo grado di precedenza. Quello con il grado più elevato viene eseguito per primo. Se il grado di precedenza è uguale si esegue da sinistra a destra.

Un estratto della [tabella delle precedenze](https://developer.mozilla.org/en/JavaScript/Reference/operators/operator_precedence) (non è necessario che ve la ricordiate, ma tenete a mente che gli operatori unari hanno una precedenza più elevata rispetto ai corrispondenti binari):

| Precedence | Name | Sign |
|------------|------|------|
| ... | ... | ... |
| 16 | unary plus | `+` |
| 16 | unary negation | `-` |
| 14 | multiplication | `*` |
| 14 | division | `/` |
| 13 | addition | `+` |
| 13 | subtraction | `-` |
| ... | ... | ... |
| 3 | assignment | `=` |
| ... | ... | ... |

Come possiamo vedere, la "somma unaria"(unary plus) ha una priorità di `16`, che è maggiore di `13` dell'addizione(somma binaria). Questo è il motivo per cui l'espressione `"+apples + +oranges"` esegue prima la somma unaria, e successivamente l'addizione.

## Assegnazione

Da notare che anche l'assegnazione `=` è un operatore. Viene infatti elencato nella tabella delle precedenze con una priorità molto bassa: `3`.

Questo è il motivo per cui quando assegniamo un valore ad una variabile, come `x = 2 * 2 + 1`, i calcoli vengono eseguiti per primi, e successivamente viene valutato l'operatore `=`, che memorizza il risultato in `x`.

```js
let x = 2 * 2 + 1;

alert( x ); // 5
```

E' anche possibile concatenare assegnazioni:

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

````smart header="L'operatore di assegnazione`\"=\"` ritorna un valore"
Un operatore ritorna sempre un valore. Questo è ovvio per molti operatori come l'addizione `+` o la moltiplicazione `*`. Ma anche l'operatore di assegnazione segue la stessa regola.

La chiamata `x = value` scrive `value` dentro `x` *e successivamente la ritorna*.

Qui c'e una demo che usa un assegnazione come parte di un espressione più complessa:

```js run
let a = 1;
let b = 2;

*!*
let c = 3 - (a = b + 1);
*/!*

alert( a ); // 3
alert( c ); // 0
```

Nell'esempio qui sopra, il risultato di `(a = b + 1)` è il valore che viene assegnato ad `a` (che è `3`). Viene poi utilizzato per sottrarlo a `3`.

Sembra un codice strano, no? Dovremmo quindi capire perchè e come funzione, poichè potrete incontrarlo in alcune librerie di terze parti, anche se non dovreste mai scrivere nulla di simile. Queste scorciatoie non rendono per niente il codice pulito e leggibile.
````

## Resto %

L'operatore di resto `%`, anche se può sembrare, non ha nulla a che fare con le percentuali.

Il risultato di `a % b` è il resto della divisione intera tra `a` e `b`.

Ad esempio:

```js run
alert( 5 % 2 ); // 1 è il resto della divisione tra 5 e 2
alert( 8 % 3 ); // 2 è il resto della divisione tra 8 e 3
alert( 6 % 3 ); // 0 è il resto della divisione tra 6 e 3
```

## Potenza **

L'operatore potenza `**` è stato aggiunto di recente al linguaggio.

Preso un numero naturale `b`, il risultato di `a ** b` è `a` moltiplicato per se stesso `b` volte.

Ad esempio:

```js run
alert( 2 ** 2 ); // 4  (2 * 2)
alert( 2 ** 3 ); // 8  (2 * 2 * 2)
alert( 2 ** 4 ); // 16 (2 * 2 * 2 * 2)
```

L'operatore funziona anche con valori non interi di `a` e `b`, ad esempio:

```js run
alert( 4 ** (1/2) ); // 2 (potenza di 1/2 è equivalente alla radice quadrata, semplice matematica)
alert( 8 ** (1/3) ); // 2 (potenza di 1/3 è equivalente alla radice cubica)
```

## Incremento/Decremento

<!-- Can't use -- in title, because built-in parse turns it into – -->

L'incremento o il decremento di un numero di uno è una delle operazioni numeriche più comuni.

Quindi, c'è un operatore speciale per questo:

- **Incremento** `++` incrementa la variabile di 1:

    ```js run no-beautify
    let counter = 2;
    counter++;      // funziona alla stessa maniera di counter = counter + 1, ma in maniera più breve
    alert( counter ); // 3
    ```
- **Decremento** `--` decrementa la variabile di 1:

    ```js run no-beautify
    let counter = 2;
    counter--;      // funziona in maniera equivalente a counter = counter - 1, ma è più breve da scrivere
    alert( counter ); // 1
    ```

```warn
L'Incremento/decremento possono essere applicati solo a variabili. Se tentiamo di utilizzarli con un valore, come `5++` verrà sollevato un errore.
```

Gli operatori `++` e `--` possono essere inseriti sia prima che dopo la variabile.

- Quando l'operatore viene messo dopo la variabile, viene detto "forma post-fissa": `counter++`.
- La "forma pre-fissa" si ottiene inserendo l'operatore prima della variabile: `++counter`.

Entrambi questi metodi portano allo stesso risultato: incrementano `counter` di `1`.

C'è qualche differenza? Si, ma possiamo notarla solo se andiamo ad utilizzare il valore di ritorno di `++/--`.

Facciamo chiarezza. Come sappiamo, tutti gli operatori ritornano un valore. L'incremento/decremento non fanno eccezione. La forma pre-fissa ritorna il nuovo valore, mentre la forma post-fissa ritorna il vecchio valore(prima dell'incremento/decremento).

Per vedere le differenze, guardiamo un esempio:

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

Nella riga `(*)` la forma *post-fissa* `counter++` incrementa `counter`, ma ritorna il *vecchio* valore(prima dell'incremento). Quindi `alert` mostra `1`.

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
Gli operatori `++/--` possono essere utilizzati nello stesso modo all'interno di un espressione. La loro precedenza sarà maggiore degli altri operatori aritmetici.

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

Sebbene sia tecnicamente permesso, questa notazione rende il codice meno leggibile. Una linea che esegue più operazioni -- non è mai un bene.

Mentre leggiamo il codice, una rapido scorrimento con lo sguardo in "verticale" può facilmente far saltare la lettura di un parte di codice, come ad esempio `counter++`, e potrebbe quindi non essere ovvio che la variabile incrementa.

E' consigliato utilizzare lo stile "una linea -- un'azione":

```js run
let counter = 1;
alert( 2 * counter );
counter++;
```
````

## Operatori sui bit

Gli operatori sui bit trattano gli argomenti come numeri interi rappresentati in 32-bit e lavorano sulla loro rappresentazione binaria.

Questi operatori non sono specifici di JavaScript. Sono infatti supportati in molti linguaggi di programmazione.

La lista degli operatori:

- AND ( `&` )
- OR ( `|` )
- XOR ( `^` )
- NOT ( `~` )
- LEFT SHIFT ( `<<` )
- RIGHT SHIFT ( `>>` )
- ZERO-FILL RIGHT SHIFT ( `>>>` )

Questi operatori vengono utilizzati raramente. Per capirli, dovremmo entrare nella rappresentazione dei numeri a basso livello, e non è questo il contesto per approfondirli. Specialmente perchè non ne avremmo bisogno presto. Se siete curiosi, potete leggere l'articolo sugli [operatori BitWise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators) su MDN. Potrebbero essere molto utili in certe situazioni di necessità.

## Modifica-in-posizione

Abbiamo spesso necessità di applicare un operatore ad una variabile e memorizzare il nuovo risultato.

Ad esempio:

```js
let n = 2;
n = n + 5;
n = n * 2;
```

Questa notazione può essere accorciata utilizzando gli operatori `+=` e `*=`:

```js run
let n = 2;
n += 5; // ora n = 7 (equivale a n = n + 5)
n *= 2; // ora n = 14 (equivale a n = n * 2)

alert( n ); // 14
```

Gli operatori di abbreviazione "modifica-in-posizione" esistono per tutti gli operatori, anche per quelli bit a bit(bitwise): `/=`, `-=` etc.

Questi operatori hanno la stessa precedenza di una normale assegnazione, quindi l'assegnazione verrà effettuata dopo gli altri calcoli:

```js run
let n = 2;

n *= 3 + 5;

alert( n ); // 16  (la parte destra viene valutata per prima, lo stesso vale per n *= 8)
```

## Virgola

L'operatore virgola `,` è uno degli operatori più rari ed inusuali. Qualche volta viene utilizzato per scrivere codice più breve, quindi è necessario capirlo bene per sapere cosa sta succedendo.

L'operatore virgola ci consente di valutare diverse espressioni, dividendole con `,`. Ogni espressione viene valutata, ma solo dell'ultima viene ritornato il risultato.

Ad esempio:

```js run
*!*
let a = (1 + 2, 3 + 4);
*/!*

alert( a ); // 7 (il risultato di 3 + 4)
```

Qui la prima espressione `1 + 2` viene valutata, ed il suo risultato viene scartato, successivamente viene eseguito `3 + 4` e il suo risultato viene ritornato.

```smart header="La virgola ha una precedenza molto bassa"
L'operatore virgola ha una precedenza molto bassa, più bassa di `=`, quindi le parentesi sono importanti nel'esempio sopra.

Senza parentesi: `a = 1 + 2, 3 + 4` verrebbe valutato `+` prima, sommando i numeri in `a = 3, 7`, poi viene valutato l'operatore di assegnazione `=` che assegna `a = 3`, e successivamente il numero `7` dopo la virgola, che viene ignorato.
```

Perchè dovremmo avere bisogno di un operatore che non ritorna nulla tranne l'ultima parte?

Qualche volta le persone lo utilizzano in costrutti  più complessi per eseguire più azioni in una sola riga.

Ad esempio:

```js
// tre operazioni in un'unica riga
for (*!*a = 1, b = 3, c = a * b*/!*; a < 10; a++) {
 ...
}
```

Questo "trick" viene utilizzato in molti framework JavaScript, per questo l'abbiamo menzionato. Ma solitamente non migliora la leggibilità del codice, quindi dovremmo pensarci bene prima di scrivere questo tipo di espressioni.
