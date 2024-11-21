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

Potremmo immaginare la "variabile oggetto" `user`,  come un foglio di carta con scritto l'indirizzo dell'oggetto.

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

## Clonazione e unione, Object.assign [#cloning-and-merging-object-assign]

Come abbiamo detto, copiare una "variabile oggetto" crea un ulteriore riferimento allo stesso oggetto.

Quindi, come possiamo fare se abbiamo bisogno di duplicare un oggetto? Creare una copia indipendente, un clone?

Anche questo è fattibile, ma con un po' di difficoltà visto che JavaScript non ha alcun metodo integrato per farlo. In realtà non è un'operazione frequente, il più delle volte la copia per riferimento è adatta alla situazione.

Ma se proprio ne abbiamo bisogno, allora dobbiamo creare un nuovo oggetto e replicare la struttura di quello esistente iterando le sue proprietà
e copiandole a livello primitivo.

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

Possiamo anche usare il metodo [Object.assign](mdn:js/Object/assign) .

La sintassi è:

```js
Object.assign(dest, [src1, src2, src3...])
```

- Il primo argomento `dest` è l'oggetto di destinazione.
- Gli argomenti successivi `src1, ..., srcN` (possono essere quanti vogliamo) sono gli oggetti da copiare.
- Il metodo copia tutte le proprietà degli oggetti `src1, ..., srcN` in quello di destinazione `dest`.
- Viene restituito l'oggetto `dest`.

Per fare un esempio, possiamo unire diversi oggetti in uno solo:

```js
let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

*!*
// copia tutte le proprietà da permissions1 e permissions2 in user
Object.assign(user, permissions1, permissions2);
*/!*

// ora user = { name: "John", canView: true, canEdit: true }
```

Se una delle proprietà copiate è già presente nell'oggetto di destinazione, verrà sovrascritta.

```js run
let user = { name: "John" };

Object.assign(user, { name: "Pete" });

alert(user.name); // ora user = { name: "Pete" }
```

Possiamo anche usare `Object.assign` per sostituire il ciclo `for..in` nella clonazione semplice:

```js
let user = {
  name: "John",
  age: 30
};

*!*
let clone = Object.assign({}, user);
*/!*
```

Vengono copiate tutte le proprietà di `user` nell'oggetto vuoto, il quale, poi, viene restituito.

Esistono altri metodi di clonazione di un oggetto, per esempio usando la [spread syntax](info:rest-parameters-spread) `clone = {...user}`, trattato più avanti nel tutorial.

Finora abbiamo assunto che le proprietà di `user` fossero primitive. Ma le proprietà possono anche essere riferimenti ad altri oggetti. Come si fa in questo caso? 

Così:

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

In questo caso non è sufficiente copiare `clone.sizes = user.sizes`. Siccome `user.sizes` è un oggetto, verrà copiato per riferimento. Quindi `clone` e `user` condivideranno lo stesso oggetto "sizes".

Vediamo un esempio:

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

// user e clone condividono sizes
user.sizes.width++;       // cambiamo una proprietà da una parte 
alert(clone.sizes.width); // 51, e vediamo il risultato dall'altra
```

Per risolvere questo problema, dobbiamo usare un ciclo di clonazioni che esaminerà ogni valore di `user[key]` e, nel caso sia un oggetto, replichi anche la sua struttura. Questa operazione è chiamata "deep cloning" (copia profonda).

Per implementare questa funzione possiamo usare la ricorsione. Oppure, per non reinventare la ruota, possiamo usare qualcosa di già pronto, ad esempio [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep) dalla libreria JavaScript [lodash](https://lodash.com).

````smart header="Gli oggetti dichiarati con const possono essere modificati"
Un importante "side effect" della memorizzazione per riferimento è che un oggetto dichiarato con `const` *può* essere modificato.

Esempio:

```js run
const user = {
  name: "John"
};

*!*
user.name = "Pete"; // (*)
*/!*

alert(user.name); // Pete
```

Saremmo portati a pensare che la linea `(*)` causi un errore, ma non è così. Il valore di `user` è costante, si riferisce sempre allo stesso oggetto, ma le proprietà dell'oggetto sono libere di cambiare.

In altre parole, `const user` restituisce un errore solo se se proviamo a riassegnare in toto `user=...`.

Detto questo, se vogliamo veramente rendere invariabili le proprietà di un oggetto, possiamo farlo, ma con un metodo totalmente differente. Ne parleremo nel capitolo <info:property-descriptors>.
````

## Riepilogo

Gli oggetti sono assegnati e copiati per riferimento. In altre parole una variabile non contiene il "valore oggetto" ma un "riferimento" (indirizzo in memoria) di quel valore. Quindi copiando tale variabile o passandola come argomento di una funzione si copia quel riferimento, non l'oggetto stesso.

Tutte le operazioni su un riferimento duplicato (come aggiungere o rimuovere proprietà) hanno effetto sul medesimo oggetto.

Per creare una "vera copia" (clonare) effettuare una cosiddetta "shallow copy" (copia superficiale) con `Object.assign`(gli oggetti nidificati vengo copiati per riferimento), oppure un "deep cloning" (copia profonda) con funzioni tipo [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).
