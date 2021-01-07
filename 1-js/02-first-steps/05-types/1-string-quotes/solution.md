
Il backtick viene utilizzato per integrare espressioni all'interno delle stringhe `${...}`.

```js run
let name = "Ilya";

// l'espressione è il numero 1
alert( `hello ${1}` ); // hello 1

// l'espressione è la stringa "name"
alert( `hello ${"name"}` ); // hello name

// l'espressione è una variabile che viene integrata
alert( `hello ${name}` ); // hello Ilya
```
