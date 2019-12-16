# Developer console

Il codice è incline a contenere errori. E' molto probabile che tu commetta errori... Di cosa sto parlando? *Sicuramente* commetterai errori, sempre che tu sia umano, e non un [robot](https://it.wikipedia.org/wiki/Bender_(personaggio)).

In un browser però, l'utente non può vedere gli errori. Quindi se qualcosa non funziona nello script, non saremo in grado di capire quale sia il problema e sistemarlo.

Per poter visualizzare gli errori e ricevere altre informazioni utili riguardo gli script, i browser integrano degli "strumenti di sviluppo".

Molto spesso gli sviluppatori tendono ad utilizzare Chrome o Firefox poichè questi browser forniscono i migliori strumenti per lo sviluppo. Anche gli altri browser contengono gli strumenti per lo sviluppo, talvolta con caratteristiche speciali, ma più che altro giocano ad "avvicinarsi" a Chrome e Firefox.
Quindi molte perone hanno un browser "preferito" e utilizzano gli altri solo quando un problema è specifico di quel browser.

Gli strumenti da sviluppatore sono potenti; hanno molte caratteristiche. Prima di tutto, dobbiamo capire come ottenerli, come cercare errori e come eseguire comandi JavaScript.

## Google Chrome

Apri la pagina [bug.html](bug.html).

C'è un errore nel codice JavaScript. E' nascosto agli occhi di un normale utente, quindi dobbiamo aprire gli strumenti di sviluppo per trovarlo.

Premi `key:F12`, se sei su Mac utilizza `key:Cmd+Opt+J`.

Gli strumenti di sviluppo, di default, si apriranno nella scheda Console.

Assomiglierà a qualcosa simile a questo:

![chrome](chrome.png)

Il look esatto degli strumenti di sviluppo dipenderà dalla tua versione di Chrome. Cambia di tanto in tanto, ma dovrebbe essere molto simile.

- Qui possiamo notare il messaggio in d'errore in rosso. In questo caso, lo script contiene un comando "lalala" non riconosciuto.
- Sulla destra, c'e un link alla sorgente `bug.html:12` con il numero della linea in cui si è verificato l'errore.

<<<<<<< HEAD
Sotto il messaggio d'errore, c'e un simbolo blu `>`. Questo indica la "riga di comando" dove noi possiamo digitare dei comandi JavaScript. Premendo `key:Enter` si eseguono (`key:Shift+Enter` per inserire comandi multi-linea).
=======
Below the error message, there is a blue `>` symbol. It marks a "command line" where we can type JavaScript commands. Press `key:Enter` to run them.
>>>>>>> 524d59884650be539544c34f71d821432b7280fd

Adesso possiamo visualizzare gli errori, ed è già abbastanza come inizio. Ritorneremo sugli strumenti di sviluppo più avanti e analizzeremo il debugging più in profondità nel capitolo <info:debugging-chrome>.

```smart header="Multi-line input"
Usually, when we put a line of code into the console, and then press `key:Enter`, it executes.

To insert multiple lines, press `key:Shift+Enter`. This way one can enter long fragments of JavaScript code.
```

## Firefox, Edge, and others

Molti altri browser utilizzano `key:F12` per aprire gli strumenti di sviluppo.

Lo stile è comunque molto simile. Quando avrai imparato come utilizzare uno di questi strumenti (puoi iniziare con quelli di Chrome), potrai facilmente passare agli altri.

## Safari

Safari (Mac browser, non supportato da Windows/Linux) è un pò speciale in questo ambito. E' necessario attivare prima il "Menu di Sviluppo".

Apri le Impostazioni e vai sul pannello "Avanzate". In basso troverai un'opzione da spuntare:

![safari](safari.png)

Adesso tramite `key:Cmd+Opt+C` puoi attivare/disattivare la console. Inoltre noterai che un nuovo menu "Sviluppo" è apparso. Contiene molti comandi e opzioni.

<<<<<<< HEAD
```smart header="Input multi riga"

Solitamente, quando inseriamo una riga di codice nella console, e premiamo `key:Enter`, questa viene eseguita.

Per poter inserire più righe di codice, è necessario premere `key:Shift+Enter`.
```

## Riepilogo
=======
## Summary
>>>>>>> 524d59884650be539544c34f71d821432b7280fd

- Gli strumenti di sviluppo ci consentono di trovare gli errori, eseguire comandi, esaminare variabili e molto altro.
- Possono essere aperti con `key:F12` per la maggior parte dei browser in Windows. Chrome su Mac `key:Cmd+Opt+J`, Safari: `key:Cmd+Opt+C` (avendolo precedentemente abilitato).

Adesso abbiamo l'ambiente di sviluppo pronto. Nella prossima sezione inizieremo ad analizzare JavaScript.
