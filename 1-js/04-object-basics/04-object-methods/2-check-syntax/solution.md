**Errore**!

Provatelo:

```js run
let user = {
  name: "John",
  go: function() { alert(this.name) }
}

(user.go)() // error!
```

La maggior parte dei browser non vi darà informazioni necessarie per capire cosa è andato storto.

**L'errore viene causato dalla mancanza di un punto e virgola dopo `user = {...}`.**

<<<<<<< HEAD
JavaScript non inserisce automaticamente un punto e virgola prima di `(user.go)()`, quindi leggerà il codice in questo modo:
=======
JavaScript does not auto-insert a semicolon before a bracket `(user.go)()`, so it reads the code like:
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

```js no-beautify
let user = { go:... }(user.go)()
```

<<<<<<< HEAD
Possiamo anche vedere questa come una comune espressione, è sintatticamente una chiamata all'oggetto `{ go: ... }` come una funzione con argomento `(user.go)`. E questo avviene nella stessa riga di `let user`, quindi l'oggetto `user` non è ancora stato definito, quindi c'è un errore. 
=======
Then we can also see that such a joint expression is syntactically a call of the object `{ go: ... }` as a function with the argument `(user.go)`. And that also happens on the same line with `let user`, so the `user` object has not yet even been defined, hence the error.
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

Se inseriamo un punto e virgola, tutto funziona correttamente:

```js run
let user = {
  name: "John",
  go: function() { alert(this.name) }
}*!*;*/!*

(user.go)() // John
```

<<<<<<< HEAD
Da notare che le parentesi su `(user.go)` non fanno nulla. Solitamente servono ad organizzare l'ordine delle operazioni, in questo  caso è presente un `.` che verrebbe comunque eseguito per primo, non hanno quindi alcun effetto. L'unico errore stava nel punto e virgola.






=======
Please note that brackets around `(user.go)` do nothing here. Usually they setup the order of operations, but here the dot `.` works first anyway, so there's no effect. Only the semicolon thing matters.
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d
