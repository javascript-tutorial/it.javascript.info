# Pianificazione: setTimeout e setInterval

Potremmo decidere di non eseguire subito una funzione, ma dopo un certo lasso di tempo. Questo è detto "pianificare una chiamata" ("scheduling a call").

Ci sono due metodi per farlo:

<<<<<<< HEAD
- `setTimeout` permette di eseguire una volta la funzione dopo l'intervallo prescelto.
- `setInterval` permette di eseguire regolarmente la funzione lasciando scorrere l'intervallo di tempo prescelto tra una chiamata e l'altra.
=======
- `setTimeout` allows us to run a function once after the interval of time.
- `setInterval` allows us to run a function repeatedly, starting after the interval of time, then repeating continuously at that interval.
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

Questi metodi non fanno parte delle specifiche di JavaScript. Ma la maggior parte degli ambienti hanno un pianificatore interno e forniscono questi metodi. In particolare, sono supportati in tutti i browser e in Node.js.

## setTimeout

La sintassi:

```js
let timerId = setTimeout(func|codice, [ritardo], [arg1], [arg2], ...)
```

Parametri:

`func|codice`
: Funzione o stringa (string) di codice da eseguire.
Di solito è una funzione. Per ragioni storiche, si può passare una stringa (string) di codice, ma è sconsigliato.

`ritardo`
: Il ritardo in millisecondi (1000 ms = 1 secondo) prima dell'esecuzione, di base 0.

`arg1`, `arg2`...
: Gli argomenti della funzione (non supportati in IE9-)

Per esempio, questo codice esegue `saluta()` dopo un secondo:

```js run
function saluta() {
  alert('Ciao');
}

*!*
setTimeout(saluta, 1000);
*/!*
```

Con gli argomenti:

```js run
function saluta(frase, chi) {
  alert( frase + ', ' + chi );
}

*!*
setTimeout(saluta, 1000, "Ciao", "Giovanni"); // Ciao, Giovanni
*/!*
```

Se il primo argomento è una stringa (string), JavaScript crea una funzione dallo stesso.

Quindi funzionerà anche così:

```js run no-beautify
setTimeout("alert('Ciao')", 1000);
```

<<<<<<< HEAD
Ma l'utilizzo delle stringhe (string) è sconsigliato, usiamo piuttosto una funzione come questa:
=======
But using strings is not recommended, use arrow functions instead of them, like this:
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

```js run no-beautify
setTimeout(() => alert('Ciao'), 1000);
```

````smart header="Passa una funzione, ma non la esegue"
Gli sviluppatori alle prime armi talvolta fanno l'errore di aggiungere le parentesi `()` dopo la funzione:

```js
// sbagliato!
setTimeout(saluta(), 1000);
```
Non funziona, perché `setTimeout` si aspetta un richiamo a una funzione. Qui `saluta()` esegue la funzione e viene passato a `setTimeout` il *risultato della sua esecuzione*. Nel nostro caso il risultato di `saluta()` è `undefined` (la funzione non restituisce nulla), quindi non viene pianificato niente.
````

### Annullare con clearTimeout

Una chiamata a `setTimeout` restituisce un "identificatore del timer" (timer identifier) `timerId` che possiamo usare per disattivare l'esecuzione.

La sintassi per annullare:

```js
let timerId = setTimeout(...);
clearTimeout(timerId);
```

Nel codice qui sotto, pianifichiamo la funzione e poi la annulliamo (abbiamo cambiato idea). Ne risulta che non accade niente:

```js run no-beautify
let timerId = setTimeout(() => alert("non accade niente"), 1000);
alert(timerId); // identificatore del timer

clearTimeout(timerId);
alert(timerId); // stesso identificatore (non diventa null dopo la disattivazione)
```

Come possiamo vedere dall'output dell'`alert`, in un browser l'identificatore del timer è un numero. In altri ambienti, potrebbe essere qualcos'altro. Per esempio, Node.js restituisce un oggetto timer con metodi addizionali.

Anche qui, non ci sono specifiche universali per questi metodi, quindi va bene così.

Per i browser, i timer sono descritti nella [sezione Timers](https://www.w3.org/TR/html5/webappapis.html#timers) di HTML5 standard.

## setInterval

Il metodo `setInterval` ha la stessa sintassi di `setTimeout`:

```js
let timerId = setInterval(func|codice, [ritardo], [arg1], [arg2], ...)
```

Tutti gli argomenti hanno lo stesso significato. Ma a diferenza di `setTimeout` non esegue la funzione solo una volta, ma in modo regolare dopo un dato intervallo di tempo.

Per evitare ulteriori chiamate, dobbiamo eseguire `clearInterval(timerId)`.

L'esempio che segue mostrerà un messaggio ogni 2 secondi. Dopo 5 secondi, l'output verrà fermato:

```js run
// ripete con un intervallo di 2 secondi
let timerId = setInterval(() => alert('tic'), 2000);

// dopo 5 secondi si ferma
setTimeout(() => { clearInterval(timerId); alert('stop'); }, 5000);
```

```smart header="Il tempo passa mentre viene mostrato l'`alert`"
Nella maggior parte dei browser, inclusi Chrome e Firefox, il timer interno continua a "ticchettare" mentre viene mostrato `alert/confirm/prompt`.

Quindi, se eseguiamo il codice qui sopra e non chiudiamo la finestra dell'`alert` per qualche istante, l'`alert` successivo verrà mostrato immediatamente e l'intervallo tra i due avvisi sarà più breve di 2 secondi.
```

<<<<<<< HEAD
## setTimeout ricorsivo
=======
## Nested setTimeout
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

Ci sono due modi per eseguire qualcosa regolarmente.

<<<<<<< HEAD
Uno è `setInterval`. L'altro è un `setTimeout` ricorsivo, come questo:
=======
One is `setInterval`. The other one is a nested `setTimeout`, like this:
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

```js
/** invece di:
let timerId = setInterval(() => alert('tic'), 2000);
*/

let timerId = setTimeout(function tic() {
  alert('tic');
*!*
  timerId = setTimeout(tic, 2000); // (*)
*/!*
}, 2000);
```

Il `setTimeout` qui sopra pianifica la prossima chiamata subito alla fine di quella attuale `(*)`.

<<<<<<< HEAD
Il `setTimeout` ricorsivo è un metodo più flessibile di `setInterval`. In tal modo la chiamata successiva può essere pianificata in modo diverso, a seconda del risultato di quella attuale.
=======
The nested `setTimeout` is a more flexible method than `setInterval`. This way the next call may be scheduled differently, depending on the results of the current one.
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

Per esempio, dobbiamo scrivere un servizio che mandi ogni 5 secondi una richiesta al server chiedendo dati, ma, in caso il server sia sovraccarico, dovrebbe aumentare l'intervallo di 10, 20, 40 secondi...

Qui lo pseudocodice:
```js
let ritardo = 5000;

let timerId = setTimeout(function richiesta() {
  ...manda la richiesta...

  if (la richiesta fallisce a causa di sovraccarico del server) {
    // aumenta l'intervallo per la prossima esecuzione
    ritardo *= 2;
  }

  timerId = setTimeout(richiesta, ritardo);

}, ritardo);
```


Inoltre, se le funzioni che stiamo pianificando sono avide di CPU, possiamo misurare il tempo richiesto dall'esecuzione e pianificare la chiamata successiva prima o dopo.

<<<<<<< HEAD
**Il `setTimeout` ricorsivo permette di impostare un ritardo tra le esecuzioni in modo più preciso di `setInterval`.**
=======
**Nested `setTimeout` allows to set the delay between the executions more precisely than `setInterval`.**
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

Paragoniamo due frammenti di codice. Il primo usa `setInterval`:

```js
let i = 1;
setInterval(function() {
  func(i++);
}, 100);
```

<<<<<<< HEAD
Il secondo usa il `setTimeout` ricorsivo:

```js
let i = 1;
setTimeout(function avvia() {
  func(i);
  setTimeout(avvia, 100);
}, 100);
```

Per `setInterval` la pianificazione interna eseguirà `func(i)` ogni 100ms:
=======
The second one uses nested `setTimeout`:

```js
let i = 1;
setTimeout(function run() {
  func(i++);
  setTimeout(run, 100);
}, 100);
```

For `setInterval` the internal scheduler will run `func(i++)` every 100ms:
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

![](setinterval-interval.svg)

Avete notato?

**Il ritardo reale tra la chiamata `func` di `setInterval` è inferiore a quello del codice!**

È normale, perché il tempo che occorre all'esecuzione di `func` "consuma" una parte dell'intervallo.

È possibile che l'esecuzione di `func`sia più lunga del previsto e richieda più di 100ms.

In tal caso la macchina attende che `func` sia completa, poi verifica la pianificazione e se il tempo è terminato, la esegue di nuovo *immediatamente*.

In casi limite, se la funzione viene eseguita sempre dopo gli ms di `ritardo`, le chiamate avverranno senza alcuna pausa.

<<<<<<< HEAD
Qui c'è l'immagine per il `setTimeout` ricorsivo:

![](settimeout-interval.svg)

**Il `setTimeout` ricorsivo garantisce il ritardo fissato (qui 100ms).**
=======
And here is the picture for the nested `setTimeout`:

![](settimeout-interval.svg)

**The nested `setTimeout` guarantees the fixed delay (here 100ms).**
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

Questo perché una nuova chiamata è pianificata solo alla fine della precedente.

````smart header="La Garbage Collection (letteralmente 'raccolta dei rifiuti') e il callback in setInterval/setTimeout"
Quando una funzione viene passata in `setInterval/setTimeout`, viene creata e salvata nella pianificazione una referenza interna per la funzione stessa. Questo evita che la funzione venga eliminata anche se non ci sono altre referenze.

```js
// la funzone resta in memoria finché la pianificazione la esegue
setTimeout(function() {...}, 100);
```

Per `setInterval` la funzione resta in memoria fino a quando viene eseguito `clearInterval`.

C'è un effetto collaterale. Una funzione si riferisce all'ambiente lessicale esterno, quindi, finché vive, vivono anche le variabili esterne. Queste possono richiedere molta più memoria della funzione stessa. Ne consegue che quando non ci serve più la funzione pianificata, è meglio cancellarla, anche se è molto piccola.
````

## setTimeout con zero-delay (ritardo zero)

C'è un caso speciale: `setTimeout(func, 0)` o semplicemente `setTimeout(func)`.

<<<<<<< HEAD
In questo caso l'esecuzione della `func` viene pianificata quanto prima possibile, ma la pianificazione la esegue solo dopo che il codice corrente è completo.

Quindi la funzione viene pianificata per avviarsi "subito dopo" il codice corrente.
=======
This schedules the execution of `func` as soon as possible. But the scheduler will invoke it only after the currently executing script is complete.

So the function is scheduled to run "right after" the current script.
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

Per esempio, questo produce "Ciao" quindi, immediatamente, "Mondo":

```js run
setTimeout(() => alert("Mondo"));

alert("Ciao");
```

<<<<<<< HEAD
La prima linea "mette in calendario" la chiamata dopo 0ms, ma la pianificazione "verifica il calendario" solo dopo che il codice corrente è completo, quindi `"Ciao"` viene per primo, seguito da `"Mondo"`.
=======
The first line "puts the call into calendar after 0ms". But the scheduler will only "check the calendar" after the current script is complete, so `"Hello"` is first, and `"World"` -- after it.
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

Ci sono anche casi di utilizzo avanzato relativi ai browser del timeout zero-delay, li discuteremo nel capitolo <info:event-loop>.

````smart header="Zero-delay in effetti non è zero (in un browser)"
In un browser c'è un limite a quanto spesso possono essere avviati i timer nidificati. L'[HTML5 standard](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers) dice: "dopo cinque timer nidificati, l'intervallo è costretto a essere di almeno 4 millisecondi".

Vediamo cosa significa con l'esempio qui sotto. La chiamata `setTimeout` riprogramma se stessa con zero-delay. Ogni chiamata ricorda il tempo reale dall'esecuzione precedente nell'array `tempi`. Come sono realmente i ritardi? Vediamo:

```js run
let partenza = Date.now();
let tempi = [];

setTimeout(function avvia() {
  tempi.push(Date.now() - partenza); // ricorda il ritardo dalla chiamata precedente

  if (partenza + 100 < Date.now()) alert(tempi); // mostra i ritardi dopo 100ms
  else setTimeout(avvia); // allora riprogramma
});

// un esempio del risultato:
// 1,1,1,1,9,15,20,24,30,35,40,45,50,55,59,64,70,75,80,85,90,95,100
```

I primi timer vengono eseguiti immediatamente (come scritto nelle specifiche), poi vediamo `9, 15, 20, 24...` Entra in gioco il ritardo obbligatorio di 4+ ms fra le esecuzioni.

Una cosa simile accade se usiamo `setInterval` invece di `setTimeout`: `setInterval(f)` esegue `f` alcune volte con zero-delay, dopo di che con 4+ ms di ritardo.

Questo limite viene da tempi remoti e molti script vi si affidano, quindi esiste per ragioni storiche.

Per JavaScript lato server, questo limite non esiste e ci sono altri metodi per pianificare un lavoro asincrono immediato, come [setImmediate](https://nodejs.org/api/timers.html) per Node.js. Quindi questa nota è specifica per i browser.
````

## Riepilogo

<<<<<<< HEAD
- I metodi `setInterval(func, ritardo, ...arg)` e `setTimeout(func, ritardo, ...arg)` consentono di avviare la `func` regolarmente/una volta dopo `ritardo` millisecondi.
- Per disattivare l'esecuzione, dovremo chiamare `clearInterval/clearTimeout` con il valore restituito da `setInterval/setTimeout`.
- La chiamata nidificata di `setTimeout` è un'alternativa più flessibile a `setInterval`, permettendo di impostare in modo più preciso l'intervallo di tempo *tra*  le esecuzioni.
- Zero-delay si pianifica con `setTimeout(func, 0)` (lo stesso di `setTimeout(func)`) ed è usato per pianificare la chiamata "quanto prima possibile, ma dopo che il codice corrente è completo".
- Il browser limita il ritardo minimo per cinque o più chiamate nidificate di `setTimeout` o `setInterval` (dopo la 5a chiamata) a 4ms. Ciò accade per ragioni storiche.
=======
- Methods `setTimeout(func, delay, ...args)` and `setInterval(func, delay, ...args)` allow us to run the `func` once/regularly after `delay` milliseconds.
- To cancel the execution, we should call `clearTimeout/clearInterval` with the value returned by `setTimeout/setInterval`.
- Nested `setTimeout` calls are a more flexible alternative to `setInterval`, allowing us to set the time *between* executions more precisely.
- Zero delay scheduling with `setTimeout(func, 0)` (the same as `setTimeout(func)`) is used to schedule the call "as soon as possible, but after the current script is complete".
- The browser limits the minimal delay for five or more nested call of `setTimeout` or for `setInterval` (after 5th call) to 4ms. That's for historical reasons.
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

Da notare che tutti i metodi di pianificazione non *garantiscono* un ritardo preciso.

Per esempio, il timer nel browser può rallentare per molte ragioni:
- La CPU è sovraccarica.
- La scheda del browser è sullo sfondo.
- Il portatile ha la batteria scarica.

Tutto ciò può aumentare l'esecuzione minima del timer (il ritardo minimo) di 300ms o anche 1000ms a seconda del browser e le impostazioni di prestazione a livello dell'OS.
