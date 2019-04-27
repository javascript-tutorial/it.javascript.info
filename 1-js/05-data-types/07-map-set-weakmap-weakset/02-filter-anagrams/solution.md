Per trovare tutti gli anagrammi, dividiamo ogni parola in lettere ed ordiniamole. Con le lettere ordinate, tutti gli anagrammi sono uguali.

Ad esempio:

```
nap, pan -> anp
ear, era, are -> aer
cheaters, hectares, teachers -> aceehrst
...
```

Utilizzeremo la variante con le lettere ordite come chiave di una map per memorizzare un solo valore:

```js run
function aclean(arr) {
  let map = new Map();

  for (let word of arr) {
    // split the word by letters, sort them and join back
*!*
    let sorted = word.toLowerCase().split('').sort().join(''); // (*)
*/!*
    map.set(sorted, word);
  }

  return Array.from(map.values());
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) );
```

L'ordinamento delle lettere è fatto dalla concatenazione di chiamate alla riga `(*)`.

Per convenzione le dividiamo in più linee:

```js
let sorted = arr[i] // PAN
  .toLowerCase() // pan
  .split('') // ['p','a','n']
  .sort() // ['a','n','p']
  .join(''); // anp
```

Due parole diverse `'PAN'` e `'nap'` possiedono la stessa forma in lettere ordinate `'anp'`.

La prossima lettera inserirà la parola nella map:

```js
map.set(sorted, word);
```

Se abbiamo già incontrato una parola con la stessa forma, la sovrascriviamo con quella nuova, in modo tale da avere sempre una sola occorrenza all'interno della map. 

Alla fine `Array.from(map.values())` prende un iteratore sui valori di map (non abbiamo bisogno delle chiavi nel risultato) e ne ritorna un array.

Qui potremmo anche utilizzare un normale oggetto piuttosto di `Map`, poiché le chiavi sono stringhe.

Questo è un esempio di possibile soluzione:

```js run demo
function aclean(arr) {
  let obj = {};

  for (let i = 0; i < arr.length; i++) {
    let sorted = arr[i].toLowerCase().split("").sort().join("");
    obj[sorted] = arr[i];
  }

  return Object.values(obj);
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) );
```
