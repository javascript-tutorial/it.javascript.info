
# Sticky flag "y", ricerca della posizione

Il flag `pattern:y` consente di eseguire la ricerca basata sulla posizione fornita all'interno di una stringa.

Per comprendere il caso d'uso del flag `pattern:y` e comprendere meglio le modalità delle espressioni regolari, esploriamo un esempio pratico.

Uno dei compiti comuni per le espressioni regolari è "l'analisi lessicale": osserviamo un testo, ad es., in un linguaggio di programmazione, in cui abbiamo bisogno di trovare gli elementi strutturali. Ad esempio, l'HTML ha tag e attributi, il codice JavaScript ha funzioni, variabili e così via.

La scrittura di analizzatori lessicali è un ambito particolare, con propri strumenti e algoritmi, quindi non approfondiremo, ma c'è un'attività comune che ci viene incontro: leggere qualcosa a una certa posizione.

Per esempio, data questa stringa di codice `subject:let varName = "value"`, estraiamo il nome della variabile, che inizia alla posizione `4`.

Proveremo dapprima a cercare il nome della variabile usando una regexp `pattern:\w+`. In realtà, i nomi delle variabili JavaScript richiedono espressioni regolari un po' più complesse per una corrispondenza accurata, ma per il nostro esempio non importa.

- Una chiamata a `str.match(/\w+/)` troverà solo la prima parola nella riga (`let`). Non è essa.
- Possiamo aggiungere il flag `pattern:g`. Ma poi la chiamata `str.match(/\w+/g)` cercherà tutte le parole nel testo, mentre abbiamo bisogno di una parola alla posizione `4`. Ancora una volta, non è quello di cui abbiamo bisogno.

**Allora, come effettuiamo una ricerca con una regexp esattamente alla posizione data?**

Proviamo quindi ad usare il metodo `regexp.exec(str)`.

Questa `regexp`, senza il flag `pattern:g` ne `pattern:y`, troverà solamente la prima corrispondenza, funzionerà esattamente come `str.match(regexp)`.

...Ma se usiamo il flag `pattern:g`, allora verrà effettuata una ricerca in `str`, partendo dalla posizione memorizzata nella proprietà `regexp.lastIndex`. E, se trova una corrispondenza, imposta `regexp.lastIndex` sull'indice immediatamente dopo la corrispondenza.

In altre parole, `regexp.lastIndex` serve come punto di partenza per la ricerca, ad ogni chiamata di `regexp.exec(str)` resetta al nuovo valore ("dopo l'ultima corrispondenza"). Questo solo se c'è il flag `pattern:g`, ovviamente.

Quindi, chiamate successive a `regexp.exec(str)` ritornano corrispondenze una dopo l'altra.

Ecco un esempio di tali chiamate:

```js run
let str = 'let varName'; // Cerchiamo tutte le parole in questa stringa
let regexp = /\w+/g;

alert(regexp.lastIndex); // 0 (inizialmente lastIndex=0)

let word1 = regexp.exec(str);
alert(word1[0]); // let (1a parola)
alert(regexp.lastIndex); // 3 (posizione dopo la corrispondenza)

let word2 = regexp.exec(str);
alert(word2[0]); // varName (2a parola)
alert(regexp.lastIndex); // 11 (posizione dopo la corrispondenza)

let word3 = regexp.exec(str);
alert(word3); // null (non ci sono altre corrispondenze)
alert(regexp.lastIndex); // 0 (resetato dato che la ricerca è terminata)
```

Possiamo quindi individuare tutte le corrispondenze usando un ciclo:

```js run
let str = 'let varName';
let regexp = /\w+/g;

let result;

while (result = regexp.exec(str)) {
  alert( `Trovato ${result[0]} alla posizione ${result.index}` );
  // Trovato let alla position 0, quindi
  // Trovato varName alla posizione 4
}
```

L'uso di `regexp.exec` è un'alternativa al metodo `str.matchAll`, con un po' più di controllo sul processo.

Torniamo al nostro compito.

Possiamo impostare manualmente `lastIndex` a `4`, per avviare la ricerca dalla posizione data!

Come questo:

```js run
let str = 'let varName = "value"';

let regexp = /\w+/g; // senza flag "g", la proprietà lastIndex è ignorata

*!*
regexp.lastIndex = 4;
*/!*

let word = regexp.exec(str);
alert(word); // varName
```

Urrà! Problema risolto! 

Abbiamo eseguito una ricerca con `pattern:\w+`, partendo dalla posizione `regexp.lastIndex = 4`.

Il risultato è corretto.

...Ma un attimo, non così in fretta.

Nota: la chiamata `regexp.exec` inizia la ricerca alla posizione `lastIndex` e poi va oltre. E se non c'è una parola alla posizione `lastIndex`, ma c'è successivamente, allora verrà trovata:

```js run
let str = 'let varName = "value"';

let regexp = /\w+/g;

*!*
// inizia la ricerca dalla posizione 3
regexp.lastIndex = 3;
*/!*

let word = regexp.exec(str); 
// trovato la corrispondenza nella posizione 4
alert(word[0]); // varName
alert(word.index); // 4
```

Per alcune attività, incluse l'analisi lessicale, è semplicemente sbagliato. Dobbiamo trovare una corrispondenza esattamente nella posizione data nel testo, non da qualche parte. Ed è a questo che serve il flag `y`.

**Il flag `pattern:y` fa in modo che `regexp.exec` cerchi esattamente nella posizione `lastIndex`, non "a partire da" essa**

Ecco la stessa ricerca con il flag `pattern:y`:

```js run
let str = 'let varName = "value"';

let regexp = /\w+/y;

regexp.lastIndex = 3;
alert( regexp.exec(str) ); // null (c'è uno spazio alla posizione 3, non una parola)

regexp.lastIndex = 4;
alert( regexp.exec(str) ); // varName (parola nella posizione 4)
```

Come possiamo notare, la regexp `pattern:/\w+/y` non trova corrispondenze alla posizione `3` (a differenza del flag  `pattern:g`), ma trova corrispondenza alla posizione `4`.

Non solo è quello di cui abbiamo bisogno, c'è anche un importante guadagno di prestazioni quando si usa il flag `pattern:y`.

Immaginate, un testo corposo, senza corrispondenze. Quindi una ricerca con il flag `pattern:g` scorrerà tutto il testo senza trovare nulla, e questo richiederà significativamente più tempo della ricerca con il flag `pattern:y`, che controlla solo alla posizione esatta.

Nell'analisi lessicale, di solito, si effettuano molte ricerche in base a posizioni esatte, per verificarne il contenuto. L'uso del flag `pattern:y` è la chiave per implementazioni corrette e con buone prestazioni.
