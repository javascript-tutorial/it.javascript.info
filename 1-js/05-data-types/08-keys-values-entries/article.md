
# Object.keys, values, entries

<<<<<<< HEAD
Facciamo un passo oltre le strutture dati in sé e discutiamo dei metodi di iterazione su di esse. 
=======
Let's step away from the individual data structures and talk about the iterations over them.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

Nel capitolo precedente abbiamo visto i metodi `map.keys()`, `map.values()`, `map.entries()`.

<<<<<<< HEAD
Questi sono dei metodi generici, c'è un comune accordo sul loro utilizzo per le strutture dati. Se dovessimo mai creare una nostra struttura dati personale, dovremmo implementare anche questi metodi. 
=======
These methods are generic, there is a common agreement to use them for data structures. If we ever create a data structure of our own, we should implement them too.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

Vengono supportati da:

- `Map`
- `Set`
- `Array` (ad eccezione `arr.values()`)

Anche gli oggetti supportano dei metodi simili, ma la loro sintassi è leggermente differente.

## Object.keys, values, entries

Per i semplici oggetti, sono resi disponibile i seguenti metodi:

- [Object.keys(obj)](mdn:js/Object/keys) -- ritorna un array di chiavi.
- [Object.values(obj)](mdn:js/Object/values) -- ritorna un array di valori.
- [Object.entries(obj)](mdn:js/Object/entries) -- ritorna un array di coppie `[key, value]`.

...Da notare le differenze (confrontandoli con quelli delle map):

|             | Map              | Object       |
|-------------|------------------|--------------|
| Chiamata | `map.keys()`  | `Object.keys(obj)`, non `obj.keys()` |
| Valore di ritorno     | oggetti iterabile    | Array                     |

La prima differenza è che dobbiamo chiamare `Object.keys(obj)`, non `obj.keys()`.

Perché? La principale motivazione è la flessibilità. Ricordate, gli oggetti sono la base di tutte le strutture complesse in JavaScript. Quindi potremmo avere un nostro oggetto come `order` che implementa il proprio metodo `order.values()`. E potremmo ancora chiamare `Object.values(order)`.

La seconda differenza è che i metodi `Object.*` ritornano un array, non un oggetto iterabile. Questo è comportamento è dovuto a ragioni storiche.

Ad esempio:

```js
let user = {
  name: "John",
  age: 30
};
```

- `Object.keys(user) = ["name", "age"]`
- `Object.values(user) = ["John", 30]`
- `Object.entries(user) = [ ["name","John"], ["age",30] ]`

Qui un esempio di utilizzo di `Object.values` per eseguire cicli sui valori delle proprietà:

```js run
let user = {
  name: "John",
  age: 30
};

// ciclo sui valori
for (let value of Object.values(user)) {
  alert(value); // John, poi 30
}
```

<<<<<<< HEAD
## Object.keys/values/entries ignorano proprietà di tipo symbol

Proprio come per il ciclo `for..in`, questi metodi ignorano le proprietà che utilizzano una chiave `Symbol(...)`.

Solitamente questo è un vantaggio. Ma se volessimo ottenere anche le chiavi di tipo symbol, esiste un secondo metodo [Object.getOwnPropertySymbols](mdn:js/Object/getOwnPropertySymbols)  che ritorna un array di chiavi di tipo symbol. Invece, il metodo [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) ritorna *tutte* le chiavi.
=======
```warn header="Object.keys/values/entries ignore symbolic properties"
Just like a `for..in` loop, these methods ignore properties that use `Symbol(...)` as keys.

Usually that's convenient. But if we want symbolic keys too, then there's a separate method [Object.getOwnPropertySymbols](mdn:js/Object/getOwnPropertySymbols) that returns an array of only symbolic keys. Also, there exist a method [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) that returns *all* keys.
```

## Object.fromEntries to transform objects

Sometimes we need to perform a transformation of an object to `Map` and back.

We already have `new Map(Object.entries(obj))` to make a `Map` from `obj`.

The syntax of `Object.fromEntries` does the reverse. Given an array of `[key, value]` pairs, it creates an object:

```js run
let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4]
]);

// now prices = { banana: 1, orange: 2, meat: 4 }

alert(prices.orange); // 2
```

Let's see practical applications.

For example, we'd like to create a new object with double prices from the existing one.

For arrays, we have `.map` method that allows to transform an array, but nothing like that for objects.

So we can use a loop:

```js run
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

let doublePrices = {};
for(let [product, price] of Object.entries(prices)) {
  doublePrices[product] = price * 2;
}

alert(doublePrices.meat); // 8
```

...Or we can represent the object as an `Array` using `Object.entries`, then perform the operations with `map` (and potentially other array methods), and then go back using `Object.fromEntries`.

Let's do it for our object:

```js run
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

*!*
let doublePrices = Object.fromEntries(
  // convert to array, map, and then fromEntries gives back the object
  Object.entries(prices).map(([key, value]) => [key, value * 2])
);
*/!*

alert(doublePrices.meat); // 8
```   

It may look difficult from the first sight, but becomes easy to understand after you use it once or twice.

We also can use `fromEntries` to get an object from `Map`.

E.g. we have a `Map` of prices, but we need to pass it to a 3rd-party code that expects an object.

Here we go:

```js run
let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

let obj = Object.fromEntries(map);

// now obj = { banana: 1, orange: 2, meat: 4 }

alert(obj.orange); // 2
```
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd
