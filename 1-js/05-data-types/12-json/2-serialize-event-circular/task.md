importance: 5

---

# Escludere contro-referenze 

In un semplice caso di riferimenti ciclici, possiamo escludere una proprietà dalla serializzazione tramite il suo nome.

<<<<<<< HEAD:1-js/05-data-types/11-json/2-serialize-event-circular/task.md
Ma in certi casi possono esserci più contro-referenze. E i nomi potrebbero essere utilizzati sia per riferimenti ciclici che per normali proprietà.
=======
But sometimes we can't just use the name, as it may be used both in circular references and normal properties. So we can check the property by its value.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca:1-js/05-data-types/12-json/2-serialize-event-circular/task.md

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
