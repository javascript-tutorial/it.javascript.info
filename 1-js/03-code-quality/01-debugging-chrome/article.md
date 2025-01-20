# Debugging in the browser

Prima di scrivere codice più complesso, dovremmo parlare di debugging.

[Debugging](https://en.wikipedia.org/wiki/Debugging) è il processo che prevede la ricerca e la risoluzione degli errori all'interno di uno script. Tutti i browser moderni e molti altri ambienti forniscono strumenti per il debugging -- degli speciali strumenti che rendono il debugging un operazione più semplice. Consentono anche di seguire l'esecuzione del codice passo per passo, per capire esattamente cosa sta accadendo..

Noi useremo Chrome, poiché è probabilmente il più ricco di caratteristiche sotto questo aspetto.

## Il pannello "sources" 

La tua versione di Chrome potrebbe essere differente, ma le funzioni principali dovrebbe essere molto simili.

- Apri la [pagina di esempio](debugging/index.html) in Chrome.
- Attiva gli strumenti da sviluppatore con `key:F12` (Mac: `key:Cmd+Opt+I`).
- Seleziona il pannello `sources`.

Questo è quello che dovreste vedere se è la prima volta che lo aprite:

![](chrome-open-sources.svg)

Il bottone <span class="devtools" style="background-position:-172px -98px"></span> apre la barra laterale con i file.

Clicchiamoci sopra e selezioniamo `hello.js` dalla vista ad albero. Questo è quello che dovrebbe apparire:

![](chrome-tabs.svg)

Possiamo vedere tre zone:

1. La **zona Risorse** con la lista degli HTML, JavaScript, CSS e altri file, incluse le immagini che sono collegate alla pagina. Potrebbero apparire anche le estensioni di Chrome.
2. La **zona Sorgente** mostra il codice.
3. La **zona Informazione e controllo** utile per il debugging, la esploreremo meglio.

Ora puoi cliccare nuovamente lo stesso bottone <span class="devtools" style="background-position:-200px -76px"></span> per nascondere la lista risorse e dare più spazio al codice.

## Console

Se premiamo `key:Esc`, si apre una console in basso. Possiamo digitare comandi e premere `key:Enter` per eseguirli.

Dopo l'esecuzione dell'istruzione, il risultato viene mostrato sotto.

<<<<<<< HEAD
Ad esempio, `1+2` con risultato `3`, ed `hello("debugger")` non ritorna nulla, quindi il risultato è `undefined`:
=======
For example, here `1+2` results in `3`, while the function call `hello("debugger")` returns nothing, so the result is `undefined`:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

![](chrome-sources-console.svg)

## Breakpoint

Esaminiamo cosa sta succedendo nel codice della [pagina di esempio](debugging/index.html). In `hello.js`, cliccate nel numero della riga `4`. Si, cliccate proprio sopra il numero `4`, non dentro il codice.

Congratulazioni! Avete settato un breakpoint. Ora premete anche nella riga numero `8`.

Dovrebbe apparire qualcosa di simile (in blu dove avreste dovuto cliccare):

![](chrome-sources-breakpoint.svg)

Un *breakpoint* è un punto del codice in cui il debugger si metterà in pausa automaticamente durante l'esecuzione del codice  JavaScript.

Mentre il codice è in pausa, è possibile esaminare le variabili, eseguire comandi tramite la console etc. In altre parole, stiamo facendo debugging.

Possiamo anche visualizzare la lista dei breakpoint nel pannello di destra. Questo pannello può risultare utile quando abbiamo più breakpoint in file diversi. Infatti ci consente di:
- Saltare rapidamente ad un breakpoint (cliccando sopra al nome del breakpoint che ci interessa).
- Disabilitare temporaneamente un breakpoint semplicemente togliendo la spunta.
- Rimuovere breakpoint cliccando con il tasto destro e selezionando Rimuovi.
- ...E molto altro.

<<<<<<< HEAD
```smart header="Breakpoint condizionali"
*Tasto destro* sul numero della riga ci consente di creare un breakpoint *condizionale*. Che viene attivato solo quando l'espressione fornita risulta vera.
=======
```smart header="Conditional breakpoints"
*Right click* on the line number allows to create a *conditional* breakpoint. It only triggers when the given expression, that you should provide when you create it, is truthy.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Questa caratteristica risulta molto utile quando abbiamo bisogno di fermare il flusso di esecuzione per determinati valori di una variabile.
```

<<<<<<< HEAD
## Comando debugger
=======
## The command "debugger"
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Possiamo mettere in pausa il codice anche utilizzando il comando `debugger`, come nell'esempio:

```js
function hello(name) {
  let phrase = `Hello, ${name}!`;

*!*
  debugger;  // <-- il codice si metterà in pausa qui
*/!*

  say(phrase);
}
```

<<<<<<< HEAD
Questo risulta molto utile quando stiamo lavorando in un editor e non vogliamo passare alla finestra del browser, cercare il punto corretto nello script interessato e impostare il breakpoint.

=======
Such command works only when the development tools are open, otherwise the browser ignores it.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## Interrompere l'esecuzione e guardarsi intorno

Nel nostro esempio, `hello()` viene richiamato durante il caricamento della pagina, quindi il metodo più facile per attivare il debugger è ricaricare la pagina. Quindi premete `key:F5` (Windows, Linux) o `key:Cmd+R` (Mac).

Con il breakpoint impostato, l'esecuzione si fermerà alla quarta linea:

![](chrome-sources-debugger-pause.svg)

Ora aprite il menu a cascata (quello con la freccetta accanto al nome). Ti consentirà di esaminare lo stato corrente del codice:

1. **`Watch` -- mostra il valore corrente per ogni espressione.**

<<<<<<< HEAD
    Puoi cliccare su `+` e inserire un espressione. Il debugger ti mostrerà il suo valore ad ogni istante, che verrà automaticamente ricalcolato durante l'esecuzione.
=======
    You can click the plus `+` and input an expression. The debugger will show its value, automatically recalculating it in the process of execution.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

2. **`Call Stack` -- mostra la catena delle chiamate annidate.**

    Attualmente il debugger si trova all'interno della chiamata `hello()`, chiamata da uno script interno a `index.html` (non ci sono funzioni qui, quindi viene definita "anonima").

    Se premi su un elemento della pila, il debugger salterà al codice corrispondente, e potrai esaminare tutte le variabili.
3. **`Scope` -- variabili correnti.**

    `Local` mostra le variabili locali alla funzione. Potente anche vedere i valori evidenziati nel codice.

    `Global` mostra le variabili globali (fuori da tutte le funzioni).

    C'è anche la keyword `this`, che studieremo più avanti.

## Tracciamento dell'esecuzione

Ora è il momento di *tracciare* lo script.

Ci sono dei bottoni appositi nella parte superiore del pannello di destra. Proviamo ad attivarli.
<!-- https://github.com/ChromeDevTools/devtools-frontend/blob/master/front_end/Images/src/largeIcons.svg -->
<span class="devtools" style="background-position:-146px -168px"></span> -- "Resume": continua l'esecuzione, tasto `key:F8`.
: Riprende l'esecuzione. Se non ci sono ulteriori breakpoint l'esecuzione continua e il debugger non avrà più il controllo.

    Questo è quello che vedremo dopo aver cliccato:

    ![](chrome-sources-debugger-trace-1.svg)

    L'esecuzione è ripartita, ha incontrato un altro breakpoint dentro `say()` e si è fermata nuovamente. Diamo un'occhiata al "Call stack" sulla destra. E' stato incrementato con un ulteriore chiamata. Ora siamo all'interno di `say()`.

<span class="devtools" style="background-position:-200px -190px"></span> -- "Step": esegue il prossimo comando, hotkey `key:F9`.
: Esegue la prossima istruzione. Se lo clicchiamo, verrà mostrato l'`alert`.

    Continuando a cliccare eseguiremo lo script un passo per volta.

<<<<<<< HEAD
<span class="devtools" style="background-position:-62px -192px"></span> -- "Step over": esegue il prossimo comando, ma *non entra nella funzione*, hotkey `key:F10`.
: Molto simile al comando "Step", ma si comporta diversamente nel caso in cui l'istruzione successiva sia una chiamata a funzione. O meglio: non una funzione built-in come `alert`, ma una funzione definita da noi.

    Il comando "Step" entra nella funzione e mette in pausa l'esecuzione, mentre "Step over" esegue la chiamata a funzione, saltandone il contenuto.

    L'esecuzione viene interrotta al termine della chiamata.
=======
<span class="devtools" style="background-position:-62px -192px"></span> -- "Step over": run the next command, but *don't go into a function*, hotkey `key:F10`.
: Similar to the previous "Step" command, but behaves differently if the next statement is a function call (not a built-in, like `alert`, but a function of our own).

    If we compare them, the "Step" command goes into a nested function call and pauses the execution at its first line, while "Step over" executes the nested function call invisibly to us, skipping the function internals.

    The execution is then paused immediately after that function call.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

    Questo è molto utile se non siamo interessati nel vedere cosa accade dentro la funzione.

<span class="devtools" style="background-position:-72px -76px"></span> -- fai uno step, tasto `key:F11`.
: Lo stesso di quello precedente, ma fa "un passo all'interno" della funzione. Cliccando qui è possibile avanzare uno step alla volta tutte le azioni dello script.

<span class="devtools" style="background-position:-4px -194px"></span> -- "Step into", hotkey `key:F11`.
: Molto simile a "Step", ma si comporta in maniera differente nel caso di chiamate a funzioni asicncrone. Se state ancora imparando JavaScript, allora potete ignorare la differenza, visto che non andremo ad utilizzare funzioni asincrone per ora.

    Per il futuro, ricordatevi che "Step" ignora le funzioni asincrone, come ad esempio `setTimeout` (chiamata programmata di funzione). Invece "Step into" accede a questo tipo di funzioni, ed attende quanto necessario. Fate riferimento al [manuale DevTools](https://developers.google.com/web/updates/2018/01/devtools#async) per maggiori dettagli.

<span class="devtools" style="background-position:-32px -194px"></span> -- "Step out": continua l'esecuzione fino alla fine della funzione corrente, hotkey `key:Shift+F11`.
: Continua l'esecuzione e la interrompe all'ultima linea della funzione corrente. Questo comando risulta essere utile nel caso in cui entrassimo accidentalmente in una chiamata annidata utilizzando <span class="devtools" style="background-position:-200px -190px"></span>, ma non siamo interessati alla sua esecuzione, e vogliamo arrivare al termine della sua esecuzione il prima possibile.

<span class="devtools" style="background-position:-7px -28px"></span> -- attiva/disattiva tutti i breakpoint.
: Questo bottone non influenza l'esecuzione. E' semplicemente un on/off per i breakpoint.

<<<<<<< HEAD
<span class="devtools" style="background-position:-264px -4px"></span> -- attiva/disattiva la pausa automatica in caso di errori.
: Quando questa opzione è attiva, e il pannello degli strumenti sviluppatore è aperto, un errore nello script metterà automaticamente in pausa l'esecuzione. Cosi potremmo analizzare le variabili per capire cosa è andato storto. Quindi se il nostro script si blocca con un errore, possiamo aprire il debugger, attivare questa opzione e ricaricare la pagina per vedere dove si blocca lo script e capirne il motivo.
=======
<span class="devtools" style="background-position:-90px -146px"></span> -- enable/disable automatic pause in case of an error.
: When enabled, if the developer tools is open, an error during the script execution automatically pauses it. Then we can analyze variables in the debugger to see what went wrong. So if our script dies with an error, we can open debugger, enable this option and reload the page to see where it dies and what's the context at that moment.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```smart header="Continua fino a qui"
Premendo tasto destro su una riga di codice si aprirà un menu con una bellissima opzione denominata  "Continua fino a qui".

Questa è molto utile quando vogliamo muoverci di più passi, ma siamo troppo pigri per impostare un breakpoint.
```

## Logging

Per stampare qualcosa sulla console, possiamo utilizzare la funzione `console.log`.

Ad  esempio, questo stamperà i valori da `0` a `4` sulla console:

```js run
// apri la console per vedere il messaggio
for (let i = 0; i < 5; i++) {
  console.log("value,", i);
}
```

Gli utenti normali non vedranno questo output poiché viene mostrato in console. Per vederlo dovrebbero aprire il menu `Console` degli strumenti sviluppatore, oppure premere `key:Esc` mentre si trovano in un altro tab: questo tasto aprirà la console nella parte inferiore della schermata.

Utilizzando la funzione `console.log` nel nostro codice, possiamo vedere cosa sta accadendo anche senza utilizzare il debugger.

## Riepilogo

Come abbiamo visto, ci sono tre diversi modi di mettere in pausa uno script:
1. Un breakpoint.
2. L'istruzione `debugger`.
3. Un errore (solo se gli strumenti sviluppatore sono aperti ed è attivo il bottone <span class="devtools" style="background-position:-264px -4px"></span>)

<<<<<<< HEAD
Cosi possiamo esaminare le variabili e capire cosa è andato male durante l'esecuzione.
=======
When paused, we can debug: examine variables and trace the code to see where the execution goes wrong.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ci sono veramente troppe opzioni negli strumenti da sviluppatore per coprirle qui. Il manuale completo è disponibile all'indirizzo <https://developers.google.com/web/tools/chrome-devtools>.

Le informazioni fornite da questo capitolo sono sufficienti per iniziare a fare un po' di debug, anche se più avanti, specialmente quando farete cose più avanzate, il link sopra potrà tornarvi utile.

Ah, inoltre potete anche cliccare i vari bottoni negli strumenti da sviluppatore e vedere cosa succede. E' probabilmente il metodo più rapido per imparare. Non dimenticate che molte opzioni sono disponibili anche con il click del tasto destro!
