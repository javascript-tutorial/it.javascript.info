
# Event loop: microtasks e macrotasks

Sia il flusso di esecuzione di Javascript, che quello di Node.js, sono basati sull' *event loop*.

Comprendere come funziona un event loop è importante sia per una questione di ottimizzazione dell'esecuzione del codice, ma a volte, anche per creare delle architetture software migliori.

In questo capitolo affronteremo i dettagli teorici sul funzionamento, dopodiché prenderemo in esame alcune applicazioni pratiche.

## Event Loop

Il concetto di *event loop* è molto semplice. Esiste un loop infinito, nel quale il motore di Javascript rimane in attesa di un task (compito o operazione da eseguire), lo esegue, quindi si mette in attesa per altri tasks (rimane in sleep, inattivo o dormiente, ma pronto per essere di nuovo richiamato). 

A grandi linee, l'algoritmo del motore è così:
1. Fino a quando ci sono task:
    - eseguili, cominciando da quello meno recente.
2. Rimani in attesa fino a quando non c'è un altro task da eseguire, quindi vai al passo 1.

Questa è una trasposizione di quello che vediamo mentre navighiamo in una pagina web. Il motore di Javascript non fa nulla per la maggior parte del tempo, e va in esecuzione quando si attiva uno script/handler/evento.

<<<<<<< HEAD
Esempio di tasks:
=======
That's a formalization of what we see when browsing a page. The JavaScript engine does nothing most of the time, it only runs if a script/handler/event activates.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

- Quando viene caricato uno script esterno `<script src="...">` (load), il task è quello di eseguirlo.
- Quando un utente sposta il puntatore del mouse, il task è quello di lanciare il dispatch dell'evento `mousemove` ed eseguirne eventuali handlers (gestori).
- Quando è scaduto il tempo per `setTimeout` già schedulato, il task è quello di eseguirne la callback.
- ...e così via.

I task vengono impostati -- il motore li gestisce -- quindi rimane in attesa per altri tasks (nel frattempo rimane in sleep, consumando risorse CPU prossime allo zero).

Però potrebbe succedere che mentre il motore è occupato, arrivi un task, in questo caso, questo viene messo in coda.

<<<<<<< HEAD
I task formano una coda, la cosiddetta "macrotask queue" (termine mutuato da V8, il motore Javascript di Chrome e di Node.js):

![](eventLoop.svg)

Ad esempio se, mentre il motore è occupato nell'esecuzione di uno `script`, l'utente muove il mouse generando un `mousemove`, e magari nello stesso istante è scaduto il tempo di un `setTimeout`, questi task formano una queue (una coda di esecuzione) come illustrato nella figura appena sopra.

I tasks dalla coda vengono processati sulla base del "first come – first served", cioè secondo l'ordine per cui il primo arrivato sarà il primo ad essere servito (FIFO). 
Quando il motore del browser avrà terminato con lo `script`, gestirà l'evento `mousemove`, quindi si occuperà del gestore del `setTimeout` (la callback), e via dicendo.
=======
It may happen that a task comes while the engine is busy, then it's enqueued.

The tasks form a queue, the so-called "macrotask queue" ([v8](https://v8.dev/) term):

![](eventLoop.svg)

For instance, while the engine is busy executing a `script`, a user may move their mouse causing `mousemove`, and `setTimeout` may be due and so on, these tasks form a queue, as illustrated in the picture above.

Tasks from the queue are processed on a "first come – first served" basis. When the engine browser is done with the `script`, it handles `mousemove` event, then `setTimeout` handler, and so on.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Fino a qui abbastanza semplice, giusto?

<<<<<<< HEAD
Ancora due dettagli:
1. Il rendering non avviene mai quando il motore sta eseguendo un task. Non importa se questo impiega molto tempo. I cambiamenti al DOM vengono renderizzati (ridisegnati sul browser) solo dopo che il task viene completato.
2. Se un task impiega troppo tempo, il browser non può eseguire altri tasks, processare altri eventi utente, e così dopo un certo periodo di tempo viene scaturito un alert di "Pagina bloccata" (Page Unresponsive) che ci suggerisce di terminare il task e l'intera pagina. Questo succede in concomitanza di una serie di calcoli complessi, o in seguito ad errori di programmazione che portano loop infiniti.
=======
Two more details:
1. Rendering never happens while the engine executes a task. It doesn't matter if the task takes a long time. Changes to the DOM are painted only after the task is complete.
2. If a task takes too long, the browser can't do other tasks, such as processing user events. So after some time, it raises an alert like "Page Unresponsive", suggesting killing the task with the whole page. That happens when there are a lot of complex calculations or a programming error leading to an infinite loop.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ok, questa era la teoria, ma vediamo come mettere in pratica questi concetti.

## Caso d'uso 1: Spezzettamento di task affamati di CPU (processi intensivi)

Poniamo il caso che abbiamo un task affamato di CPU (CPU-hungry process).

Per esempio, la syntax-highlighting (usata per colorare ed evidenziare gli esempi del codice in questa pagina) è abbastanza pesante per la CPU.
Per evidenziare il codice, compie delle analisi, crea molti elementi colorati, e li aggiunge al documento -- un testo di grosse dimensioni può impiegare molto tempo.

Mentre il motore è occupato con l'evidenziazione, non può fare altre cose relative al DOM, processare gli eventi dell'utente, etc. può  persino causare rallentamenti al pc o addirittura bloccarlo, la qual cosa è inaccettabile.

<<<<<<< HEAD
Possiamo quindi tirarci fuori da questo tipo di problemi, spezzettando i task grossi in piccoli pezzi da eseguire. Evidenzia le prime 100 righe, quindi schedula un `setTimeout` (con zero-delay) con altre 100 righe, e così via fino alla fine.
=======
We can avoid problems by splitting the big task into pieces. Highlight the first 100 lines, then schedule `setTimeout` (with zero-delay) for the next 100 lines, and so on.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Per dimostrare questo tipo di approccio, e per amore della semplicità, anziché evidenziare una sintassi, prendiamo una funzione che conti i numeri da `1` a `1000000000`

Se esegui il codice sotto, il motore si inchioderà per qualche istante. Per il JS server-side (lato server) questo è chiaramente visibile, ma se lo stai eseguendo nella finestra del browser, provando a cliccare gli altri pulsanti -- potrai notare che non verrà gestito nessun altro evento fino a quando il conteggio dei numeri non sarà terminato.

```js run
let i = 0;

let start = Date.now();

function count() {
  //un lavoro pesante!
  for (let j = 0; j < 1e9; j++) {
    i++;
  }
  alert(`Completato in ${(Date.now() - start)} millisecondi`);
}

count();
```

Il browser potrebbe anche mostrare l'avviso "lo script sta impiegando troppo tempo" the script takes too long".


Ora invece, dividiamo l'operazione con l'ausilio di un `setTimeout` annidato:

```js run
let i = 0;

let start = Date.now();

function count() {
  //fai una parte del lavoro pesante :-) (*)
  do {
    i++;
  } while (i % 1e6 != 0);

  if (i == 1e9) {
    alert(`Completato in ${(Date.now() - start)} ms`);
  } else {
    setTimeout(count);//schedula la nuova chiamata a count (**)
  }
}
count();
```

Adesso l'interfaccia del browser è pienamente funzionante, anche durante il processo di "conteggio".

Una singola esecuzione di `count` fa una parte dell'operazione `(*)`, e rischedula se stessa `(**)` se necessario:

1. La prima esecuzione conta: `i=1...1000000`.
2. La seconda esecuzione conta: `i=1000001..2000000`.
3. ...e così via.

Ora, se arriva un nuovo task da eseguire mentre il motore è occupato ad eseguire il passo 1, poniamo il caso ad esempio che venga sollevato un evento `onclick`, quest'ultimo viene messo in coda ed eseguito subito dopo il completamento del passo 1, ma subito prima del passo successivo. Questi periodici "ritorni" all'event loop tra una esecuzione di `count` e l'altra, fornisce abbastanza "respiro" al motore Javascript per occuparsi di qualcos'altro, ad esempio per reagire alle azioni degli utenti.


Per renderli un po' più comparabili, facciamo un miglioramento.

```js run
let i = 0;
let start = Date.now();
function count() {
  //posizioniamo la schedulazione all'inizio
  if (i < 1e9 - 1e6) {
    setTimeout(count);//scheduliamo la chiamata successiva
  }

  do {
    i++;
  } while (i % 1e6 != 0);

  if (i == 1e9) {
    alert(`Completato in ${(Date.now() - start)} ms`);
  }
}
count();
```

Adesso, quando cominciamo con `count()` e vediamo che abbiamo bisogno di richiamarlo più `count()`, lo scheduliamo subito prima di fare il lavoro.

Se lo esegui, è facile notare che impiega significativamente meno tempo.


Perché?  

Semplice: come saprai, c'è un ritardo minimo di 4ms all'interno del browser per tantissime chiamate annidate di `setTimeout`. Anche se noi lo abbiamo impostato a `0`, sarà di `4ms` (o qualcosa in pi&ugrave). Quindi, prima lo scheduliamo, più veloce sarà l'esecuzione. 
Alla fine, abbiamo diviso un task affamato di CPU in porzioni - che adesso non bloccherà più l'interfaccia utente. Inoltre, il suo tempo di esecuzione complessivo non è tanto più lungo.


## Caso d'uso 2: Indicazione dei progressi di una operazione

Un altro beneficio nel dividere task pesanti per gli script del browser è che possiamo mostrare i progressi di completamento.

Solitamente il browser renderizza dopo che il codice in esecuzione viene completato. Non importa se il task impiega tanto tempo. Le modifiche al DOM vengono mostrate solo dopo che il task è terminato.

Da una parte, questo è grandioso, perché la nostra funzione può creare molti elementi, aggiungerli uno alla volta al documento e cambiarne gli stili -- il visitatore, d'altra parte, non vorrebbe mai vedere uno stadio "intermedio" ed incompleto. Una cosa importante, giusto?

Con l'esempio qui sotto abbiamo una dimostrazione, le modifiche all'elemento che rappresenta i valori di `i` non verranno mostrati fino a quando la funzione non termina, così vedremo solamente il valore definitivo:

```html run
<div id="progress"></div>

<script>

  function count() {
    for (let i = 0; i < 1e6; i++) {
      i++;
      progress.innerHTML = i;
    }
  }

  count();
</script>
```

...Tuttavia; potremmo voler mostrare qualcosa durante il task, ad esempio una barra di progresso.

Se andiamo a dividere il task pesante in pezzi usando `setTimeout`, allora tra ognuno di essi, verranno mostrate delle variazioni.

Questo sembra più carino:

```html run
<div id="progress"></div>

<script>
  let i = 0;

  function count() {

    // fai un pezzo di lavoro pesante (*)
    do {
      i++;
      progress.innerHTML = i;
    } while (i % 1e3 != 0);

    if (i < 1e7) {
      setTimeout(count);
    }

  }

  count();
</script>
```

Adesso il `<div>` mostra valori sempre crescenti di `i`, come se fosse una sorta di barra di caricamento.


## Caso d'uso 3: fare qualcosa dopo l'evento

In un gestore di evento, potremmo decidere di postporre alcune azioni, fino a che l'evento non risalga i vari livelli dello stack (bubbling up) e non venga gestito su tutti questi livelli.
Possiamo farlo, avvolgendo (wrapping) il codice all'interno di istruzioni `setTimeout` a ritardo zero.

Nel capitolo <info:dispatch-events> abbiamo visto un esempio: dell'evento custom  `menu-open`, viene fatto il dispatch dentro `setTimeout`, così che esso viene richiamato dopo che l'evento click è stato del tutto gestito.


```js
menu.onclick = function() {
  // ...
  //crea un evento custom con l'elemento dati cliccato sul menu'
  let customEvent = new CustomEvent("menu-open", {
    bubbles: true
  });

  //dispatch dell'evento custom in maniera asincrona
  setTimeout(() => menu.dispatchEvent(customEvent));
};
```


## Macrotasks e Microtasks

Insieme ai *macrotasks*, descritti in questo capitolo, esistono i *microtasks*, menzionati nel capitolo <info:microtask-queue>.

I microtasks provengono esclusivamente dal nostro codice. Solitamente vengono creati dalle promises: una esecuzione di un gestore `.then/catch/finally` diventa un  microtask. I microtasks vengono usati anche "sotto copertura" dagli `await`, dato che anche questi non sono altro che un'altra forma di gestione di promises.

C'è anche una funzione speciale `queueMicrotask(func)` che accoda `func` per l'esecuzione nella coda dei microtask.

**Immediatamente dopo ogni *macrotask*, il motore esegue tutti i task dalla coda *microtask*, prima di ricominciare a eseguire ogni altro macrotask o renderizzare o qualunque altra cosa.**

Per esempio, guardate questo:

```js run
setTimeout(() => alert("timeout"));

Promise.resolve()
  .then(() => alert("promise"));

alert("code");
```

Cosa succederà all'ordine delle operazioni in questo script?

1. `code` viene mostrato per primo, dato che è un chiamata regolare e sincrona.
2. `promise` viene mostrato per secondo, perché `.then` passa attraverso la coda di microtask, e viene eseguito dopo il codice corrente.
3. `timeout` viene mostrato come ultimo perché è anche questo un microtask.

L'immagine più esaustiva di un event loop è questa:

![](eventLoop-full.svg)

**Tutti i microtasks vengono completati prima di ogni altra gestione degli eventi o rendering o qualunque altro macrotask che prende parte nell'esecuzione**

Questo è importante perché garantisce che l'ambiente applicativo rimanga intatto (nessuna modifica alle coordinate del puntatore del mouse, nessun dato dalle reti, etc) tra i vari microtasks.

Se volessimo eseguire una funzione in maniera asincrona (dopo il codice in esecuzione), ma prima che avvengano cambiamenti nella finestra del browser, o che nuovi eventi vengano gestiti, potremmo schedularla con `queueMicrotask`.

Questo qui è un esempio della funzione "conteggio barra di progresso", del tutto simile alla precedente, ma vengono usati `queueMicrotask` invece di `setTimeout`.
Come puoi notare, renderizza il valore del conteggio alla fine. Esattamente come se fosse del codice sincrono:

```html run
<div id="progress"></div>

<script>
  let i = 0;

  function count() {
    //faccio un pezzetto di lavoro pesante (*)
    do {
      i++;
      progress.innerHTML = i;
    } while (i % 1e3 != 0);

    if (i < 1e6) {
      queueMicrotask(count);  
    }
  }

  count();
</script>
```

## Conclusioni

L'immagine più esaustiva di un event loop è questa:

![](eventLoop-full.svg)

Questo è il più dettagliato algoritmo dell'event loop: (sebbene ancora semplicistico rispetto alla [specification](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model)):

1. Rimuovi dalla coda ed esegui il task meno recente dalla coda dei *macrotask*  (ad esempio "script").
2. Esegui tutti i *microtasks*:
    - Se la cosa dei microtask non è vuota:
        - Rimuovi dalla coda ed esegui il meno recente dei microtask.
3. Renderizza le modifiche se ve ne sono.
4. Se la coda dei macrotask è vuota, vai in sleep fino al prossimo  macrotask.
5. Vai al passo 1.

Per schedulare un nuovo *macrotask*:
- Usa un `setTimeout(f)` ritardo zero.

Questo potrebbe essere usato per dividere task di calcolo pesante in pezzi più piccoli, di modo che nello spazio tra questi, il browser possa eseguire altre operazioni.

Inoltre, vengono usati nei gestori degli eventi per pianificare una azione dopo che l'evento è stato del tutto gestito (bubbling completato)

Per schedulare un nuovo *microtask*
- Usa `queueMicrotask(f)`.
- Anche i gestori promise passando attraverso la coda dei microtask.

Non ci possono essere gestioni di UI o di networking tra i microtask, perché i microtasks vengono eseguiti immediatamente uno dopo l'altro.

Ma cosa succederebbe se uno  volesse che la coda `queueMicrotask` eseguisse una funzione in maniera asincrona, mantenendo però il contesto dell'ambiente.

```smart header="Web Workers"
Per lunghi calcoli pesanti che non possono bloccare l'event loop, possiamo usare i [Web Workers](https://html.spec.whatwg.org/multipage/workers.html).

I Web Workers sono un modo per eseguire del codice in un altro thread parallelo.

I Web Workers possono scambiare messaggi con il processo principale, ma hanno le loro variabili ed i loro event loop.

Web Workers do not have access to DOM, so they are useful, mainly, for calculations, to use multiple CPU cores simultaneously.
```
