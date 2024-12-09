importance: 5

---

# Throttle decorator

Creare un "throttling" decorator `throttle(f, ms)` -- che ritorna un wrapper.

Quando viene chiamato più volte, passa la chiamata a `f` al massimo una volta ogni `ms` millisecondi.

<<<<<<< HEAD
Rispetto al *debounce decorator* abbiamo un decorator completamente diverso:
- `debounce` esegue la funzione una volta, dopo il periodo di "cooldown". Valido per processare il risultato finale.
- `throttle` la esegue non più spesso dell'intervallo di tempo `ms`. Valido per aggiornamenti regolari ma non troppo frequenti.
=======
Compared to the debounce decorator, the behavior is completely different:
- `debounce` runs the function once after the "cooldown" period. Good for processing the final result.
- `throttle` runs it not more often than given `ms` time. Good for regular updates that shouldn't be very often.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

In altre parole, `throttle` è come una segretaria che accetta telefonate, ma le passa al capo (chiama `f`) non più di una volta ogni `ms` millisecondi.

Vediamo l'applicazione nella vita reale, per capire meglio tale esigenza e per vedere da dove nasce.

**Ad esempio, vogliamo tenere traccia dei movimenti del mouse.**

In un browser possiamo impostare una funzione da eseguire ad ogni movimento del mouse, e ottenere la posizione del puntatore mentre si sposta. Durante un utilizzo attivo del mouse, questa funzione di solito viene eseguita molto frequentemente, può essere qualcosa come 100 volte al secondo (ogni 10 ms).

**Vorremmo aggiornare alcune informazioni sulla pagina web quando il puntatore si sposta.**

... Ma l'aggiornamento della funzione `update()` è troppo pesante per farlo ad ogni micro-movimento. Inoltre, non ha senso aggiornare più spesso di una volta ogni 100 ms.

Quindi la andremo ad inserire nel decorator, usando `throttle(update, 100)` come funzione da eseguire ad ogni movimento del mouse, invece dell'originale `update()`. Il decorator verrà chiamato spesso, ma inoltrerà la chiamata a `update()` al massimo una volta ogni 100 ms.

Visivamente, sarà simile a questo:

1. Per il primo movimento del mouse la variante *decorata* passa immediatamente la chiamata ad `update`. Questo è importante, l'utente vede immediatamente una reazione al suo movimento.
2. Successivamente, per i movimenti del mouse entro lo scadere di `100ms`, non accade nulla. La variante decorata ignora le chiamate.
3. Allo scadere dei `100ms` viene chiamato un ulteriore `update` con le ultime coordinate.
4. Infine, il mouse si ferma da qualche parte. La variante decorata attende la scadenza dei `100ms` e poi esegue `update` con le ultime coordinate. Quindi, cosa abbastanza importante, vengono elaborate le coordinate finali del mouse.

Un esempio del codice:

```js
function f(a) {
  console.log(a);
}

// f1000 passa ad f un massimo di una chiamata ogni 1000 ms
let f1000 = throttle(f, 1000);

f1000(1); // visualizza 1
f1000(2); // (throttling, 1000ms non ancora scaduti)
f1000(3); // (throttling, 1000ms non ancora scaduti)

// allo scadere dei 1000 ms...
// ...visualizza 3, il valore intermedio 2 viene ignorato
```

P.S. Gli argomenti e il contesto `this` passati a `f1000` dovrebbero essere passati alla funzione `f` originale.
