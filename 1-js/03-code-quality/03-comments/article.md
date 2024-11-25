# Commenti

Come abbiamo già appreso dal capitolo <info:structure>, i commenti possono essere di una singola riga: ed iniziano con `//` oppure multilinea: `/* ... */`.

Normalmente li utilizziamo per descrivere come e perché funziona il codice.

Inizialmente, l'inserimento di commenti può sembrare ovvio, ma i novizi solitamente non lo fanno nella maniera corretta.

## Commenti sbagliati

I novizi tendono ad utilizzare i commenti per spiegare "cosa sta succedendo nel codice". Come in questo esempio:

```js
// Questo codice farà questa cosa (...) e questa (...)
// ...e altre cose...
very;
complex;
code;
```

Nel buon codice la quantità di commenti "esplicativi" dovrebbe essere minima. In realtà il codice dovrebbe essere facile da comprendere anche senza.

C'è una bellissima citazione a riguardo: "Se il codice è cosi poco chiaro da richiedere un commento, probabilmente dovrebbe essere riscritto".

### Ricetta: raccogliere in una funzione

Qualche volta può essere un beneficio rimpiazzare un pezzo di codice con una funzione, come in questo esempio:

```js
function showPrimes(n) {
  nextPrime:
  for (let i = 2; i < n; i++) {

*!*
    // controlla se i è un numero primo
    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }
*/!*

    alert(i);
  }
}
```

La migliore variante, sarebbe raccogliere il tutto in una funzione `isPrime`:


```js
function showPrimes(n) {

  for (let i = 2; i < n; i++) {
    *!*if (!isPrime(i)) continue;*/!*

    alert(i);  
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if (n % i == 0) return false;
  }

  return true;
}
```

Ora possiamo capire il codice più facilmente. La funzione stessa diventa un commento. Questo tipo di codice viene definito *auto-descrittivo*. 

### Ricetta: creare funzioni

Anche se avete un lungo "pezzo di codice" come questo:

```js
// qui aggiungiamo whiskey
for(let i = 0; i < 10; i++) {
  let drop = getWhiskey();
  smell(drop);
  add(drop, glass);
}

// qui aggiungiamo della spremuta
for(let t = 0; t < 3; t++) {
  let tomato = getTomato();
  examine(tomato);
  let juice = press(tomato);
  add(juice, glass);
}

// ...
```

Potrebbe essere una buona idea raccogliere tutto in una funzione:

```js
addWhiskey(glass);
addJuice(glass);

function addWhiskey(container) {
  for(let i = 0; i < 10; i++) {
    let drop = getWhiskey();
    //...
  }
}

function addJuice(container) {
  for(let t = 0; t < 3; t++) {
    let tomato = getTomato();
    //...
  }
}
```

Ripeto nuovamente, le funzioni stesse dovrebero dire cosa sta succedendo. Non dovrebbe esserci alcun bisogno di commenti. Inoltre anche l'architettura del codice è migliore quando è spezzata. Rende più chiaro lo scopo di ogni funzione.

Nella pratica, non possiamo evitare del tutto i commenti "esplicativi". Ci sono algoritmi molto complessi. E ci sono vari "trucchi" con lo scopo di ottimizzare questo tipo di commenti. In linea di massima dovremmo però cercare di tenere il codice semplice ed auto-descrittivo.

## Buoni commenti

Quindi, solitamente i commenti esplicativi sono sbagliati. Quali sono allora i commenti giusti?

Descrivere l'architettura
: Fornire un visuale di alto livello dei componenti, come interagiscono, come si comporta il flusso d'esecuzione in certe situazioni... In breve -- gli "occhi d'aquila" del codice. Esiste uno speciale linguaggio di schematizzazione, [UML](http://wikipedia.org/wiki/Unified_Modeling_Language) per per la descrizione dell'architettura ad alto livello. Da studiare assolutamente.

Documentare l'utilizzo di una funzione
: Esiste una particolare sintassi [JSDoc](http://en.wikipedia.org/wiki/JSDoc) per documentare le funzioni: utilizzo, parametri, valori di ritorno.

    Ad esempio:
    ```js
    /**
     * Ritorna la potenza n di x.
     *
     * @param {number} x La base della potenza.
     * @param {number} n Esponente, deve essere un numero naturale.
     * @return {number} x elevato alla n.
     */
    function pow(x, n) {
      ...
    }
    ```

    Questi commenti ci consentono di capire lo scopo della funzione e come utilizzarla correttamente senza guardarne il codice.

    I molti casi, gli editor come [WebStorm](https://www.jetbrains.com/webstorm/) sono in grado di comprenderli e possono quindi utilizzarli per autocompletamenti e alcune verifiche automatiche del codice.

<<<<<<< HEAD
    Ci sono anche tool come [JSDoc 3](https://github.com/jsdoc3/jsdoc) che possono generare documentazione in HTML a partire dai commenti. Puoi scoprire di più riguardo JSDoc su <http://usejsdoc.org/>.
=======
Also, there are tools like [JSDoc 3](https://github.com/jsdoc/jsdoc) that can generate HTML-documentation from the comments. You can read more information about JSDoc at <https://jsdoc.app>.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Perché l'azione viene risolta in quel modo?
: Quello che viene scritto è fondamentale. Ma quello che *non* viene scritto potrebbe esserlo anche di più per capire cosa sta succedendo. Perché l'azione viene portata a termine in quel modo? Il codice non fornisce risposte.

    Se ci sono diverse modalità di risolvere una determinata azione, perché si è scelta questa? Specialmente quando non risulta la scelta più ovvia.

    Senza dei commenti si potrebbero generare le seguenti situazioni:
    1. Tu (o un tuo collega) apri il codice un po' di tempo dopo, lo guardi e pensi che il codice è "poco ottimizzato".
    2. Tu stesso potresti pensare: "Quanto stupido sono stato qui, e quanto intelligente sono adesso", e riscriverla utilizzando la variante "più ovvia e corretta".
    3. ...Lo stimolo di riscriverla sarebbe forte. Ma quando l'hai scritta ti eri reso conto che la soluzione "più ovvia" era effettivamente peggiore. Andando a rileggerla potresti non ricordarti neanche perché. Quindi dopo averla riscritta ti rendi conto che è meglio tornare indietro, hai sprecato tempo.

    Commenti che spiegano la soluzione sono fondamentali. Vi aiutano a sviluppare mantenendo sempre la strada corretta.

Ci sono alcune piccolezze? Dove vengono utilizzate?
: Se il codice contiene sottigliezze contro intuitive, vale certamente la pena commentarle.

## Riepilogo

Un importante qualità che deve possedere un bravo sviluppatore, è quella di saper scrivere dei buoni commenti.

I buoni commenti ci consentono di mantenere il codice in uno stato ottimale, e di poterci tornare dopo un po' di tempo e capire le scelte prese.

**Commenti utili:**

- Architettura complessiva, vista ad alto livello.
- Utilizzo delle funzioni.
- Soluzioni importanti, soprattutto quando poco ovvie.

**Commenti da evitare:**

- Quelli che dicono "come il codice funziona" e "cosa fa".
- Inseriteli solo se risulta impossibile rendere il codice semplice ed auto-descrittivo.

I commenti vengono utilizzati anche da strumenti che generano documentazione, come JSDoc3: li leggono e generano documenti HTML (o in altri formati).
