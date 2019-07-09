
# Object.keys, values, entries

Facciamo un passo oltre le strutture dati in sé e discutiamo dei metodi di iterazione su di esse. 

Nel capitolo precedente abbiamo visto i metodi `map.keys()`, `map.values()`, `map.entries()`.

Questi sono dei metodi generici, c'è un comune accordo sul loro utilizzo per le strutture dati. Se dovessimo mai creare una nostra struttura dati personale, dovremmo implementare anche questi metodi. 

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

```warn header="Object.keys/values/entries ingorano le proprietà di tipo symbol"
Proprio come nel caso del ciclo `for..in`, questi metodi ignorano le proprietà che utilizzano `Symbol(...)` come chiave.

Solitamente questo è un vantaggio. Ma se volessimo ottenere anche le chiavi di tipo symbol, esiste un secondo metodo [Object.getOwnPropertySymbols](mdn:js/Object/getOwnPropertySymbols)  che ritorna un array di chiavi di tipo symbol. Invece, il metodo [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) ritorna *tutte* le chiavi.
```

## Object.fromEntries per trasformare gli oggetti

Talvolta abbiamo necesssità di trasformare un oggetto in `Map` e viceversa.

Abbiamo a disposizione `new Map(Object.entries(obj))` per ottenere una `Map` a partire da `obj`.

Il metodo `Object.fromEntries` fa esattamente l'operazione contraria. Fornito un array di coppie `[key, value]`, l'invocazione a questo metodo restituirà un oggetto:

```js run
let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4]
]);

// ora prices = { banana: 1, orange: 2, meat: 4 }

alert(prices.orange); // 2
```

Proviamo a vedere un esempio pratico.

Ad esempio, potremmo vole creare un nuovo oggetto con i prezzi raddoppiati a partire da uno già esistente.

Con gli array possiamo utilizzare `.map` che consente di trasformare un array, ma non abbiamo nulla di simile per gli oggetti.

Possiamo quindi utilizzare un ciclo:

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

...Oppure possiamo rappresentare l'oggetto come un `Array` utilizzando `Object.entries`, e successivamente applicare la funzione `map` (e potenzialmente qualsiasi altro metodo disponibile per gli array), e successivamente tornare ad un oggetto con `Object.fromEntries`.

Proviamo ad applicare quanto detto:

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

Ad un primo sguardo potrebbere risultare complesso, ma diventa molto più familiare dopo un paio di utilizzi.

Possiamo anche utilizzare `fromEntries` per ottenere un oggetto a partire da una `Map`.

Ad esempio, potremmo avere una `Map` di prezzi, e abbiamo bisogno di fornirla ad un codice esterno che si aspetta un oggetto.

Quello che potremmo fare:

```js run
let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

let obj = Object.fromEntries(map);

// ora obj = { banana: 1, orange: 2, meat: 4 }

alert(obj.orange); // 2
```
