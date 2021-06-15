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

1. Prima, controlla se esiste `constructor` in `user`. Niente.
2. Successivamente segue la catena di prototype. Il prototype di `user` è `User.prototype`, e anche qui non c'è un `constructor` (perché ci siamo "dimenticati" di impostarlo!).
3. Seguendo la catena, `User.prototype` è un oggetto semplice, il suo prototype è `Object.prototype`. 
4. Infine, per `Object.prototype`, c'è `Object.prototype.constructor == Object`. Quindi verrà utilizzato.

In conclusione, abbiamo `let user2 = new Object('Pete')`. 

Probabilmente, non è quello che avremmo voluto, ossia creare `new User`, non `new Object`. Questo è il risultato del `costruttore` mancante.

(Nel caso tu sia curioso, la chiamata `new Object(...)` converte il suo argomento in un oggetto. Questa è una cosa teorica, in pratica nessuno chiama `new Object` con un valore, e generalmente non usiamo mai `new Object` per creare oggetti.
