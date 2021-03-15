# BigInt

[recent caniuse="bigint"]

`BigInt` è uno speciale tipo numerico che supporta numeri interi di lunghezza arbitraria.

Un bigint viene creato aggiungendo il suffisso `n` alla fine di un intero, oppure invocando la funzione `BigInt`, la quale crea bigints a partire da stringhe, numeri etc.

```js
const bigint = 1234567890123456789012345678901234567890n;

const sameBigint = BigInt("1234567890123456789012345678901234567890");

const bigintFromNumber = BigInt(10); // equivale a 10n
```

## Operatori matematici

`BigInt` può essere utilizzato come un normale numero, ad esempio:

```js run
alert(1n + 2n); // 3

alert(5n / 2n); // 2
```

Da notare: la divisione `5/2` ritorna il risultato arrotondato verso lo zero, senza la parte decimale. Tutte le operazioni con bigints ritornano bigints.

Non possiamo mischiare i bigints e i numeri regolari:

```js run
alert(1n + 2); // Errore: Non possiamo mischiare BigInt e altri tipi
```

Dobbiamo esplicitamente convertirli se necessario: utilizzato o `BigInt()` o `Number()`, in questo modo:

```js run
let bigint = 1n;
let number = 2;

// da number a bigint
alert(bigint + BigInt(number)); // 3

// da bigint a number
alert(Number(bigint) + number); // 3
```

Le operazioni di conversione sono sempre silenziose, non generano mai errori, ma se il bigint dovesse essere troppo grande per essere contenuto in un numero, i bit in eccesso verranno rimossi, quindi dobbiamo stare attenti quando facciamo queste conversioni.

````smart header="L'operatore di somma unaria non è supportato dai bigints"
L'operatore di somma unaria `+value` è una pratica molto conosciuta per convertire `value` ad un numero.

Per evitare confusione, non viene supportato dai bigints:
```js run
let bigint = 1n;

alert( +bigint ); // error
```
Quindi dovremo utilizzare `Number()` per convertire un bigint in number.
````

## Confronti

Confronti, come `<`, `>` funzionano correttamente con i bigints e i number:

```js run
alert( 2n > 1n ); // true

alert( 2n > 1 ); // true
```

Da notare che, poichè number e bigint appartengono a tipi differenti, possono essere uguali `==`, ma non strettamente equivalenti `===`:

```js run
alert( 1 == 1n ); // true

alert( 1 === 1n ); // false
```

## Operazioni booleane

Quando utilizzati all'interno di un `if` o qualsiasi altra operazione booleana, i bigints si comportano come numbers.

Ad esempio, in `if`, bigint `0n` vale `false`, gli altri valori valgono `true`:

```js run
if (0n) {
  // non verrà mai eseguito
}
```

Operatori booleani, come `||`, `&&` e tutti gli altri, funzionano con i bigint in maniera simile ai number:

```js run
alert( 1n || 2 ); // 1 (1n viene considerato true)

alert( 0n || 2 ); // 2 (0n viene considerato false)
```

## Polyfills

Costruire un polyfill per bigints è difficile. Il motivo è che molti operatori JavaScript, come `+`, `-` e cosi via si comportano in maniera differente con i bigint rispetto ai numeri regolari.

Ad esempio, la divisione di bigint ritorna sempre un bigint (arrotondato se necessario).

Per poter emulare questo comportamento, un polyfill deve analizzare il codice e rimpiazzare tutti questi operatori con funzioni proprie. Fare questo può essere complesso e costerebbe molto in termini di performance.

Quindi, non esiste alcun polyfill ottimale.

Anche se, un'alternativa è stata proposta dagli sviluppatori della libreria [JSBI](https://github.com/GoogleChromeLabs/jsbi).

Questa libreria implementa i bigint utilizzando un proprio metodo. Possiamo utilizzare questi invece dei bigint integrati dal linguaggio:

| Operazione | `BigInt` integrati | JSBI |
|-----------|-----------------|------|
| Creazione da Number | `a = BigInt(789)` | `a = JSBI.BigInt(789)` |
| Addizione | `c = a + b` | `c = JSBI.add(a, b)` |
| Sottrazione	| `c = a - b` | `c = JSBI.subtract(a, b)` |
| ... | ... | ... |

...E poi utilizzare il polyfill (Babel plugin) per convertire le invocazioni a JSBI calls ai bigint integrati per i browser che li supportano.

In altre parole, questo approccio suggerisce di scrivere il codice utilizzando JSBI piuttosto dei bigint integrati. JSBI funziona con i numbers proprio come i bigint integrati, emulandoli secondo quanto descritto nelle specifiche, quindi il codice sarà "bigint-ready".

Possiamo utilizzare questo codice JSBI "così com'è" sia per i motori che non supportano i bigint che per quelli che li supportano - il polyfill convertirà le invocazioni in bigint integrati.

## Riferimenti

- [Documentazione MDN sui BigInt](mdn:/JavaScript/Reference/Global_Objects/BigInt).
- [Specifiche](https://tc39.es/ecma262/#sec-bigint-objects).
