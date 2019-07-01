# Stile di programmazione

Il codice dovrebbe essere il più pulito e leggibile possibile.

<<<<<<< HEAD
Questa è l'arte della programmazione -- programmare funzionalità complesse che siano allo stesso tempo correte e leggibili.
=======
That is actually the art of programming -- to take a complex task and code it in a way that is both correct and human-readable. A good code style greatly assists in that.  
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

## Sintassi

<<<<<<< HEAD
Qui una lista di alcune regole da seguire (guardare sotto per maggiori dettagli):
=======
Here is a cheat sheet with some suggested rules (see below for more details):
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

![](code-style.png)
<!--
```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}

let x = prompt("x?", "");
let n = prompt("n?", "");

if (n < 0) {
  alert(`Power ${n} is not supported,
    please enter an integer number, greater than 0`);
} else {
  alert( pow(x, n) );
}
```

-->

Adesso discutiamo le regole e le rispettive motivazioni nel dettaglio.

<<<<<<< HEAD
```warn header="Ironia delle regole"
Niente di quello che stiamo dicendo è scolpito sulla pietra. Sono solo delle preferenze, non dei dogmi religiosi.
=======
```warn header="There are no \"you must\" rules"
Nothing is set in stone here. These are style preferences, not religious dogmas.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd
```

### Parentesi graffe

In molti progetti JavaScript le parentesi graffe sono scritte con lo stile "Egiziano" con la parentesi aperta nella stessa linea della keyword -- non in una nuova linea. Dovrebbe comunque esserci spazio prima della parentesi aperta, come in questo esempio:

```js
if (condition) {
  // fai questo
  // ...e questo
  // ...e questo
}
```

<<<<<<< HEAD
Un caso limite è un costrutto con una singola linea. Dovremmo comunque usare le parentesi? Se si come?
=======
A single-line construct, such as `if (condition) doSomething()`, is an important edge case. Should we use braces at all?
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

Qui ci sono un paio di varianti, cosi potete giudicare voi stessi:

<!--
```js no-beautify
if (n < 0) {alert(`Power ${n} is not supported`);}

if (n < 0) alert(`Power ${n} is not supported`);

if (n < 0)
  alert(`Power ${n} is not supported`);

if (n < 0) {
  alert(`Power ${n} is not supported`);
}
```
-->
![](figure-bracket-style.png)

<<<<<<< HEAD
In sintesi:
- Per codici molto brevi, una sola riga è accettabile. Ad esempio:  `if (cond) return null`.
- Ma una singola riga per ogni istruzione è generalmente più facile da leggere.

### Lunghezza della riga

Nessuno ama leggere lunghe righe orizzontali di codice. Una buona norma è dividere le righe più lunghe in qualcosa di più breve.
=======
### Line Length

No one likes to read a long horizontal line of code. It's best practice to split them.

For example:
```js
// backtick quotes ` allow to split the string into multiple lines
let str = `
  Ecma International's TC39 is a group of JavaScript developers,
  implementers, academics, and more, collaborating with the community
  to maintain and evolve the definition of JavaScript.
`;
```

And, for `if` statements:

```js
if (
  id === 123 &&
  moonPhase === 'Waning Gibbous' &&
  zodiacSign === 'Libra'
) {
  letTheSorceryBegin();
}
```
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

La lunghezza massima dovrebbe essere accordata a livello di team. Solitamente tra gli 80-120 caratteri.

### Indentazione

Ci sono due tipi di indentazione:

- **Indentazione orizzontale: 2 o 4 spazi.**

    Un indentazione orizzontale è realizzata usando 2 o 4 spazi oppure il tasto "Tab". Quale scegliere è una guerra che dura da anni. Ad oggi gli spazi sono i più comuni.

    Un vantaggio degli spazi contro i tabs è che gli spazi permettono configurazioni più flessibili.

    Ad esempio, possiamo allineare gli argomenti con l'apertura della parentesi, come qui:

    ```js no-beautify
    show(parameters,
         aligned, // padding di 5 spazi a sinistra
         one,
         after,
         another
      ) {
      // ...
    }
    ```

- **Indentazione verticale: righe vuote per dividere il codice in blocchi logici.**

    Anche una singola funzione può essere divisa in più blocchi logici. Nell'esempio sotto, l'inizializzazione delle variabili, il corpo del ciclo e il ritorno del risultato sono divisi verticalmente:

    ```js
    function pow(x, n) {
      let result = 1;
      //              <--
      for (let i = 0; i < n; i++) {
        result *= x;
      }
      //              <--
      return result;
    }
    ```

    Inserire una nuova riga vuota aiuta a rendere il codice più leggibile. Non dovrebbero esserci più di nove righe di codice senza un indentazione verticale.

### Punto e virgola

Un punto e virgola dovrebbe essere presente alla fine di ogni istruzione, anche se potrebbe essere evitata.

<<<<<<< HEAD
Esistono linguaggi in cui il punto e virgola sono realmente opzionali e possono essere evitati. In JavaScript, esistono casi in cui un "a capo" non viene interpretato come un punto e virgola, lasciando quindi il codice vulnerabile agli errori.

Quando diventerete più maturi come programmatori, potreste scegliere lo stile senza punto e virgola [StandardJS](https://standardjs.com/). Fino a quel momento la miglio scelta è di inserirla alla fine di ogni istruzione per evitare errori.
=======
There are languages where a semicolon is truly optional and it is rarely used. In JavaScript, though, there are cases where a line break is not interpreted as a semicolon, leaving the code vulnerable to errors. See more about that in the chapter <info:structure#semicolon>.

If you're an experienced JavaScript programmer, you may choose a no-semicolon code style like [StandardJS](https://standardjs.com/). Otherwise, it's best to use semicolons to avoid possible pitfalls. The majority of developers put semicolons.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

### Livelli di annidamento

Nel codice vanno evitati elevati liveeli di annidamento.

<<<<<<< HEAD
Qualche volta torna utile la direttiva ["continue"](info:while-for#continue) per evitare annidamenti extra.
=======
For example, in the loop, it's sometimes a good idea to use the ["continue"](info:while-for#continue) directive to avoid extra nesting.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

Ad esempio, invece che aggiungere un `if`:

```js
for (let i = 0; i < 10; i++) {
  if (cond) {
    ... // <- un ulteriore livello di annidamento
  }
}
```

Possiamo scriverlo come:

```js
for (let i = 0; i < 10; i++) {
  if (!cond) *!*continue*/!*;
  ...  // <- nessun ulteriore livello di annidamento
}
```

Una cosa simile può essere risolta con `if/else` e `return`.

Ad esempio, i due costrutti sotto sono identici.

Opzione 1:

```js
function pow(x, n) {
  if (n < 0) {
    alert("Negative 'n' not supported");
  } else {
    let result = 1;

    for (let i = 0; i < n; i++) {
      result *= x;
    }

    return result;
  }  
}
```

Opzione 2:

```js
function pow(x, n) {
  if (n < 0) {
    alert("Negative 'n' not supported");
    return;
  }

  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

<<<<<<< HEAD
La seconda opzione è molto più leggibile perché il "caso limite" `n < 0` viene gestito in anticipo. Dopo aver eseguito il controllo possiamo proseguire con il flusso principale senza doverci preoccupare di ulteriori casi di annidamento.
=======
The second one is more readable because the "special case" of `n < 0` is handled early on. Once the check is done we can move on to the "main" code flow without the need for additional nesting.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

## Posizionamento delle funzioni

Se state scrivendo molte funzioni "ausiliarie", ci sono tre modi per organizzarle nel codice.

<<<<<<< HEAD
1. Dichiarare le funzioni sopra il codice che le utilizza:
=======
1. Declare the functions *above* the code that uses them:
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

    ```js
    // *!*dichiarazione di funzioni*/!*
    function createElement() {
      ...
    }

    function setHandler(elem) {
      ...
    }

    function walkAround() {
      ...
    }

    // *!*codice che le utilizza*/!*
    let elem = createElement();
    setHandler(elem);
    walkAround();
    ```
2. Prima il codice, poi le funzioni:

    ```js
    // *!*il codice che utilizza le funzioni*/!*
    let elem = createElement();
    setHandler(elem);
    walkAround();

    // --- *!*funzioni di supporto*/!* ---
    function createElement() {
      ...
    }

    function setHandler(elem) {
      ...
    }

    function walkAround() {
      ...
    }
    ```
3. Mix: una funzione viene dichiarata nel punto in cui viene utilizzata la prima volta.

Nella maggioranza dei casi si preferisce la seconda opzione.

<<<<<<< HEAD
Questo perché quando leggiamo il codice vogliamo prima di tutto sapere *cosa fa*. Mettendo prima il codice possiamo fornire queste informazioni. Successivamente, potrebbe non essere necessario leggere le funzioni, soprattutto se i loro nomi sono autodescrittivi.
=======
That's because when reading code, we first want to know *what it does*. If the code goes first, then it becomes clear from the start. Then, maybe we won't need to read the functions at all, especially if their names are descriptive of what they actually do.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

## Guida di stile

Una guida di stile contiene  regole generali riguardo a "come scrivere" il codice, ad esempio quali apici utilizzare, di quanti spazi indentare, quando andare a capo, etc. Molti altri dettagli.

Quando tutti i membri del team utilizzano lo stesso stile tende ad essere uniforme.

<<<<<<< HEAD
Certamente, un team può utilizzare il proprio stile guida. Molte volte non serve. Ci sono molte opzioni tra cui scegliere, quindi scegliere tra una di queste generalmente è la scelta migliore.
=======
Of course, a team can always write their own style guide, but usually there's no need to. There are many existing guides to choose from.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

Alcune delle scelte più popolari:

- [Google JavaScript Style Guide](https://google.github.io/styleguide/javascriptguide.xml)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Idiomatic.JS](https://github.com/rwaldron/idiomatic.js)
- [StandardJS](https://standardjs.com/)
- (e molte altre)

<<<<<<< HEAD
Se sei un nuovo sviluppatore, inizia con i consigli di questo capitolo. Quando avrai appreso bene lo stile potrai cercare quello che più ti appartiene.
=======
If you're a novice developer, start with the cheat sheet at the beginning of this chapter. Then you can browse other style guides to pick up more ideas and decide which one you like best.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

## Pulitori automatizzati

<<<<<<< HEAD
I linters sono strumenti che controllano automaticamente lo stile del codice e vi danno consigli su come sistemarlo.

La miglior cosa di questi strumenti è che il controllo dello stile in qualche occasione può rilevare dei bug, ad esempio degli errori di battitura nei nomi delle funzioni. Proprio per queste sue caratteristiche, installare un linter è fortemente consigliato anche se non avete intenzioni di rimanere fedeli ad uno particolare "stile di programmazione".

Alcuni fra i linter più conosciuti:
=======
Linters are tools that can automatically check the style of your code and make improving suggestions.

The great thing about them is that style-checking can also find some bugs, like typos in variable or function names. Because of this feature, using a linter is recommended even if you don't want to stick to one particular "code style".

Here are some well-known linting tools:
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

- [JSLint](http://www.jslint.com/) -- uno dei primi linter.
- [JSHint](http://www.jshint.com/) -- molte più opzioni di JSLint.
- [ESLint](http://eslint.org/) -- il più recente.

Tutti quelli elencati svolgono molto bene il lavoro. L'autore utilizza [ESLint](http://eslint.org/).

Molti linter sono integrati negli editor più popolari: è sufficiente attivare il plugin e configurare lo stile.

Ad esempio, per ESLint dovreste seguire quanto segue:

1. Installare [Node.js](https://nodejs.org/).
2. Installare ESLint con il comando `npm install -g eslint` (npm è package installer di JavaScript).
3. Create un file di configurazione e rinominatelo `.eslintrc` nella root del vostro progetto JavaScript (la cartella che contiene tutti i file).
4. Installa/abilita il plugin per il tuo editor per integrare ESLint. La maggior parte degli editor ne ha uno.

Qui un esempio di di un file `.eslintrc`:

```js
{
  "extends": "eslint:recommended",
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "rules": {
    "no-console": 0,
    "indent": ["warning", 2]
  }
}
```

La direttiva `"extends"` indica che la configurazione è basata sulla lista dei setting "eslint:recommended". Dopodiché potremo specificare il nostro stile personale.

E' anche possible scaricare un set di regole dal web ed estenderle a nostro piacimento. Vedi <http://eslint.org/docs/user-guide/getting-started> per maggiori dettagli riguardo l'installazione.

Molti IDE hanno dei linter integrati, che sono comodi ma non sono editabili come ESLint.

## Riepilogo

<<<<<<< HEAD
Tutte le regole sintattiche descritte in questo capitolo (e nei riferimenti dei vari stili di programmazione) aiutano ad incrementare la leggibilità del codice, ma sono tutti contestabili.

Quando stiamo pensando a come scrivere codice "migliore", la domanda dovrebbe essere "Cosa rende il codice più leggibile e facile da capire?" e "Cosa può aiutarmi ad evitare gli errori?". Queste sono le principali cose da tenere a mente quando stiamo cercando di scegliere uno stile guida.
=======
All syntax rules described in this chapter (and in the style guides referenced) aim to increase the readability of your code. All of them are debatable.

When we think about writing "better" code, the questions we should ask ourselves are: "What makes the code more readable and easier to understand?" and "What can help us avoid errors?" These are the main things to keep in mind when choosing and debating code styles.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

Leggere fra gli stili più popolari vi consentirà di tenervi aggiornati con le ultime idee riguardo gli stili di programmazione e le best practices.
