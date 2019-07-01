# Assegnamento di destrutturazione

Le due strutture dati più utilizzate in JavaScritp sono `Object` e `Array`.

<<<<<<< HEAD
Gli oggetti ci consentono di raccogliere molti pezzi di informazione in una singola entità, mentre gli array ci consentono di memorizzare collezioni ordinate. Possiamo quindi costruire un oggetto o un array e gestirlo come singola entità, oppure passarlo ad una funzione.

*L'assegnamento di destrutturazione* è una speciale sintassi che ci consente di "spacchettare" oggetti o array in un insieme di variabili, che in molti casi possono risultare più comode. 
La destrutturazione inoltre funziona molto bene con le funzione complesse che richiedono molti parametri, valori di default, molto presto vedremo come gestire anche questi.
=======
Objects allow us to create a single entity that stores data items by key, and arrays allow us to gather data items into an ordered collection.

But when we pass those to a function, it may need not an object/array as a whole, but rather individual pieces.

*Destructuring assignment* is a special syntax that allows us to "unpack" arrays or objects into a bunch of variables, as sometimes that's more convenient. Destructuring also works great with complex functions that have a lot of parameters, default values, and so on.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

## Destrutturazione di un array

Un esempio di come un array viene destrutturato in variabili:

```js
// abbiamo un array con nome e cognome
let arr = ["Ilya", "Kantor"]

*!*
<<<<<<< HEAD
// assegnamento di destrutturazione
=======
// destructuring assignment
// sets firstName = arr[0]
// and surname = arr[1]
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd
let [firstName, surname] = arr;
*/!*

alert(firstName); // Ilya
alert(surname);  // Kantor
```

Ora possiamo lavorare con le variabili piuttosto che con i membri dell'array.

Risulta utile se combinata con `split` o altri metodi che ritorna un array:

```js
let [firstName, surname] = "Ilya Kantor".split(' ');
```

````smart header="\"Destrutturazione\" non significa \"distruzione\"."
Viene chiamato "assegnamento di destrutturazione", perché "destrutturizza" copiando gli elementi all'interno di variabili. Ma l'array stesso non viene modificato.

E' solo un modo breve per scrivere:
```js
// let [firstName, surname] = arr;
let firstName = arr[0];
let surname = arr[1];
```
````

````smart header="Ignora gli elementi con la virgola"
Possono essere ignorati degli elementi dell'array inserendo una virgola:

```js run
*!*
// il secondo elemento non è necessario
let [firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
*/!*

alert( title ); // Consul
```

<<<<<<< HEAD
Nel codice sopra, il secondo elemento viene ignorato, il terzo viene assegnato a `title`, il resto dell'array viene ignorato.
=======
In the code above, the second element of the array is skipped, the third one is assigned to `title`, and the rest of the array items is also skipped (as there are no variables for them).
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd
````

````smart header="Funziona con qualsiasi itarabile"

... In realtà, possiamo utilizzarlo con qualsiasi iterabile, non solamente con array:

```js
let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);
```

````


````smart header="Assegna a qualsiasi cosa ci sia dalla parte sinistra"

Possiamo inserire qualsiasi cosa sia "assegnabile" alla sinistra.

Ad esempio, la proprietà di un oggetto:
```js run
let user = {};
[user.name, user.surname] = "Ilya Kantor".split(' ');

alert(user.name); // Ilya
```

````

````smart header="Cicla con .entries()"

Nel capitolo precedente abbiamo visto il metodo [Object.entries(obj)](mdn:js/Object/entries).

Possiamo utilizzarlo con la destrutturazione per eseguire cicli su chaivi/valore di un oggetto:

```js run
let user = {
  name: "John",
  age: 30
};

// ciclo su chiavi e valori
*!*
for (let [key, value] of Object.entries(user)) {
*/!*
  alert(`${key}:${value}`); // name:John, poi age:30
}
```

...Lo stesso vale per map:

```js run
let user = new Map();
user.set("name", "John");
user.set("age", "30");

*!*
for (let [key, value] of user) {
*/!*
  alert(`${key}:${value}`); // name:John, then age:30
}
```
````
### Il resto '...'

Se invece vogliamo destrutturare tutto, non solamente il primo elemento, ma raccogliere anche quello che segue -- passiamo un ulteriore parametro nella forma `"..."`:

```js run
let [name1, name2, *!*...rest*/!*] = ["Julius", "Caesar", *!*"Consul", "of the Roman Republic"*/!*];

alert(name1); // Julius
alert(name2); // Caesar

*!*
// Da notare che il tipo di `rest` è Array.
alert(rest[0]); // Consul
alert(rest[1]); // of the Roman Republic
alert(rest.length); // 2
*/!*
```

La variabile `rest` è un array dei valori dell'array rimanenti. Possiamo utilizzare qualsiasi altro nome di variabile al posto di `rest`, è sufficiente accertarsi di inserire i tre punti prima del nome.

### Valori di default

Se ci sono meno valori nell'array delle variabili da assegnare, non ci sarà alcun errore. I valori assenti vengono considerati undefined:

```js run
*!*
let [firstName, surname] = [];
*/!*

alert(firstName); // undefined
alert(surname); // undefined
```

Se volessimo utilizzare un nostro valore di "default", potremmo fornirlo con la sintassi `=`:

```js run
*!*
// valori di default
let [name = "Guest", surname = "Anonymous"] = ["Julius"];
*/!*

alert(name);    // Julius (dall'array)
alert(surname); // Anonymous (valore di default)
```

I valori di default possono essere anche espressioni complesse o anche delle chiamate a funzione. Verranno presi in considerazione solamente se non verrà fornito alcun valore.

Ad esempio, qui usiamo la funzione `prompt` come default. La chiamata avverrà solamente nel secondo caso:

```js run
// viene eseguito solo il prompt per il cognome
let [name = prompt('name?'), surname = prompt('surname?')] = ["Julius"];

alert(name);    // Julius (dall'array)
alert(surname); // qualsiasi cosa provenga dal prompt
```



## Destrutturazione di oggetti

L'assegnamento di destrutturazione funziona allo stesso modo con gli oggetti.

La sintassi è:

```js
let {var1, var2} = {var1:…, var2…}
```

Abbiamo un oggetto alla destra dell'assegnazione, che vogliamo dividere in variabili. Nel lato sinistro abbiamo un "pattern" di proprietà corrispondenti. In questo semplice caso, abbiamo una lista di variabili raggruppate tra parentesi `{...}`.

Ad esempio:

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

*!*
let {title, width, height} = options;
*/!*

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
```

Le proprietà `options.title`, `options.width` e `options.height` vengono assegnate alle variabili corrispondenti. L'ordine non ha importanza. Questo codice funzionerebbe allo stesso modo:

```js
<<<<<<< HEAD
// cambiato l'ordine delle proprietà in let {...}
=======
// changed the order in let {...}
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd
let {height, width, title} = { title: "Menu", height: 200, width: 100 }
```

Il pattern alla sinistra potrebbe essere anche più complesso e specificare una mappatura tra proprietà e variabili.

Se volessimo assegnare una proprietà ad una variabile con un altro nome, ad esempio, la proprietà `options.width` vogliamo inserirla in una variabile chiamata `w`, allora possiamo specificarlo con i due punti:

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

*!*
// { sourceProperty: targetVariable }
let {width: w, height: h, title} = options;
*/!*

// width -> w
// height -> h
// title -> title

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200
```

I due punti specificano "cosa : va dove". Nell'esempio sopra la proprietà `width` va in `w`, la proprietà `height` va in `h`, e `title` viene assegnata ad una variabile con lo stesso nome.

Per delle potenziali proprietà mancanti possiamo impostare dei valori di default utilizzando `"="`, come nell'esempio:

```js run
let options = {
  title: "Menu"
};

*!*
let {width = 100, height = 200, title} = options;
*/!*

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
```

Proprio come nel caso degli array o dei parametri di funzione, i valori di default possono essere espressioni più complesse o chiamate a funzioni. Questi verranno valutati solo nel caso in cui il valore non verrà fornito.

Il codice sotto richiederà la larghezza (width), ma non il titolo (title).

```js run
let options = {
  title: "Menu"
};

*!*
let {width = prompt("width?"), title = prompt("title?")} = options;
*/!*

alert(title);  // Menu
<<<<<<< HEAD
alert(width);  // (qualsiasi cosa arrivi dal prompt)
=======
alert(width);  // (whatever the result of prompt is)
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd
```

Possiamo anche combinare entrambi, i due punti e l'uguaglianza:

```js run
let options = {
  title: "Menu"
};

*!*
let {width: w = 100, height: h = 200, title} = options;
*/!*

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200
```

<<<<<<< HEAD
### L'operatore di resto
=======
### The rest pattern "..."
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

Cosa succede se l'oggetto possiede più proprietà delle variabili da noi fornite? Possiamo prendere solamente alcune ed assegnare tutto ciò che avanza da un'altra parte?

<<<<<<< HEAD
La specifica per l'utilizzo dell'operatore resto (tre punti) fa quasi parte dello standard, ma molti browser non lo supportano ancora.
=======
We can use the rest pattern, just like we did with arrays. It's not supported by some older browsers (IE, use Babel to polyfill it), but works in modern ones.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

Appare cosi:

```js run
let options = {
  title: "Menu",
  height: 200,
  width: 100
};

*!*
// title = property named title
// rest = object with the rest of properties
let {title, ...rest} = options;
*/!*

// ora title="Menu", rest={height: 200, width: 100}
alert(rest.height);  // 200
alert(rest.width);   // 100
```



<<<<<<< HEAD
````smart header="Catturare senza `let`"
Negli esempi sopra le variabili vengono dichiarate appena prima di essere assegnate: `let {…} = {…}`. Ovviamente, potremmo anche utilizzare delle variabili già esistenti. Ma c'è un tranello.
=======
````smart header="Gotcha if there's no `let`"
In the examples above variables were declared right in the assignment: `let {…} = {…}`. Of course, we could use existing variables too, without `let`. But there's a catch.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

Questo non funzionerebbe:
```js run
let title, width, height;

// errore in questa riga
{title, width, height} = {title: "Menu", width: 200, height: 100};
```

Il problema è che JavaScript tratta `{...}` come un blocco di codice. Questo blocco di codice può essere utilizzato per raggruppare istruzioni, come nell'esempio:

```js run
{
  // un blocco di codice
  let message = "Hello";
  // ...
  alert( message );
}
```

<<<<<<< HEAD
Per informare JavaScript che non ci troviamo in un blocco di codice, possiamo raggruppare l'intera assegnazione tra parentesi `(...)`:
=======
To show JavaScript that it's not a code block, we can make it a part of an expression by wrapping in parentheses `(...)`:
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

```js run
let title, width, height;

<<<<<<< HEAD
// ora funziona
*!*(*/!*{title, width, height} = {title: "Menu", width: 200, height: 100}*!*)*/!*;
=======
// okay now
*!*(*/!*{title, width, height}*!*)*/!* = {title: "Menu", width: 200, height: 100};
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

alert( title ); // Menu
```

````

## Destrutturazione annidata

Se un oggetto o un array contiene altri oggetti o array, possiamo utilizzare sequenze (pattern) di estrazione più complesse per andare più in profondità con l'estrazione.

Nel codice sotto `options` possiede un ulteriore oggetto nella proprietà `size` ed un array nella proprietà `items`. Il pattern alla sinistra dell'assegnazione ha la stessa struttura:

```js run
let options = {
  size: {
    width: 100,
    height: 200
  },
  items: ["Cake", "Donut"],
  extra: true    // qualche extra che non destruttureremo
};

// destructuring assignment split in multiple lines for clarity
let {
  size: { // mettiamo size qui
    width,
    height
  },
  items: [item1, item2], // assegniamo gli item qui
  title = "Menu" // non presente nell'oggetto (viene utilizzato il valore di default)
} = options;

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
alert(item1);  // Cake
alert(item2);  // Donut
```

L'intero oggetto `options` ad eccezione di `extra` il quale non viene menzionato, viene assegnato alle corrispondenti variabili.

Note that `size` and `items` itself is not destructured.

![](destructuring-complex.png)

Infine, abbiamo `width`, `height`, `item1`, `item2` e `title` che assumo il valore di default.

<<<<<<< HEAD
Questo accade spesso con l'assegnamento di destrutturazione. Abbiamo un oggetto complesso e vogliamo estrarre solamente ciò di cui abbiamo bisogno.

Anche qui accade lo stesso:
=======
If we have a complex object with many properties, we can extract only what we need:

>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd
```js
// prende size per interno su una variabile, ignora il resto
let { size } = options;
```

## Parametri di funzione intelligenti

<<<<<<< HEAD
Ci sono casi in cui una funzione può accettare più parametri, molti dei quali opzionali. Questo è vero specialmente per le interfacce utente. Immaginate una funzione che crea un menu. Può avere una larghezza, un'altezza, un titolo, una lista di elementi e molto altro.
=======
There are times when a function has many parameters, most of which are optional. That's especially true for user interfaces. Imagine a function that creates a menu. It may have a width, a height, a title, items list and so on.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

Vediamo un pessimo modo per scrivere questo tipo di funzioni:

```js
function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
  // ...
}
```

Nella vita reale, il problema è ricordarsi l'ordine degli argomenti. Solitamente gli IDE ci aiutano in questo, specialmente se il codice è ben documentato, ma ancora... Un ulteriore problema è quello di chiamare una funzione nel caso in cui molti parametri ci vadano bene di default.

Come qui?

```js
showMenu("My Menu", undefined, undefined, ["Item1", "Item2"])
```

E' brutto a vedersi. E diventa illeggibile quando il numero di parametri aumenta.

La destrutturazione ci viene in soccorso!

Possiamo passare i parametri come un oggetto, e la funzione immediatamente lo destrutturizza in variabili:

```js run
// passiamo l'oggetto alla funzione
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

// ...e immediatamente lo espandiamo su variabili
function showMenu(*!*{title = "Untitled", width = 200, height = 100, items = []}*/!*) {
  // title, items – presi da options,
  // width, height – valori di default
  alert( `${title} ${width} ${height}` ); // My Menu 200 100
  alert( items ); // Item1, Item2
}

showMenu(options);
```

Possiamo anche utilizzare una destrutturazione più complessa con oggetti annidati e diverse mappature:

```js run
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

*!*
function showMenu({
  title = "Untitled",
  width: w = 100,  // width va su w
  height: h = 200, // height va su h
  items: [item1, item2] // il primo elemento va su item1, il secondo su item2
}) {
*/!*
  alert( `${title} ${w} ${h}` ); // My Menu 100 200
  alert( item1 ); // Item1
  alert( item2 ); // Item2
}

showMenu(options);
```

La sintassi è la stessa dell'assegnamento di destrutturazione:
```js
function({
  incomingProperty: parameterName = defaultValue
  ...
})
```

Da notare che la destrutturazione assume che `showMenu()` abbia un argomento. Se vogliamo tutti i valori di default, allora dovremmo specificare un oggetto vuoto:

```js
showMenu({});


showMenu(); // questo darà errore
```

Possiamo farlo ponendo `{}` il valore di default per l'intera destrutturazione:


```js run
// parametri semplificati per chiarezza
function showMenu(*!*{ title = "Menu", width = 100, height = 200 } = {}*/!*) {
  alert( `${title} ${width} ${height}` );
}

showMenu(); // Menu 100 200
```

Nel codice sopra, tutti gli argomenti dell'oggetto sono `{}` di default, quindi ci sarà sempre qualcosa da destrutturare.

## Riepilogo

- L'assegnamento di destrutturazione ci consente di mappare un oggetto o un array su alcune variabili.
- La sintassi per gli oggetti:
    ```js
    let {prop : varName = default, ...rest} = object
    ```

    Questo significa che la proprietà `prop` dovrebbe andare nella variabile `varName` e, se non esiste alcuan proprietà, allora verrà utilizzato il valore di `default`.

<<<<<<< HEAD
- La sintassi per gli array:
=======
    Object properties that have no mapping are copied to the `rest` object.

- The array syntax:
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

    ```js
    let [item1 = default, item2, ...rest] = array
    ```

    Il primo elemento va in `item1`; il secondo va in `item2`, tutti gli altri finiscono nell'array `rest`.

- Per casi più complessi, la parte sinistra deve possedere la stessa struttura di quella destra.
