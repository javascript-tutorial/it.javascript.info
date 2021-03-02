# Arrow functions rivisitate

Rivediamo l'argomento delle arrow functions.

Le arrow functions non sono semplicemente una "scorciatoia" per scrivere codice più breve. Infatti queste possiedono delle caratteristiche aggiuntive piuttosto utili.

Usando JavaScript ci troviamo spesso a dover scrivere delle funzioni molto semplici, che verranno però eseguite in un diverso punto del codice.

Ad esemmpio:

- `arr.forEach(func)` -- `func` viene eseguita da `forEach` per ogni elemento dell'array.
- `setTimeout(func)` -- `func` viene eseguita dallo scheduler integrato.
- ...ed esistono molti altri casi.

Sta nel vero spirito di JavaScript il fatto di poter creare una funzione in un punto e passarla in qualsiasi altra parte del codice.

E in questo tipo di funzioni, generalmente, non vorremmo perdere il riferimento al context (il contesto in cui la funzione è stata definita). Queste sono le situazioni in cui le arrow functions ci vengono in soccorso.

## Le arrow functions non possiedono un "this"

Come già abbiamo studiato nel capitolo <info:object-methods>, le arrow functions non possiedono un `this`. Infatti, il valore di `this`, viene preso dal contesto esterno.

Ad esempio, possiamo utilizzarlo per le iterazioni all'interno di un metodo di un oggetto:

```js run
let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],

  showList() {
*!*
    this.students.forEach(
      student => alert(this.title + ': ' + student)
    );
*/!*
  }
};

group.showList();
```

Qui, all'interno del `forEach`, viene utilizzata una arrow function, quindi il valore di `this.title` è esattamente lo stesso che troviamo nel metodo esterno `showList`. Cioè: `group.title`.

Se avessimo utilizzato una funzione "regolare", avremmo ottenuto un errore:

```js run
let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],

  showList() {
*!*
    this.students.forEach(function(student) {
      // Error: Cannot read property 'title' of undefined
      alert(this.title + ': ' + student);
    });
*/!*
  }
};

group.showList();
```

L'errore viene generato perché `forEach` esegue le funzioni con `this=undefined` di default, quindi il codice equivale a: `undefined.title`.

Questo non si verifica con le arrow functions, poiché queste non possiedono un `this`.

```warn header="Arrow functions non funzionano con `new`"
Il fatto di non possedere un `this` porta ad una naturale limitazione: le arrow functions non possono essere utilizzate come costruttori. Non possono essere invocate con la keyword `new`.
```

```smart header="Arrow functions VS bind"
Esiste una sottile differenza tra l'utilizzo di una arrow function `=>` ed una funzione regolare invocata con `.bind(this)`:

- `.bind(this)` crea una versione "bounded" (delimitata) della funzione.
- Le arrow functions, tramite `=>`, non creano alcun binding. La funzione semplicemente non avrà un `this`. La ricerca di `this` seguirà esattamente le stesse procedure della ricerca di una variabile: verrà cercata nel lexical environment esterno.
```

## Le arrow functions non possiedono "arguments"

Le arrow functions non possiedo la varibile `arguments`.

Questo è fantastico per i decorators, in cui abbiamo biosogno di inoltrare una chiamata con il valori attuali di `this` e `arguments`.

Ad esempio, `defer(f, ms)` accetta una funzione come parametro e ne ritorna un wrapper della stessa, il quale ne ritarderà l'invocazione di `ms` millisecondi:

```js run
function defer(f, ms) {
  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };
}

function sayHi(who) {
  alert('Hello, ' + who);
}

let sayHiDeferred = defer(sayHi, 2000);
sayHiDeferred("John"); // Hello, John dopo 2 secondi
```

La stessa cosa, senza una arrow function, sarebbe:

```js
function defer(f, ms) {
  return function(...args) {
    let ctx = this;
    setTimeout(function() {
      return f.apply(ctx, args);
    }, ms);
  };
}
```

In questo caso abbiamo avuto bisogno di creare delle variabili aggiuntive come `args` e `ctx`, in modo che la funzione interna a `setTimeout` possa riceverle.

## Riepilogo

Arrow functions:

- Non possiedono `this`
- Non possiedono `arguments`
- Non possono essere invocate con `new`
- Non possiedono `super`, ma non lo abbiamo ancora studiato. Lo faremo nel capitolo <info:class-inheritance>

Questo perché sono pensate per piccole parti di codice che non possiedono un contesto proprio, ma piuttosto, lavorano nel contesto corrente. E sono veramente perfette per questi casi d'uso.
