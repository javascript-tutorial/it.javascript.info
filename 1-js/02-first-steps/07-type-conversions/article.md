# Conversione di tipi

<<<<<<< HEAD:1-js/02-first-steps/06-type-conversions/article.md
 Nella maggior parte dei casi, operatori e funzioni convertono automaticamente il valore nel tipo corretto.
=======
Most of the time, operators and functions automatically convert the values given to them to the right type.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187:1-js/02-first-steps/07-type-conversions/article.md

Ad esempio, `alert` converte automaticamente un valore qualsiasi in una stringa, per poterla mostrare. Le operazioni matematica convertono i valori in numeri.

Ci sono anche casi in cui è necessario convertire esplicitamente i valori per poter non provocare errori.

<<<<<<< HEAD:1-js/02-first-steps/06-type-conversions/article.md
```smart header="Non parliamo ancora di oggetti"
In questo capitolo non parleremo ancora di oggetti. Ci dedicheremo ai tipi primitivi. Successivamente, dopo aver capito gli oggetti, capire come funziona la conversione di oggetti, nel capitolo <info:object-toprimitive>.
=======
```smart header="Not talking about objects yet"
In this chapter, we won't cover objects. For now we'll just be talking about primitives.

Later, after we learn about objects, in the chapter <info:object-toprimitive> we'll see how objects fit in.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187:1-js/02-first-steps/07-type-conversions/article.md
```

## String Conversion

La conversione in stringa è utile quando abbiamo bisogno del formato stringa di un valore.

Ad esempio, `alert(value)` effettua questa conversione per mostrare il valore.

Possiamo anche utilizzare la funzione `String(value)`, per ottenere un risultato simile:

```js run
let value = true;
alert(typeof value); // boolean

*!*
value = String(value); // ora value è una stringa contenente "true"
alert(typeof value); // string
*/!*
```

La conversione in stringa è quella più ovvia. Il valore `false` diventa la stringa `"false"`, mentre `null` diventa `"null"` etc.

## Numeric Conversion

La conversione numerica viene applicata automaticamente nelle funzioni ed espressioni matematiche.

Ad esempio, quando la divisione `/` viene applicata ad un tipo non numerico:

```js run
alert( "6" / "2" ); // 3, strings are converted to numbers
```
funzine
Possiamo utilizzare la funzione `Number(value)` per convertire esplicitamente un valore `value`:

```js run
let str = "123";
alert(typeof str); // string

let num = Number(str); // diventa il numero 123

alert(typeof num); // number
```

Una conversione esplicita è solitamente richiesta quando leggiamo un valore da una risorsa di tipo stringa, come un form testuale, ma ci aspettiamo l'inserimento di un numero.

Se la stringa non risulta essere un numero valido, il risultato della conversione sarà `NaN`, ad esempio:

```js run
let age = Number("an arbitrary string instead of a number");

alert(age); // NaN, conversione fallita
```

Le regole di conversione numerica:

| Valore |  Diventa... |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
|<code>true&nbsp;e&nbsp;false</code> | `1` e `0` |
| `string` | Gli spazi bianchi dall'inizio e dalla fine vengono rimossi. Poi, se il resto della stringa è vuota, il risultato è `0`. Altrimenti, il numero viene "letto" dalla stringa. Un errore restituirà `NaN`. |

Esempi:

```js run
alert( Number("   123   ") ); // 123
alert( Number("123z") );      // NaN (errore nella lettura del numero "z")
alert( Number(true) );        // 1
alert( Number(false) );       // 0
```

Nota che `null` e `undefined` si comportano diversamente: `null` diventa zero, mentre `undefined` diventa `NaN`.

<<<<<<< HEAD:1-js/02-first-steps/06-type-conversions/article.md
````smart header="L'addizione '+' concatena le stringhe"
Quasi tutte le operazioni matematiche convertono valori in numeri. Con un importante eccezione per l'addizione `+`. Se uno degli operandi è una stringa, allora anche gli altri vengono convertiti in stringhe.

E successivamente li concatena (unisce):

```js run
alert( 1 + '2' ); // '12' (string to the right)
alert( '1' + 2 ); // '12' (string to the left)
```

Questo accade solo quando almeno uno degli argomenti è di tipo stringa. Altrimenti, i valori vengono convertiti in numeri
````
=======
Most mathematical operators also perform such conversion, we'll see that in the next chapter.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187:1-js/02-first-steps/07-type-conversions/article.md

## Boolean Conversion

La conversione booleana è quella più semplice.

Questa si verifica con le operazioni logiche (più avanti incontreremo i testi di condizione ed altri tipi di operazione logiche), ma può anche essere richiamato manualmente con la funzione `Boolean(value)`.

Le regole di conversione:

- I valori che sono intuitivamente "vuoti", come lo `0`, una stringa vuota, `null`, `undefined` e `NaN` diventano `false`.
- Gli altri valori diventano `true`.

Ad esempio:

```js run
alert( Boolean(1) ); // true
alert( Boolean(0) ); // false

alert( Boolean("hello") ); // true
alert( Boolean("") ); // false
```

````warn header="Da notare: una stringa contenente `\"0\"` viene valutata come `true`"
Alcun linguaggi (come il PHP) trattano `"0"` come `false`. Diversamente in JavaScript una stringa non vuota è sempre `true`.

```js run
alert( Boolean("0") ); // true
alert( Boolean(" ") ); // spazi, valgono true (qualsiasi stringa non buota viene interpretata come true)
```
````

<<<<<<< HEAD:1-js/02-first-steps/06-type-conversions/article.md

## Riepilogo
=======
## Summary
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187:1-js/02-first-steps/07-type-conversions/article.md

I tre tipi di conversioni più utilizzati sono: a *string*, a *number* e a *boolean*.

<<<<<<< HEAD:1-js/02-first-steps/06-type-conversions/article.md
**`ToString`** -- Avviene quando stampiamo qualcosa a schermo, può essere richiamato con `String(value)`. La conversione a stringa è solitamente ovvia per i valore primitivi.

**`ToNumber`** -- Utilizzata nelle operazioni matematiche, può essere richiamata esplicitamente con `Number(value)`.
=======
**`String Conversion`** -- Occurs when we output something. Can be performed with `String(value)`. The conversion to string is usually obvious for primitive values.

**`Numeric Conversion`** -- Occurs in math operations. Can be performed with `Number(value)`.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187:1-js/02-first-steps/07-type-conversions/article.md

La conversione segue le seguenti regole:

| Value |  Becomes... |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
|<code>true&nbsp;/&nbsp;false</code> | `1 / 0` |
| `string` | La stringa viene letta per "com'è", gli spazi bianchi agli estremi vengono ignorati. Una stringa vuota diventa `0`. Un errore restituisce `NaN`. |

<<<<<<< HEAD:1-js/02-first-steps/06-type-conversions/article.md
**`ToBoolean`** -- Avviene nelle operazioni logiche, può anche essere richiamato esplicitamente con `Boolean(value)`.
=======
**`Boolean Conversion`** -- Occurs in logical operations. Can be performed with `Boolean(value)`.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187:1-js/02-first-steps/07-type-conversions/article.md

Segue le regole:

| Value |  Becomes... |
|-------|-------------|
|`0`, `null`, `undefined`, `NaN`, `""` |`false`|
|qualsiasi altro valore| `true` |


La maggior parte di queste regole sono facili da capire e memorizzare. Gli errori più comuni che commettono le persone sono:

- `undefined` vale `NaN` come un numero, non `0`.
- `"0"` e le stringhe che contengono solamente spazi `"   "` vengono interpretate come true.

Qui non abbiamo coperto gli oggetti, ci ritorneremo più avanti nel capitolo <info:object-toprimitive> che è dedicato esclusivamente agli oggetti, dopo che avremmo imparato più cose basilari su JavaScript.
