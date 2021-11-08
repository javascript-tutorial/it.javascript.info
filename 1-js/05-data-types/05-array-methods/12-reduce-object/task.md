importance: 4

---

# Create un oggetto da un array

<<<<<<< HEAD
=======
Let's say we received an array of users in the form `{id:..., name:..., age:... }`.
>>>>>>> 4541b7af7584014a676da731f6e8774da5e059f6

Immaginiamo di ricevere un array di utenti nella forma `{id:..., name:..., age... }`.

Scrivi una funzione `groupById(arr)` che ricavi un oggetto da esso, con `id` come chiave e gli elementi dell'array come valori

Ad esempio:

```js
let users = [
  {id: 'john', name: "John Smith", age: 20},
  {id: 'ann', name: "Ann Smith", age: 24},
  {id: 'pete', name: "Pete Peterson", age: 31},
];

let usersById = groupById(users);

/*
// dopo la chiamata dovremmo avere:

usersById = {
  john: {id: 'john', name: "John Smith", age: 20},
  ann: {id: 'ann', name: "Ann Smith", age: 24},
  pete: {id: 'pete', name: "Pete Peterson", age: 31},
}
*/
```

Una funzione simile è molto utile quando si lavora con dati provenienti da un server.

In questo esercizio sappiamo che `id` è unico. Non ci saranno due array con lo stesso `id`.

Per favore utilizza il metodo `.reduce` nella soluzione.
