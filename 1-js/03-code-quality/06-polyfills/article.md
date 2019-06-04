
# Polyfills

Il linguaggio JavaScript si evolte costantemente. Nuove proposte per il linguaggio arrivano regolarmente, vengono analizzatte, e successivamente se ritenute valide vengono aggiunte alla lista <https://tc39.github.io/ecma262/> fino a diventare delle [specifiche](http://www.ecma-international.org/publications/standards/Ecma-262.htm).

I team che stanno dietro il motore di JavaScript hanno le loro personali idee riguardo cosa implementare. Potrebbero quindi decidere di implementare delle proposte recenti e posticipare quelle più vecchie a causa di difficoltà nell'implementazione.

Quindi per un motore di script è naturale implementare solo le cose che si trovano nello standard.

Se si vuole rimanere aggiornati riguardo lo stato di supporto delle caratteristiche si può controllare la pagina <https://kangax.github.io/compat-table/es6/> (è molt grande, dovremmo studiare ancora molto).

## Babel

Quando utilizziamo caratteristiche moderne del linguaggio, alcuni motori potrebbero non supportarle. Infatti, non tutte le caratteristiche sono implementate ovunque.

Qui Babel ci viene in soccorso.

[Babel](https://babeljs.io) è un [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler). Riscrive il codice da JavaScript moderno ad uno standard precedente.

Babel è composto da due parti:

<<<<<<< HEAD
1. Primo, il programma che esegue la traduzione, che riscrive quindi il codice. Lo sviluppatore lo esegue sul computer personale. Questo si occuperà di tradurre il codice nei vecchi standard. Verrà poi fornito al sito per gli utenti. Esistono dei progetti di sistemi come [webpack](http://webpack.github.io/) che si occupano di eseguire la traduzione ad ogni cambiamente, evitando perdite di tempo al programmatore.
=======
1. First, the transpiler program, which rewrites the code. The developer runs it on their own computer. It rewrites the code into the older standard. And then the code is delivered to the website for users. Modern project build system like [webpack](http://webpack.github.io/) provide means to run transpiler automatically on every code change, so that very easy to integrate into development process.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

2. Secondo, il polyfill.

<<<<<<< HEAD
    Il transpiler riscrive il codice, quindi la sintassi utilizzata è riconosciuta. Ma per le nuove funzionalità abbiamo bisogno di scrivere uno speciale script che le implementi. JavaScript è un linguaggio altamente dinamico, gli script potrebbero non solo aggiungere nuove funzionalità, ma modificare anche quelle integrate, queste devono quindi essere conformi allo standard.

    Esiste un termine "polyfill" per gli script che "riempiono" il vuoto aggiungendo funzionalità mancanti.
=======
    New language features may include new built-in functions and syntax constructs.
    The transpiler rewrites the code, transforming syntax constructs into older ones. But as for new built-in functions, we need to implement them. JavaScript is a highly dynamic language, scripts may add/modify any functions, so that they behave according to the modern standard.

    A script that updates/adds new functions is called "polyfill". It "fills in" the gap and adds missing implementations.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

    Due polyfill importanti sono:
    - [babel polyfill](https://babeljs.io/docs/usage/polyfill/) che ne supporta molti, ma è molto pesante.
    - [polyfill.io](http://polyfill.io) servizio che consente di caricare costrutti polyfills, in base alle nostre necessità.

<<<<<<< HEAD
Quindi è necessario settare il transplier e aggiungere polyfill per i vecchi motori di JavaScript, per far si che supportino le caratteristiche moderne.

Se ci spostiamo nella direzione dei moderni motori e non utilizziamo altre caratteristiche se non quelle supportate ovunque, allora non abbiamo bisogno di Babel.
=======
So, if we're going to use modern language features, a transpiler and a polyfill are necessary.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

## Esempi nel tutorial


````online
Molti esempi sono eseguibili sul posto, come questi:

```js run
alert('Press the "Play" button in the upper-right corner to run');
```

Gli esempio che utilizzano il moderno JS funzioneranno solo se il vostr browser li supporta.
````

```offline
<<<<<<< HEAD
Se satate leggendo la versione offline, gli esempi non sono eseguibili.  In EPUB alcuni riescono ad eseguire.
```

Google Chrome solitamente è quello più aggiornato con le caratteristiche del linguaggio, è ottimo per fare tutti gli esperimenti senza transpilers, ma anche gli altri browser moderni dovrebbero andare bene.
=======
As you're reading the offline version, in PDF examples are not runnable. In EPUB some of them can run.
```

Google Chrome is usually the most up-to-date with language features, good to run bleeding-edge demos without any transpilers, but other modern browsers also work fine.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb
