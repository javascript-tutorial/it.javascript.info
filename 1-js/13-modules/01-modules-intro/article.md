
# Moduli, introduzione

Quando la nostra applicazione cresce di dimensione, vogliamo dividerla in diversi file, chiamati "moduli"(modules). Un modulo solitamente contiene una classe o una libreria di funzioni.

Per molto tempo JavaScript è esistito senza una vera sintassi per i moduli nel linguaggio. Questo non era un problema, dato che inizialmente gli script erano piccoli e semplici, e quindi non ce n'era esigenza.

Ma gli script man mano diventarono più grandi e complessi, di conseguenza la comunità inventò vari sistemi per organizzare il codice in moduli, come librerie speciali che gestivano il caricamento di moduli su richiesta.

Per esempio:

<<<<<<< HEAD
- [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition) -- uno dei più vecchi sistemi per la gestione di moduli, inizialmente implementato dalla libreria [require.js](http://requirejs.org/).
- [CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1) -- il sistema per la gestione di moduli creato per node.js server.
- [UMD](https://github.com/umdjs/umd) -- un'altro sistema di gestione di moduli, che è stato suggerito come metodo universale, compativile sia con AMD sia con CommonJS.

Ormai tutti questi sistemi vengono lentamente abbandonati, anche se ancora possono essere trovati in vecchi script.
=======
- [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition) -- one of the most ancient module systems, initially implemented by the library [require.js](https://requirejs.org/).
- [CommonJS](https://wiki.commonjs.org/wiki/Modules/1.1) -- the module system created for Node.js server.
- [UMD](https://github.com/umdjs/umd) -- one more module system, suggested as a universal one, compatible with AMD and CommonJS.

Now these all slowly became a part of history, but we still can find them in old scripts.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Il sistema per la gestione dei moduli nel linguaggio è stato standardizzato nel 2015, e si è gradualmente evoluto da quel momento in poi. Ora è supportato da tutti i browser principali e all'interno di node.js, da adesso in poi sarà questo il sistema che studieremo.

## Che cos'è un modulo?

Un modulo è semplicemente un file. Uno script è un modulo.

I moduli possono caricarsi a vicenda e utilizzare speciali direttive `export` e `import` per scambiarsi funzionalità, chiamando le funzioni da un modulo all'altro:

- `export` contrassegna variabili e funzioni che devono essere accessibili dall'esterno del modulo.
- `import` permette d'importare funzionalità da altri moduli.

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

La direttiva `import` carica il modulo presente al percorso `./sayHi.js`, relativamente al file corrente, e assegna la funzione esportata `sayHi` alla variabile corrispondente.

Ora proviamo ad utilizzare l'esempio all'interno del browser.

Dato che i moduli utilizzano parole chiavi e funzionalità speciali, dobbiamo comunicare al browser che lo script deve essere trattato come un modulo, utilizzando l'attributo `<script type="module">`.

In questo modo:

[codetabs src="say" height="140" current="index.html"]

Il browser recupera ed elabora automaticamente il modulo importato (e i suoi import se necessario), e infine esegue lo script.

```warn header="Modules work only via HTTP(s), not in local files"
Se provate ad aprire una pagina web in locale, tramite il protocollo `file://`, scoprirete che le direttive `import/export` non funzionano. Per questo vanno utilizzati dei web-server locali come [static-server](https://www.npmjs.com/package/static-server#getting-started) oppure utilizzando la funzionalità "live server" dell'editor di codice, come quello di VS Code [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) per testare i moduli.
```

## Funzionalità principali dei moduli

Cosa c'è di diverso nei moduli rispetto ai "normali" script?

Ci sono delle funzionalità aggiunte, valide sia per codice JavaScript all'interno dei browser sia per quello eseguito lato server.

### Hanno sempre "use strict"

I moduli lavorano sempre in *strict mode*, automaticamente. Ad esempio, assegnare un valore ad una variabile non dichiarata genera un'errore.

```html run
<script type="module">
  a = 5; // error
</script>
```

### Visibilità delle variabili (scope) all'interno dei moduli

Ogni modulo ha la propria visibilità delle variabili di massimo livello. In altre parole le variabili dichiarate a livello maggiore all'interno di un modulo non sono visibili negli altri script.

In the example below, two scripts are imported, and `hello.js` tries to use `user` variable declared in `user.js`. It fails, because it's a separate module (you'll see the error in the console):

[codetabs src="scopes" height="140" current="index.html"]

I moduli dovrebbero eseguire l'`export` di ciò che vogliono che sia accessibile dall'esterno e l'`import` ciò di cui hanno bisogno.

- `user.js` dovrebbe esportare la variabile `user`.
- `hello.js` dovrebbe importarla dal modulo `user.js`.

In altre parole, con i moduli usiamo import/export invece di affidarci alle variabili globali.

Questa è la versione corretta:

[codetabs src="scopes-working" height="140" current="hello.js"]

All'interno del browser, se parliamo di pagine HTML, esiste uno scope indipendente all'interno di ogni `<script type="module">`.

Ecco due script sulla stessa pagina, entrambi `type="module"`. Non vedono le variabili di primo livello l'uno dell'altro:

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

```smart
Nel browser, possiamo creare una variabile globale assegnandola esplicitamente ad una proprietà di `window`, ad esempio `window.user = "John"`.

Così sarà accessibile a tutti gli scripts, sia con `type="module"` che senza. 

Detto questo, creare questo genere di variabili è una cattiva pratica, cercate di evitarlo. 

```

### Un modulo viene eseguito solo la prima volta che viene importato

Se lo stesso modulo viene importato in vari altri moduli, il suo codice viene eseguito solo una volta, durante il primo import. Successivamente tutti i suoi exports vengono distribuiti agli altri moduli che la importano.

La valutazione una tantum ha conseguenze importanti di cui dovremmo essere consapevoli.

Vediamo degli esempi.

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

La seconda importazione non mostra nulla, perché il modulo è già stato valutato.

C'è una regola: il codice del modulo di primo livello dovrebbe essere usato per l'inizializzazione, la creazione di strutture dati interne specifiche del modulo. Se abbiamo bisogno di rendere qualcosa richiamabile più volte, dovremmo esportarlo come una funzione, come abbiamo fatto con `sayHi` sopra.

Vediamo ora un esempio più complesso.

Prendiamo in considerazione un modulo che esporta un oggetto:

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
// Entrambi 1.js e 2.js si riferiscono allo stesso oggetto
// I cambiamenti fatti in 1.js sono visibili in 2.js
*/!*
```

Come puoi vedere, quando `1.js` cambia la proprietà `name` nell'`admin` importato, allora anche `2.js` può vedere il nuovo `admin.name`.

<<<<<<< HEAD
Questo è il motivo per cui il modulo viene eseguito solo una volta. Le esportazioni vengono generate e quindi condivise tra gli importatori, quindi se qualcosa cambia l'oggetto `admin`, gli altri moduli lo vedranno.
=======
That's exactly because the module is executed only once. Exports are generated, and then they are shared between importers, so if something changes the `admin` object, other importers will see that.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

**Questo comportamento in realtà è molto utile, perché ci permette di *configurare* i moduli.**

In altre parole, un modulo può fornire una funzionalità generica che necessita di una configurazione. Per esempio. l'autenticazione necessita di credenziali. Quindi può esportare un oggetto di configurazione aspettandosi che il codice esterno gli venga assegnato.

Ecco lo schema classico:
1. Un modulo esporta alcuni strumenti di configurazione, ad es. un oggetto di configurazione.
2. Alla prima importazione lo inizializziamo, impostando le sue proprietà. Potrebbe farlo lo script di livello più alto.
3. Ulteriori importazioni utilizzano il modulo.

Per fare un esempio, il modulo `admin.js` può fornire alcune funzionalità (ad esempio l'autenticazione), ma si aspetta di ricevere le credenziali all'interno dell'oggetto `config` dall'esterno:

```js
// 📁 admin.js
export let config = { };

export function sayHi() {
  alert(`Sono pronto, ${config.user}!`);
}
```

Qui, `admin.js` esporta l'oggetto `config` (inizialmente vuoto, ma potrebbe anche avere proprietà predefinite).

Quindi in `init.js`, il primo script della nostra applicazione, importiamo `config` ed impostiamo `config.user`:

```js
// 📁 init.js
import {config} from './admin.js';
config.user = "Pete";
```

...Ora il modulo `admin.js` è configurato. 

Le successive importazioni chiamarlo, e verrà mostrato correttamente lo user corrente:


```js
// 📁 another.js
import {sayHi} from './admin.js';

sayHi(); // Sono pronto, *!*Pete*/!*!
```


### import.meta

L'oggetto `import.meta` contiene le informazioni riguardanti il modulo corrente.

Il suo contenuto dipende dall'ambiente di esecuzione. Nel browser, contiene l'URL dello script o dell'attuale pagina web se inserito all'interno dell'HTML:

```html run height=0
<script type="module">
  alert(import.meta.url); // script URL
  // per gli inline script è l'URL della pagina corrente
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

Potresti voler saltare questa sezione se stai leggendo per la prima volta , oppure se non hai intenzione di usare JavaScript all'interno del browser.

### I moduli sono caricati in modo differito

I moduli vengono *sempre* reputati script differiti, stesso effetto dell'attributo `defer` (descritto nel capitolo [](info:script-async-defer)) sia per gli script esterni che per quelli interni.

In altre parole:
- Il download di un modulo esterno `<script type="module" src="...">` non blocca l'elaborazione dell'HTML, vengono caricati in parallelo insieme alle altre risorse.
- I moduli attendono fino al momento in cui l'HTML è pronto (anche se sono molto piccoli e possono essere elaborati più velocemente dell'HTML), e poi vengono eseguiti.
- L'ordine relativo degli script viene mantenuto: gli script che appaiono prima nel documento vengono eseguiti per primi.

<<<<<<< HEAD
Come conseguenza, i moduli "vedono" sempre la pagina HTML completamente caricata, inclusi gli elementi sotto di essi.
=======
As a side effect, module scripts always "see" the fully loaded HTML-page, including HTML elements below them.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

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
  alert(typeof button); // Error: button is undefined, lo script non riesce a vedere il bottone
*/!*
  // Gli script normali vengono eseguiti immediatamente, prima che il resto della pagina venga processata
</script>

<button id="button">Button</button>
```

Da notare: il secondo script viene eseguito per primo! Infatti vedremo prima `undefined`, e dopo `object`.

Questo accade proprio perché i moduli sono differiti, e quindi attendono che tutto il documento venga processato, al contrario, gli script normali vengono eseguiti immediatamente e di conseguenza vediamo l'output del secondo script per primo.

Quando utilizziamo i moduli, dobbiamo porre attenzione al fatto che la pagina HTML appare mentre viene caricata, e i moduli JavaScript vengono eseguiti successivamente al caricamento, di conseguenza l'utente potrebbe vedere la pagina *prima* che l'applicazione JavaScript sia pronta. Alcune funzionalità potrebbero in questo modo non funzionare immediatamente. Per questo motivo è opportuno inserire degli indicatori di caricamento, o comunque assicurarci che i visitatori non vengano confusi da questi possibili comportamenti.

### Async funziona sui moduli scritti inline

Per gli script normali l'attributo `async` funziona solamente sugli script esterni, Gli script caricati in modo asincrono (Async) vengono eseguiti immediatamente e indipendentemente dagli altri script e del documento HTML.

Per i moduli `async` può essere utilizzato sempre.

Ad esempio, lo script seguente è dichiarato asincrono, e quindi non aspetta nulla e viene eseguito.

Esegue l'import (recupera `./analytics.js`) e procede quando è pronto, anche se il documento HTML non è completo, o se gli altri script sono ancora in attesa.

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

1. Più script esterni con lo stesso `src` vengono eseguiti solo una volta:
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

Alcuni ambienti, come Node.js o tools per creare bundle accettano moduli bare, senza nessun percorso (path), dato che hanno metodologie per trovare e collegare i moduli. Al contrario i browser ancora non supportano i moduli bare.

### Compatibilità, "nomodule"

I vecchi browser non comprendono l'attributo `type="module"`. Gli script di una tipologia non conosciuta vengono semplicemente ignorati. Proprio per questo è possibile prevedere uno script di riserva usando l'attributo `nomodule`:

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

1. Prendono un modulo "principale", quello che era inteso per essere inserito in `<script type="module">`.
2. Analizza tutte le sue dipendenze: che moduli importa, cosa viene importato dai metodi importati etc...
3. Costruisce un singolo file con tutti i moduli (o più file, può essere impostato), sostituendo le chiamate `import` con funzioni del bundler. In questo modo può supportare anche moduli "speciali" come quelli CSS/HTML.
4. Durante il processo altre trasformazioni e ottimizzazioni possono essere eseguite:
    - Parti di codice che non possono essere raggiunte vengono eliminate.
    - `export` non utilizzati vengono rimossi ("tree-shaking").
    - Parti di codice tipicamente utilizzati durante lo sviluppo come `console` e `debugger` rimosse.
    - Le sintassi più moderne di JavaScript vengono sostituite con funzionalità equivalenti più vecchie e compatibili usando [Babel](https://babeljs.io/).
    - Il file risultante viene ridotto al minimo (minified), gli spazi superflui rimossi, i nomi delle variabili sostituiti con nomi corti etc..

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

Quando utilizziamo i moduli, ogni modulo implementa una certa funzionalità e la esporta. Successivamente utilizziamo `import` per importare quella funzionalità e utilizzarla dove è necessario. I browser caricano es eseguono lo script automaticamente.

In produzione, di solito si tende a usare tool detti "bundlers" come [Webpack](https://webpack.js.org) per unire insieme tutti i mosuli per maggiori prestazioni, compatibilità e altro.

Nel prossimo capitolo vedremo più esempi di moduli, e come le cose possono essere importate ed esportate.
