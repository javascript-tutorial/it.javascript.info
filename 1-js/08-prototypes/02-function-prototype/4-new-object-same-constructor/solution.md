Possiamo utilizzare questo approccio se siamo sicuri che il `"constructor"` possiede il valore corretto.

Ad esempio, se non tocchiamo il `"prototype"` di default, allora il codice funzionerà di sicuro:

```js run
function User(name) {
  this.name = name;
}

let user = new User('John');
let user2 = new user.constructor('Pete');

alert( user2.name ); // Pete (ha funzionato!)
```

Ha funzionato, poiché `User.prototype.constructor == User`.

..Ma se qualcuno, per un qualsiasi motivo, sovrascrivesse `User.prototype` e dimenticasse di ricreare il `constructor` di riferimento a `User`,  allora fallirebbe.

Ad esempio:

```js run
function User(name) {
  this.name = name;
}
*!*
User.prototype = {}; // (*)
*/!*

let user = new User('John');
let user2 = new user.constructor('Pete');

alert( user2.name ); // undefined
```

Perché `user2.name` è `undefined`?

Ecco come `new user.constructor('Pete')` funziona:

<<<<<<< HEAD
1. Prima, controlla se esiste `constructor` in `user`. Niente.
2. Successivamente segue la catena di prototype. Il prototype di `user` è `User.prototype`, e anche qui non c'è nulla.
3. Il valore di `User.prototype` è un oggetto semplice `{}`, il suo prototype è `Object.prototype`. E c'è un `Object.prototype.constructor == Object`. Quindi verrà utilizzato.

In conclusione, abbiamo `let user2 = new Object('Pete')`. Il costruttore integrato di `Object` ignora gli argomenti, crea sempre un oggetto vuoto, in maniera simile a `let user2 = {}`, questo è ciò che abbiamo in `user2` alla fine di tutto.
=======
1. First, it looks for `constructor` in `user`. Nothing.
2. Then it follows the prototype chain. The prototype of `user` is `User.prototype`, and it also has no `constructor` (because we "forgot" to set it right!).
3. Going further up the chain, `User.prototype` is a plain object, its prototype is the built-in `Object.prototype`. 
4. Finally, for the built-in `Object.prototype`, there's a built-in `Object.prototype.constructor == Object`. So it is used.

Finally, at the end, we have `let user2 = new Object('Pete')`. 

Probably, that's not what we want. We'd like to create `new User`, not `new Object`. That's the outcome of the missing `constructor`.

(Just in case you're curious, the `new Object(...)` call converts its argument to an object. That's a theoretical thing, in practice no one calls `new Object` with a value, and generally we don't use `new Object` to make objects at all).
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
