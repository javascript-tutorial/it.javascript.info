
# Oggetti



Possiamo immaginare un oggetto come un archivio con dei documenti firmati. Ogni dato viene scritto nel documento utilizzandone la chiave (il nome). E' facile trovare un file conoscendone il nome oppure aggiungere di nuovi/rimuovere quelli vecchi.

![](object.svg)

Un oggetto vuoto ("archivio vuoto") può essere creato utilizzando una delle due sintassi:

```js
let user = new Object(); // sintassi "costruttore oggetto"
let user = {};  // sintassi "oggetto letterale"
```

![](object-user-empty.svg)

Solitamente vengono utilizzate le `{...}`. La dichiarazione viene chiamata *object literal* ("oggetto letterale").

## Le proprietà dei literal

Possiamo inserire subito delle proprietà in `{...}` come una coppia "key: value":

```js
let user = {     // un oggetto
  name: "John",  // una chiave "name" memorizza il valore "John"
  age: 30        // una chiave "age" memorizza 30
};
```

Una proprietà ha una chiave (conosciuta anche come "nome" o "identificatore") prima dei due punti `":"` ed un valore alla destra.

Nell'oggetto `user`, ci sono due proprietà:

1. La prima proprietà ha come nome `"name"` e valore `"John"`.
2. La seconda come nome ha `"age"` e valore `30`.

L'oggetto risultate `user` può essere visto come un archivio con due file etichettati con "name" ed "age".

![user object](object-user.svg)

Noi possiamo aggiungere, rimuovere e leggere file in qualsiasi momento.

I valori delle proprietà sono accessibili utilizzando la notazione puntata:

```js
// ottiene i campi dell'oggetto:
alert( user.name ); // John
alert( user.age ); // 30
```

Il valore può essere di qualsiasi tipo. Aggiungiamo un booleano:

```js
user.isAdmin = true;
```

![user object 2](object-user-isadmin.svg)

Per rimuovere una proprietà, possiamo utilizzare l'operatore `delete`:

```js
delete user.age;
```

![user object 3](object-user-delete.svg)

Possiamo anche utilizzare nomi di proprietà composti da più parole ("multi-parola"), ma devono essere compresi tra apici:

```js
let user = {
  name: "John",
  age: 30,
  "likes birds": true  // nome di proprietà composta da più parole deve essere racchiusa tra virgolette
};
```

![](object-user-props.svg)

L'ultima proprietà in lista può terminare con una virgola:
```js
let user = {
  name: "John",
  age: 30*!*,*/!*
}
```
Questa viene chiamata virgola di "trailing" ("trascinamento") o "hanging" ("sospensione"). Rende più facile l'aggiunzione/rimozione/spostamento delle proprietà, poiché tutte le righe risultano essere uguali.

## Parentesi quadre

Per le proprietà con nomi "multi-parola", l'accesso con notazione puntata non funziona:

```js run
// questo darebbe un errore di sintassi
user.likes birds = true
```
Questo perché il punto richiede che la chiave sia un identificatore valido. Un identificatore non deve avere spazi (oltre a seguire le altre limitazioni già studiate).

Esiste una "notazione con parentesi quadre", per aggirare questo vincolo:

```js run
let user = {};

// set
user["likes birds"] = true;

// get
alert(user["likes birds"]); // true

// delete
delete user["likes birds"];
```

Ora tutto funziona. Da notare che la stringa all'interno delle parentesi va comunque messa tra apici (qualsiasi tipo di apici).

Le parentesi quadre forniscono anche un modo per fornire il nome della proprietà come risultato di un espressione -- a differenza delle stringhe letterali -- ad esempio una variabile:

```js
let key = "likes birds";

// lo stesso di user["likes birds"] = true;
user[key] = true;
```

Qui la variabile `key` può essere calcolata a run-time o dipendere dall'input dell'utente. Successivamente possiamo utilizzarla per accedere alla proprietà. Questa caratteristica ci fornisce una grande flessibilità. La notazione puntata non può essere utilizzata in questo modo.

Ad esempio:

```js run
let user = {
  name: "John",
  age: 30
};

let key = prompt("What do you want to know about the user?", "name");

// accesso tramite variabile
alert( user[key] ); // John (se si inserisce "name")
```

The dot notation cannot be used in a similar way:

```js run
let user = {
  name: "John",
  age: 30
};

let key = "name";
alert( user.key ) // undefined
```

### Proprietà calcolate

In un oggetto letterale possiamo utilizzare le parentesi quadre. Questo viene chiamato *calcolo delle proprietà*.

Ad esempio:

```js run
let fruit = prompt("Which fruit to buy?", "apple");

let bag = {
*!*
  [fruit]: 5, // il nome della proprietà viene preso dalla variabile fruit
*/!*
};

alert( bag.apple ); // 5 se fruit="apple"
```

Il significato delle proprietà calcolate è semplice: `[fruit]` significa che il nome della proprietà deve essere preso da `fruit`.

Quindi se un utente inserisce `"apple"`, `bag` diventerà `{apple: 5}`.

Essenzialmente, questo funziona allo stesso modo:
```js run
let fruit = prompt("Which fruit to buy?", "apple");
let bag = {};

// prende il nome della proprietà dalla variabile fruit
bag[fruit] = 5;
```

...Ma è meno carino.

Possiamo utilizzare anche espressioni più complesse all'interno delle parentesi quadre:

```js
let fruit = 'apple';
let bag = {
  [fruit + 'Computers']: 5 // bag.appleComputers = 5
};
```

Le parentesi quadre sono molto più potenti della notazione puntata. Ci permettono di assegnare qualsiasi nome. Ma sono più ingombranti da scrivere.

Quindi la maggior parte delle volte, quando il nome della proprietà è conosciuto, la notazione puntata viene preferita. Se invece necessitiamo di qualcosa di più complesso, possiamo utilizzare le parentesi quadre.



````smart header="Le parole riservate sono consentite come nomi di proprietà"
Una variabile non può avere un nome uguale ad una parola riservata dal linguaggio come "for", "let", "return" etc.

Ma per una proprietà di un oggetto, non ci sono restrizioni. Qualsiasi nome va bene:

```js run
let obj = {
  for: 1,
  let: 2,
  return: 3
};

alert( obj.for + obj.let + obj.return );  // 6
```
Praticamente ogni nome è consentito, ma c'è n'è uno speciale: `"__proto__"` questo per varie ragioni storiche, gli viene fornito un trattamento speciale. Ad esempio non possiamo settarlo ad un valore diverso da un oggetto:

```js run
let obj = {};
obj.__proto__ = 5;
alert(obj.__proto__); // [object Object], non funzionerebbe
```

Come possiamo veder dal codice, l'assegnazione alla primitiva `5` viene ignorata.

Questa può diventare una situazione vulnerabile se abbiamo intenzione di memorizzare una coppia chiave-valore in un oggetto, consentendo al visitatore di specificare al chiave.

In questo caso il visitatore potrebbe scegliere "__proto__" come chiave, e l'assegnazione verrebbe rovinata (come abbiamo visto sopra).

C'è un modo per trattare `__proto__` come una prorietà, lo vederemo più avanti, prima abbiamo bisogno di conoscere meglio gli oggetti.
C'è un ulteriore struttura dati [Map](info:map-set), che apprenderemo nel capitolo <info:map-set>, che supporta chiavi arbitrarie.
````


## Abbreviazione per il valore di una proprietà

Nella pratica spesso usiamo delle variabili esistenti come valori per i nomi delle proprietà.

Ad esempio:

```js run
function makeUser(name, age) {
  return {
    name: name,
    age: age
    // ...altre proprietà
  };
}

let user = makeUser("John", 30);
alert(user.name); // John
```

Nell'esempio sopra, le proprietà hanno lo stesso nome delle varibili. Il caso d'uso di creare una proprietà da una varibilie è molto comune, tanto che esiste una speciale *abbreviazione* per comodità.

Invece che scrivere `name:name` possiamo semplicemente scrivere `name`, come in questo esempio:

```js
function makeUser(name, age) {
*!*
  return {
    name, // equivalente a name: name
    age   // equivalente a age: age
    // ...
  };
*/!*
}
```
Nello stesso oggetto possiamo usare entrambe ler proprietà:

```js
let user = {
  name,  // equivalente a name:name
  age: 30
};
```


## Property names limitations

Come abbiamo già appreso, una variabile non può avere il nome uguale ad una parola chiave del riservata al linguaggio come "for", "let", "return" etc.

Ma per le proprietà degli oggetti, non ci sono restrizioni:

```js run
// queste variabili sono tutte corrette
let obj = {
  for: 1,
  let: 2,
  return: 3
};

alert( obj.for + obj.let + obj.return );  // 6
```

In breve, non ci sono limitazioni nei nomi delle proprietà. Possono essere sia di tipo string che symbols (un tipo speciale, che andremo ad analizzare più avanti).

Nomi di proprietà con altri tipi, vengono autoamaticamente convertiti a string.

Ad esempio, un numero `0` diventa una stringa `"0"` quando viene utilizzata come chiave di una prorietà:

```js run
let obj = {
  0: "test" // equivale a "0": "test"
};

// entrambi gli alert accedono alla stessa proprietà (il nuemero 0 viene convertito nella stringa "0")
alert( obj["0"] ); // test
alert( obj[0] ); // test (stessa proprietà)
```

Esiste una piccola falla per la proprietà `__proto__`. Non possiamo impostarla ad un valore diverso dal tipo oggetto:

```js run
let obj = {};
obj.__proto__ = 5; // assegnamo un numero
alert(obj.__proto__); // [object Object] - il valore è un oggetto, non ha funzionato come ci si aspettava
```

Come possiamo osservare dal codice, l'assegazione del numero intero `5` è stata ignorata.

Studieremo più nel dettaglio `__proto__` nel [capitolo](info:prototype-inheritance), e vedremo come [sistemare](info:prototype-methods) questo comportamento.

## Controllo di esistenza

Un importante caratteristica degli oggetti è che è possibile accedere qualsiasi proprietà. Non ci sarà alcun errore se la proprietà non esiste! L'accesso ad una variabile non esistente ritornerà `undefined`. Questa caratteristica fornisce un metodo comodo per verificare se una proprietà esiste -- prelevandola e confrontandola con undefined:

```js run
let user = {};

alert( user.noSuchProperty === undefined ); // true significa "no such property"
```

Esiste anche uno speciale operatore `"in"` per controllare l'esistenza di una proprietà.

La sintassi è:
```js
"key" in object
```

Ad esempio:

```js run
let user = { name: "John", age: 30 };

alert( "age" in user ); // true, significa che user.age esiste
alert( "blabla" in user ); // false, significa che user.blabla non esiste
```

Da notare che alla sinistra di  `in` deve esserci il *nome di una proprietà*. Questa solitamente è una stringa tra apici.

Se omettiamo gli apici, allora verrà cercata una variabile con quel nome e verrà utilizzato il suo contenuto come test. Ad esempio:

```js run
let user = { age: 30 };

let key = "age";
alert( *!*key*/!* in user ); // true, prende il nome da key e controlla l'esistenza della proprietà
```

````smart header="Utilizzare \"in\" con le proprietà che contengono `undefined`"
Solitamente, il confronto stretto con `"=== undefined"` funziona correttamente. Ma c'è un particolare caso in cui questo fallisce, ma `"in"` funziona correttamente.

Questo accade quando una proprietà esiste, ma contiene `undefined`:

```js run
let obj = {
  test: undefined
};

alert( obj.test ); // è undefined, quindi -- non esiste la proprietà?

alert( "test" in obj ); // true, la proprietà esiste!
```


Nel codice sopra, la proprietà `obj.test` tecnicamente esiste. Quindi l'operatore `in` funziona.

Situazioni come questa accadono raramente, perché solitamente non si assegna `undefined`. Si usa più comunemente `null` per valori "sconosciuti" o "vuoti". Quindi l'operatore `in` è più un ospite esoterico nel codice.
````


## Il ciclo "for..in" 

Per attraversare tutte le chiavi di un oggetto, esiste una speciale forma di ciclo: `for..in`. Questo è completamente diverso da `for(;;)`.

La sintassi:

```js
for (key in object) {
  // esegue il corpo del ciclo per ogni proprietà dell'oggetto
}
```

Ad esempio, proviamo a stampare tutte le proprietà di `user`:

```js run
let user = {
  name: "John",
  age: 30,
  isAdmin: true
};

for (let key in user) {
  // keys
  alert( key );  // name, age, isAdmin
  // valori delle keys
  alert( user[key] ); // John, 30, true
}
```

Da notare che tutti i costrutti "for" ci consentono di dichiarare delle variabili di ciclo da utilizzare all'interno del ciclo stesso, come `let key` in questo esempio.

Inoltre possiamo utilizzare qualsiasi altr variabile al posto di `key`. Ad esempio `"for(let prop in obj)"` è molto utilizzato.


### Ordinato come un oggetto

Gli oggetti sono ordinati? In altre parole, se cicliamo un oggetto, otterremo le sue proprietà nello stesso ordine in cui le abbiamo aggiunte? 

Una risposta breve è: "sono ordinati in modo speciale": le proprietà di tipo intero vengono ordinate, le altre appaiono seguendo l'ordine di creazione. Seguiranno maggiori dettagli.

Per fare un esempio, consideriamo un oggetto con dei prefissi telefonici:

```js run
let codes = {
  "49": "Germany",
  "41": "Switzerland",
  "44": "Great Britain",
  // ..,
  "1": "USA"
};

*!*
for (let code in codes) {
  alert(code); // 1, 41, 44, 49
}
*/!*
```

L'oggetto può essere utilizzato per suggerire una lista di opzioni all'utente. Se stiamo sviluppato un sito dedicato al pubblico Tedesco propbabilmente vorrano vedersi apparire come primo valore `49`.

Se proviamo ad eseguire il codice, vedremo un risultato totalmente inaspettato:

- USA (1) viene per primo
- po Switzerland (41) e a seguire gli altri.

I prefissi telefonici seguono un ordine crescente, questo accade perché sono interi. Quindi vedremo `1, 41, 44, 49`.

````smart header="Proprietà degli interi? Cos'è?"
La "proprietà degli interi" è un termine che indica una stringa che può essere convertita da e ad un intero senza subire modifiche.

Quindi "49" segue la proprietà degli interi, perché quando viene trasformato in un numero intero e riportato a stringa, rimane uguale. Ad esempio "+49" e "1.2" non lo sono:

```js run
// Math.trunc è una proprietà integrata che rimuove la parte decimale
alert( String(Math.trunc(Number("49"))) ); // "49", rimane uguale
alert( String(Math.trunc(Number("+49"))) ); // "49", è diverso da "+49" ⇒ non è un intero
alert( String(Math.trunc(Number("1.2"))) ); // "1", è diverso da "1.2" ⇒ non è un intero
```
````

...Differentemente, se le chiavi non sono di tipo intero, vengono restituite nell'ordine di creazione, ad esempio:

```js run
let user = {
  name: "John",
  surname: "Smith"
};
user.age = 25; // aggiungiamone un'altra

*!*
// le proprietà non intere vengono elencate nell'ordine di creazione
*/!*
for (let prop in user) {
  alert( prop ); // name, surname, age
}
```

Quindi per sistemare il problema con i prefissi telefonici, possiamo "barare" rendendo i prefissi non interi. Questo lo otteniamo inserendo un `"+"` prima di ogni numero.

Come nel codice sotto:

```js run
let codes = {
  "+49": "Germany",
  "+41": "Switzerland",
  "+44": "Great Britain",
  // ..,
  "+1": "USA"
};

for (let code in codes) {
  alert( +code ); // 49, 41, 44, 1
}
```

Ora funziona come previsto.

## Riepilogo

Possono memorizzare proprietà (coppie di chiave-valore) in cui:
- Il nome della proprietà (chiave) deve essere composta da una o più stringhe o simboli (solitamente stringhe).
- I valori possono essere di qualsiasi tipo.

Per accedere ad una proprietà possiamo utilizzare:
- La notazione puntata: `obj.property`.
- La notazione con parentesi quadre `obj["property"]`. Questa notazione consente di accettare chiavi dalle variabili, come `obj[varWithKey]`.

Operatori specifici:
- Per cancellare una proprietà: `delete obj.prop`.
- Per controllare se un una proprietà con un certo nome esiste: `"key" in obj`.
- Per iterare un oggetto: `for(let key in obj)`.

Gli oggetti vengono assegnati e copiati per riferimento. In altre parole, la variabile non memorizza il "valore dell'oggetto", ma puittosto un "riferimento" (indirizzo di memoria). Quindi copiando questa variabile o passandola come argomento ad una funzione, fornirà un riferimento all'oggetto e non una copia. Tutte le operazioni effettuate su un oggetto copiato per riferimento (come aggiungere/rimuovere proprietà) vengono effettuate sullo stesso oggetto.

Quello che abbiamo studiato in questo capitolo viene chiamato "oggetto semplice", o solo `Object`.

- `Array` per memorizzare dati ordinati,
- `Date` per memorizzare informazioni riguardo date e orari,
- `Error` per memorizzare informazioni riguardo errori.
- ...e molti altri.


Ognuno di questi ha le sue caratteristiche speciali che studieremo più avanti. Qualche volta le persone dicono cose tipo "Array type" ("tipo Array") o "Date type" ("tipo Data"), ma formalmente non sono dei tipi, appartengono al tipo di dato "object". Sono semplicemente delle estensioni.

Gli oggetti in JavaScript sono molto potenti. Qui abbiamo grattato solamente la superficie, ma l'argomento è veramente grande. Lavoreremo molto con gli oggetti per imparare ulteriori caratteristiche.
