
# Object.keys, values, entries

Facciamo un passo oltre le strutture dati in sé e discutiamo dei metodi di iterazione su di esse. 

Nel capitolo precedente abbiamo visto i metodi `map.keys()`, `map.values()`, `map.entries()`.

Questi sono dei metodi generici, c'è un comune accordo sul loro utilizzo per le strutture dati. Se dovessimo mai creare una nostra struttura dati personale, dovremmo implementare anche questi metodi. 

Vengono supportati da:

- `Map`
- `Set`
<<<<<<< HEAD
- `Array` (ad eccezione `arr.values()`)
=======
- `Array`
>>>>>>> 79417c6e73645d37f184f0cc7e4bc3353e85224f

Anche gli oggetti supportano dei metodi simili, ma la loro sintassi è leggermente differente.

## Object.keys, values, entries

Per i semplici oggetti, sono resi disponibile i seguenti metodi:

- [Object.keys(obj)](mdn:js/Object/keys) -- ritorna un array di chiavi.
- [Object.values(obj)](mdn:js/Object/values) -- ritorna un array di valori.
- [Object.entries(obj)](mdn:js/Object/entries) -- ritorna un array di coppie `[key, value]`.

Da notare le differenze (confrontandoli con quelli delle map):

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

```warn header="Object.keys/values/entries ingorano le proprietà di tipo symbol"
Proprio come nel caso del ciclo `for..in`, questi metodi ignorano le proprietà che utilizzano `Symbol(...)` come chiave.

Solitamente questo è un vantaggio. Ma se volessimo ottenere anche le chiavi di tipo symbol, esiste un secondo metodo [Object.getOwnPropertySymbols](mdn:js/Object/getOwnPropertySymbols)  che ritorna un array di chiavi di tipo symbol. Invece, il metodo [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) ritorna *tutte* le chiavi.
```


## Transforming objects

Per gli oggetti mancano molti metodi che sono invece presenti per gli array, ad esempio `map`, `filter` e molti altri.

Se volessimo comunque applicarli, allora possiamo utilizzare `Object.entries` seguito da `Object.fromEntries`:

1. Applichiamo `Object.entries(obj)` per ottenere un array di coppie chiave/valore da `obj`.
2. Applichiamo il metodo, esempio `map`.
3. Applichiamo `Object.fromEntries(array)` all'array risultante per ottenere nuovamente un oggetto.

Ad esempio, se abbiamo un oggetto di prezzi che vogliamo raddoppiare:

```js run
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

*!*
let doublePrices = Object.fromEntries(
  // converte ad array, map, e successivamente fromEntries ci ritorna l'oggetto
  Object.entries(prices).map(([key, value]) => [key, value * 2])
);
*/!*

alert(doublePrices.meat); // 8
```   

<<<<<<< HEAD
Ad un primo sguardo potrebbere risultare complesso, ma diventa molto più familiare dopo un paio di utilizzi.

=======
It may look difficult from the first sight, but becomes easy to understand after you use it once or twice. We can make powerful chains of transforms this way. 
>>>>>>> 79417c6e73645d37f184f0cc7e4bc3353e85224f
