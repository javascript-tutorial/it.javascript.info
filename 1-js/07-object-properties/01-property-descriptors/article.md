
# Attributi e descrittori di proprietà

Come già sappiamo, gli oggetti possono memorizzare proprietà.

Fino ad ora, per noi, una proprietà è sempre stata una coppia "chiave-valore". Ma in realtà, una proprietà è molto più potente e flessibile di cosi.

In questo capitolo studieremo ulteriori opzioni di configurazione, e nel prossimo vedremo come trasformarle in funzioni getter/setter.

## Attributi di proprietà

Le proprietà degli oggetti, oltre ad un **`valore`**, possiedono tre attributi speciali (cosi detti "flags", o "bandiere"):

- **`writable`** -- se impostato a `true`, il valore può essere modificato, altrimenti è possibile accedervi in sola lettura.
- **`enumerable`** -- se impostato a `true`, appare nei loop, altrimenti non verrà considerata.
- **`configurable`** -- se impostato a `true`, la proprietà può essere cancellata e questi attributi possono essere modificati.

Non li abbiamo mai visti fino ad ora, perché generalmente non vengono mostrati. Quando creiamo una proprietà in "modo ordinario", questi attributi vengono tutti impostati a `true`. Ma possiamo comunque modificarli in qualsiasi momento.

Come prima cosa, vediamo come poter accedere a questi attributi.

Il metodo [Object.getOwnPropertyDescriptor](mdn:js/Object/getOwnPropertyDescriptor) ritorna *tutte* le informazioni riguardo una proprietà.

La sintassi:
```js
let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
```

`obj`
: L'oggetto da cui vogliamo ottenere le informazioni.

`propertyName`
: Il nome della proprietà.

Il valore ritornato viene chiamato "descrittore di proprietà" dell'oggetto: contiene il valore della proprietà e tutti i suoi attributi.

Ad esempio:

```js run
let user = {
  name: "John"
};

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/* descrittore di proprietà:
{
  "value": "John",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
*/
```

Per modificare gli attributi possiamo utilizzare [Object.defineProperty](mdn:js/Object/defineProperty).

La sintassi:

```js
Object.defineProperty(obj, propertyName, descriptor)
```

`obj`, `propertyName`
: L'oggetto e la proprietà a cui applicare il descrittore.

`descriptor`
: Oggetto *descriptor* da utilizzare.

Se la proprietà esiste, `defineProperty` aggiornerà l'attributo. Altrimenti, creerà la proprietà con il valore e gli attributi forniti; se un attributo non viene fornito, gli verrà assegnato il valore `false`.

Ad esempio, qui creiamo una proprietà `name` con tutti gli attributi `false`:

```js run
let user = {};

*!*
Object.defineProperty(user, "name", {
  value: "John"
});
*/!*

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": "John",
*!*
  "writable": false,
  "enumerable": false,
  "configurable": false
*/!*
}
 */
```

Confrontandola con la proprietà "creata normalmente" `user.name` vista sopra, ora tutti gli attributi sono `false`. Se questo non è ciò che vogliamo, allora dovremmo impostarli a `true` tramite il `descriptor`.

Ora analizziamo gli effetti degli attributi guardando alcuni esempi.

## Non-writable

Vediamo come rendere `user.name` *non-writable* (la variabile non può essere riassegnata) modificando l'attributo `writable`:

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
*!*
  writable: false
*/!*
});

*!*
user.name = "Pete"; // Error: Cannot assign to read only property 'name'
*/!*
```

Ora nessuno potrà modificare il nome dell'utente, a meno che non vada a sovrascrivere il valore degli attributi con `defineProperty`.

<<<<<<< HEAD
```smart header="Gli errori verranno mostrati solamente in strict mode"
Se non siamo in "strict mode", e tentiamo di sovrascrivere una proprietà non-writable, non verrà mostrato alcun errore. Nonostante non venga mostrato l'errore, l'operazione fallirà comunque. Quindi le violazioni di attributi fuori dalla strict mode verranno silenziosamente  ignorate.
=======
```smart header="Errors appear only in strict mode"
In non-strict mode, no errors occur when writing to non-writable properties and such. But the operation still won't succeed. Flag-violating actions are just silently ignored in non-strict.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

Qui vediamo lo stesso esempio, ma la proprietà viene creata dal nulla:

```js run
let user = { };

Object.defineProperty(user, "name", {
*!*
  value: "John",
  // per le nuove proprietà dobbiamo esplicitare quali attributi sono true
  enumerable: true,
  configurable: true
*/!*
});

alert(user.name); // John
user.name = "Pete"; // Error
```

## Non-enumerable

Ora proviamo ad aggiungere un metodo `toString` ad `user`.

Normalmente, la funzione *built-in* (integrata) `toString` , per gli oggetti è non-enumerable, quindi non verrà mostrata nei cicli come `for..in`. Ma se proviamo ad aggiungere una nostra definizione di `toString`, allora questa verrà mostrata nei cicli `for..in`, come nell'esempio:

```js run
let user = {
  name: "John",
  toString() {
    return this.name;
  }
};

// Di default, entrambe le proprietà verranno elencate
for (let key in user) alert(key); // name, toString
```

Se non è ciò che ci aspettiamo, possiamo impostare l'attributo `enumerable:false`. In questo modo non verrà più mostrata nei cicli `for..in`, proprio come la funzione  già integrata (definita da Javascript):

```js run
let user = {
  name: "John",
  toString() {
    return this.name;
  }
};

Object.defineProperty(user, "toString", {
*!*
  enumerable: false
*/!*
});

*!*
// In questo modo la nostra funzione toString sparirà
*/!*
for (let key in user) alert(key); // name
```

Non-enumerable properties are also excluded from `Object.keys`:

```js
alert(Object.keys(user)); // name
```

## Non-configurable

L'attributo non-configurable (`configurable:false`) è talvolta preimpostato negli oggetti e nelle proprietà integrate.

Una proprietà *non-configurable* non può essere cancellata.

Ad esempio, `Math.PI` è *non-writable*, *non-enumerable* e *non-configurable*:

```js run
let descriptor = Object.getOwnPropertyDescriptor(Math, 'PI');

alert( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": 3.141592653589793,
  "writable": false,
  "enumerable": false,
  "configurable": false
}
*/
```
Quindi, uno sviluppatore non sarà in grado di cambiare il valore `Math.PI` o di sovrascriverlo.

```js run
Math.PI = 3; // Error, because it has writable: false

// e nemmeno la cancellazione di Math.PI funzionerebbe
```

Rendere una proprietà *non-configurable* è una "strada a senso unico". Non possiamo tornare indietro tramite `defineProperty`.

Per essere precisi, l'attributo non-configurable impone diverse restrizioni a `defineProperty`:
1. Non possiamo modificare l'attributo `configurable`.
2. Non possiamo modificare l'attributo `enumerable`.
3. Non possiamo modificare l'attributo da `writable: false` a `true` (possiamo invece modificarlo da `true` a `false`).
4. Non possiamo modificare le funzioni di accesso `get/set` (ma possiamo assegnarle nel caso non siano definite).

**L'idea alla base di "configurable: false" è quella di prevenire la modifica e la rimozione degli attributi di una proprietà, permettendo comunque la modifica del suo valore.**

In questo esempio `user.name` è *non-configurable*, ma possiamo comunque modificarlo (poiché è *writable*):

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
  configurable: false
});

user.name = "Pete"; // Funziona senza errori
delete user.name; // Error
```

Qui invece "sigilliamo" per sempre `user.name` rendendolo un valore costante:

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
  writable: false,
  configurable: false
});

// non saremo in grado di modificare user.name o i suoi attribti
// nessuna delle seguenti istruzioni funzionerà
user.name = "Pete";
delete user.name;
Object.defineProperty(user, "name", { value: "Pete" });
```

```smart header="The only attribute change possible: writable true -> false"
There's a minor exception about changing flags.

We can change `writable: true` to `false` for a non-configurable property, thus preventing its value modification (to add another layer of protection). Not the other way around though.
```

## Object.defineProperties

Utilizzando il metodo [Object.defineProperties(obj, descriptors)](mdn:js/Object/defineProperties) abbiamo la possibilità di definire più proprietà alla volta.

La sintassi è:

```js
Object.defineProperties(obj, {
  prop1: descriptor1,
  prop2: descriptor2
  // ...
});
```

Ad esempio:

```js
Object.defineProperties(user, {
  name: { value: "John", writable: false },
  surname: { value: "Smith", writable: false },
  // ...
});
```

In questo modo siamo in grado di impostare più proprietà in una volta sola.

## Object.getOwnPropertyDescriptors

Per ottenere tutti i descrittori di una proprietà, possiamo utilizzare il metodo [Object.getOwnPropertyDescriptors(obj)](mdn:js/Object/getOwnPropertyDescriptors).

Il metodo `Object.defineProperties`  può essere utilizzato per clonare un oggetto mantenendo gli attributi delle sue proprietà:

```js
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
```

Normalmente, quando cloniamo un oggetto, utilizziamo l'assegnazione per copiarne le proprietà, come nell'esempio:

```js
for (let key in user) {
  clone[key] = user[key]
}
```

...Ma in questo modo non stiamo copiando gli attributi. Quindi per una clonazione più completa, l'utilizzo di `Object.defineProperties` è la scelta migliore.

<<<<<<< HEAD
Un'altra differenza è che `for..in` ignora le proprietà di tipo `symbol`, mentre `Object.getOwnPropertyDescriptors` ritorna *tutti* i descrittori, inclusi quelli di tipo symbol.
=======
Another difference is that `for..in` ignores symbolic and non-enumerable properties, but `Object.getOwnPropertyDescriptors` returns *all* property descriptors including symbolic and non-enumerable ones.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## Sigillare un oggetto globalmente

I descrittori di proprietà permettono di lavorare a livello di proprietà.

Esistono però diversi metodi in grado di limitare l'accesso *all'intero* oggetto:

[Object.preventExtensions(obj)](mdn:js/Object/preventExtensions)
: Vieta di aggiungere nuove proprietà all'oggetto.

[Object.seal(obj)](mdn:js/Object/seal)
: Vieta di aggiungere/rimuovere proprietà, ed imposta `configurable: false` su tutte le proprietà già esistenti dell'oggetto.

[Object.freeze(obj)](mdn:js/Object/freeze)
: Vieta di aggiungere/rimuovere/modificare le proprietà dell'oggetto. Imposta `configurable: false, writable: false` su tutte le proprietà già esistenti dell'oggetto.

Ed esistono anche dei metodi per verificare lo stato degli attributi di un oggetto:

[Object.isExtensible(obj)](mdn:js/Object/isExtensible)
: Ritorna `false` se è vietato aggiungere nuove proprietà, altrimenti ritorna `true`.

[Object.isSealed(obj)](mdn:js/Object/isSealed)
: Ritorna `true` se è vietato aggiungere/rimuovere proprietà, e tutte le altre proprietà sono impostate a `configurable: false`.

[Object.isFrozen(obj)](mdn:js/Object/isFrozen)
: Ritorna `true` se è vietato aggiungere/rimuovere/modificare proprietà, e tutte le altre proprietà sono impostate a `configurable: false, writable: false`.

In pratica, tuttavia, questi metodi sono utilizzati molto raramente.
