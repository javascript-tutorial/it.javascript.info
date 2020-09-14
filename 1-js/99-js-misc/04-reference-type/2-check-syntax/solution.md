**Errore**!

Provatelo:

```js run
let user = {
  name: "John",
  go: function() { alert(this.name) }
}

(user.go)() // error!
```

<<<<<<< HEAD:1-js/04-object-basics/04-object-methods/2-check-syntax/solution.md
La maggior parte dei browser non vi darà informazioni necessarie per capire cosa è andato storto.
=======
The error message in most browsers does not give us much of a clue about what went wrong.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187:1-js/99-js-misc/04-reference-type/2-check-syntax/solution.md

**L'errore viene causato dalla mancanza di un punto e virgola dopo `user = {...}`.**

JavaScript non inserisce automaticamente un punto e virgola prima di `(user.go)()`, quindi leggerà il codice in questo modo:

```js no-beautify
let user = { go:... }(user.go)()
```

Possiamo anche vedere questa come una comune espressione, è sintatticamente una chiamata all'oggetto `{ go: ... }` come una funzione con argomento `(user.go)`. E questo avviene nella stessa riga di `let user`, quindi l'oggetto `user` non è ancora stato definito, quindi c'è un errore. 

Se inseriamo un punto e virgola, tutto funziona correttamente:

```js run
let user = {
  name: "John",
  go: function() { alert(this.name) }
}*!*;*/!*

(user.go)() // John
```

<<<<<<< HEAD:1-js/04-object-basics/04-object-methods/2-check-syntax/solution.md
Da notare che le parentesi su `(user.go)` non fanno nulla. Solitamente servono ad organizzare l'ordine delle operazioni, in questo  caso è presente un `.` che verrebbe comunque eseguito per primo, non hanno quindi alcun effetto. L'unico errore stava nel punto e virgola.






=======
Please note that parentheses around `(user.go)` do nothing here. Usually they setup the order of operations, but here the dot `.` works first anyway, so there's no effect. Only the semicolon thing matters.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187:1-js/99-js-misc/04-reference-type/2-check-syntax/solution.md
