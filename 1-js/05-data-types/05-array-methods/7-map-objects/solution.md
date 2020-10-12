
```js run no-beautify
let john = { name: "John", surname: "Smith", id: 1 };
let pete = { name: "Pete", surname: "Hunt", id: 2 };
let mary = { name: "Mary", surname: "Key", id: 3 };

let users = [ john, pete, mary ];

*!*
let usersMapped = users.map(user => ({
  fullName: `${user.name} ${user.surname}`,
  id: user.id
}));
*/!*

/*
usersMapped = [
  { fullName: "John Smith", id: 1 },
  { fullName: "Pete Hunt", id: 2 },
  { fullName: "Mary Key", id: 3 }
]
*/

alert( usersMapped[0].id ); // 1
alert( usersMapped[0].fullName ); // John Smith
```
Da notare che nella funzione a freccia abbiamo bisogno di utilizzare un ulteriore parentesi. 

<<<<<<< HEAD
Non possiamo scrivere semplicemente:
=======
Please note that in the arrow functions we need to use additional brackets. 

We can't write like this:
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779
```js
let usersMapped = users.map(user => *!*{*/!*
  fullName: `${user.name} ${user.surname}`,
  id: user.id
});
```

Se ricordate, ci sono due tipi di funzioni freccia: senza corpo `value => expr` e con il corpo `value => {...}`.

Qui JavaScript tratterà `{` come l'inzio del corpo della funzione, non l'inizio dell'oggetto. Questo trucco viene utilizzato per racchiuderle nell normali parentesi:

```js
let usersMapped = users.map(user => *!*({*/!*
  fullName: `${user.name} ${user.surname}`,
  id: user.id
}));
```

Now fine.


