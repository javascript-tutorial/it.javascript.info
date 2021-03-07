
# Estendere le classi built-in

Le classi built-in (integrate) come Array, Map e tutte le altre, sono anch'esse estendibili.

Ad esempio, qui vediamo `PowerArray` ereditare dall'`Array` nativo:

```js run
// aggiungiamo un metodo (possiamo fare di più)
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

let filteredArr = arr.filter(item => item >= 10);
alert(filteredArr); // 10, 50
alert(filteredArr.isEmpty()); // false
```

Notiamo una cosa interessante. I metodi built-in come `filter`, `map` e così via, ritornano nuovi oggetti del tipo ereditato, cioè `PowerArray`. La loro implementazione interna utilizzata la proprietà oggetto `constructor` per farlo.

Nell'esempio sopra,
```js
arr.constructor === PowerArray
```

Quando invochiamo `arr.filter()`, questo creerà internamente il nuovo array contenente i risultati utilizzando `arr.constructor`, non l'oggetto `Array` standard. Questo è molto utile, poiché successivamente possiamo utilizzare i metodi di `PowerArray` sul risultato ottenuto.

Inoltre, possiamo personalizzarne il comportamento.

Possiamo aggiungere uno speciale getter statico `Symbol.species` alla classe. Questo dovrebbe ritornare il costruttore che Javascript utilizzerà internamente per creare le nuove entità in  `map`, `filter` e così via.

Se, ad esempio, volessimo che metodi come `map` o `filter` restituiscano un array standard, possiamo ritornare `Array` in `Symbol.species`, come nell'esempio:

```js run
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }

*!*
  // i metodi built-in lo utilizzeranno come costruttore
  static get [Symbol.species]() {
    return Array;
  }
*/!*
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

// filter crea un nuovo array utilizzando arr.constructor[Symbol.species] come costruttore
let filteredArr = arr.filter(item => item >= 10);

*!*
// filteredArr non è di tipo PowerArray, ma è un Array standard
*/!*
alert(filteredArr.isEmpty()); // Error: filteredArr.isEmpty is not a function
```

Come potete osservare, ora `.filter` restituisce un `Array`. Quindi l'estensione delle funzionalità non sarà più disponibile.

```smart header="Le altre collezioni funzionano in maniera simile"
Le altre collezioni, come `Map` e `Set`, funzionano in maniera molto simile. Anche queste utilizzano `Symbol.species`.
```

## Con gli oggetti built-in non si ereditano le proprietà statiche

Gli oggetti built-in possiedono i loro metodi statici, ad esempio `Object.keys`, `Array.isArray` etc.

Come già sappiamo, le classi integrate si estendono a vicenda. Ad esempio, `Array` estende `Object`.

Normalmente, quando una classe ne estende un'altra, sia i metodi statici che quelli non-statici vengono ereditati. Questo è stato ampiamente spiegato nell'articolo [](info:static-properties-methods#statics-and-inheritance).

Ma le classi built-in fanno eccezione. Queste, infatti, non ereditano i membri statici a le une dalle altre.

Ad esempio, sia `Array` che `Date` ereditano da `Object`, quindi le loro istanze possiedono i metodi di `Object.prototype`. Ma `Array.[[Prototype]]` non fa riferimento ad `Object`, quindi, ad esempio, non si ha alcun metodo statico come `Array.keys()` (o `Date.keys()`).

Qui vediamo raffigurata la struttura per `Date` e `Object`:

![](object-date-inheritance.svg)

Questa è un'importante differenza dell'ereditarietà tra gli oggetti integrati, rispetto a quella che otteniamo tramite `extends`.
