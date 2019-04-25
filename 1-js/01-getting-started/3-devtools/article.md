# Developer console

<<<<<<< HEAD
Il codice è incline a contenere errori. E' molto probabile che tu commetta errori... Di cosa sto parlando? *Sicuramente* commetterai errori, sempre che tu sia umano, e non un [robot](https://en.wikipedia.org/wiki/Bender_(Futurama)).

In un browser però, l'utente non può vedere gli errori. Quindi se qualcosa non funziona nello script, noi non possiamo vedere cosa non va e non possiamo perciò sistemarlo.
=======
Code is prone to errors. You will quite likely make errors... Oh, what am I talking about? You are *absolutely* going to make errors, at least if you're a human, not a [robot](https://en.wikipedia.org/wiki/Bender_(Futurama)).

But in the browser, users don't see errors by default. So, if something goes wrong in the script, we won't see what's broken and can't fix it.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Per poter visualizzare gli errori e ricevere altre informazioni utili riguardo gli script, i browser integrano degli "strumenti di sviluppo".

<<<<<<< HEAD
Molto spesso gli sviluppatori tendono ad utilizzare Chrome o Firefox poichè questi browser forniscono i migliori strumenti per lo sviluppo. Anche gli altri browser contengono gli strumenti per lo sviluppo, talvolta con caratteristiche speciali, ma più che altro giocano a "prendere" Chrome e Firefox.
Quindi molte perone hanno un browser "preferito" e utilizzano gli altri solo quando un problema è specifico di quel browser.

Gli strumenti di sviluppo sono potenti; hanno molte caratteristiche. Prima di tutto, dobbiamo capire come ottenerli, come cercare errori e come eseguire comandi JavaScript.
=======
Most developers lean towards Chrome or Firefox for development because those browsers have the best developer tools. Other browsers also provide developer tools, sometimes with special features, but are usually playing "catch-up" to Chrome or Firefox. So most developers have a "favorite" browser and switch to others if a problem is browser-specific.

Developer tools are potent; they have many features. To start, we'll learn how to open them, look at errors, and run JavaScript commands.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

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

Sotto il messaggio d'errore, c'e un simbolo blu `>`. Questo indica la "riga di comando" dove noi possiamo digitare dei comandi JavaScript. Premendo `key:Enter` si eseguono (`key:Shift+Enter` per inserire comandi multi-linea).

<<<<<<< HEAD
Adesso possiamo visualizzare gli errori, ed è già abbastanza come inizio. Ritorneremo sugli strumenti di sviluppo più avanti e analizzeremo il debugging più in profondità nel capitolo <info:debugging-chrome>.
=======
Now we can see errors, and that's enough for a start. We'll come back to developer tools later and cover debugging more in-depth in the chapter <info:debugging-chrome>.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb


## Firefox, Edge, and others

Molti altri browser utilizzano `key:F12` per aprire gli strumenti di sviluppo.

<<<<<<< HEAD
Lo stile è comunque molto simile. Quando avrai imparato come utilizzare uno di questi strumenti (puoi iniziare con quelli di Chrome), potrai facilmente passare agli altri.
=======
The look & feel of them is quite similar. Once you know how to use one of these tools (you can start with Chrome), you can easily switch to another.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

## Safari

Safari (Mac browser, non supportato da Windows/Linux) è un pò speciale in questo ambito. E' necessario attivare prima il "Menu di Sviluppo".

<<<<<<< HEAD
Apri le Impostazioni e vai sul pannello "Avanzate". In basso troverai un'opzione da spuntare:
=======
Open Preferences and go to the "Advanced" pane. There's a checkbox at the bottom:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

![safari](safari.png)

Adesso tramite `key:Cmd+Opt+C` puoi attivare/disattivare la console. Inoltre noterai che un nuovo menu "Sviluppo" è apparso. Contiene molti comandi e opzioni.

<<<<<<< HEAD
## Riepilogo

- Gli strumenti di sviluppo ci consentono di trovare gli errori, eseguire comandi, esaminare variabili e molto altro.
- Possono essere aperti con `key:F12` per la maggior parte dei browser in Windows. Chrome su Mac `key:Cmd+Opt+J`, Safari: `key:Cmd+Opt+C` (avendolo precedentemente abilitato).
=======
## Multi-line input

Usually, when we put a line of code into the console, and then press `key:Enter`, it executes.

To insert multiple lines, press `key:Shift+Enter`.

## Summary

- Developer tools allow us to see errors, run commands, examine variables, and much more.
- They can be opened with `key:F12` for most browsers on Windows. Chrome for Mac needs `key:Cmd+Opt+J`, Safari: `key:Cmd+Opt+C` (need to enable first).
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Adesso abbiamo l'ambiente di sviluppo pronto. Nella prossima sezione inizieremo ad analizzare JavaScript.
