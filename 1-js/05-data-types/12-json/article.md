# Metodi JSON, toJSON

Ipotizziamo di avere un oggetto complesso, che vogliamo convertire a stringa prima trasmetterlo in rete, o anche solo per mostrarlo sullo schermo.

Naturalmente, una stringa di questo tipo deve includere tutte le proprietà importanti.

Potremmo implementarla in questo modo:

```js run
let user = {
  name: "John",
  age: 30,

*!*
  toString() {
    return `{name: "${this.name}", age: ${this.age}}`;
  }
*/!*
};

alert(user); // {name: "John", age: 30}
```

...Ma nel processo di sviluppo, potrebbero essere aggiunte/eliminate/rinominate nuove proprietà. Aggiornare costantemente la funzione `toString` non è una buona soluzione. Potremmo provare a iterare sulle proprietà dell'oggetto, ma cosa succederebbe se l'oggetto contenesse oggetti annidati? Dovremmo implementare anche questa conversione. E se dovessimo inviare l'oggetto in rete, dovremmo anche fornire il codice per poterlo "leggere".

Fortunatamente, non c'è bisogno di scrivere del codice per gestire questa situazione.

## JSON.stringify

<<<<<<< HEAD
[JSON](http://en.wikipedia.org/wiki/JSON) (JavaScript Object Notation) è un formato per rappresentare valori e oggetti. Viene descritto nello standard [RFC 4627](http://tools.ietf.org/html/rfc4627). Inizialmente fu creato per lavorare con JavaScript, ma molti altri linguaggi possiedono delle librerie per la sua gestione. Quindi JSON risulta semplice da usare per lo scambio di dati quando il client utilizza JavaScript e il server codifica in Ruby/PHP/Java/Altro.
=======
The [JSON](https://en.wikipedia.org/wiki/JSON) (JavaScript Object Notation) is a general format to represent values and objects. It is described as in [RFC 4627](https://tools.ietf.org/html/rfc4627) standard. Initially it was made for JavaScript, but many other languages have libraries to handle it as well.  So it's easy to use JSON for data exchange when the client uses JavaScript and the server is written on Ruby/PHP/Java/Whatever.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

JavaScript fornisce i metodi:

- `JSON.stringify` per convertire oggetti in JSON.
- `JSON.parse` per convertire JSON in oggetto.

Ad esempio, abbiamo `JSON.stringify` per uno studente:
```js run
let student = {
  name: 'John',
  age: 30,
  isAdmin: false,
  courses: ['html', 'css', 'js'],
  spouse: null
};

*!*
let json = JSON.stringify(student);
*/!*

alert(typeof json); //abbiamo una stringa!

alert(json);
*!*
/* JSON-encoded object:
{
  "name": "John",
  "age": 30,
  "isAdmin": false,
  "courses": ["html", "css", "js"],
  "spouse": null
}
*/
*/!*
```

Il metodo `JSON.stringify(student)` prende l'oggetto e lo converte in stringa.

La stringa `json` risultante viene chiamata *codifica in JSON* o *serializzata*, *stringhificata*, o addirittura oggetto *caramellizzato*. Ora è pronto per essere inviato o memorizzato.

Da notare che un oggetto codificato in JSON possiede delle fondamentali differenze da un oggetto letterale:

- Le stringhe utilizzano doppie virgolette. In JSON non vengono utilizzare backtick o singole virgolette. Quindi `'John'` diventa `"John"`.
- Anche i nomi delle proprietà dell'oggetto vengono racchiusi tra doppie virgolette. Quindi `age:30` diventa `"age":30`.

`JSON.stringify` può anche essere applicato agli oggetti primitivi.

I tipi che supportano nativamente JSON sono:

- Objects `{ ... }`
- Arrays `[ ... ]`
- Primitives:
    - strings,
    - numbers,
    - valori boolean `true/false`,
    - `null`.

Ad esempio:

```js run
// un numero in JSON è solo un numero
alert( JSON.stringify(1) ) // 1

// una stringa in JSON è ancora una stringa, ma con doppie virgolette

alert( JSON.stringify('test') ) // "test"

alert( JSON.stringify(true) ); // true

alert( JSON.stringify([1, 2, 3]) ); // [1,2,3]
```

JSON è un linguaggio specifico per i dati, quindi alcune proprietà specifiche di JavaScript vengono ignorate da `JSON.stringify`.

Tra cui:

- Funzioni (metodi).
- Proprietà di tipo symbol.
- Proprietà che contengono `undefined`.

```js run
let user = {
  sayHi() { // ignorato
    alert("Hello");
  },
  [Symbol("id")]: 123, // ignorato
  something: undefined // ignorato
};

alert( JSON.stringify(user) ); // {} (oggetto vuoto)
```

Solitamente questo è ciò che vogliamo. Se invece abbiamo intenzioni diverse, molto presto vedremo come controllare il processo.

Un'ottima cosa è che anche gli oggetti annidati vengono automaticamente convertiti.

Ad esempio:

```js run
let meetup = {
  title: "Conference",
*!*
  room: {
    number: 23,
    participants: ["john", "ann"]
  }
*/!*
};

alert( JSON.stringify(meetup) );
/* Tutta la struttura viene serializzata 

{
  "title":"Conference",
  "room":{"number":23,"participants":["john","ann"]},
}
*/
```

Una limitazione importante: non ci devono essere riferimenti ciclici.

Ad esempio:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: ["john", "ann"]
};

meetup.place = room;       // meetup referenzia room
room.occupiedBy = meetup; // room referenzia meetup

*!*
JSON.stringify(meetup); // Errore: conversione di struttura circolare in JSON
*/!*
```

In questo caso, la conversione fallisce a causa del riferimento ciclico: `room.occupiedBy` fa riferimento a `meetup`, e `meetup.place` fa riferimento a `room`:

![](json-meetup.svg)


## Esclusione e rimpiazzo: replacer

La sintassi completa di `JSON.stringify` è:

```js
let json = JSON.stringify(value[, replacer, space])
```

value
: Valore da codificare.

replacer
: Array di proprietà da codificare o una funzione di mapping `function(key, value)`.

space
: Quantità di spazio da utilizzare per la formattazione

Nella maggior parte dei casi, `JSON.stringify` viene utilizzato specificando solamente il primo argomento. Ma se avessimo bisogno di gestire il processo di rimpiazzo, ad esempio filtrando i riferimenti ciclici, possiamo utilizzare il secondo argomento di `JSON.stringify`.

Se forniamo un array di proprietà, solamente quelle proprietà verranno codificate.

Ad esempio:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup referenzia room
};

room.occupiedBy = meetup; // room referenzia meetup

alert( JSON.stringify(meetup, *!*['title', 'participants']*/!*) );
// {"title":"Conference","participants":[{},{}]}
```

Qui, probabilmente, siamo stati troppo rigidi. La lista di proprietà viene applicata all'intera struttura dell'oggetto. Quindi `participants` risulta essere vuoto, perché `name` non è in lista.

Andiamo ad includere ogni proprietà ad eccezione di `room.occupiedBy`, che potrebbe causare un riferimento ciclico:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup referenzia room
};

room.occupiedBy = meetup; // room referenzia meetup

alert( JSON.stringify(meetup, *!*['title', 'participants', 'place', 'name', 'number']*/!*) );
/*
{
  "title":"Conference",
  "participants":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/
```

Ora tutto, ad eccezione di `occupiedBy`, viene serializzato. Ma la lista di proprietà è piuttosto lunga.

Fortunatamente, possiamo utilizzare come `replacer` una funzione piuttosto di un array.

La funzione verrà invocata per ogni coppia `(key, value)` e dovrebbe ritornare il valore sostitutivo, che verrà utilizzato al posto di quello originale.

Nel nostro caso, possiamo ritornare `value` (il valore stesso della proprietà) in tutti i casi, ad eccezione di `occupiedBy`. Per poter ignorare `occupiedBy`, il codice sotto ritorna `undefined`:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup referenzia room
};

room.occupiedBy = meetup; // room referenzia meetup

alert( JSON.stringify(meetup, function replacer(key, value) {
  alert(`${key}: ${value}`);
  return (key == 'occupiedBy') ? undefined : value;
}));

/* coppie key:value passate al replacer:
:             [object Object]
title:        Conference
participants: [object Object],[object Object]
0:            [object Object]
name:         John
1:            [object Object]
name:         Alice
place:        [object Object]
number:       23
occupiedBy: [object Object]
*/
```

Da notare che la funzione `replacer` ottiene tutte le coppie key/value, incluse quelle degli oggetti annidati e viene applicata ricorsivamente. Il valore di `this` all'interno di `replacer` è l'oggetto che contiene la proprietà corrente.

La prima chiamata è speciale. Viene effettuata utilizzando uno speciale "oggetto contenitore": `{"": meetup}`. In altre parole, la prima coppia `(key, value)` possiede una chiave vuota, e il valore è l'oggetto stesso. Questo è il motivo per cui la prima riga dell'esempio sopra risulta essere `":[object Object]"`.

L'idea è quella di fornire più potenza possibile a `replacer`: deve avere la possibilità di rimpiazzare/saltare l'oggetto stesso, se necessario.

## Formattazione: spacer

Il terzo argomento di `JSON.stringify(value, replacer, spaces)` è il numero di spazi da utilizzare per una corretta formattazione.

Tutti gli oggetti serializzati fino ad ora non possedevano una indentazione o spazi extra. Ci può andare bene se dobbiamo semplicemente inviare l'oggetto. L'argomento `spacer` viene utilizzato solo con lo scopo di abbellirlo.

In questo caso `spacer = 2` dice a JavaScript di mostrare gli oggetti annidati in diverse righe, con un indentazione di 2 spazi all'interno dell'oggetto:

```js run
let user = {
  name: "John",
  age: 25,
  roles: {
    isAdmin: false,
    isEditor: true
  }
};

alert(JSON.stringify(user, null, 2));
/* indentazione di due spazi:
{
  "name": "John",
  "age": 25,
  "roles": {
    "isAdmin": false,
    "isEditor": true
  }
}
*/

/* Per JSON.stringify(user, null, 4) il risultato sarebbe più indentato:
{
    "name": "John",
    "age": 25,
    "roles": {
        "isAdmin": false,
        "isEditor": true
    }
}
*/
```

Il parametro `spaces` viene utilizzato unicamente per procedure di logging o per abbellire l'output.

## Modificare "toJSON"

Come per la conversione `toString`, un oggetto può fornire un metodo `toJSON` per la conversione a JSON. Se questa è disponibile `JSON.stringify` la chiamerà automaticamente.

Ad esempio:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  date: new Date(Date.UTC(2017, 0, 1)),
  room
};

alert( JSON.stringify(meetup) );
/*
  {
    "title":"Conference",
*!*
    "date":"2017-01-01T00:00:00.000Z",  // (1)
*/!*
    "room": {"number":23}               // (2)
  }
*/
```

Qui possiamo vedere che `date` `(1)` diventa una stringa. Questo accade perché tutti gi oggetti di tipo `Date` possiedono un metodo `toJSON`.

Ora proviamo ad aggiungere un metodo `toJSON` personalizzato per il nostro oggetto `room` `(2)`:

```js run
let room = {
  number: 23,
*!*
  toJSON() {
    return this.number;
  }
*/!*
};

let meetup = {
  title: "Conference",
  room
};

*!*
alert( JSON.stringify(room) ); // 23
*/!*

alert( JSON.stringify(meetup) );
/*
  {
    "title":"Conference",
*!*
    "room": 23
*/!*
  }
*/
```

Come possiamo vedere, `toJSON` viene utilizzato sia per le chiamate dirette a `JSON.stringify(room)`, sia per gli oggetti annidati.


## JSON.parse

Per decodificare una stringa in JSON, abbiamo bisogno del metodo [JSON.parse](mdn:js/JSON/parse).

La sintassi:
```js
let value = JSON.parse(str[, reviver]);
```

str
: stringa JSON da decodificare.

reviver
: funzione(key, value) che verrà chiamata per ogni coppia `(key, value)` e che può rimpiazzare i valori.

Ad esempio:

```js run
// array serializzato
let numbers = "[0, 1, 2, 3]";

numbers = JSON.parse(numbers);

alert( numbers[1] ); // 1
```

Nel caso di oggetti annidati:

```js run
let userData = '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';

let user = JSON.parse(userData);

alert( user.friends[1] ); // 1
```

Il JSON può essere complesso quanto vogliamo, gli oggetti e array possono includere altri oggetti e array. Ma devono seguire il corretto formato.

Alcuni errori tipici di scrittura in JSON (in qualche caso lo utilizzeremo per scopi di debug):

```js
let json = `{
  *!*name*/!*: "John",                     // errore: proprietà name without quotes
  "surname": *!*'Smith'*/!*,               // errore: singole virgolette in value (devono essere doppie)
  *!*'isAdmin'*/!*: false                  // errore: singole virgolette in key (devono essere doppie)
  "birthday": *!*new Date(2000, 2, 3)*/!*, // errore: "new" non è permesso
  "friends": [0,1,2,3]              // qui tutto bene
}`;
```

Inoltre, JSON non supporta i commenti. Quindi l'aggiunta di un commento invaliderebbe il documento.

<<<<<<< HEAD
Esiste un altro formato chiamato [JSON5](http://json5.org/), che accetta chiavi senza virgolette, commenti etc. Ma consiste in una libreria a se stante, non fa parte della specifica del linguaggio.
=======
There's another format named [JSON5](https://json5.org/), which allows unquoted keys, comments etc. But this is a standalone library, not in the specification of the language.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Il JSON classico è cosi restrittivo non per pigrizia degli sviluppatori, ma per consentire una facile, affidabile e rapida implementazione degli algoritmi di analisi.

## Ritrasformare in oggetto

Immaginate di ricevere dal server un oggetto `meetup` serializzato.

Come:

```js
// title: (meetup title), date: (meetup date)
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
```

...Ora abbiamo bisogno di *deserializzarlo*, per ricreare l'oggetto.

Lo facciamo chiamando `JSON.parse`:

```js run
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

let meetup = JSON.parse(str);

*!*
alert( meetup.date.getDate() ); // Error!
*/!*
```

Whoops! Errore!

Il valore di `meetup.date` è una stringa, non un oggetto di tipo `Date`. Come fa `JSON.parse` a sapere che dovrebbe trasformare quella stringa in un oggetto di tipo `Date`?

Passiamo a `JSON.parse` la funzione di riattivazione che ritorna tutti i valori per "come sono", quindi `date` diventerà `Date`:

```js run
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

*!*
let meetup = JSON.parse(str, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
});
*/!*

alert( meetup.date.getDate() ); // now works!
```

Funziona anche per gli oggetti annidati:

```js run
let schedule = `{
  "meetups": [
    {"title":"Conference","date":"2017-11-30T12:00:00.000Z"},
    {"title":"Birthday","date":"2017-04-18T12:00:00.000Z"}
  ]
}`;

schedule = JSON.parse(schedule, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
});

*!*
alert( schedule.meetups[1].date.getDate() ); // works!
*/!*
```



## Riepilogo

- JSON è un formattatore di dati con i suoi standard; possiede molte librerie che gli consentono di lavorare con altrettanti linguaggi di programmazione.
- JSON supporta oggetti, array, stringhe, numeri, booleani, e `null`.
- JavaScript fornisce dei metodi: [JSON.stringify](mdn:js/JSON/stringify) per serializzare in JSON e [JSON.parse](mdn:js/JSON/parse) per la lettura da JSON.
- Entrambi i metodi supportano funzioni di rimpiazzo per scritture/letture "intelligenti".
- Se un oggetto implementa `toJSON`, questa verrà automaticamente invocata da `JSON.stringify`.
