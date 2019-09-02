
# Iteratori

Gli oggetti *iterabili* sono una generalizzazione degli array. Questo concetto consente a qualsiasi oggetto di essere utilizzato in un ciclo `for..of`.

<<<<<<< HEAD
Ovviamente, gli array sono oggetti iterabili. Ma ci sono molti altri oggetti integrati, che sono altrettanto iterabili. Ad esempio, anche le stringhe sono iterabili. Come vedremo a breve, molti operatori si appoggiano a questo.
=======
Of course, Arrays are iterable. But there are many other built-in objects, that are iterable as well. For instance, strings are also iterable.

If an object isn't technically an array, but represents a collection (list, set) of something, then `for..of` is a great syntax to loop over it, so let's see how to make it work.
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

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

// Vorremmo che il for..of funzioni:
// for(let num of range) ... num=1,2,3,4,5
```

Per rendere iterabile `range` (e poter utilizzare correttamente `for..of`) abbiamo bisogno di aggiunger un metodo chiamato `Symbol.iterator` (uno speciale simbolo integrato).

<<<<<<< HEAD
1. Quando `for..of` inizia, prova a chiamare questo metodo (o ritorna un errore se non lo trova). Il metodo deve ritornare un *iteratore* -- un oggetto con il metodo `next`.
2. La possibilità di avanzare di `for..of` funziona *solamente con l'oggetto ritornato*.
3. Quando `for..of` vuole il prossimo valore, chiama `next()` su quell'oggetto.
4. Il risultato di `next()` deve avere la forma `{done: Boolean, value: any}`, dove `done=true` significa che l'iterazione è completa, altrimenti `value` deve contenere il nuovo valore.

Qui l'implementazione completa per `range`:
=======
1. When `for..of` starts, it calls that method once (or errors if not found). The method must return an *iterator* -- an object with the method `next`.
2. Onward, `for..of` works *only with that returned object*.
3. When `for..of` wants the next value, it calls `next()` on that object.
4. The result of `next()` must have the form `{done: Boolean, value: any}`, where `done=true`  means that the iteration is finished, otherwise `value` is the next value.

Here's the full implementation for `range` with remarks:
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

```js run
let range = {
  from: 1,
  to: 5
};

// 1. la chiamata a for..of inizialmente chiama questo
range[Symbol.iterator] = function() {

  // ...ritorna l'oggetto iteratore:
  // 2. Da qui in poi, for..of lavora solamente con questo iteratore, richiedendogli il prossimo valore
  return {
    current: this.from,
    last: this.to,      

    // 3. next() viene invocato ad ogni iterazione del ciclo for..ot
    next() {
      // 4. dovrebbe ritornare il valore sotto forma di oggetto {done:.., value :...}
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    }
  };
};

// ora funziona !
for (let num of range) {
  alert(num); // 1, poi 2, 3, 4, 5
}
```

<<<<<<< HEAD
Da notare la caratteristica fondamentale degli oggetti iterabili: un importante separazione di concetti:

- Il `range` stesso non possiede un metodo `next()`.
- Invece, un altro oggetti, chiamato "iteratore" viene creato dalla chiamata `range[Symbol.iterator]()`, e gestisce l'intera iterazione.
=======
Please note the core feature of iterables: separation of concerns.

- The `range` itself does not have the `next()` method.
- Instead, another object, a so-called "iterator" is created by the call to `range[Symbol.iterator]()`, and its `next()` generates values for the iteration.
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

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
  alert(num); // 1, poi 2, 3, 4, 5
}
```

Ora `range[Symbol.iterator]()` ritorna l'oggetto `range` stesso: questo ha necessariamente il metodo `next()` e memorizza il progresso di iterazione in `this.current`. Più corto? Si. E molte volte può andare bene.

Il lato negativo è che ora è impossibile avere due cicli `for..of` che iterano sull'oggetto contemporaneamente: infatti condividerebbero lo stesso stato di iterazione, poiché c'è solo un oggetto iteratore -- l'oggetto stesso. In ogni caso due cicli `for..of` simultanei sono molto rari, realizzabili solo in alcun scenari asincroni.

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
  // attivato 4 volte: una volta per ogni carattere
  alert( char ); // t, poi e, poi s, poi t
}
```

E funziona correttamente anche con le coppie surrogate!

```js run
let str = '𝒳😂';
for (let char of str) {
    alert( char ); // 𝒳, e poi 😂
}
```

## Chiamare un iteratore esplicitamente

<<<<<<< HEAD
Normalmente, il funzionamento degli iteratori è nascosto al codice esterno. C'è un ciclo `for..of` , che funziona, e questo è tutto ciò che serve sapere.

Ma per capire tutto al meglio vediamo come creare esplicitamente un iteratore.
=======
For deeper understanding let's see how to use an iterator explicitly.
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

Proveremo ad iterare su una stringa allo stesso modo di un ciclo `for..of`, ma con una chiamata diretta. Questo codice crea un iteratore per stringhe e lo richiama "manualmente":

```js run
let str = "Hello";

// fa la stessa cosa di
// for (let char of str) alert(char);

let iterator = str[Symbol.iterator]();

while (true) {
  let result = iterator.next();
  if (result.done) break;
  alert(result.value); // stampa i caratteri uno ad uno
}
```

Raramente è necessario, ma ci fornisce maggiore controllo sul processo di iterazione rispetto a `for..of`. Ad esempio, possiamo dividere il processo di iterazione: eseguiamo un paio di iterazioni, ci fermiamo, facciamo altro, e riprendiamo l'iterazione.

## Iteratori e simil-array [#array-like]

Ci sono due termini ufficiali che sembrano simili, ma sono diversi. E' utile essere certi di aver ben capito la differenza per evitare confusione.

- Gli *oggetti iterabili* sono oggetti che implementano il metodo `Symbol.iterator`, come descritto sopra.
- *Array-like* (simil-array) sono oggetti che hanno indici e una proprietà `length`, per questo assomigliano ai classici array.

Naturalmente, queste proprietà possono essere combinate. Ad esempio, le stringhe sono sia iterabili (`for..of` funziona), sia array-like (possiedono indici numerici e una proprietà `length`).

Ma un oggetto iterabile potrebbe non essere array-like. E vice versa un array-like potrebbe non essere un oggetto iterabile.

Ad esempio, l'esempio `range` utilizzato sopra è un oggetto iterabile, ma non array-like, poiché non possiede degli indici e la proprietà `length`.

Qui invece vediamo un esempio di oggetto array-like, ma che non è iterabile:

```js run
let arrayLike = { // possiede indici e lenght => array-like
  0: "Hello",
  1: "World",
  length: 2
};

*!*
// Errore (Symbol.iterator non trovato)
for (let item of arrayLike) {}
*/!*
```

Cos'hanno in comune? Entrambi, sia gli array-like che gli oggetti iterabili, solitamente *non sono array*, non hanno metodi come `push`, `pop` etc. Questo potrebbe essere scomodo se lavoriamo con uno di questi oggetti trattandoli come fossero un array.

## Array.from

Esiste un metodo universale [Array.from](mdn:js/Array/from) che può risolvere questo problema. Questo prende un oggetto iterabile o un array-like e ne crea un `Array` "vero e proprio". Possiamo cosi utilizzare i classici metodi per array.

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
alert(arr.pop()); // World (il metodo funziona)
```

`Array.from` alla riga `(*)` prende l'oggetto, esamina se questo è un iterabile o un array-like, successivamente crea un nuova array e copia al suo interno tutti gli elementi.

Si comporta allo stesso modo con un oggetto iterabile:

```js
// assumiamo che il range venga preso dall'esempio sopra
let arr = Array.from(range);
alert(arr); // 1,2,3,4,5 (la conversione array toString funziona)
```

La sintassi completa di `Array.from` consente di fornire una funzione opzionale di "map":
```js
Array.from(obj[, mapFn, thisArg])
```

Il secondo argomento `mapFn` dovrebbe essere la funzione da applicare ad ogni elemento prima di aggiungerlo all'array, mentre `thisArg` ci consente di impostare `this`.

Ad esempio:

```js
// assumiamo che il range venga preso dall'esempio sopra

// quadrato di ogni numero
let arr = Array.from(range, num => num * num);

alert(arr); // 1,4,9,16,25
```

Qui utilizziamo `Array.from` per convertire una strina in un array di caratteri:

```js run
let str = '𝒳😂';

// spezza str in un array di caratteri
let chars = Array.from(str);

alert(chars[0]); // 𝒳
alert(chars[1]); // 😂
alert(chars.length); // 2
```

A differenza di `str.split`, si basa sulla natura (oggetto iterabile) del tipo stringa e quindi, proprio come `for..of`, funziona correttamente con le coppie surrogate.

Tecnicamente qui facciamo la stessa cosa:

```js run
let str = '𝒳😂';

let chars = []; // Array.from internamente esegue lo stesso ciclo
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

<<<<<<< HEAD
// il metodo nativo non supporta le coppie surrogate
alert( str.slice(1, 3) ); // spazzatura (due pezzi da coppie surrogate differenti)
=======
// the native method does not support surrogate pairs
alert( str.slice(1, 3) ); // garbage (two pieces from different surrogate pairs)
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927
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
