# Verifica delle classi: "instanceof"

L'operatore `instanceof` ci consente di verificare se un oggetto appartiene ad una specifica classe. Anche l'ereditarietà viene presa in considerazione.

Questo tipo di controllo potrebbe essere necessario in diversi casi. Ad esempio, può essere utilizzato per costruire una funzione *polimorfa*, ossia una funzione che tratta gli argomenti differentemente in base al loro tipo.

## L'operatore instanceof [#ref-instanceof]

La sintassi è:
```js
obj instanceof Class
```

Ritorna `true` se `obj` è di tipo `Class` o è una sua sotto-classe.

Ad esempio:

```js run
class Rabbit {}
let rabbit = new Rabbit();

// è un oggetto di tipo Rabbit?
*!*
alert( rabbit instanceof Rabbit ); // true
*/!*
```

Funziona anche con i costruttori:

```js run
*!*
// invece di usare class
function Rabbit() {}
*/!*

alert( new Rabbit() instanceof Rabbit ); // true
```

...E con le classi integrate come `Array`:

```js run
let arr = [1, 2, 3];
alert( arr instanceof Array ); // true
alert( arr instanceof Object ); // true
```

Da notare che `arr` appartiene anche alla classe `Object`. Questo accade perché `Array` eredita da `Object`.

Normalmente `instanceof` esamina la catena dei prototype per effettuare questa verifica. Possiamo anche definire una logica personalizzata nel metodo statico `Symbol.hasInstance`.

L'algoritmo di `obj instanceof Class` funziona, a grandi linee, in questo modo:

1. Se è stato definito un metodo statico `Symbol.hasInstance`, allora questo verrà invocato: `Class[Symbol.hasInstance](obj)`. Dovrebbe ritornare `true` o `false`, questo è tutto. In questo modo possiamo personalizzare il comportamento di `instanceof`.

    For example:

    ```js run
    // impostiamo il controllo instanceOf in modo che assuma che
    // qualsiasi cosa con la proprietà canEat sia un animale
    class Animal {
      static [Symbol.hasInstance](obj) {
        if (obj.canEat) return true;
      }
    }

    let obj = { canEat: true };

    alert(obj instanceof Animal); // true: Animal[Symbol.hasInstance](obj) è stato invocato
    ```

2. Molte classi non hanno `Symbol.hasInstance`. In questo caso, viene utilizzata la logica standard: `obj instanceOf Class` che controlla se `Class.prototype` equivale ad uno dei prototype nella catena dei prototype di `obj`.

    In altre parole, li confronta tutti uno alla volta:
    ```js
    obj.__proto__ === Class.prototype?
    obj.__proto__.__proto__ === Class.prototype?
    obj.__proto__.__proto__.__proto__ === Class.prototype?
    ...
    // se una di questa è true, allora viene ritornato true
    // altrimenti, una volta arrivati al termine della catena, ritorna false
    ```

    Nell'esempio sopra `rabbit.__proto__ === Rabbit.prototype`, quindi riceviamo immediatamente una risposta.

    In caso di ereditarietà, il riscontro avverrà al secondo passo:

    ```js run
    class Animal {}
    class Rabbit extends Animal {}

    let rabbit = new Rabbit();
    *!*
    alert(rabbit instanceof Animal); // true
    */!*

    // rabbit.__proto__ === Animal.prototype (no match)
    *!*
    // rabbit.__proto__.__proto__ === Animal.prototype (match!)
    */!*
    ```

Qui vediamo raffigurato cosa `rabbit instanceof Animal` confronta con `Animal.prototype`:

![](instanceof.svg)

Comunque, abbiamo a disposizione anche il metodo [objA.isPrototypeOf(objB)](mdn:js/object/isPrototypeOf), che ritorna `true` se `objA` si trova nella catena dei prototype di `objB`. Quindi la verifica `obj instanceof Class` può essere riformulata come `Class.prototype.isPrototypeOf(obj)`.

Un fatto divertente, è che il costruttore stesso della `Class`, non viene coinvolto nella verifica! Solamente la catena dei prototype e `Class.prototype` vengono valutati.

Questo può portare a diverse conseguenze quando la proprietà `prototype` viene modificata dopo la creazione dell'oggetto.

Come nell'esempio:

```js run
function Rabbit() {}
let rabbit = new Rabbit();

// modifichiamo il prototype
Rabbit.prototype = {};

// ...non è pù un rabbit!
*!*
alert( rabbit instanceof Rabbit ); // false
*/!*
```

## Bonus: Object.prototype.toString per il tipo

Sappiamo già che gli oggetti semplici vengono convertiti a stringa come `[object Object]`:

```js run
let obj = {};

alert(obj); // [object Object]
alert(obj.toString()); // lo stesso
```

Questa è la loro implementazione del metodo `toString`. Ma esiste una funzionalità nascosta che rende `toString` molto più potente di cosi. Possiamo utilizzarlo come un'estensione di `typeof` e come alternativa di `instanceof`.

Sembra strano? Lo è! Capiamo perché.

Secondo le [specifiche](https://tc39.github.io/ecma262/#sec-object.prototype.tostring), il metodo integrato `toString` può essere estratto dall'oggetto ed eseguito nel contesto di un qualsiasi altro valore. Ed il suo risultato dipende da quel valore.

- Per un numero, sarà `[object Number]`
- Per un boolean, sarà `[object Boolean]`
- Per `null`: `[object Null]`
- Per `undefined`: `[object Undefined]`
- Per gli array: `[object Array]`
- ...etc (personalizzabile).

Dimostriamolo:

```js run
// copiamo il metodo toString in una variabile per comodità
let objectToString = Object.prototype.toString;

// di che tipo è questo?
let arr = [];

alert( objectToString.call(arr) ); // [object *!*Array*/!*]
```

Qui abbiamo utilizzato [call](mdn:js/function/call) come descritto nel capitolo [](info:call-apply-decorators) per eseguire la funzione `objectToString` nel contesto `this=arr`.

Internamente, l'algoritmo `toString` esamina `this` e ritorna il risultato corrispondente. Altri esempi:

```js run
let s = Object.prototype.toString;

alert( s.call(123) ); // [object Number]
alert( s.call(null) ); // [object Null]
alert( s.call(alert) ); // [object Function]
```

### Symbol.toStringTag

Il comportamento di Object `toString` può essere personalizzato utilizzando una proprietà speciale dell'oggetto `Symbol.toStringTag`.

Ad esempio:

```js run
let user = {
  [Symbol.toStringTag]: "User"
};

alert( {}.toString.call(user) ); // [object User]
```

Per molti oggetti specifici di un ambiente, esiste questa proprietà. Qui vediamo alcuni esempi specifici per il browser:

```js run
// toStringTag per l'oggetto specifico d'ambiente:
alert( window[Symbol.toStringTag]); // Window
alert( XMLHttpRequest.prototype[Symbol.toStringTag] ); // XMLHttpRequest

alert( {}.toString.call(window) ); // [object Window]
alert( {}.toString.call(new XMLHttpRequest()) ); // [object XMLHttpRequest]
```

Come potete vedere, il risultato è esattamente `Symbol.toStringTag` (se esiste), racchiuso in `[object ...]`.

Al termine avremo "typeof on steroids" che non funziona solamente con i tipi di dato primitivo, ma anche con gli oggetti integrati, inoltre può essere personalizzato.

Possiamo utilizzare `{}.toString.call` piuttosto di `instanceof` per gli oggetti integrati quando vogliamo ottenerne il tipo come stringa invece di effettuare una semplice verifica.

## Riepilogo

Ricapitoliamo i metodi di verifica del tipi:

|               | funzionano con   |  ritorna      |
|---------------|-------------|---------------|
| `typeof`      | primitivi  |  stringa       |
| `{}.toString` | primitivi, oggetti integrati, oggetti con `Symbol.toStringTag`   |       stringa |
| `instanceof`  | oggetti     |  true/false   |

Come possiamo vedere, `{}.toString` è tecnicamente più avanzato di `typeof`.

Invece l'operatore `instanceof` funziona veramente bene quando lavoriamo con una classe e vogliamo controllarne l'ereditarietà.
