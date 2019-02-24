importance: 5

---

# Map di oggetti

Avete un array di oggetti `user`, ognuno di questi possiede `name`, `surname` e `id`.

Scrivete il codice per creare un altro array che provenga da questo, sempre composta da oggetti con `id` e `fullName`, dove `fullName` viene generato da `name` e `surname`.

Un esempio:

```js no-beautify
let john = { name: "John", surname: "Smith", id: 1 };
let pete = { name: "Pete", surname: "Hunt", id: 2 };
let mary = { name: "Mary", surname: "Key", id: 3 };

let users = [ john, pete, mary ];

*!*
let usersMapped = /* ... your code ... */
*/!*

/*
usersMapped = [
  { fullName: "John Smith", id: 1 },
  { fullName: "Pete Hunt", id: 2 },
  { fullName: "Mary Key", id: 3 }
]
*/

alert( usersMapped[0].id ) // 1
alert( usersMapped[0].fullName ) // John Smith
```

Quindi, in realtà avrete bisogno di mappare un array di oggetti in un altro. Provate ad utilizzare `=>`.