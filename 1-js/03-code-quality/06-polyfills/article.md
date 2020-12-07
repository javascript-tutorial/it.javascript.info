
# Polyfills and transpilers

Il linguaggio JavaScript si evolte costantemente. Nuove proposte per il linguaggio arrivano regolarmente, vengono analizzatte, e successivamente se ritenute valide vengono aggiunte alla lista <https://tc39.github.io/ecma262/> fino a diventare delle [specifiche](http://www.ecma-international.org/publications/standards/Ecma-262.htm).

I team che stanno dietro il motore di JavaScript hanno le loro personali idee riguardo cosa implementare. Potrebbero quindi decidere di implementare delle proposte recenti e posticipare quelle più vecchie a causa di difficoltà nell'implementazione.

Quindi per un motore di script è naturale implementare solo le cose che si trovano nello standard.

Se si vuole rimanere aggiornati riguardo lo stato di supporto delle caratteristiche si può controllare la pagina <https://kangax.github.io/compat-table/es6/> (è molt grande, dovremmo studiare ancora molto).

As programmers, we'd like to use most recent features. The more good stuff - the better!

<<<<<<< HEAD
Quando utilizziamo caratteristiche moderne del linguaggio, alcuni motori potrebbero non supportarle. Infatti, non tutte le caratteristiche sono implementate ovunque.

Qui Babel ci viene in soccorso.

[Babel](https://babeljs.io) è un [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler). Riscrive il codice da JavaScript moderno ad uno standard precedente.

Babel è composto da due parti:

1. Primo, il programma che esegue la traduzione, che riscrive quindi il codice. Lo sviluppatore lo esegue sul computer personale. Questo si occuperà di tradurre il codice nei vecchi standard. Verrà poi fornito al sito per gli utenti. Esistono dei progetti di sistemi come [webpack](http://webpack.github.io/) che si occupano di eseguire la traduzione ad ogni cambiamente, evitando perdite di tempo al programmatore.

2. Secondo, il polyfill.

    Il transpiler riscrive il codice, quindi la sintassi utilizzata è riconosciuta. Ma per le nuove funzionalità abbiamo bisogno di scrivere uno speciale script che le implementi. JavaScript è un linguaggio altamente dinamico, gli script potrebbero non solo aggiungere nuove funzionalità, ma modificare anche quelle integrate, queste devono quindi essere conformi allo standard.

    Esiste un termine "polyfill" per gli script che "riempiono" il vuoto aggiungendo funzionalità mancanti.

    Due polyfill importanti sono:
    - [core js](https://github.com/zloirock/core-js) ha molto supporto, consente di includere solamente le caratteristiche necessarie.
    - [polyfill.io](http://polyfill.io) servizio che consente di caricare costrutti polyfills, in base alle nostre necessità.

Quindi è necessario settare il transplier e aggiungere polyfill per i vecchi motori di JavaScript, per far si che supportino le caratteristiche moderne.

Se ci spostiamo nella direzione dei moderni motori e non utilizziamo altre caratteristiche se non quelle supportate ovunque, allora non abbiamo bisogno di Babel.

## Esempi nel tutorial
=======
From the other hand, how to make out modern code work on older engines that don't understand recent features yet?

There are two tools for that:

1. Transpilers.
2. Polyfills.

Here, in this chapter, our purpose is to get the gist of how they work, and their place in web development.

## Transpilers

A [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler) is a special piece of software that can parse ("read and understand") modern code, and rewrite it using older syntax constructs, so that the result would be the same.

E.g. JavaScript before year 2020 didn't have the "nullish coalescing operator" `??`. So, if a visitor uses an outdated browser, it may fail to understand the code like `height = height ?? 100`.

A transpiler would analyze our code and rewrite `height ?? 100` into `(height !== undefined && height !== null) ? height : 100`.

```js
// before running the transpiler
height = height ?? 100;

// after running the transpiler
height = (height !== undefined && height !== null) ? height : 100;
```

Now the rewritten code is suitable for older JavaScript engines.
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

Usually, a developer runs the transpiler on their own computer, and then deploys the transpiled code to the server.

<<<<<<< HEAD
````online
Molti esempi sono eseguibili sul posto, come questi:
=======
Speaking of names, [Babel](https://babeljs.io) is one of the most prominent transpilers out there. 
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

Modern project build systems, such as [webpack](http://webpack.github.io/), provide means to run transpiler automatically on every code change, so it's very easy to integrate into development process.

## Polyfills

New language features may include not only syntax constructs and operators, but also built-in functions.

For example, `Math.trunc(n)` is a function that "cuts off" the decimal part of a number, e.g `Math.trunc(1.23) = 1`.

<<<<<<< HEAD
Gli esempio che utilizzano il moderno JS funzioneranno solo se il vostr browser li supporta.
````

```offline
Se satate leggendo la versione offline, gli esempi non sono eseguibili.  In EPUB alcuni riescono ad eseguire.
```

Google Chrome solitamente è quello più aggiornato con le caratteristiche del linguaggio, è ottimo per fare tutti gli esperimenti senza transpilers, ma anche gli altri browser moderni dovrebbero andare bene.
=======
In some (very outdated) JavaScript engines, there's no `Math.trunc`, so such code will fail.

As we're talking about new functions, not syntax changes, there's no need to transpile anything here. We just need to declare the missing function.

A script that updates/adds new functions is called "polyfill". It "fills in" the gap and adds missing implementations.

For this particular case, the polyfill for `Math.trunc` is a script that implements it, like this:

```js
if (!Math.trunc) { // if no such function
  // implement it
  Math.trunc = function(number) {
    // Math.ceil and Math.floor exist even in ancient JavaScript engines
    // they are covered later in the tutorial
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  };
}
```

JavaScript is a highly dynamic language, scripts may add/modify any functions, even including built-in ones. 

Two interesting libraries of polyfills are:
- [core js](https://github.com/zloirock/core-js) that supports a lot, allows to include only needed features.
- [polyfill.io](http://polyfill.io) service that provides a script with polyfills, depending on the features and user's browser.


## Summary

In this chapter we'd like to motivate you to study modern and even "bleeding-edge" langauge features, even if they aren't yet well-supported by JavaScript engines.

Just don't forget to use transpiler (if using modern syntax or operators) and polyfills (to add functions that may be missing). And they'll ensure that the code works.

For example, later when you're familiar with JavaScript, you can setup a code build system based on [webpack](http://webpack.github.io/) with [babel-loader](https://github.com/babel/babel-loader) plugin.

Good resources that show the current state of support for various features:
- <https://kangax.github.io/compat-table/es6/> - for pure JavaScript.
- <https://caniuse.com/> - for browser-related functions.

P.S. Google Chrome is usually the most up-to-date with language features, try it if a tutorial demo fails. Most tutorial demos work with any modern browser though.

>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b
