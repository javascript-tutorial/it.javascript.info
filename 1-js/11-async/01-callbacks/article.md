

# Introduzione: callbacks

Molte azioni in JavaScript sono *asincrone*

Per esempio, guardiamo la funzione `loadScript(src)`:

```js
function loadScript(src) {
  let script = document.createElement('script');
  script.src = src;
  document.head.append(script);
}
```

Lo scopo della funzione è quello di caricare un nuovo script. Quando aggiunge il tag `<script src="…">` al documento, il browser lo caricherà ed eseguirà.

Possiamo usare la funzione in questo modo:

```js
// carica ed esegue lo script
loadScript('/my/script.js');
```

La funzione è chiamata "asincronamente", perché l'azione (il caricamento dello script) non finirà adesso ma in seguito.

<<<<<<< HEAD
La chiamata alla funzione da inizio al caricamento dello script, poi l'esecuzione continua. Mentre lo script sta caricando, il codice sotto potrebbe finire l'esecuzione, e se il caricamento richiede tempo, anche altri script potrebbero venire eseguiti nel frattempo.

```js
loadScript('/my/script.js');
// il codice sotto loadScript non attende che il caricamento di loadScript sia completo
// ...
```

Ora diciamo che vogliamo eseguire il nuovo script quando carica. Probabilmente dichiarerà nuove funzioni, quindi vorremmo eseguirle.
=======
If there's a code below `loadScript(…)`, it doesn't wait until the loading finishes.

```js
loadScript('/my/script.js');
// the code below loadScript
// doesn't wait for the script loading to finish
// ...
```

We'd like to use the new script as soon as it loads. It declares new functions, and we want to run them.
>>>>>>> 9bfc8cfa9c055bdcbc8f40471fc52e011687a728

Ma se lo facciamo immediatamente dopo la chiamata `loadScript(…)` non funzionerebbe:

```js
loadScript('/my/script.js'); // lo script ha "function newFunction() {…}"

*!*
newFunction(); // nessuna funzione!
*/!*
```

<<<<<<< HEAD
Naturalmente, con buona probabilità il browser non ha avuto tempo di caricare lo script.
Quindi la chiamata immediata alla nuova funzione fallirà. Allo stato attuale la funzione `loadScript` non prevede un modo di tracciare l'avvenuto caricamento.
Lo script carica e poi viene eseguito, questo è quanto. Ma vorremmo sapere quando accade in modo da utilizzare nuove funzioni e variabili da quello script.
=======
Naturally, the browser probably didn't have time to load the script. As of now, the `loadScript` function doesn't provide a way to track the load completion. The script loads and eventually runs, that's all. But we'd like to know when it happens, to use new functions and variables from that script.
>>>>>>> 9bfc8cfa9c055bdcbc8f40471fc52e011687a728

Aggiungiamo una funzione `callback` come secondo argomento a `loadScript` che dovrebbe essere eseguito una volta che lo script è stato caricato. 

```js
function loadScript(src, *!*callback*/!*) {
  let script = document.createElement('script');
  script.src = src;

*!*
  script.onload = () => callback(script);
*/!*

  document.head.append(script);
}
```

Ora se volessimo chiamare nuove funzioni dallo script, dovremmo scriverlo nella callback:

```js
loadScript('/my/script.js', function() {
  // la callback viene eseguita dopo che lo script caricato
  newFunction(); // quindi adesso funziona
  ...
});
```

Questa è l'idea: il secondo argomento è una funzione (solitamente anonima) che viene eseguita quando l'azione è completata.

Ecco un esempio eseguibile con un vero script:

```js run
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  script.onload = () => callback(script);
  document.head.append(script);
}

*!*
loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
  alert(`Cool, the ${script.src} is loaded`);
  alert( _ ); // funzione dichiatata nello script caricato
});
*/!*
```

Questo è lo stile di programmazione asincrona "callback-based". Una funzione che fa qualcosa asincronamente dovrebbe prevedere un argomento `callback` in cui mettiamo la funzione da eseguire al completamento dell'operazione asincrona.

In questo esempio lo abbiamo fatto in `loadScript` ma, ovviamente, è un approccio generale.

## Callback dentro callback

Come possiamo caricare due script sequenzialmente: prima il primo e dopo il secondo?

La soluzione naturale sarebbe quella di mettere la seconda chiamata `loadScript` all'interno della callback in questo modo:

```js
loadScript('/my/script.js', function(script) {

  alert(`Cool, the ${script.src} is loaded, let's load one more`);

*!*
  loadScript('/my/script2.js', function(script) {
    alert(`Cool, the second script is loaded`);
  });
*/!*

});
```

Dopo che la funzione `loadScript` più esterna è completata, la callback comincia quella interna.

Ma se volessimo un altro script...?

```js
loadScript('/my/script.js', function(script) {

  loadScript('/my/script2.js', function(script) {

*!*
    loadScript('/my/script3.js', function(script) {
      // ...continua quando tutti gli script sono stati caricati
    });
*/!*

  })

});
```

Quindi, ogni nuova azione è dentro una callback. Questo va bene quando abbiamo poche azioni, ma non quando ne abbiamo molte, quindi in seguito vedremo altre alternative.

## Gestione degli errori

Negli esempi precedenti non abbiamo considerato gli errori. Cosa accade se il caricamento dello script fallisce? La nostra callback dovrebbe essere in grado di gestire questa eventualità.

Ecco una versione migliorata di `loadScript` che traccia gli errori di caricamento:

```js run
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

*!*
  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Errore di caricamento dello script per ${src}`));
*/!*

  document.head.append(script);
}
```

Chiama `callback(null, script)` per i caricamenti con successo e `callback(error)` altrimenti.

L'utilizzo:
```js
loadScript('/my/script.js', function(error, script) {
  if (error) {
    // gestione dell'errore
  } else {
    // script caricato con successo
  }
});
```

Ancora una volta, la ricetta che abbiamo usato per `loadScript` è abbastanza comune. È chiamato "error-first callback" style.

La convenzione è:
1. Il primo argomento di `callback` è riservato per un errore se si verifica. In questo caso la chiamata è `callback(err)`.
2. Il secondo argomento (e quelli successivi se necessario) sono per il risultato in caso di successo. In questo caso la chiamata è `callback(null, result1, result2…)`.

Quindi la singola funzione `callback` è usata sia per riportare gli errori che per passare i risultati.

## Piramide del fato (Pyramid of Doom)

Ad una prima occhiata, è un modo pratico di programmare in modo asincrono. Ed infatti lo è. Per una, forse due, chiamate annidate sembra che funzioni.

Ma per molte azioni asincrone che si susseguono una dopo l'altra avremo codice come questo:

```js
loadScript('1.js', function(error, script) {

  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', function(error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...
        loadScript('3.js', function(error, script) {
          if (error) {
            handleError(error);
          } else {
  *!*
            // ...continua dopo che tutti gli script sono caricati (*)
  */!*
          }
        });

      }
    })
  }
});
```

Nel codice sopra:
1. Carichiamo `1.js`, poi se non ci sono errori.
2. Carichiamo `2.js`, poi se non ci sono errori.
3. Carichiamo `3.js`, poi se non ci sono errori -- facciamo qualcos'altro `(*)`.

Mano a mano che le chiamate diventano più annidate, il codice diventa più profondo e via via più complicato da gestire, specialmente se abbiamo codice reale invece di `...`, che può includere più cicli, condizioni e così via.

Questo viene chiamato "callback hell" o "pyramid of doom."

![](callback-hell.svg)

La "piramide" di chiamate annidate cresce verso destra per ogni azione asincrona. Presto la situazione sarà fuori controllo.

Per questo motivo questo modo di programmare non è molto ottimale.

Possiamo provare ad alleviare il problema rendendo ogni azione una funzione a se stante come qui:

```js
loadScript('1.js', step1);

function step1(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', step2);
  }
}

function step2(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('3.js', step3);
  }
}

function step3(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...continua dopo che tutti gli script sono caricati(*)
  }
};
```

Visto? Fa la stessa cosa, e non ci sono annidamenti profondi perché abbiamo reso ogni azione una funzione separata di primo livello.

Funziona ma il codice sembra un foglio di lavoro diviso. È difficile da leggere e probabilmente hai notato che bisogna saltare con lo sguardo tra i vari pezzi quando lo si legge. Non è conveniente, in particolare se il lettore non è familiare con il codice e non sa dove saltare con lo sguardo.

Inoltre, le funzioni chiamate `step*` sono tutte usate una sola volta, sono create solo per evitare la "pyramid of doom." Nessuno le riutilizzerà al di fuori della catena di azioni. Quindi abbiamo un po' di inquinamento del namespace.

Ci piacerebbe avere qualcosa di meglio.

Fortunatamente, ci sono altri modi di evitare queste piramidi. Uno dei modi migliori è di usare le "promise" descritte nel capitolo successivo.
