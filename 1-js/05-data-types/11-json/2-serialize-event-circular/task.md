importance: 5

---

# Escludere contro-referenze 

In un semplice caso di riferimenti ciclici, possiamo escludere una proprietà dalla serializzazione tramite il suo nome.

Ma in certi casi possono esserci più contro-referenze. E i nomi potrebbero essere utilizzati sia per riferimenti ciclici che per normali proprietà.

Scrivete una funzione `replacer` che serializzi tutto, evitando la proprietà che fa riferimento a `meetup`:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  occupiedBy: [{name: "John"}, {name: "Alice"}],
  place: room
};

*!*
// circular references 
room.occupiedBy = meetup;
meetup.self = meetup;
*/!*

alert( JSON.stringify(meetup, function replacer(key, value) {
  /* your code */
}));

/* result should be:
{
  "title":"Conference",
  "occupiedBy":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/
```

