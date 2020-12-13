# Developer console

Il codice è incline a contenere errori. E' molto probabile che tu commetta errori... Di cosa sto parlando? *Sicuramente* commetterai errori, sempre che tu sia umano, e non un [robot](https://it.wikipedia.org/wiki/Bender_(personaggio)).

In un browser però, di default l'utente non può vedere gli errori. Quindi, se qualcosa non funziona nello script, non saremo in grado di capire quale sia il problema e sistemarlo.

Per poter visualizzare gli errori e ricevere altre informazioni utili riguardo gli script, i browser integrano degli "strumenti di sviluppo", in inglese "developer tools" o più semplicemente "DevTools".

Molti sviluppatori preferiscono utilizzare Chrome o Firefox poiché questi browser incorporano i migliori strumenti per lo sviluppo. Anche gli altri browser hanno gli strumenti per lo sviluppo, talvolta con caratteristiche speciali, ma più che altro inseguono le caratteristiche di Chrome e Firefox.
In genere gli sviluppatori hanno un browser "preferito" e utilizzano gli altri solo quando un problema è specifico di quel browser.

Gli strumenti per lo sviluppo sono molto potenti e possiedono molte funzionalità. Per iniziare, dobbiamo capire come accedervi, come individuare gli errori e come eseguire comandi JavaScript.

## Google Chrome

Apri la pagina [bug.html](bug.html).

C'è un errore nel codice JavaScript. E' nascosto agli occhi di un normale utente, quindi dobbiamo aprire gli strumenti di sviluppo per trovarlo.

Premi `key:F12`, oppure, se sei su Mac, utilizza `key:Cmd+Opt+J`.

Gli strumenti di sviluppo, di default, si apriranno nella scheda Console.

Assomiglierà a qualcosa di simile a questo:

![chrome](chrome.png)

Il look esatto degli strumenti di sviluppo dipenderà dalla tua versione di Chrome. Nel tempo potrebbe cambiare un po', ma dovrebbe essere comunque molto simile.

- Qui possiamo notare il messaggio d'errore in rosso. In questo caso, lo script contiene il comando "lalala" non riconosciuto.
- Sulla destra, c'e il link cliccabile della sorgente `bug.html:12` con il numero della linea in cui si è verificato l'errore.

Sotto il messaggio d'errore, c'e il simbolo blu `>`. Questo indica la "riga di comando" in cui possiamo digitare dei comandi JavaScript. Premendo `key:Enter` il comando viene (`key:Shift+Enter` per inserire comandi multi-linea).

Ora possiamo vedere gli errori, e questo è sufficiente per iniziare. Ritorneremo sugli strumenti di sviluppo più avanti e analizzeremo il debugging più in profondità nel capitolo <info:debugging-chrome>.

```smart header="Input multi-riga"
Di solito, quando inseriamo una riga di codice nella console e premiamo il tasto `key:Enter`, questa viene eseguita.

Per inserire più righe premi `key:Shift+Enter`, in questo modo puoi inserire lunghe porzioni di codice Javascript.

```

## Firefox, Edge, and others

Molti altri browser utilizzano `key:F12` per aprire gli strumenti di sviluppo.

Anche l'aspetto è molto simile. Quando avrai imparato come utilizzare uno di questi strumenti (puoi iniziare con quelli di Chrome), potrai facilmente utilizzare anche gli altri.

## Safari

Safari (Mac browser, non supportato da Windows/Linux) è un pò speciale in questo ambito. E' necessario attivare prima il "Menu di Sviluppo".

Apri le Impostazioni e vai sul pannello "Avanzate". In basso troverai un'opzione da spuntare:

![safari](safari.png)

Adesso tramite `key:Cmd+Opt+C` puoi attivare e disattivare la console. Inoltre noterai che un nuovo menu "Sviluppo" è apparso. Esso  contiene molti comandi e opzioni.

## Riepilogo

- Gli strumenti di sviluppo (Developer Tools o DevTools) ci consentono di individuare gli errori, eseguire comandi, esaminare variabili e molto altro.
- Possono essere attivati con `key:F12` nella maggior parte dei browser in Windows e Linux. Chrome su Mac `key:Cmd+Opt+J`, Safari: `key:Cmd+Opt+C` (avendolo precedentemente abilitato).

Ora in nostro ambiente di sviluppo è pronto. Nella prossima sezione inizieremo ad analizzare JavaScript.
