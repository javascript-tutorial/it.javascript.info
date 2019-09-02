La soluzione più semplice potrebbe essere:

```js run
*!*
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
*/!*

let arr = [1, 2, 3];
shuffle(arr);
alert(arr);
```

Questa in qualche modo funziona, perché `Math.random() - 0.5` è un numero casuale che può essere sia positivo che negativo, quindi la funzione riordina gli elementi casualmente.

Con questa funzione di ordinamento, non tutte le permutazioni hanno la stessa probabilità.

Ad esempio, considerando il codice sotto. Esegue `shuffle` 1000000 di volte e conta il numero di occorrenze di tutti i risultati possibili:

```js run
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

// counts of appearances for all possible permutations
let count = {
  '123': 0,
  '132': 0,
  '213': 0,
  '231': 0,
  '321': 0,
  '312': 0
};

for (let i = 0; i < 1000000; i++) {
  let array = [1, 2, 3];
  shuffle(array);
  count[array.join('')]++;
}

// show counts of all possible permutations
for (let key in count) {
  alert(`${key}: ${count[key]}`);
}
```

<<<<<<< HEAD
Un esempio di risultato possibile (per V8, Luglio 2017):
=======
An example result (depends on JS engine):
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

```js
123: 250706
132: 124425
213: 249618
231: 124880
312: 125148
321: 125223
```
Possiamo chiaramente vedere: `123` e `213` appaiono molto più spesso delle altre.

Il risultato del codice potrebbe variare in base al motore JavaScript, ma già possiamo notare che questo tipo di approccio è inaccettabile.

Perché non funziona? Generalmente parlando, `sort` è una "scatola nera": gli passiamo un array ed una funzione di confronto e ci aspettiamo di ottenere l'array ordinato. Ma a causa della difficoltà nell'implementazione della casualità la scatola nera potrebbe funzionare male, quanto male dipende dal motore JavaScript.

Esistono altri modi per compiere questo compito. Ad esempio, c'è un ottimo algoritmo chiamato [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle). L'idea è di attraversare l'array in ordine inverso e di scambiare l'elemento con un altro casuale, che venga prima di lui:

```js
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

    // swap elements array[i] and array[j]
    // we use "destructuring assignment" syntax to achieve that
    // you'll find more details about that syntax in later chapters
    // same can be written as:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }
}
```

Proviamo ad eseguire lo stesso test:

```js run
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// counts of appearances for all possible permutations
let count = {
  '123': 0,
  '132': 0,
  '213': 0,
  '231': 0,
  '321': 0,
  '312': 0
};

for (let i = 0; i < 1000000; i++) {
  let array = [1, 2, 3];
  shuffle(array);
  count[array.join('')]++;
}

// show counts of all possible permutations
for (let key in count) {
  alert(`${key}: ${count[key]}`);
}
```

Un possibile risultato:

```js
123: 166693
132: 166647
213: 166628
231: 167517
312: 166199
321: 166316
```

Ora sembra funzionare: tutte lo occorrenze appaiono con la stessa probabilità.

Inoltre, anche le performance dell'algoritmo Fisher-Yates sono migliori, poichè non è richiesto alcun riordinamento.
