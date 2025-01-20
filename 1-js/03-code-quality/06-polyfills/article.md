
# Polyfills e transpilers

<<<<<<< HEAD
Il linguaggio JavaScript si evolve costantemente. Nuove proposte per il linguaggio arrivano regolarmente, vengono analizzate, e successivamente se ritenute valide vengono aggiunte alla lista <https://tc39.github.io/ecma262/> fino a diventare delle [specifiche](http://www.ecma-international.org/publications/standards/Ecma-262.htm).
=======
The JavaScript language steadily evolves. New proposals to the language appear regularly, they are analyzed and, if considered worthy, are appended to the list at <https://tc39.github.io/ecma262/> and then progress to the [specification](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

I team che stanno dietro il motore di JavaScript hanno le loro personali idee riguardo cosa implementare. Potrebbero quindi decidere di implementare delle proposte recenti e posticipare quelle più vecchie a causa di difficoltà nell'implementazione.

<<<<<<< HEAD
Quindi per un motore di script è naturale implementare solo le cose che si trovano nello standard.

Se si vuole rimanere aggiornati riguardo lo stato di supporto delle caratteristiche si può controllare la pagina <https://kangax.github.io/compat-table/es6/> (è molto grande, dovremmo studiare ancora molto).
=======
So it's quite common for an engine to implement only part of the standard.

A good page to see the current state of support for language features is <https://compat-table.github.io/compat-table/es6/> (it's big, we have a lot to study yet).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Come programmatori, amiamo utilizzare le più recenti caratteristiche del linguaggio!

Ma come si può fare per farle funzionare sui vecchi motori JavaScript che non le comprendono ed interpretano?

Esistono due strumenti per questo:

1. Transpilers.
2. Polyfills.

In questo capitolo cercheremo di capire il loro funzionamento ed il loro ruolo nello sviluppo web.

## Transpilers

Un [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler) è un particolare software che traduce il codice sorgente da un formato ad un altro. Può analizzare il codice moderno e riscriverlo utilizzando sintassi e costrutti meno recenti, rendendolo compatibile con i motori JavaScript meno recenti.

Es. JavaScript prima del 2020 non aveva "l'operatore di coalescenza nullo" `??`. Quindi, se un visitatore utilizza un vecchio browser, questo non potrebbe comprendere `height = height ?? 100`.

Un transpiler analizzerebbe il codice e riscriverebbe `height ?? 100` in `(height !== undefined && height !== null) ? height : 100`.

```js
// prima dell'analisi del transpiler
height = height ?? 100;

// dopo l'analisi del transpiler
height = (height !== undefined && height !== null) ? height : 100;
```

Ora il codice riscritto è adatto anche ai vecchi motori JavaScript.

In genere lo sviluppatore fa girare il transpiler in locale sul proprio computer, quindi distribuisce sul server il codice riscritto.

<<<<<<< HEAD
Facendo qualche nome, [Babel](https://babeljs.io) è uno dei più diffusi transpilers del momento. 

I moderni 'bundler' utilizzati per 'assemblare' progetti, come [webpack](http://webpack.github.io/), possono eseguire il transpiler automaticamente ad ogni modifica del codice, è quindi molto facile integrarlo nei processi di sviluppo.
=======
Speaking of names, [Babel](https://babeljs.io) is one of the most prominent transpilers out there.

Modern project build systems, such as [webpack](https://webpack.js.org/), provide a means to run a transpiler automatically on every code change, so it's very easy to integrate into the development process.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## Polyfills

Nuove caratteristiche di un linguaggio possono riguardare, oltre alla sintassi, operatori e costrutti, anche funzioni integrate.

Ad esempio, `Math.trunc(n)` è una funziona che "tronca" la parte decimale di un numero, es. `Math.trunc(1.23)` ritorna `1`.

In alcuni (vecchissimi) motori JavaScript, non esiste `Math.trunc`, quindi il codice non funzionerebbe.

Poiché stiamo parlando di nuove funzioni, non di modifiche alla sintassi, in questo caso non ci serve un transpiler. Dobbiamo solo dichiarare la funzione mancante.

Uno script che aggiorna/aggiunge nuove funzioni è chiamato "polyfill". Questo colma il gap ed aggiunge le implementazioni mancanti.

In questo particolare caso, il polyfill per `Math.trunc` è uno script che implementa la funzione in questo modo :

```js
if (!Math.trunc) { // se la funzione non esiste
  // implementala
  Math.trunc = function(number) {
    // Math.ceil e Math.floor sono presenti anche in vecchi motori JavaScript
    // verranno trattati più avanti in questo tutorial
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  };
}
```

<<<<<<< HEAD
JavaScript è un linguaggio altamente dinamico, gli script possono aggiungere/modificare qualsiasi funzione, anche quelle integrate.

Due interessanti librerie polyfills sono:
- [core js](https://github.com/zloirock/core-js) ha molte funzioni e consente di includere solo le funzionalità necessarie.
- [polyfill.io](http://polyfill.io) servizio che fornisce uno script con polyfill, a seconda delle funzionalità e del browser dell'utente.
=======
JavaScript is a highly dynamic language. Scripts may add/modify any function, even built-in ones.

Two interesting polyfill libraries are:
- [core js](https://github.com/zloirock/core-js) that supports a lot, allows to include only needed features.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3


## Riepilogo

In questo capitolo vorremmo motivarvi a studiare le funzionalità più moderne ed all'avanguardia" del linguaggio, anche se non sono ancora ben supportate dai motori JavaScript.

<<<<<<< HEAD
Basta non dimenticare di usare transpiler (se si utilizza la sintassi o gli operatori moderni) e i polyfill (per aggiungere funzioni che potrebbero mancare). Questi si assicureranno che il codice funzioni.

Ad esempio, in seguito, quando avrai familiarità con JavaScript, potrai configurare un sistema di compilazione del codice basato su [webpack](http://webpack.github.io/) con [babel-loader](https://github.com/babel/babel-loader) plugin.

Buone risorse che mostrano lo stato attuale del supporto per varie funzionalità:
- <https://kangax.github.io/compat-table/es6/> - per puro JavaScript.
- <https://caniuse.com/> - per le funzioni integrate dei browsers.
=======
Just don't forget to use a transpiler (if using modern syntax or operators) and polyfills (to add functions that may be missing). They'll ensure that the code works.

For example, later when you're familiar with JavaScript, you can setup a code build system based on [webpack](https://webpack.js.org/) with the [babel-loader](https://github.com/babel/babel-loader) plugin.

Good resources that show the current state of support for various features:
- <https://compat-table.github.io/compat-table/es6/> - for pure JavaScript.
- <https://caniuse.com/> - for browser-related functions.

P.S. Google Chrome is usually the most up-to-date with language features, try it if a tutorial demo fails. Most tutorial demos work with any modern browser though.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

P.S. Google Chrome è solitamente il browser più aggiornato con le funzionalità del linguaggio, provalo se una demo tutorial fallisce. Tuttavia, la maggior parte delle demo dei tutorial funziona con qualsiasi browser moderno.
