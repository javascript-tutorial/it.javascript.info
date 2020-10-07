
# Event loop: microtasks e macrotasks

Il flusso di esecuzione di Javascript, cos&igrave; come quello di Node.js, è basato su un *event loop*.

Comprendere come un event loop lavora è importante per le ottimizzazioni, e a volte per creare delle architetture migliori.

In questo capitolo, affronteremo i dettagli teorici su come funzionano, quindi, vedremo alcune applicazioni pratiche.

## Event Loop

Il concetto di *event loop* è molto semplice. Esiste un loop infinito nel quale il motore di Javascript rimane in attesa di un task (operazione) da eseguire, lo esegue, dopodich&egrave; si rimette in rimane in sleep (inattivo, dormiente, ma pronto per essere eseguito) per altri tasks.

Questo, l'algoritmo generico del motore:

1. Fino a quando ci sono task:
    - eseguili, cominciando da quello meno recente.
2. Rimani in attesa fino a quando non c'&egrave; un altro task da eseguire, quindi vai al passo 1.

Questa è una esposizione di quello che vediamo quando navighiamo una pagina. Il motore di Javascript non fa nulla per la maggiorparte del tempo, va in esecuzione quando si attiva uno script/handler/evento.

Esempio di tasks:

- Quando uno script esterno `<script src="...">` viene caricato (load), il task è quello di eseguirlo.
- Quando un utente sposta il puntatore del mouse, il task è quello di fare il dispatch dell'evento `mousemove` ed eseguirne eventuali handlers (gestori).
- Quando è scaduto il tempo per `setTimeout` già schedulato, il task è quello di eseguirne la callback.
- ...e cos&igrave; via.

I task vengono impostati -- il motore li gestisce -- quindi rimane in attesa per altri tasks (nel frattempo rimane in sleep, consumando risorse della CPU prossime allo zero).

Potrebbe succedere che mentre il motore è occupato arrivi un task, in questo caso, questo viene messo in coda.

I task formano una coda, la cosiddetta "macrotask queue" (termine di v8, il motore di Javascript di Chrome e di Node.js):

![](eventLoop.svg)

Ad esempio, se mentre il motore è occupato nell'esecuzione di uno `script`, l'utente muove il mouse generando un `mousemove`, e magari nello stesso istante è scaduto il tempo di un `setTimeout`, questi task formano una queue (una coda di esecuzione) come illustrato nella figura di sopra.

I task dalla coda vengono processati sulla base del "first come – first served", cioè secondo l'ordine che il primo arrivato sarà il primo ad essere servito (FIFO). 
Quando il motere del browser avrà terminato con lo `script`, gestirà l'evento `mousemove`, quindi si occuper&agrave; del gestore del `setTimeout` (la callback), e cos&igrave;

Fino a qui abbastanza semplice, giusto?

Ancora due dettagli:
1. Il rendering non avviene mai quando il motore sta eseguendo un task. Non importa se questo impiega molto tempo. I cambiamenti al DOM vengono renderizzati (ridisegnati sul browser) solo dopo che il task viene completato.
2. Se un task impiega troppo tempo, il browsere non puiò eseguire altri taskm, processare eventi utente, e così dopo un certo periodo di tempo viene scaturito un alert di "Pagina bloccata"(Page Unresponsive) che ci suggerisce di terminare il task con l'intera pagina. Questo succede in concomitanza di una serie di calcoli complessi, o degli errori di programmazione che portano ad un loop infinito.

Questa era la teoria. Adesso vediamo come applicare questi concetti.

## Caso d'uso 1: Spezzettamento di task affamati di CPU (processi intensivi)

Poniamo il caso che abbiamo un task affamato di CPU.

Per esempio, la syntax-highlighting (usata per colorare ed evidenziare gli esempi del codice in questa pagina) è abbastanza pesante per la CPU.
Per evidenziare il codice, compie delle analisi, crea molti elementi colorati, e li aggiunge al documento -- un testo di grosse dimensioni può impiegare molto tempo.

While the engine is busy with syntax highlighting, it can't do other DOM-related stuff, process user events, etc. It may even cause the browser to "hiccup" or even "hang" for a bit, which is unacceptable.

We can evade problems by splitting the big task into pieces. Highlight first 100 lines, then schedule `setTimeout` (with zero-delay) another 100 lines, and so on.

To demonstrate the approach, for the sake of simplicity, instead of syntax-highlighting let's take a function that counts from `1` to `1000000000`.

If you run the code below, the engine will "hang" for some time. For server-side JS that's clearly noticeable, and if you are running it in-browser, then try to click other buttons on the page -- you'll see that no other events get handled until the counting finishes.

```js run
let i = 0;

let start = Date.now();

function count() {

  // do a heavy job
  for (let j = 0; j < 1e9; j++) {
    i++;
  }

  alert("Done in " + (Date.now() - start) + 'ms');
}

count();
```

The browser may even show "the script takes too long" warning.

Let's split the job using nested `setTimeout`:

```js run
let i = 0;

let start = Date.now();

function count() {

  // do a piece of the heavy job (*)
  do {
    i++;
  } while (i % 1e6 != 0);

  if (i == 1e9) {
    alert("Done in " + (Date.now() - start) + 'ms');
  } else {
    setTimeout(count); // schedule the new call (**)
  }

}

count();
```

Now the browser interface is fully functional during the "counting" process.

A single run of `count` does a part of the job `(*)`, and then re-schedules itself `(**)` if needed:

1. First run counts: `i=1...1000000`.
2. Second run counts: `i=1000001..2000000`.
3. ...and so on.

Now, if a new side task (e.g. `onclick` event) appears while the engine is busy executing part 1, it gets queued and then executes when part 1 finished, before the next part. Periodic returns to event loop between `count` executions provide just enough "air" for the JavaScript engine to do something else, to react on other user actions.

The notable thing is that both variants -- with and without splitting the job by `setTimeout` -- are comparable in speed. There's no much difference in the overall counting time.

To make them closer, let's make an improvement.

We'll move the scheduling in the beginning of the `count()`:

```js run
let i = 0;

let start = Date.now();

function count() {

  // move the scheduling at the beginning
  if (i < 1e9 - 1e6) {
    setTimeout(count); // schedule the new call
  }

  do {
    i++;
  } while (i % 1e6 != 0);

  if (i == 1e9) {
    alert("Done in " + (Date.now() - start) + 'ms');
  }

}

count();
```

Now when we start to `count()` and see that we'll need to `count()` more, we schedule that immediately, before doing the job.

If you run it, it's easy to notice that it takes significantly less time.

Why?  

That's simple: as you remember, there's the in-browser minimal delay of 4ms for many nested `setTimeout` calls. Even if we set `0`, it's `4ms` (or a bit more). So the earlier we schedule it - the faster it runs.

Finally, we've split a CPU-hungry task into parts - now it doesn't block the user interface. And its overall execution time isn't much longer.

## Use case 2: progress indication

Another benefit of splitting heavy tasks for browser scripts is that we can show progress indication.

Usually the browser renders after the currently running code is complete. Doesn't matter if the task takes a long time. Changes to DOM are painted only after the task is finished.

From one hand, that's great, because our function may create many elements, add them one-by-one to the document and change their styles -- the visitor won't see any "intermediate", unfinished state. An important thing, right?

Here's the demo, the changes to `i` won't show up until the function finishes, so we'll see only the last value:


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

...But we also may want to show something during the task, e.g. a progress bar.

If we split the heavy task into pieces using `setTimeout`, then changes are painted out in-between them.

This looks prettier:

```html run
<div id="progress"></div>

<script>
  let i = 0;

  function count() {

    // do a piece of the heavy job (*)
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

Now the `<div>` shows increasing values of `i`, a kind of a progress bar.


## Use case 3: doing something after the event

In an event handler we may decide to postpone some actions until the event bubbled up and was handled on all levels. We can do that by wrapping the code in zero delay `setTimeout`.

In the chapter <info:dispatch-events> we saw an example: custom event `menu-open` is dispatched in `setTimeout`, so that it happens after the "click" event is fully handled.

```js
menu.onclick = function() {
  // ...

  // create a custom event with the clicked menu item data
  let customEvent = new CustomEvent("menu-open", {
    bubbles: true
  });

  // dispatch the custom event asynchronously
  setTimeout(() => menu.dispatchEvent(customEvent));
};
```

## Macrotasks and Microtasks

Along with *macrotasks*, described in this chapter, there exist *microtasks*, mentioned in the chapter <info:microtask-queue>.

Microtasks come solely from our code. They are usually created by promises: an execution of `.then/catch/finally` handler becomes a microtask. Microtasks are used "under the cover" of `await` as well, as it's another form of promise handling.

There's also a special function `queueMicrotask(func)` that queues `func` for execution in the microtask queue.

**Immediately after every *macrotask*, the engine executes all tasks from *microtask* queue, prior to running any other macrotasks or rendering or anything else.**

For instance, take a look:

```js run
setTimeout(() => alert("timeout"));

Promise.resolve()
  .then(() => alert("promise"));

alert("code");
```

What's going to be the order here?

1. `code` shows first, because it's a regular synchronous call.
2. `promise` shows second, because `.then` passes through the microtask queue, and runs after the current code.
3. `timeout` shows last, because it's a macrotask.

The richer event loop picture looks like this:

![](eventLoop-full.svg)

**All microtasks are completed before any other event handling or rendering or any other macrotask takes place.**

That's important, as it guarantees that the application environment is basically the same (no mouse coordinate changes, no new network data, etc) between microtasks.

If we'd like to execute a function asynchronously (after the current code), but before changes are rendered or new events handled, we can schedule it with `queueMicrotask`.

Here's an example with "counting progress bar", similar to the one shown previously, but `queueMicrotask` is used instead of `setTimeout`. You can see that it renders at the very end. Just like the synchronous code:

```html run
<div id="progress"></div>

<script>
  let i = 0;

  function count() {

    // do a piece of the heavy job (*)
    do {
      i++;
      progress.innerHTML = i;
    } while (i % 1e3 != 0);

    if (i < 1e6) {
  *!*
      queueMicrotask(count);
  */!*
    }

  }

  count();
</script>
```

## Summary

The richer event loop picture may look like this:

![](eventLoop-full.svg)

The more detailed algorithm of the event loop (though still simplified compare to the [specification](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model)):

1. Dequeue and run the oldest task from the *macrotask* queue (e.g. "script").
2. Execute all *microtasks*:
    - While the microtask queue is not empty:
        - Dequeue and run the oldest microtask.
3. Render changes if any.
4. If the macrotask queue is empty, wait till a macrotask appears.
5. Go to step 1.

To schedule a new *macrotask*:
- Use zero delayed `setTimeout(f)`.

That may be used to split a big calculation-heavy task into pieces, for the browser to be able to react on user events and show progress between them.

Also, used in event handlers to schedule an action after the event is fully handled (bubbling done).

To schedule a new *microtask*
- Use `queueMicrotask(f)`.
- Also promise handlers go through the microtask queue.

There's no UI or network event handling between microtasks: they run immediately one after another.

So one may want to `queueMicrotask` to execute a function asynchronously, but within the environment state.

```smart header="Web Workers"
For long heavy calculations that shouldn't block the event loop, we can use [Web Workers](https://html.spec.whatwg.org/multipage/workers.html).

That's a way to run code in another, parallel thread.

Web Workers can exchange messages with the main process, but they have their own variables, and their own event loop.

Web Workers do not have access to DOM, so they are useful, mainly, for calculations, to use multiplle CPU cores simultaneously.
```
