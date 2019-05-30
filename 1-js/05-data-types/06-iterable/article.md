
# Iteratori

Gli oggetti *iterabili* sono una generalizzazione degli array. Questo concetto consente a qualsiasi oggetto di essere utilizzato in un ciclo `for..of`.

Ovviamente, gli array sono oggetti iterabili. Ma ci sono molti altri oggetti integrati, che sono altrettanto iterabili. Ad esempio, anche le stringhe sono iterabili. Come vedremo a breve, molti operatori si appoggiano a questo.

Se un oggetto rappresenta una collezione (lista, insieme) di qualcosa, allora `for..of` è un ottimo modo per eseguire un ciclo, quindi ora vedremo come farlo funzionare correttamente.

## Symbol.iterator

Possiamo spiegare semplicemente il funzionamento degli oggetti iterabili costruendone uno nostro.

Ad esempio, abbiamo un oggetto, che non è un array, ma sembra essere adatto ad un `for..of`.

Come un oggetto `range` che rappresenta un intervallo numerico:

```js
let range = {
  from: 1,
  to: 5
};

// We want the for..of to work:
// for(let num of range) ... num=1,2,3,4,5
```

Per rendere iterabile `range` (e poter utilizzare correttamente `for..of`) abbiamo bisogno di aggiunger un metodo chiamato `Symbol.iterator` (uno speciale simbolo integrato).

1. Quando `for..of` inizia, prova a chiamare questo metodo (o ritorna un errore se non lo trova). Il metodo deve ritornare un *iteratore* -- un oggetto con il metodo `next`.
2. La possibilità di avanzare di `for..of` funziona *solamente con l'oggetto ritornato*.
3. Quando `for..of` vuole il prossimo valore, chiama `next()` su quell'oggetto.
4. Il risultato di `next()` deve avere la forma `{done: Boolean, value: any}`, dove `done=true` significa che l'iterazione è completa, altrimenti `value` deve contenere il nuovo valore.

Qui l'implementazione completa per `range`:

```js run
let range = {
  from: 1,
  to: 5
};

// 1. call to for..of initially calls this
range[Symbol.iterator] = function() {

  // ...it returns the iterator object:
  // 2. Onward, for..of works only with this iterator, asking it for next values
  return {
    current: this.from,
    last: this.to,      

    // 3. next() is called on each iteration by the for..of loop
    next() {
      // 4. it should return the value as an object {done:.., value :...}
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    }
  };
};

// now it works!
for (let num of range) {
  alert(num); // 1, then 2, 3, 4, 5
}
```

Da notare la caratteristica fondamentale degli oggetti iterabili: un importante separazione di concetti:

- Il `range` stesso non possiede un metodo `next()`.
- Invece, un altro oggetti, chiamato "iteratore" viene creato dalla chiamata `range[Symbol.iterator]()`, e gestisce l'intera iterazione.

Quindi, l'oggetto iteratore è separato da quello su cui itera.

Tecnicamente, potremmo unirli e utilizzare `range` stesso, per rendere il codice più semplice

Come nel seguente codice:

```js run
let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    this.current = this.from;
    return this;
  },

  next() {
    if (this.current <= this.to) {
      return { done: false, value: this.current++ };
    } else {
      return { done: true };
    }
  }
};

for (let num of range) {
  alert(num); // 1, then 2, 3, 4, 5
}
```

Ora `range[Symbol.iterator]()` ritorna l'oggetto `range` stesso: questo ha necessariamente il metodo `next()` e memorizza il progresso di iterazione in `this.current`. Più corto? Si. E molte volte può andare bene.

<<<<<<< HEAD
Il lato negativo è che ora è impossibile avere due cicli `for..of` che iterano sull'oggetto contemporaneamente: infatti condividerebbero lo stesso stato di iterazione, poiché c'è solo un oggetto iteratore -- l'oggetto stesso. In ogni caso due cicli `for..of` simultanei sono molto rari, realizzabili solo in alcun scenari asincroni.
=======
The downside is that now it's impossible to have two `for..of` loops running over the object simultaneously: they'll share the iteration state, because there's only one iterator -- the object itself. But two parallel for-ofs is a rare thing, even in async scenarios.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

```smart header="Infiniti oggetti iterabili"
Sono possibili anche infiniti oggetti iterabili. Ad esempio, l'oggetto `range` diventa infinito su `range.to = Infinity`. Oppure possiamo creare un oggetto iterabile che generi un infinita sequenza di numeri pseudo-casuali.

Non c'è alcun limite su `next`, può ritornare più e più valori.

Ovviamente, il ciclo `for..of` diventerebbe infinito. Possiamo comunque fermarlo con `break`.
```


## Le stringhe sono iterabili

Gli array e le stringhe sono gli oggetti su cui si utilizzano di più gli iteratori.

Per una stringa, `for..of` cicla sui caratteri:

```js run
for (let char of "test") {
  // triggers 4 times: once for each character
  alert( char ); // t, then e, then s, then t
}
```

E funziona correttamente anche con le coppie surrogate!

```js run
let str = '𝒳😂';
for (let char of str) {
    alert( char ); // 𝒳, and then 😂
}
```

## Chiamare un iteratore esplicitamente

Normalmente, il funzionamento degli iteratori è nascosto al codice esterno. C'è un ciclo `for..of` , che funziona, e questo è tutto ciò che serve sapere.

Ma per capire tutto al meglio vediamo come creare esplicitamente un iteratore.

<<<<<<< HEAD
Proveremo ad iterare su una stringa allo stesso modo di un ciclo `for..of`, ma con una chiamata diretta. Questo codice crea un iteratore per stringhe e lo richiama "manualmente":
=======
We'll iterate over a string in exactlly the same way as `for..of`, but with direct calls. This code creates a string iterator and gets values from it "manually":
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

```js run
let str = "Hello";

// does the same as
// for (let char of str) alert(char);

let iterator = str[Symbol.iterator]();

while (true) {
  let result = iterator.next();
  if (result.done) break;
  alert(result.value); // outputs characters one by one
}
```

Raramente è necessario, ma ci fornisce maggiore controllo sul processo di iterazione rispetto a `for..of`. Ad esempio, possiamo dividere il processo di iterazione: eseguiamo un paio di iterazioni, ci fermiamo, facciamo altro, e riprendiamo l'iterazione.

## Iteratori e simil-array [#array-like]

Ci sono due termini ufficiali che sembrano simili, ma sono diversi. E' utile essere certi di aver ben capito la differenza per evitare confusione.

- Gli *oggetti iterabili* sono oggetti che implementano il metodo `Symbol.iterator`, come descritto sopra.
- *Array-like* (simil-array) sono oggetti che hanno indici e una proprietà `length`, per questo assomigliano ai classici array.

<<<<<<< HEAD
Naturalmente, queste proprietà possono essere combinate. Ad esempio, le stringhe sono sia iterabili (`for..of` funziona), sia array-like (possiedono indici numerici e una proprietà `length`).
=======
When we use JavaScript for practical tasks in browser or other environments, we may meet objects that are iterables or array-likes, or both.

For instance, strings are both iterable (`for..of` works on them) and array-like (they have numeric indexes and `length`).
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

Ma un oggetto iterabile potrebbe non essere array-like. E vice versa un array-like potrebbe non essere un oggetto iterabile.

Ad esempio, l'esempio `range` utilizzato sopra è un oggetto iterabile, ma non array-like, poiché non possiede degli indici e la proprietà `length`.

Qui invece vediamo un esempio di oggetto array-like, ma che non è iterabile:

```js run
let arrayLike = { // has indexes and length => array-like
  0: "Hello",
  1: "World",
  length: 2
};

*!*
// Error (no Symbol.iterator)
for (let item of arrayLike) {}
*/!*
```

<<<<<<< HEAD
Cos'hanno in comune? Entrambi, sia gli array-like che gli oggetti iterabili, solitamente *non sono array*, non hanno metodi come `push`, `pop` etc. Questo potrebbe essere scomodo se lavoriamo con uno di questi oggetti trattandoli come fossero un array.

## Array.from

Esiste un metodo universale [Array.from](mdn:js/Array/from) che può risolvere questo problema. Questo prende un oggetto iterabile o un array-like e ne crea un `Array` "vero e proprio". Possiamo cosi utilizzare i classici metodi per array.
=======
Both iterables and array-likes are usually *not arrays*, they don't have `push`, `pop` etc. That's rather inconvenient if we have such an object and want to work with it as with an array. E.g. we would like to work with `range` using array methods. How to achieve that?

## Array.from

There's a universal method [Array.from](mdn:js/Array/from) that takes an iterable or array-like value and makes a "real" `Array` from it. Then we can call array methods on it.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

Ad esempio:

```js run
let arrayLike = {
  0: "Hello",
  1: "World",
  length: 2
};

*!*
let arr = Array.from(arrayLike); // (*)
*/!*
alert(arr.pop()); // World (method works)
```

`Array.from` alla riga `(*)` prende l'oggetto, esamina se questo è un iterabile o un array-like, successivamente crea un nuova array e copia al suo interno tutti gli elementi.

Si comporta allo stesso modo con un oggetto iterabile:

```js
// assuming that range is taken from the example above
let arr = Array.from(range);
alert(arr); // 1,2,3,4,5 (array toString conversion works)
```

La sintassi completa di `Array.from` consente di fornire una funzione opzionale di "map":
```js
Array.from(obj[, mapFn, thisArg])
```

<<<<<<< HEAD
Il secondo argomento `mapFn` dovrebbe essere la funzione da applicare ad ogni elemento prima di aggiungerlo all'array, mentre `thisArg` ci consente di impostare `this`.
=======
The optional second argument `mapFn` can be a function that will be applied to each element before adding to the array, and `thisArg` allows to set `this` for it.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

Ad esempio:

```js
// assuming that range is taken from the example above

// square each number
let arr = Array.from(range, num => num * num);

alert(arr); // 1,4,9,16,25
```

Qui utilizziamo `Array.from` per convertire una strina in un array di caratteri:

```js run
let str = '𝒳😂';

// splits str into array of characters
let chars = Array.from(str);

alert(chars[0]); // 𝒳
alert(chars[1]); // 😂
alert(chars.length); // 2
```

A differenza di `str.split`, si basa sulla natura (oggetto iterabile) del tipo stringa e quindi, proprio come `for..of`, funziona correttamente con le coppie surrogate.

Tecnicamente qui facciamo la stessa cosa:

```js run
let str = '𝒳😂';

let chars = []; // Array.from internally does the same loop
for (let char of str) {
  chars.push(char);
}

alert(chars);
```

...Ma è più breve.    

Possiamo anche eseguire uno `slice` consapevolmente:

```js run
function slice(str, start, end) {
  return Array.from(str).slice(start, end).join('');
}

let str = '𝒳😂𩷶';

alert( slice(str, 1, 3) ); // 😂𩷶

// native method does not support surrogate pairs
alert( str.slice(1, 3) ); // garbage (two pieces from different surrogate pairs)
```


## Riepilogo

Gli oggetti che possono essere utilizzati in `for..of` vengono detti *iterabili*.

- Tecnicamente, gli oggetti iterabili devono implementare un metodo chiamato `Symbol.iterator`.
    - Il risultato di `obj[Symbol.iterator]` viene chiamato un *iteratore*. Che si occupa di gestire l'intero processo di iterazione.
    - Un iteratore deve avere un metodo denominato `next()` che ritorna un oggetto `{done: Boolean, value: any}`, qui `done:true` indica la fine dell'iterazione, altrimenti `value` contiene il prossimo valore.
- Il metodo `Symbol.iterator` viene invocato automaticamente da `for..of`, ma possiamo anche farlo noi direttamente.
- Gli oggetti iterabili integrati come le stringhe o gli array, implementano `Symbol.iterator`.
- L'iterato che opera con le stringhe è a conoscenza dell'esistenza delle coppie surrogate.


Gli oggetti che hanno indici e la proprietà `length` vengono definity *array-like*. Questo tipo di oggetti possono anche possedere altri metodi e proprietà, ma non possiedono gli stessi metodi integrati dagli array.

Se guardassimo dentro la specifica -- vedremmo che la maggior parte dei metodi integrati assumono di operare con oggetti iterabili o array-like piuttosto che con "veri" array, poiché con questi si riesce ad operare in maniera più astratta.

`Array.from(obj[, mapFn, thisArg])` crea un vero `Array` a partire da un oggetto `obj` iterabile o da un array-like, possiamo cosi applicare i classici metodi dedicati ad array. C'è la possibilità di fornire due argomenti opzionali `mapFn` e `thisArg` che consento di applicare una funzione ad ogni elemento.
