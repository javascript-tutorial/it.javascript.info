# Export e Import

Le direttive export e import esistono sotto forma di diverse varianti.

Nell'articolo precedente, ne abbiamo visto un utilizzo molto semplice, ora esploriamo più esempi.

## Export prima della dichiarazione

Possiamo etichettare una qualsiasi dichiarazione come esportata, con il prefisso `export`, sia che questa sia una variabile, una funzione o una classe.

Ad esempio, i seguenti exports sono tutti validi:

```js
// esportiamo un array
*!*export*/!* let months = ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// esportiamo una costante
*!*export*/!* const MODULES_BECAME_STANDARD_YEAR = 2015;

// esportiamo una classe
*!*export*/!* class User {
  constructor(name) {
    this.name = name;
  }
}
```

````smart header="Non c'è bisogno del punto e virgola dopo l'export di una classe/funzione"
Da notare che il termine `export` prima di una funzione, non la rende un'[espressione di funzione](info:function-expressions). Rimane sempre una dichiarazione di funzione, viene semplicemente esportata.

Molte *style guides* di JavaScript sconsigliano l'utilizzo del punto e virgola dopo la dichiarazione di una classe o funzione.

Questo è il motivo per cui non c'è alcun bisogno del punto e virgola dopo `export class` e `export function`:

```js
export function sayHi(user) {
  alert(`Hello, ${user}!`);
} *!* // no ; at the end */!*
```

````

## Export oltre alle dichiarazioni

Inoltre, possiamo inserire `export` separatamente.

In questo caso, prima dichiariamo e successivamente esportiamo:

```js
// 📁 say.js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

function sayBye(user) {
  alert(`Bye, ${user}!`);
}

*!*
export {sayHi, sayBye}; // una lista di variabili esportate
*/!*
```

...Oppure, tecnicamente, potremmo inserire `export` anche prima delle dichiarazioni delle funzioni.

## Import *

Solitamente, inseriamo una lista di ciò che vogliamo importare tra le parentesi graffe `import {...}`, in questo modo:

```js
// 📁 main.js
*!*
import {sayHi, sayBye} from './say.js';
*/!*

sayHi('John'); // Hello, John!
sayBye('John'); // Bye, John!
```

Ma nel caso in cui ci fossero molti import, potremmo importare tutto come un oggetto, utilizzando `import * as <obj>`, ad esempio:

```js
// 📁 main.js
*!*
import * as say from './say.js';
*/!*

say.sayHi('John');
say.sayBye('John');
```

A prima vista, "importa tutto" sembra una cosa comoda, veloce da scrivere, quindi perché dovremmo esplicitare una lista di ciò che vogliamo importare?

Ecco alcune ragioni valide.

<<<<<<< HEAD
1. Gli strumenti moderni di build ([webpack](http://webpack.github.io) ed altri) impacchettano i moduli in modo da ottimizzarli, velocizzarne il caricamento e rimuovere le cose inutili.

    Ipotizziamo di aggiungere una libreria di terze parti `say.js` al nostro progetto, che contiene molte funzioni:
    ```js
    // 📁 say.js
    export function sayHi() { ... }
    export function sayBye() { ... }
    export function becomeSilent() { ... }
    ```

    Ora utilizziamo solamente una delle funzioni di `say.js` nel nostro progetto:
    ```js
    // 📁 main.js
    import {sayHi} from './say.js';
    ```
    ...Ora l'ottimizzazione se ne accorgerà e rimuoverà le altre funzioni dal codice compilato, rendendo il pacchetto più piccolo. Questo viene chiamato "tree-shaking".

2. Elencare esplicitamente ciò che vogliamo importare ci fornisce nomi più brevi: `sayHi()` piuttosto di `say.sayHi()`.
3. Elencare esplicitamente ciò che vogliamo importare ci fornisce una migliore visione della struttura del codice: cosa viene utilizzato e dove. Rende la manutenibilità e il refactoring del codice più semplice.
=======
1. Explicitly listing what to import gives shorter names: `sayHi()` instead of `say.sayHi()`.
2. Explicit list of imports gives better overview of the code structure: what is used and where. It makes code support and refactoring easier.

```smart header="Don't be afraid to import too much"
Modern build tools, such as [webpack](https://webpack.js.org/) and others, bundle modules together and optimize them to speedup loading. They also remove unused imports.

For instance, if you `import * as library` from a huge code library, and then use only few methods, then unused ones [will not be included](https://github.com/webpack/webpack/tree/main/examples/harmony-unused#examplejs) into the optimized bundle.
```
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## Import "as"

Possiamo anche utilizzare la keyword `as` per importare con nomi differenti.

Ad esempio, importiamo `sayHi` in una variabile locale `hi` per brevità, e `sayBye` come `bye`:

```js
// 📁 main.js
*!*
import {sayHi as hi, sayBye as bye} from './say.js';
*/!*

hi('John'); // Hello, John!
bye('John'); // Bye, John!
```

## Export "as"

Una sintassi molto simile è disponibile per `export`.

Esportiamo le funzioni come `hi` e `bye`:

```js
// 📁 say.js
...
export {sayHi as hi, sayBye as bye};
```

Ora `hi` e `bye` sono i nomi ufficiali per chi le vede esternamente, quelli da utilizzare per gli import:

```js
// 📁 main.js
import * as say from './say.js';

say.*!*hi*/!*('John'); // Hello, John!
say.*!*bye*/!*('John'); // Bye, John!
```

## Export default

In pratica, esistono principalmente due tipi di moduli.

1. Moduli che contengono una libreria: pacchetti di funzioni, come `say.js` visto sopra.
2. Moduli che dichiarano una singola entità: esempio un modulo `user.js` che esporta solamente `class User`.

Nella maggior parte dei casi, si preferisce il secondo approccio, in modo tale che ogni "cosa" stia nel suo modulo.

Naturalmente, questa pratica richiede l'utilizzo di molti files, poiché ogni cosa richiede il suo modulo, ma questo non è un problema. In realtà, la navigazione del codice diventa più semplice se tutti i file hanno dei nomi descrittivi e sono ben strutturati all'interno di cartelle.

I moduli forniscono una speciale sintassi, `export default` ("export di default"), per rendere la pratica "una cosa per modulo" più elegante.

E' sufficiente inserire `export default` prima dell'entità da esportare:

```js
// 📁 user.js
export *!*default*/!* class User { // aggiungiamo "default"
  constructor(name) {
    this.name = name;
  }
}
```

Può esserci solamente un `export default` per file.

...E possiamo importarlo senza le parentesi graffe:

```js
// 📁 main.js
import *!*User*/!* from './user.js'; // non {User}, semplicemente User

new User('John');
```

Gli import senza parentesi graffe sono più eleganti. Un errore comune quando si inizia ad utilizzare i moduli è quello di dimenticarsi le parentesi graffe. Quindi, ricorda, `import` richiede le parentesi graffe per i named export, ma non le richiedere per i default export.

| Named export | Default export |
|--------------|----------------|
| `export class User {...}` | `export default class User {...}` |
| `import {User} from ...` | `import User from ...`|

Tecnicamente, potremmo avere sia il default che il named export nello stesso modulo, ma in pratica gli sviluppatori non lo fanno. Un modulo può essere named export o default export.

Poiché possiamo utilizzare al massimo un default export per file, l'entità esportata non richiede alcun nome.

Ad esempio, questi sono tutti export default validi:

```js
export default class { // la classe non ha un nome
  constructor() { ... }
}
```

```js
export default function(user) { // la funzione non ha un nome
  alert(`Hello, ${user}!`);
}
```

```js
// esportiamo un valore, senza dichiarare la variabile
export default ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
```

Non dare un nome va bene, poiché abbiamo un solo `export default` per file, quindi `import` senza parentesi graffe, sa cosa importare.

Senza `default`, questo export genererebbe un errore:

```js
export class { // Errore! (non-default export richiedono un nome)
  constructor() {}
}
```

### Il nome di "default"

In alcune situazioni la keyword `default` per fare riferimento al default export.

Ad esempio, per esportare una funzione separatamente dalla sua definizione:

```js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

// equivalente a "export default"
export {sayHi as default};
```

Oppure, un'altra situazione, immaginiamo di avere un modulo `user.js` che esporta una "cosa" di default, ed un paio di altre con nome (accade raramente, ma è possibile):

```js
// 📁 user.js
export default class User {
  constructor(name) {
    this.name = name;
  }
}

export function sayHi(user) {
  alert(`Hello, ${user}!`);
}
```

Vediamo come importare il default export insieme a quello named:

```js
// 📁 main.js
import {*!*default as User*/!*, sayHi} from './user.js';

new User('John');
```

E, infine, se importiamo tutto `*` come un oggetto, allora la proprietà di `default` corrisponde al default export:

```js
// 📁 main.js
import * as user from './user.js';

let User = user.default; // il default export
new User('John');
```

### Una parola contro il default exports

I named export sono espliciti, elencano esattamente il nome di ciò che vogliono importare. Avere in chiaro questa informazione (il nome), è sempre una buona cosa.

I named export ci forzano ad utilizzare il nome esatto di ciò che vogliamo importare:

```js
import {User} from './user.js';
// import {MyUser} non funzionerebbe, il nome deve essere {User}
```

...Mentre per un default export, possiamo decidere il nome in fase di importazione:

```js
import User from './user.js'; // funziona
import MyUser from './user.js'; // funziona
// potrebbe essere anche import Anything... e funzionerebbe comunque
```

Quindi i membri del team possono utilizzare nomi differenti per importare le stesse cose, e questa non è una buona cosa.

Solitamente, per evitare questo problema, e mantenere il codice consistente, ci si pone come regola che le variabili importate debbano corrispondere ai nomi dei file, esempio:

```js
import User from './user.js';
import LoginForm from './loginForm.js';
import func from '/path/to/func.js';
...
```

Ancora, alcuni team ritengono questo uno svantaggio piuttosto serio dei default export. Quindi preferiscono utilizzare i named exports. Anche se viene esportata solamente una cosa, questa viene esportata con un nome, senza `default`.

Questo rende il re-export (vedi sotto) più semplice.

## Re-export

La sintassi di "re-export", `export ... from ...` ci consente di importare cose ed esportarle immediatamente (eventualmente con un altro nome), come nell'esempio:

```js
export {sayHi} from './say.js'; // re-export sayHi

export {default as User} from './user.js'; // re-export default
```

Perché questo dovrebbe essere necessario? Vediamolo con un esempio pratico.

Immaginiamo di scrivere un "package" (pacchetto): una cartella contenente molti moduli, con alcune funzionalità esportate esternamente (strumenti come NPM ci consentono di pubblicare e distribuire questi pacchetti, ma non li utilizzeremo), e con molti moduli che sono semplicemente "helpers", per uso interno in altri moduli del package.

La struttura dei file potrebbe essere qualcosa del genere:
```
auth/
    index.js
    user.js
    helpers.js
    tests/
        login.js
    providers/
        github.js
        facebook.js
        ...
```

Vorremmo poi esporre le funzionalità del package con un singolo entry point (punto di ingresso).

In altre parole, la persona che volesse utilizzare il nostro package, dovrebbe importare solamente il "main file" `auth/index.js`.

Come vediamo qui:

```js
import {login, logout} from 'auth/index.js'
```

Il "main file", `auth/index.js` esporta tutte le funzionalità che vogliamo fornire con il nostro package.

L'idea è che gli esterni, gli altri programmatori che utilizzano il nostro package, non debbano preoccuparsi della struttura interna e o di cercare files tra le cartelle in esso contenute. Esportiamo solamente ciò che è necessario in `auth/index.js` e teniamo il resto nascosto da occhi indiscreti.

Poiché le funzionalità di export sono sparpagliate nel package, possiamo importarle in `auth/index.js` ed esportarle da lì:

```js
// 📁 auth/index.js

// importiamo login/logout e li esportiamo immediatamente
import {login, logout} from './helpers.js';
export {login, logout};

// importiamo default come User e lo esportiamo
import User from './user.js';
export {User};
...
```

Ora, gli utenti del nostro package possono `import {login} from "auth/index.js"`.

La sintassi `export ... from ...` è semplicemente una notazione più breve per questi import-export:

```js
// 📁 auth/index.js
// re-export login/logout
export {login, logout} from './helpers.js';

// re-export il default export as User
export {default as User} from './user.js';
...
```

<<<<<<< HEAD
Un'importante differenza tra `export ... from` e `import/export`, è che i moduli ri-esportati non sono disponibili nel file corrente. Quindi, guardando l'esempio sopra `auth/index.js`, non possiamo utilizzare le funzioni ri-esportate `login/logout`. 
=======
The notable difference of `export ... from` compared to `import/export` is that re-exported modules aren't available in the current file. So inside the above example of `auth/index.js` we can't use re-exported `login/logout` functions.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

### Re-exporting il default export

I default export richiedono una gestione separata quando li ri-esportiamo.

Ipotizziamo di avere `user.js` con `export default class User`, e di volerlo ri-esportare:

```js
// 📁 user.js
export default class User {
  // ...
}
```

Potremmo incontrare due problemi:

1. `export User from './user.js'` non funziona. Genererebbe un errore sintattico.

<<<<<<< HEAD
    Per ri-esportare il default export, dobbiamo scrivere `export {default as User}`, come nell'esempio sopra.
=======
    To re-export the default export, we have to write `export {default as User}`, as in the example above.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

2. `export * from './user.js'` ri-esporta solamente i named exports, ma ignora quelli di default.

<<<<<<< HEAD
    Nel caso in cui volessimo ri-esportare sia i named che i defaul export, allora avremmo bisogno di due istruzioni:
=======
    If we'd like to re-export both named and default exports, then two statements are needed:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
    ```js
    export * from './user.js'; // per ri-esportare i named exports
    export {default} from './user.js'; // per ri-esportare i default export
    ```

Queste stranezze nella ri-esportazione di un default export sono tra le ragioni del per cui alcuni sviluppatori non amano i default export, ma preferiscono quelli named.

## Riepilogo

Vediamo tutti i tipi di `export` che abbiamo studiato in questo articolo e nei precedenti.

Puoi controllarli tu stesso, leggendoli e provando a ricordarne il significato:

- Prima della dichiarazione di una classe/funzione/..:
  - `export [default] class/function/variable ...`
- Export indipendente:
  - `export {x [as y], ...}`.
- Re-export:
  - `export {x [as y], ...} from "module"`
  - `export * from "module"` (non ri-esporta i default export).
  - `export {default [as y]} from "module"` (ri-esporta i default export).

Import:

- Importare Named exports:
  - `import {x [as y], ...} from "module"`
<<<<<<< HEAD
- Importare il default export:  
=======
- Importing the default export:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
  - `import x from "module"`
  - `import {default as x} from "module"`
- Importare tutto:
  - `import * as obj from "module"`
- Importare il modulo (il suo codice viene eseguito), ma senza assegnare i suoi exports ad alcuna variabile:
  - `import "module"`

Possiamo inserire le istruzioni di `import/export` in cima o in coda allo script, non ha importanza.

Quindi, tecnicamente, questo codice funziona:
```js
sayHi();

// ...

import {sayHi} from './say.js'; // import alla fine del file
```

Nella pratica gli import sono posizionati all'inizio del file, ma solo per comodità.

**Da notare che le istruzioni di import/export non funzionano all'interno di `{...}`.**

Un import condizionale, come questo, non funziona:
```js
if (something) {
  import {sayHi} from "./say.js"; // Errore: import deve essere nello scope principale
}
```

...E nel caso in cui volessimo veramente importare qualcosa secondo una condizione? Oppure al momento giusto? Ad esempio, caricando un modulo in seguito ad una richiesta, nel momento in cui è veramente necessario?

Vederemo i dynamic imports nel prossimo articolo.
