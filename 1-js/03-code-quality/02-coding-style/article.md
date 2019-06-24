# Stile di programmazione

Il codice dovrebbe essere il più pulito e leggibile possibile.

Questa è l'arte della programmazione -- programmare funzionalità complesse che siano allo stesso tempo correte e leggibili.

## Sintassi

Qui una lista di alcune regole da seguire (guardare sotto per maggiori dettagli):

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

```warn header="Ironia delle regole"
Niente di quello che stiamo dicendo è scolpito sulla pietra. Sono solo delle preferenze, non dei dogmi religiosi.
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

Un caso limite è un costrutto con una singola linea. Dovremmo comunque usare le parentesi? Se si come?

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

In sintesi:
- Per codici molto brevi, una sola riga è accettabile. Ad esempio:  `if (cond) return null`.
- Ma una singola riga per ogni istruzione è generalmente più facile da leggere.

### Lunghezza della riga

Nessuno ama leggere lunghe righe orizzontali di codice. Una buona norma è dividere le righe più lunghe in qualcosa di più breve.

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

Esistono linguaggi in cui il punto e virgola sono realmente opzionali e possono essere evitati. In JavaScript, esistono casi in cui un "a capo" non viene interpretato come un punto e virgola, lasciando quindi il codice vulnerabile agli errori.

Quando diventerete più maturi come programmatori, potreste scegliere lo stile senza punto e virgola [StandardJS](https://standardjs.com/). Fino a quel momento la miglio scelta è di inserirla alla fine di ogni istruzione per evitare errori.

### Livelli di annidamento

Nel codice vanno evitati elevati liveeli di annidamento.

Qualche volta torna utile la direttiva ["continue"](info:while-for#continue) per evitare annidamenti extra.

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

La seconda opzione è molto più leggibile perché il "caso limite" `n < 0` viene gestito in anticipo. Dopo aver eseguito il controllo possiamo proseguire con il flusso principale senza doverci preoccupare di ulteriori casi di annidamento.

## Posizionamento delle funzioni

Se state scrivendo molte funzioni "ausiliarie", ci sono tre modi per organizzarle nel codice.

1. Dichiarare le funzioni sopra il codice che le utilizza:

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

Questo perché quando leggiamo il codice vogliamo prima di tutto sapere *cosa fa*. Mettendo prima il codice possiamo fornire queste informazioni. Successivamente, potrebbe non essere necessario leggere le funzioni, soprattutto se i loro nomi sono autodescrittivi.

## Guida di stile

Una guida di stile contiene  regole generali riguardo a "come scrivere" il codice, ad esempio quali apici utilizzare, di quanti spazi indentare, quando andare a capo, etc. Molti altri dettagli.

Quando tutti i membri del team utilizzano lo stesso stile tende ad essere uniforme.

Certamente, un team può utilizzare il proprio stile guida. Molte volte non serve. Ci sono molte opzioni tra cui scegliere, quindi scegliere tra una di queste generalmente è la scelta migliore.

Alcune delle scelte più popolari:

- [Google JavaScript Style Guide](https://google.github.io/styleguide/javascriptguide.xml)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Idiomatic.JS](https://github.com/rwaldron/idiomatic.js)
- [StandardJS](https://standardjs.com/)
- (e molte altre)

Se sei un nuovo sviluppatore, inizia con i consigli di questo capitolo. Quando avrai appreso bene lo stile potrai cercare quello che più ti appartiene.

## Pulitori automatizzati

I linters sono strumenti che controllano automaticamente lo stile del codice e vi danno consigli su come sistemarlo.

La miglior cosa di questi strumenti è che il controllo dello stile in qualche occasione può rilevare dei bug, ad esempio degli errori di battitura nei nomi delle funzioni. Proprio per queste sue caratteristiche, installare un linter è fortemente consigliato anche se non avete intenzioni di rimanere fedeli ad uno particolare "stile di programmazione".

Alcuni fra i linter più conosciuti:

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

Tutte le regole sintattiche descritte in questo capitolo (e nei riferimenti dei vari stili di programmazione) aiutano ad incrementare la leggibilità del codice, ma sono tutti contestabili.

Quando stiamo pensando a come scrivere codice "migliore", la domanda dovrebbe essere "Cosa rende il codice più leggibile e facile da capire?" e "Cosa può aiutarmi ad evitare gli errori?". Queste sono le principali cose da tenere a mente quando stiamo cercando di scegliere uno stile guida.

Leggere fra gli stili più popolari vi consentirà di tenervi aggiornati con le ultime idee riguardo gli stili di programmazione e le best practices.
