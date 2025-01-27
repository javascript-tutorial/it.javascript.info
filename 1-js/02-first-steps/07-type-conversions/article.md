# Conversione di tipi

Nella maggior parte dei casi, operatori e funzioni convertono automaticamente il valore nel tipo corretto.

Ad esempio, `alert` converte automaticamente un valore qualsiasi in una stringa, per poterla mostrare. Le operazioni matematiche convertono i valori in numeri.

Ci sono invece casi in cui è necessario convertire esplicitamente i valori per poter evitare errori.

<<<<<<< HEAD
```smart header="Non parliamo ancora di oggetti"
In questo capitolo non parleremo ancora di oggetti ma ci dedicheremo ai tipi primitivi. Approfondiremo gli oggetti e la loro conversione dopo averli studiati, nel capitolo <info:object-toprimitive>.
=======
```smart header="Not talking about objects yet"
In this chapter, we won't cover objects. For now, we'll just be talking about primitives.

Later, after we learn about objects, in the chapter <info:object-toprimitive> we'll see how objects fit in.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

## Conversione di stringhe

La conversione a `String` è utile quando abbiamo bisogno del formato stringa di un valore.

Ad esempio, `alert(value)` effettua questa conversione per mostrare il valore.

Possiamo anche utilizzare la funzione `String(value)`, per ottenere lo stesso risultato:

```js run
let value = true;
alert(typeof value); // boolean

*!*
value = String(value); // ora value è una stringa contenente "true"
alert(typeof value); // string
*/!*
```

La conversione in stringa è quella più semplice. Il valore `false` diventa la stringa `"false"`, mentre `null` diventa `"null"` etc.

## Conversione numerica

<<<<<<< HEAD
La conversione a `Number` viene applicata automaticamente nelle funzioni ed espressioni matematiche.
=======
Numeric conversion in mathematical functions and expressions happens automatically.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ad esempio, quando la divisione `/` viene applicata ad un tipo non numerico:

```js run
alert( "6" / "2" ); // 3, le stringhe sono state converite a numeri
```

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
<<<<<<< HEAD
|<code>true&nbsp;e&nbsp;false</code> | `1` e `0` |
| `string` | Gli spazi bianchi all'inizio e alla fine vengono rimossi. Se la stringa rimanente è vuota, il risultato sarà `0`. Altrimenti, il numero viene "letto" dalla stringa. Un errore restituirà `NaN`. |
=======
|<code>true&nbsp;and&nbsp;false</code> | `1` and `0` |
| `string` | Whitespaces (includes spaces, tabs `\t`, newlines `\n` etc.) from the start and end are removed. If the remaining string is empty, the result is `0`. Otherwise, the number is "read" from the string. An error gives `NaN`. |
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Esempi:

```js run
alert( Number("   123   ") ); // 123
alert( Number("123z") );      // NaN (errore nella lettura del numero "z")
alert( Number(true) );        // 1
alert( Number(false) );       // 0
```

Nota che `null` e `undefined` si comportano diversamente: `null` diventa zero, mentre `undefined` diventa `NaN`.

````smart header="L'addizione '+' concatena le stringhe"
Quasi tutte le operazioni matematiche convertono valori in numeri. Con un importante eccezione per l'addizione `+`. Se uno degli operandi è una stringa, allora anche gli altri vengono convertiti in stringhe.

E successivamente li concatena (unisce):

```js run
alert( 1 + '2' ); // '12' (stringa a destra)
alert( '1' + 2 ); // '12' (stringa a sinistra)
```

Questo accade solo quando almeno uno degli argomenti è di tipo stringa. Altrimenti, i valori vengono convertiti in numeri
````

## Boolean Conversion

La conversione a `Boolean` è quella più semplice.

Questa si verifica con le operazioni logiche (più avanti incontreremo i test di condizione ed altri tipi di operazione logiche), ma può anche essere richiamato manualmente con la funzione `Boolean(value)`.

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
alert( Boolean(" ") ); // spazi vuoti, valgono true (qualsiasi stringa non vuota viene interpretata come true)
```
````


## Riepilogo

I tre tipi di conversioni più utilizzati sono: a *string*, a *number* e a *boolean*.

**`Conversione a striga`** -- Avviene quando stampiamo qualcosa a schermo, può essere richiamato con `String(value)`. La conversione a stringa è solitamente ovvia per i valore primitivi.

**`Conversione numerica`** -- Utilizzata nelle operazioni matematiche, può essere richiamata esplicitamente con `Number(value)`.

La conversione segue le seguenti regole:

| Value |  Becomes... |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
|<code>true&nbsp;/&nbsp;false</code> | `1 / 0` |
<<<<<<< HEAD
| `string` | La stringa viene letta per "com'è", gli spazi bianchi agli estremi vengono ignorati. Una stringa vuota diventa `0`. Un errore restituisce `NaN`. |
=======
| `string` | The string is read "as is", whitespaces (includes spaces, tabs `\t`, newlines `\n` etc.) from both sides are ignored. An empty string becomes `0`. An error gives `NaN`. |
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

**`Conversione booleana`** -- Avviene nelle operazioni logiche, può anche essere richiamato esplicitamente con `Boolean(value)`.

Segue le regole:

| Value |  Becomes... |
|-------|-------------|
|`0`, `null`, `undefined`, `NaN`, `""` |`false`|
|qualsiasi altro valore| `true` |


La maggior parte di queste regole sono facili da capire e memorizzare. Gli errori più comuni che commettono le persone sono:

- `undefined` convertito a `Number` vale `NaN`, non `0`.
- `"0"` e le stringhe che contengono solamente spazi `"   "` vengono interpretate come true.

Qui non abbiamo coperto gli oggetti, ci ritorneremo più avanti nel capitolo <info:object-toprimitive> che è dedicato esclusivamente agli oggetti, dopo che avremmo imparato più cose basilari su JavaScript.
