
# Moduli, introduzione

Quando la nostra applicazione cresce di dimensione, vogliamo dividerla in diversi file, chiamati "moduli"(modules). Un modulo solitamente contiene una classe o una libreria di funzioni.

Per molto tempo JavaScript è esistito senza una vera sintassi per i moduli nel linguaggio. Questo non era un problema, dato che inizialmente gli script erano piccoli e semplici, e quindi non ce n'era esigenza.

Ma gli script man mano diventarono più grandi e complessi, di conseguenza la comunità inventò vari sistemi per organizzare il codice in moduli, come librerie speciali che gestivano il caricamento di moduli su richiesta.

Per esempio:

- [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition) -- uno dei più vecchi sistemi per la gestione di moduli, inizialmente implementato dalla libreria [require.js](http://requirejs.org/).
- [CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1) -- il sistema per la gestione di moduli creato per node.js server.
- [UMD](https://github.com/umdjs/umd) -- un'altro sistema di gestione di moduli, che è stato suggerito come metodo universale, compativile sia con AMD sia con CommonJS.

Ormai tutti questi sistemi vengono lentamente abbandonati, anche se ancora possono essere trovati in vecchi script.

Il sistema per la gestione dei moduli nel linguaggio è stato standardizzato nel 2015, e si è gradualmente evoluto da quel momento in poi. Ora è supportato da tutti i browser principali e all'interno di node.js, da adesso in poi sarà questo il sistema che studieremo.

## Che cos'è un modulo?

Un modulo è semplicemente un file. Uno script è un modulo.

I moduli possono caricarsi a vicenda e utilizzare speciali direttive `export` e `import` per scambiarsi funzionalità, chiamando le funzioni da un modulo all'altro:

<<<<<<< HEAD
- `export` contrassegna variabili e funzioni che devono essere accessibili dall'esterno del modulo.
- `import` permette d'importare funzionalità da altri moduli.
=======
- `export` keyword labels variables and functions that should be accessible from outside the current module.
- `import` allows the import of functionality from other modules.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

Ad esempio, se abbiamo un file `sayHi.js` possiamo rendere utilizzabile all'esterno la funzione(esportarla) in questo modo:

```js
// 📁 sayHi.js
export function sayHi(user) {
  alert(`Ciao, ${user}!`);
}
```

...Successivamente un'altro file può importarla e usarla in questo modo:

```js
// 📁 main.js
import {sayHi} from './sayHi.js';

alert(sayHi); // function...
sayHi('John'); // Ciao, John!
```

<<<<<<< HEAD
La direttiva `import` carica il modulo presente al percorso `./sayHi.js`, relativamente al file corrente, e assegna la funzione esportata `sayHi` alla variabile corrispondente.
=======
The `import` directive loads the module by path `./sayHi.js` relative to the current file, and assigns exported function `sayHi` to the corresponding variable.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

Ora proviamo ad utilizzare l'esempio all'interno del browser.

<<<<<<< HEAD
Dato che i moduli utilizzano parole chiavi e funzionalità speciali, dobbiamo comunicare al browser che lo script deve essere trattato come un modulo, utilizzando l'attributo `<script type="module">`.
=======
As modules support special keywords and features, we must tell the browser that a script should be treated as a module, by using the attribute `<script type="module">`.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

In questo modo:

[codetabs src="say" height="140" current="index.html"]

Il browser recupera ed elabora automaticamente il modulo importato (e i suoi import se necessario), e infine esegue lo script.

## Funzionalità principali dei moduli

Cosa c'è di diverso nei moduli rispetto ai "normali" script?

Ci sono delle funzionalità aggiunte, valide sia per codice JavaScript all'interno dei browser sia per quello eseguito lato server.

### Hanno sempre "use strict"

I moduli utilizzano sempre `use strict`, automaticamente. Ad esempio assegnare un valore ad una variabile non dichiarata genera un'errore.

```html run
<script type="module">
  a = 5; // error
</script>
```

### Visibilità delle variabili (scope) all'interno dei moduli

Ogni modulo ha la propria visibilità delle variabili di massimo livello. In altre parole le variabili dichiarate a livello maggiore all'interno di un modulo non sono visibili negli altri script.

Nell'esempio seguente, due script sono stati importati, `hello.js` prova ad utilizzare la variabile `user` dichiarata in `user.js`, ma fallisce:

[codetabs src="scopes" height="140" current="index.html"]

I moduli devono esportare con `export` quello che vogliono rendere accessibile all'esterno e devono importare con `import` quello di cui hanno bisogno.

Quindi dobbiamo importare `user.js` all'interno di `hello.js`e prendere la funzionalità che ci servono da esso senza basarci sulle variabili globali.

<<<<<<< HEAD
Questa è la versione corretta:
=======
This is the correct variant:
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

[codetabs src="scopes-working" height="140" current="hello.js"]

All'interno del browser esiste uno scope di livello massimo all'interno di ogni `<script type="module">`:

```html run
<script type="module">
  // Le variabili saranno visibili sono all'interno di questo modulo
  let user = "John";
</script>

<script type="module">
  *!*
  alert(user); // Errore: la variabile user non è definita
  */!*
</script>
```

Se abbiamo realmente la necessità di dichiarare una variabile globale all'interno del browser possiamo assegnarla a `window` e accederci attraverso `window.user`. Questa è un'eccezione che dovrebbe essere usata solo se ci sono delle buone ragioni.

### Un modulo viene eseguito solo la prima volta che viene importato

Se uno stesso modulo verrà importato varie volte in più posti, il suo codice verrà eseguito solo la prima volta, successivamente le variabili e le funzioni esportate saranno assegnate a tutti i moduli che lo importano.

<<<<<<< HEAD
Questo ha delle conseguenze importanti. Vediamo degli esempi.
=======
That has important consequences. Let's look at them using examples:
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

Prima di tutto, se eseguire un modulo ha altri effetti, come far apparire un messaggio, importare quel modulo più volte lo farà apparire solamente una volta, la prima:

```js
// 📁 alert.js
alert("Il modulo è stato eseguito!");
```

```js
// Importiamo lo stesso modulo in file diversi

// 📁 1.js
import `./alert.js`; // Il modulo è stato eseguito!

// 📁 2.js
import `./alert.js`; // (non appare nulla)
```

Il pratica, il codice a livello maggiore di un modulo viene principalmente usato per inizializzarlo, creare la struttura dei dati interni e, se vogliamo qualcosa di riutilizzabile, esportarlo con `export`.

Vediamo adesso un esempio più complesso.

Prendiamo in considerazione un modulo che exporta un oggetto:

```js
// 📁 admin.js
export let admin = {
  name: "John"
};
```

Nel momento che questo modulo viene importato in più file viene comunque eseguito una sola volta, l'oggetto `admin` viene creato e poi passato a tutti i moduli che lo hanno importato.

Tutti quindi ottengono esattamente lo stesso oggetto `admin`:

```js
// 📁 1.js
import {admin} from './admin.js';
admin.name = "Pete";

// 📁 2.js
import {admin} from './admin.js';
alert(admin.name); // Pete

*!*
// Entrambi 1.js e 2.js ottengono lo stesso ogetto
// I cambiamenti fatti in 1.js sono visibili in 2.js
*/!*
```

Facendo un punto della situazione, il modulo viene eseguito una sola volta. Tutto quello esportato con `export` viene generato, e successivamente viene condiviso con tutti quelli che lo hanno importato, di conseguenza ogni cambiamento fatto sull'oggetto `admin` verrà visto anche dagli altri moduli.

<<<<<<< HEAD
Questo comportamento ci permette di *configurare* i moduli quando vengono importati la prima volta. Possiamo configurare le proprietà una volta, e saranno pronte per tutti gli altri import successivi.

Per fare un esempio, il modulo `admin.js` può fornire alcune funzionalità ma si aspetta di ricevere le credenziali all'interno dell'oggetto `admin` dall'esterno:
=======
Such behavior allows us to *configure* modules on first import. We can setup its properties once, and then in further imports it's ready.

For instance, the `admin.js` module may provide certain functionality, but expect the credentials to come into the `admin` object from outside:
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

```js
// 📁 admin.js
export let admin = { };

export function sayHi() {
  alert(`Sono pronto, ${admin.name}!`);
}
```

All'interno di `init.js`, il primo script della nostra app, impostiamo `admin.name`. In questo modo sarà visibile a tutti, comprese le chiamate fatte all'interno di `admin.js` stesso:

```js
// 📁 init.js
import {admin} from './admin.js';
admin.name = "Pete";
```

Un'altro modulo può comunque vedere `admin.name`:

```js
// 📁 other.js
import {admin, sayHi} from './admin.js';

alert(admin.name); // *!*Pete*/!*

sayHi(); // Sono pronto, *!*Pete*/!*!
```

### import.meta

L'oggetto `import.meta` contiene le informazioni riguardanti il modulo corrente.

Il suo contenuto dipende dall'ambiente di esecuzione. Nel browser, contiene l'URL dello script o dell'attuale pagina web se inserito all'interno dell'HTML

```html run height=0
<script type="module">
  alert(import.meta.url); // script url (l'url della pagina html per gli script in linea)
</script>
```

### All'interno di un modulo, "this" non è definito (undefined)

Questa è una funzionalità minore, ma per completezza dobbiamo menzionarla.

In un modulo, Il `this` di livello maggiore non è definito (undefined).

Facciamo il confronto con uno script che non è un modulo, dove `this` è un oggetto globale.

```html run height=0
<script>
  alert(this); // window
</script>

<script type="module">
  alert(this); // undefined
</script>
```

## Funzionalità specifiche nel browser

Ci sono diverse funzionalità specifiche dei moduli utilizzati all'interno del browser con `type="module"`.

Potresti voler saltare questa sezione se stai leggedo per la prima volta , oppure se non hai intenzione di usare JavaScript all'interno del browser.

### I moduli sono caricati in modo differito

I moduli vengono *sempre* reputati script differiti, stesso effetto dell'attributo `defer` (descritto nel capitolo [](info:script-async-defer)) sia per gli script esterni che per quelli interni.

<<<<<<< HEAD
In altre parole:
- Il download di un modulo esterno `<script type="module" src="...">` non blocca l'elaborazione dell'HTML, vengono caricati in parallelo insieme alle altre risorse.
- I moduli attendono fino al momento in cui l'HTML è pronto (anche se sono molto piccoli e possono essere elaborati più velocemente dell'HTML), e poi vengono eseguiti.
- L'ordine relativo degli script viene mantenuto: gli script che appaiono prima nel documento vengono eseguiti per primi.
=======
In other words:
- downloading external module scripts `<script type="module" src="...">` doesn't block HTML processing, they load in parallel with other resources.
- module scripts wait until the HTML document is fully ready (even if they are tiny and load faster than HTML), and then run.
- relative order of scripts is maintained: scripts that go first in the document, execute first.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

Come conseguenza, i moduli "vedono" sempre la pagina HTML completamente caricata, inclusi gli elementi sotto di essi.

Ad esempio:

```html run
<script type="module">
*!*
  alert(typeof button); // Object: lo script può 'vedere' il bottone sottostante
*/!*
  // dato che il modulo viene caricato in modo differito, viene eseguito solo dopo che l'intera pagina è stata caricata
</script>

Confrontiamo lo script normale:

<script>
*!*
  alert(typeof button); // Error: button is undefined, lo scripr non riesce a vedere il bottone
*/!*
  // Gli script normali vengono eseguiti immediatamente, prima che il resto della pagina venga processata
</script>

<button id="button">Button</button>
```

<<<<<<< HEAD
Da notare: il secondo script viene eseguito per primo! Infatti vedremo prima `undefined`, e dopo `object`.

Questo accade proprio perché i moduli sono differiti, e quindi attendono che tutto il documento venga processato, al contrario, gli script normali vengono eseguiti immediatamente e di conseguenza vediamo l'output del secondo script per primo.

Quando utilizziamo i moduli, dobbiamo porre attenzione al fatto che la pagina HTML appare mentre viene caricata, e i moduli JavaScript vengono eseguiti successivamente al caricamento, di conseguenza l'utente potrebbe vedere la pagina *prima* che l'applicazione JavaScript sia pronta. Alcune funzionalità potrebbero in questo modo non funzionare immediatamente. Per questo motivo è opportuno inserire degli indicatori di caricamento, o comunque assicurarci che i visitatori non vengano confusi da questi possibili comportamenti.
=======
Please note: the second script actually runs before the first! So we'll see `undefined` first, and then `object`.

That's because modules are deferred, so we wait for the document to be processed. The regular script runs immediately, so we see its output first.

When using modules, we should be aware that the HTML page shows up as it loads, and JavaScript modules run after that, so the user may see the page before the JavaScript application is ready. Some functionality may not work yet. We should put "loading indicators", or otherwise ensure that the visitor won't be confused by that.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

### Async funziona sui moduli scritti inline

<<<<<<< HEAD
Per gli script normali l'attributo `async` funziona solamente sugli script esterni, Gli script caricati in modo asincrono (Async) vengono eseguiti immediatamente e indipendentemente dagli altri script e del documento HTML.

Per i moduli `async` può essere utilizzato sempre.

Ad esempio, lo script seguente è dichiarato asincrono, e quindi non aspetta nulla e viene eseguito.

Esegue l'import (recupera `./analytics.js`) e procede quando è pronto, anche se il documento HTML non è completo, o se gli altri script sono ancora in attesa.
=======
For non-module scripts, the `async` attribute only works on external scripts. Async scripts run immediately when ready, independently of other scripts or the HTML document.

For module scripts, it works on inline scripts as well.

For example, the inline script below has `async`, so it doesn't wait for anything.

It performs the import (fetches `./analytics.js`) and runs when ready, even if the HTML document is not finished yet, or if other scripts are still pending.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

Questo comportamento è ottimo per le funzionalità che non dipendono da nulla, come contatori, pubblicità e altro.

```html
<!-- tutte le dipendenze vengono recuperate (analytics.js),e lo script viene eseguito -->
<!-- non aspetta che il documento o altri <script> tag siano pronti -->
<script *!*async*/!* type="module">
  import {counter} from './analytics.js';

  counter.count();
</script>
```

### Script esterni

Gli script esterni che vengono segnalati come moduli, `type="module"`, sono diversi sotto due aspetti:

<<<<<<< HEAD
1. Più script esterni con lo stesso `src` vengono eseguiti solo una volta:
=======
1. External scripts with the same `src` run only once:
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080
    ```html
    <!-- lo script my.js viene recuperato ed eseguito solo una volta -->
    <script type="module" src="my.js"></script>
    <script type="module" src="my.js"></script>
    ```

2. Gli script esterni che vengono recuperati da origini diverse (ad esempio un sito diverso) hanno bisogno delle intestazioni [CORS](mdn:Web/HTTP/CORS), come descritto nel capitolo <info:fetch-crossorigin>. In altre parole, se un modulo viene recuperato da un'altra fonte il server remoto deve fornire un header (intestazione) `Access-Control-Allow-Origin` dandoci il "permesso" di recuperare lo script.
    ```html
    <!-- another-site.com deve fornire Access-Control-Allow-Origin -->
    <!-- altrimenti lo script non verrà eseguito -->
    <script type="module" src="*!*http://another-site.com/their.js*/!*"></script>
    ```

    Questo meccanismo permette di avere una maggiore sicurezza.

### Non è possibile usare moduli "bare"

All'interno del browser, `import` accetta percorsi URL relativi o assoluti. Moduli senza nessun percorso specificato vengono chiamati moduli "bare". Questi moduli non vengono accettati da `import` all'interno del browser.

Ad esempio, questo `import` non è valido:
```js
import {sayHi} from 'sayHi'; // Errore, modulo "bare"
// Il modulo deve avere un percorso, es. './sayHi.js' od ovunque si trovi il modulo
```

<<<<<<< HEAD
Alcuni ambienti, come Node.js o tools per creare bundle accettano moduli bare, senza nessun percorso (path), dato che hanno metodologie per trovare e collegare i moduli. Al contrario i browser ancora non supportano i moduli bare.
=======
Certain environments, like Node.js or bundle tools allow bare modules, without any path, as they have their own ways for finding modules and hooks to fine-tune them. But browsers do not support bare modules yet.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

### Compatibilità, "nomodule"

<<<<<<< HEAD
I vecchi browser non comprendono l'attributo `type="module"`. Gli script di una tipologia non conosciuta vengono semplicemente ignorati. Proprio per questo è possibile prevedere uno script di riserva usando l'attributo `nomodule`:
=======
Old browsers do not understand `type="module"`. Scripts of an unknown type are just ignored. For them, it's possible to provide a fallback using the `nomodule` attribute:
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

```html run
<script type="module">
  alert("Viene eseguito nei browser moderni");
</script>

<script nomodule>
  alert("I browser moderni conoscono sia type=module sia nomodule, quindi ignorano questo script")
  alert("I browser più vecchi ignorano i tipi di script che non conoscono come type=module, ma eseguono questo");
</script>
```

## Strumenti per il building

Nella realtà, i moduli vengono raramente usati all'interno del browser in modo diretto. Normalmente, vengono uniti insieme con tool specifici come [Webpack](https://webpack.js.org/) e portati nel server di produzione.

Uno dei benefici di usare i "bundlers" -- ci permettono più controllo su come i moduli vengono gestiti, ad esempio permettendoci di usare moduli "bare" e moduli CSS/HTML.

I tool per il building si comportano nel modo seguente:

<<<<<<< HEAD
1. Prendono un modulo "principale", quello che era inteso per essere inserito in `<script type="module">`.
2. Analizza tutte le sue dipendenze: che moduli importa, cosa viene importato dai metodi importati etc...
3. Costruisce un singolo file con tutti i moduli (o più file, può essere impostato), sostituendo le chiamate `import` con funzioni del bundler. In questo modo può supportare anche moduli "speciali" come quelli CSS/HTML.
4. Durante il processo altre trasformazioni e ottimizzazioni possono essere eseguite:
    - Parti di codice che non possono essere raggiunte vengono eliminate.
    - `export` non utilizzati vengono rimossi ("tree-shaking").
    - Parti di codice tipicamente utilizzati durante lo sviluppo come `console` e `debugger` rimosse.
    - Le sintassi più moderne di JavaScript vengono sostituite con funzionalità equivalenti più vecchie e compatibili usando [Babel](https://babeljs.io/).
    - Il file risultante viene ridotto al minimo (minified), gli spazi superflui rimossi, i nomi delle variabili sostituiti con nomi corti etc..
=======
1. Take a "main" module, the one intended to be put in `<script type="module">` in HTML.
2. Analyze its dependencies: imports and then imports of imports etc.
3. Build a single file with all modules (or multiple files, that's tunable), replacing native `import` calls with bundler functions, so that it works. "Special" module types like HTML/CSS modules are also supported.
4. In the process, other transformations and optimizations may be applied:
    - Unreachable code removed.
    - Unused exports removed ("tree-shaking").
    - Development-specific statements like `console` and `debugger` removed.
    - Modern, bleeding-edge JavaScript syntax may be transformed to older one with similar functionality using [Babel](https://babeljs.io/).
    - The resulting file is minified (spaces removed, variables replaced with shorter names, etc).
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

Quindi se usiamo questa tipologia di strumenti, allora gli script vengono raggruppati in un singolo script (o pochi file), `import/export` sostituiti con speciali funzioni in modo che lo script finale non contenga più nessun `import/export`, non richiede l'uso di `type="module"` e può essere utilizzato come un normale script:

```html
<!-- Assumendo che abbiamo ottenuto bundle.js da un tool come Webpack -->
<script src="bundle.js"></script>
```

Appurato questo, moduli in modo nativo possono comunque essere usati. Non useremo tools come Webpack qui: se necessario potrai configurarlo successivamente.

## Riepilogo

Per ricapitolare, i concetti principali sono:

1. Un modulo è un file. Per far funzionare `import/export`, il browser ha bisogno di `<script type="module">`. I moduli hanno alcune differenze:
    - Vengono eseguiti in modo differito automaticamente
    - Async funziona sui moduli in linea
    - Per caricare moduli esterni provenienti da un'origine diversa (un altro dominio/protocollo/porta), sono necessarie le intestazioni CORS.
    - I moduli esterni duplicati vengono ignorati (un modulo esterno viene eseguito solo la prima volta che viene importato)
2. I moduli hanno il loro livello di visibilità delle variabili (scope) e si scambiano funzionalità attraverso `import/export`.
3. I moduli utilizzano sempre `use strict` automaticamente.
4. Il codice di un modulo viene eseguito solamente una volta. Le esportazioni (`export`) vengono create un'unica volta e condivise con tutti i moduli che le importano.

<<<<<<< HEAD
Quando utilizziamo i moduli, ogni modulo implementa una certa funzionalità e la esporta. Successivamente utilizziamo `import` per importare quella funzionalità e utilizzarla dove è necessario. I browser caricano es eseguono lo script automaticamente.
=======
When we use modules, each module implements the functionality and exports it. Then we use `import` to directly import it where it's needed. The browser loads and evaluates the scripts automatically.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

In produzione, di solito si tende a usare tool detti "bundlers" come [Webpack](https://webpack.js.org) per unire insieme tutti i mosuli per maggiori prestazioni, compatibilità e altro.

Nel prossimo capitolo vedremo più esempi di moduli, e come le cose possono essere importate ed esportate.
