

# Introduzione: callbacks

```warn header="Utilizzeremo i metodi browser in questi esempi"
Per dimostrare l'utilizzo di callbacks, promise ed altri concetti astratti, utilizzeremo alcuni metodi del browser: nello specifico, caricamento di script e semplici manipolazioni del documento.

Se questi metodi non vi sono familiari, e il loro utilizzo negli esempi vi risulta di difficile comprensione, potreste voler leggere un paio di capitolo della [prossima parte](/document) del tutorial.

Anche se, proveremo a mantenere le spiegazioni più chiare possibili. Non ci sarà nulla di realmente complesso dal punto di vista del browser.
```

Molte funzioni vengono fornite da ambienti JavaScript che permettono di schedulare azioni *asincrone*. In altre parole, azioni che iniziano ora, ma finiranno in un secondo momento.

Ad esempio, una di queste funzioni è `setTimeout`.

Ci sono altri esempi molto utili, e.g caricamento di script e moduli (che studieremo nei successivi capitoli).

Diamo un'occhiata alla funzione `loadScript(src)`, che carica uno script dal percorso `src`:

```js
function loadScript(src) {
  // creates a <script> tag and append it to the page
  // this causes the script with given src to start loading and run when complete
  let script = document.createElement('script');
  script.src = src;
  document.head.append(script);
}
```

La funzione inserisce nel documento il nuovo script creato dinamicamente `<script src="…">` con il dato `src`. Il browser eseguità automaticamente il caricamento ed una volta terminato eseguirà lo script.

Possiamo usare la funzione in questo modo:

```js
// carica ed esegue lo script
loadScript('/my/script.js');
```

La funzione è chiamata in modo asincrono, perché l'azione (il caricamento dello script) non finirà adesso ma in seguito.

Se c'è del codice sotto `loadScript(…)`, non dovrà attender fino al caricamento dello script.

```js
loadScript('/my/script.js');
// il codice sotto loadScript non attende che il caricamento di loadScript sia completo
// ...
```

Ora diciamo che vogliamo eseguire il nuovo script quando carica. Probabilmente dichiarerà nuove funzioni, quindi vorremmo eseguirle.

Ma se lo facciamo immediatamente dopo la chiamata `loadScript(…)` non funzionerebbe:

```js
loadScript('/my/script.js'); // lo script ha "function newFunction() {…}"

*!*
newFunction(); // nessuna funzione!
*/!*
```

Naturalmente, con buona probabilità il browser non ha avuto tempo di caricare lo script.
Quindi la chiamata immediata alla nuova funzione fallirà. Allo stato attuale la funzione `loadScript` non prevede un modo di tracciare l'avvenuto caricamento.
Lo script carica e poi viene eseguito, questo è quanto. Ma vorremmo sapere quando accade in modo da utilizzare nuove funzioni e variabili da quello script.

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

<<<<<<< HEAD
Ora se volessimo chiamare nuove funzioni dallo script, dovremmo scriverlo nella callback:
=======
The `onload` event is described in the article <info:onload-onerror#loading-a-script>, it basically executes a function after the script is loaded and executed.

Now if we want to call new functions from the script, we should write that in the callback:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

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
<<<<<<< HEAD
  alert(`Cool, the ${script.src} is loaded`);
  alert( _ ); // funzione dichiarata nello script caricato
=======
  alert(`Cool, the script ${script.src} is loaded`);
  alert( _ ); // _ is a function declared in the loaded script
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
});
*/!*
```

Questo è lo stile di programmazione asincrona "callback-based". Una funzione che fa qualcosa in modo asincrono dovrebbe prevedere un argomento `callback` in cui mettiamo la funzione da eseguire al completamento dell'operazione asincrona.

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

  });

});
```

Quindi, ogni nuova azione è dentro una callback. Questo va bene quando abbiamo poche azioni, ma non quando ne abbiamo molte, quindi in seguito vedremo altre alternative.

## Gestione degli errori

Negli esempi precedenti non abbiamo considerato gli errori. Cosa accade se il caricamento dello script fallisce? La nostra callback dovrebbe essere in grado di gestire questa eventualità.

Ecco una versione migliorata di `loadScript` che traccia gli errori di caricamento:

```js
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

<<<<<<< HEAD
Ad una prima occhiata, è un modo pratico di programmare in modo asincrono. Ed infatti lo è. Per una, forse due, chiamate annidate sembra che funzioni.

Ma per molte azioni asincrone che si susseguono una dopo l'altra avremo codice come questo:
=======
At first glance, it looks like a viable approach to asynchronous coding. And indeed it is. For one or maybe two nested calls it looks fine.

But for multiple asynchronous actions that follow one after another, we'll have code like this:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

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
    });
  }
});
```

<<<<<<< HEAD
Nel codice sopra:
1. Carichiamo `1.js`, poi se non ci sono errori.
2. Carichiamo `2.js`, poi se non ci sono errori.
3. Carichiamo `3.js`, poi se non ci sono errori -- facciamo qualcos'altro `(*)`.
=======
In the code above:
1. We load `1.js`, then if there's no error...
2. We load `2.js`, then if there's no error...
3. We load `3.js`, then if there's no error -- do something else `(*)`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Mano a mano che le chiamate diventano più annidate, il codice diventa più profondo e via via più complicato da gestire, specialmente se abbiamo codice reale invece di `...`, che può includere più cicli, condizioni e così via.

Questo viene chiamato "callback hell" o "pyramid of doom."

<!--
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
            // ...
          }
        });
      }
    });
  }
});
-->

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
}
```

<<<<<<< HEAD
Visto? Fa la stessa cosa, e non ci sono annidamenti profondi perché abbiamo reso ogni azione una funzione separata di primo livello.
=======
See? It does the same thing, and there's no deep nesting now because we made every action a separate top-level function.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Funziona ma il codice sembra un foglio di lavoro diviso. È difficile da leggere e probabilmente hai notato che bisogna saltare con lo sguardo tra i vari pezzi quando lo si legge. Non è conveniente, in particolare se il lettore non è familiare con il codice e non sa dove saltare con lo sguardo.

Inoltre, le funzioni chiamate `step*` sono tutte usate una sola volta, sono create solo per evitare la "pyramid of doom." Nessuno le riutilizzerà al di fuori della catena di azioni. Quindi abbiamo un po' di inquinamento del namespace.

Ci piacerebbe avere qualcosa di meglio.

<<<<<<< HEAD
Fortunatamente, ci sono altri modi di evitare queste piramidi. Uno dei modi migliori è di usare le "promise" descritte nel capitolo successivo.
=======
Luckily, there are other ways to avoid such pyramids. One of the best ways is to use "promises", described in the next chapter.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
