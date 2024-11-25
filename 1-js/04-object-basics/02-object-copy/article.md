# Oggetti: riferimento e copia

Una delle maggiori differenze tra oggetti e primitivi è che gli oggetti vengono memorizzati e copiati "per riferimento", mentre i primitivi (stringhe, numeri, booleani, ecc...) vengono sempre copiati "per valore".

Questa differenza è facile da comprendere se andiamo a guardare il comportamento del linguaggio quando copiamo un valore.

Partiamo con un primitivo, ad esempio una stringa.

Qui facciamo una copia di `message` in `phrase`:

```js
let message = "Hello!";
let phrase = message;
```

Come risultato otteniamo due variabili distinte, ognuna delle quali contiene la stringa `"Hello!"`.

![](variable-copy-value.svg)

E' un risultato abbastanza ovvio, giusto?

Gli oggetti non funzionano allo stesso modo.

**Una variabile assegnata ad un oggetto non contiene l'oggetto in sé, ma il suo "indirizzo in memoria" -- in altre parole "un riferimento" all'oggetto.**

Diamo un'occhiata a un esempio di tale variabile:

```js
let user = {
  name: "John"
};
```

Ed ecco come viene effettivamente archiviata in memoria:

![](variable-contains-reference.svg)

L'oggetto è archiviato da qualche parte nella memoria (a destra nell'immagine), mentre la variabile `user` (a sinistra) contiene il "riferimento" ad esso.

<<<<<<< HEAD
Potremmo immaginare la "variabile oggetto" `user`,  come un foglio di carta con scritto l'indirizzo dell'oggetto.
=======
We may think of an object variable, such as `user`, like a sheet of paper with the address of the object on it.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Quando eseguiamo azioni con l'oggetto, ad es. leggere una proprietà `user.name`, il motore JavaScript guarda cosa c'è a quell'indirizzo ed esegue l'operazione sull'oggetto reale.

Ecco perché è così importante.

**Quando una "variabile oggetto" viene copiata, in realtà viene copiato il riferimento, ma l'oggetto in sé non viene duplicato.**

Esempio:

```js no-beautify
let user = { name: "John" };

let admin = user; // copia il riferimento
```

Ora abbiamo due variabili, entrambe contengono il riferimento allo stesso oggetto:

![](variable-copy-reference.svg)

Come puoi vedere, l'oggetto è uno solo, ma ora con due variabili che si riferiscono ad esso.

Possiamo usare entrambe le variabili per accedere all'oggetto e modificarne il contenuto:

```js run
let user = { name: 'John' };

let admin = user;

*!*
admin.name = 'Pete'; // modificato dal riferimento in "admin"
*/!*

alert(*!*user.name*/!*); // 'Pete', le modifiche sono visibili dal riferimento in "user"
```

E' come se avessimo un armadietto con due chiavi e ne usassimo una (`admin`) per aprirlo ed apportare delle modiche al contenuto. Quindi, successivamente, potremmo aprire lo stesso armadietto con un'altra chiave (`user`) ed accedere al contenuto modificato.

## Confronto per riferimento

Due oggetti sono uguali solo se sono lo stesso oggetto. Suona un po' strano, ma ora chiariremo.

Qui `a` e `b` si riferiscono allo stesso oggetto, quindi sono uguali:

```js run
let a = {};
let b = a; // copia il riferimento

alert( a == b ); // true, entrambe le variabili si riferiscono allo stesso oggetto
alert( a === b ); // true
```

Qui, invece, due oggetti identici (entrambi vuoti), ma indipendenti, non soddisfano l'uguaglianza:


```js run
let a = {};
let b = {}; // due oggetti indipendenti

alert( a == b ); // false
```

Per confronti tra oggetti (Es. `obj1 > obj2`) o con primitivi (Es. `obj == 5`), gli oggetti vengono convertiti in primitivi. Vedremo molto presto come avviene questa conversione, anche se, a dire il vero, questo tipo di confronto è molto raro e generalmente è il risultato di un errore di programmazione.

<<<<<<< HEAD
## Clonazione e unione, Object.assign [#cloning-and-merging-object-assign]
=======
````smart header="Const objects can be modified"
An important side effect of storing objects as references is that an object declared as `const` *can* be modified.

For instance:

```js run
const user = {
  name: "John"
};

*!*
user.name = "Pete"; // (*)
*/!*

alert(user.name); // Pete
```

It might seem that the line `(*)` would cause an error, but it does not. The value of `user` is constant, it must always reference the same object, but properties of that object are free to change.

In other words, the `const user` gives an error only if we try to set `user=...` as a whole.

That said, if we really need to make constant object properties, it's also possible, but using totally different methods. We'll mention that in the chapter <info:property-descriptors>.
````

## Cloning and merging, Object.assign [#cloning-and-merging-object-assign]
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Come abbiamo detto, copiare una "variabile oggetto" crea un ulteriore riferimento allo stesso oggetto.

<<<<<<< HEAD
Quindi, come possiamo fare se abbiamo bisogno di duplicare un oggetto? Creare una copia indipendente, un clone?

Anche questo è fattibile, ma con un po' di difficoltà visto che JavaScript non ha alcun metodo integrato per farlo. In realtà non è un'operazione frequente, il più delle volte la copia per riferimento è adatta alla situazione.

Ma se proprio ne abbiamo bisogno, allora dobbiamo creare un nuovo oggetto e replicare la struttura di quello esistente iterando le sue proprietà
e copiandole a livello primitivo.
=======
But what if we need to duplicate an object?

We can create a new object and replicate the structure of the existing one, by iterating over its properties and copying them on the primitive level.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Così:

```js run
let user = {
  name: "John",
  age: 30
};

*!*
let clone = {}; // il nuovo oggetto vuoto

// copiamo nella variabile clone tutte le proprietà di user
for (let key in user) {
  clone[key] = user[key];
}
*/!*

// ora clone è un oggetto completamente indipendente ma con lo stesso contenuto di user
clone.name = "Pete"; // cambiamo la proprietà name

alert( user.name ); // nell'oggetto originale è rimasto "John"
```

<<<<<<< HEAD
Possiamo anche usare il metodo [Object.assign](mdn:js/Object/assign) .
=======
We can also use the method [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

La sintassi è:

```js
Object.assign(dest, ...sources)
```

<<<<<<< HEAD
- Il primo argomento `dest` è l'oggetto di destinazione.
- Gli argomenti successivi `src1, ..., srcN` (possono essere quanti vogliamo) sono gli oggetti da copiare.
- Il metodo copia tutte le proprietà degli oggetti `src1, ..., srcN` in quello di destinazione `dest`.
- Viene restituito l'oggetto `dest`.

Per fare un esempio, possiamo unire diversi oggetti in uno solo:

```js
=======
- The first argument `dest` is a target object.
- Further arguments is a list of source objects.

It copies the properties of all source objects into the target `dest`, and then returns it as the result.

For example, we have `user` object, let's add a couple of permissions to it:

```js run
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

*!*
// copia tutte le proprietà da permissions1 e permissions2 in user
Object.assign(user, permissions1, permissions2);
*/!*

<<<<<<< HEAD
// ora user = { name: "John", canView: true, canEdit: true }
=======
// now user = { name: "John", canView: true, canEdit: true }
alert(user.name); // John
alert(user.canView); // true
alert(user.canEdit); // true
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

Se una delle proprietà copiate è già presente nell'oggetto di destinazione, verrà sovrascritta.

```js run
let user = { name: "John" };

Object.assign(user, { name: "Pete" });

alert(user.name); // ora user = { name: "Pete" }
```

<<<<<<< HEAD
Possiamo anche usare `Object.assign` per sostituire il ciclo `for..in` nella clonazione semplice:
=======
We also can use `Object.assign` to perform a simple object cloning:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
let user = {
  name: "John",
  age: 30
};

*!*
let clone = Object.assign({}, user);
*/!*

alert(clone.name); // John
alert(clone.age); // 30
```

<<<<<<< HEAD
Vengono copiate tutte le proprietà di `user` nell'oggetto vuoto, il quale, poi, viene restituito.
=======
Here it copies all properties of `user` into the empty object and returns it.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

There are also other methods of cloning an object, e.g. using the [spread syntax](info:rest-parameters-spread) `clone = {...user}`, covered later in the tutorial.

Finora abbiamo assunto che le proprietà di `user` fossero primitive. Ma le proprietà possono anche essere riferimenti ad altri oggetti. Come si fa in questo caso? 

<<<<<<< HEAD
Così:
=======
Until now we assumed that all properties of `user` are primitive. But properties can be references to other objects.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

alert( user.sizes.height ); // 182
```

<<<<<<< HEAD
In questo caso non è sufficiente copiare `clone.sizes = user.sizes`. Siccome `user.sizes` è un oggetto, verrà copiato per riferimento. Quindi `clone` e `user` condivideranno lo stesso oggetto "sizes".

Vediamo un esempio:
=======
Now it's not enough to copy `clone.sizes = user.sizes`, because `user.sizes` is an object, and will be copied by reference, so `clone` and `user` will share the same sizes:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

let clone = Object.assign({}, user);

alert( user.sizes === clone.sizes ); // true, è lo stesso oggetto

<<<<<<< HEAD
// user e clone condividono sizes
user.sizes.width++;       // cambiamo una proprietà da una parte 
alert(clone.sizes.width); // 51, e vediamo il risultato dall'altra
```

Per risolvere questo problema, dobbiamo usare un ciclo di clonazioni che esaminerà ogni valore di `user[key]` e, nel caso sia un oggetto, replichi anche la sua struttura. Questa operazione è chiamata "deep cloning" (copia profonda).

Per implementare questa funzione possiamo usare la ricorsione. Oppure, per non reinventare la ruota, possiamo usare qualcosa di già pronto, ad esempio [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep) dalla libreria JavaScript [lodash](https://lodash.com).

````smart header="Gli oggetti dichiarati con const possono essere modificati"
Un importante "side effect" della memorizzazione per riferimento è che un oggetto dichiarato con `const` *può* essere modificato.

Esempio:
=======
// user and clone share sizes
user.sizes.width = 60;    // change a property from one place
alert(clone.sizes.width); // 60, get the result from the other one
```

To fix that and make `user` and `clone` truly separate objects, we should use a cloning loop that examines each value of `user[key]` and, if it's an object, then replicate its structure as well. That is called a "deep cloning" or "structured cloning". There's [structuredClone](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone) method that implements deep cloning.


### structuredClone

The call `structuredClone(object)` clones the `object` with all nested properties.

Here's how we can use it in our example:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

*!*
let clone = structuredClone(user);
*/!*

alert( user.sizes === clone.sizes ); // false, different objects

// user and clone are totally unrelated now
user.sizes.width = 60;    // change a property from one place
alert(clone.sizes.width); // 50, not related
```

<<<<<<< HEAD
Saremmo portati a pensare che la linea `(*)` causi un errore, ma non è così. Il valore di `user` è costante, si riferisce sempre allo stesso oggetto, ma le proprietà dell'oggetto sono libere di cambiare.

In altre parole, `const user` restituisce un errore solo se se proviamo a riassegnare in toto `user=...`.

Detto questo, se vogliamo veramente rendere invariabili le proprietà di un oggetto, possiamo farlo, ma con un metodo totalmente differente. Ne parleremo nel capitolo <info:property-descriptors>.
````
=======
The `structuredClone` method can clone most data types, such as objects, arrays, primitive values.

It also supports circular references, when an object property references the object itself (directly or via a chain or references).

For instance:

```js run
let user = {};
// let's create a circular reference:
// user.me references the user itself
user.me = user;

let clone = structuredClone(user);
alert(clone.me === clone); // true
```

As you can see, `clone.me` references the `clone`, not the `user`! So the circular reference was cloned correctly as well.

Although, there are cases when `structuredClone` fails.

For instance, when an object has a function property:

```js run
// error
structuredClone({
  f: function() {}
});
```

Function properties aren't supported.

To handle such complex cases we may need to use a combination of cloning methods, write custom code or, to not reinvent the wheel, take an existing implementation, for instance [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep) from the JavaScript library [lodash](https://lodash.com).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## Riepilogo

Gli oggetti sono assegnati e copiati per riferimento. In altre parole una variabile non contiene il "valore oggetto" ma un "riferimento" (indirizzo in memoria) di quel valore. Quindi copiando tale variabile o passandola come argomento di una funzione si copia quel riferimento, non l'oggetto stesso.

Tutte le operazioni su un riferimento duplicato (come aggiungere o rimuovere proprietà) hanno effetto sul medesimo oggetto.

<<<<<<< HEAD
Per creare una "vera copia" (clonare) effettuare una cosiddetta "shallow copy" (copia superficiale) con `Object.assign`(gli oggetti nidificati vengo copiati per riferimento), oppure un "deep cloning" (copia profonda) con funzioni tipo [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).
=======
To make a "real copy" (a clone) we can use `Object.assign` for the so-called "shallow copy" (nested objects are copied by reference) or a "deep cloning" function `structuredClone` or use a custom cloning implementation, such as [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
