# Introduzione a JavaScript

Vediamo cosa rende JavaScript così speciale, cosa è possibile ottenere tramite il suo utilizzo e tutte le tecnologie che possono essere applicate per renderlo adatto ad ogni necessità.

## Cos'è JavaScript?

*JavaScript* è stato creato con lo scopo di "dare vita alle pagine web".

I programmi che sfruttano questo linguaggio vengono chiamati *script*. Possono essere scritti direttamente nel documento HTML ed eseguiti in automatico al caricamento della pagina.

Gli script vengono scritti ed eseguiti come testo semplice. Per questo non richiedono alcuna fase di preparazione o compilazione per essere eseguiti.

In questo aspetto, JavaScript è molto differente da un altro linguaggio chiamato [Java](https://en.wikipedia.org/wiki/Java_(programming_language)).

```smart header="Perché si chiama <u>Java</u>Script?"
In origine JavaScript aveva un altro nome: "LiveScript". In quel periodo Java era molto popolare, per questo si è pensato che identificare questo linguaggio come il "fratello minore" di Java potesse aiutare nella sua diffusione.

Evolvendosi, JavaScript è diventato un linguaggio completamente indipendente, con delle specifiche personali chiamate [ECMAScript](http://en.wikipedia.org/wiki/ECMAScript), e adesso non ha quasi nulla in comune con Java.
```

Attualmente, JavaScript può essere eseguito non solo nei browser, ma anche nei server web e in altri ambienti che supportano il [motore JavaScript](https://en.wikipedia.org/wiki/JavaScript_engine) (JavaScript engine).

Il browser ha un suo motore JavaScript integrato, chiamato "JavaScript Virtual Machine".

Esistono altri motori JavaScript, tra cui:

- [V8](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)) -- per Chrome e Opera.
- [SpiderMonkey](https://en.wikipedia.org/wiki/SpiderMonkey) -- per Firefox.
- ...Ci sono altri codenames come "Chakra" per IE, "ChakraCore" specifico per Microsoft Edge, "Nitro" e "SquirrelFish" per Safari, etc.

I nomi citati sopra possono essere utili da ricordare, poiché si possono trovare spesso in articoli che trattano di sviluppo web. Anche noi li useremo. Ad esempio, se "una caratteristica X è supportata da V8", probabilmente funzioneranno senza problemi in Chrome e Opera.

```smart header="Come funzionano questi motori?"

Il funzionamento di questi motori è complicato, ma i concetti alla base sono semplici.


1. I motori (integrati nei browser) leggono ("analizzano") lo script.
2. Successivamente convertono ("compilano") lo script in linguaggio macchina.
3. Infine il codice macchina viene eseguito, molto rapidamente.

Il motore applica ottimizzazioni ad ogni passo del processo. Anche durante l'esecuzione dello script già compilato, analizza il flusso dati e applica ottimizzazioni al codice macchina. Nonostante tutto l'esecuzione dello script risulta essere molto veloce.
```

## Cosa può fare JavaScript a livello browser?

JavaScript al giorno d'oggi è un linguaggio di programmazione "sicuro". Non consente alcun accesso di basso livello alla memoria o alla CPU, questo perché è stato creato con lo scopo di funzionare nei browser, che non richiedono questo tipo di privilegi.

Le capacità di JavaScript dipendono molto dall'ambiente in cui lo si esegue. Ad esempio, [Node.js](https://wikipedia.org/wiki/Node.js) supporta funzioni che consentono a JavaScript di scrivere/leggere file, eseguire richieste web, etc.

JavaScript integrato nel browser può fare qualsiasi cosa legata alla manipolazione della pagina, interagire con l'utente e con il server.

Ad esempio, è possibile:

- Aggiungere HTML alla pagina, cambiare il contenuto esistente, modificare lo stile.
- Reagire alle azioni dell'utente, click del mouse, movimenti del cursore, input da tastiera.
- Inviare richieste al server tramite la rete, caricare e scaricare file (con l'ausilio di[AJAX](https://en.wikipedia.org/wiki/Ajax_(programming)) e [COMET](https://en.wikipedia.org/wiki/Comet_(programming))).
- Prelevare e impostare cookies, interrogare l'utente e mostrare messaggi.
- Memorizzare i dati client-side ("memorizzazione locale").

## Cosa NON può fare JavaScript a livello browser?

Le possibilità di JavaScript nel browser sono limitate per la sicurezza dell'utente. L'intento è di prevenire che una pagina "maligna" tenti di accedere alle informazioni personali o di danneggiare i dati degli utenti.

Degli esempi di queste restrizioni possono essere:

- JavaScript in una pagina web non può leggere o scrivere in qualsiasi file nell'hard disk, ne copiare o eseguire programmi. Non ha accesso diretto alle funzioni di sistema operativo.

    I moderni browser gli consentono di lavorare con i file, sempre con un accesso limitato e comunque solo se il comando proviene da utente, come il "dropping" di un file nella finestra del browser, o con la selezione  tramite il tag `<input>`.

    Ci sono anche funzionalità che consentono di interagire con la camera/microfono e altri dispositivi, ma in ogni caso richiedono il permesso esplicito dell'utente. Quindi una pagina con JavaScript abilitato non può attivare la web-cam di nascosto, osservare i nostri comportamenti e inviare le informazioni all' [NSA](https://en.wikipedia.org/wiki/National_Security_Agency).
- Pagine o schede diverse generalmente non sono a conoscenza dell'esistenza delle altre. In certi casi può però capitare, ad esempio che una finestra ne apra un'altra tramite JavaScript. Ma anche in questo caso, il codice JavaScript non può accedere all'altra pagina se non appartiene allo stesso sito (stesso dominio, protocollo o porta).

    Questa viene definita la  "Same Origin Policy" ("Politica di Appartenenza alla Stessa Origine"). Per poter aggirare questo limite, *entrambe le pagine* devono contenere uno speciale codice JavaScript che consente di gestire lo scambio di dati.

    Questa limitazione è sempre dovuta alla sicurezza dell'utente. Una pagina proveniente da `http://anysite.com` che è stata aperta da un utente, non deve essere in grado di accedere ad un'altra scheda del browser con l'URL `http://gmail.com` (per esempio) e rubare le informazioni.
- JavaScript può facilmente comunicare con il server da cui la pagina proviene. Ma la sua abilità di ricevere dati da altri siti/domini è limitata. Sebbene sia possibile, effettuare delle richieste esplicite (passate tramite HTTP headers) dall'indirizzo remoto. Ancora una volta, queste sono limitazioni dovute alla sicurezza.

![](limitations.svg)

Queste limitazioni non esistono se JavaScript viene eseguito fuori dal browser, ad esempio in un server. I browser moderni permettono l'installazione di plugin ed estensioni che consentono di aumentare i permessi.

## Cosa rende JavaScript unico?

Ci sono almeno *tre* cose che rendono JavaScript cosi unico:

```compare
+ Completa integrazione con HTML/CSS.
+ Operazioni semplici vengono eseguite semplicemente.
+ Supportato dai maggiori browser ed è attivo di default.
```
JavaScript è l'unica tecnologia in ambiente browser che combina queste tre caratteristiche.

Questo rende JavaScript unico. Ed è il motivo per cui è lo strumento più diffuso per creare interfacce web.

Quando si ha in programma di imparare una nuova tecnologia, è fondamentale verificare le sue prospettive. Quindi diamo uno sguardo alle nuove tendenze che includono nuovi linguaggi e tecnologie.

## Linguaggi "oltre" JavaScript

La sintassi di JavaScript non soddisfa le necessità di tutti. Alcune persone necessitano di caratteristiche differenti.

Questo è prevedibile, poiché i progetti e i requisiti sono diversi di persona in persona.

Recentemente, per questo motivo, sono nati molti nuovi linguaggi che vengono *convertiti* in JavaScript, prima di essere eseguiti nel browser.

Gli strumenti moderni rendono la conversione molto veloce e pulita, consentendo agli sviluppatori di programmare in un altro linguaggio e di auto-convertirlo "sotto il cofano".

Esempi di alcuni linguaggi:

<<<<<<< HEAD
- [CoffeeScript](http://coffeescript.org/) è un linguaggio che introduce una sintassi semplificata che consente di scrivere codice più leggibile. Amato dagli sviluppatori provenienti da Ruby.
- [TypeScript](http://www.typescriptlang.org/) si occupa di aggiungere la "tipizzazione", per semplificare lo sviluppo e supportare sistemi più complessi. E' stato sviluppato da Microsoft.
- [Flow](http://flow.org/) anche'esso aggiunge la tipizzazione dei dati, ma in un modo differente. Sviluppato da Facebook.
- [Dart](https://www.dartlang.org/) è un linguaggio autonomo che possiede il suo motore che esegue in ambienti esterni al browser (come mobile apps). E' stato introdotto da Google come alternativa a JavaScript, ma attualmente, i browser richiedono la conversione in JavaScript, proprio come i precedenti.
- [Brython](https://brython.info/) è un traduttore, che codice scritto in Python in codice JavaScript, consente quindi di scrivere applicazioni in Python senza utilizzare JavaScript.
=======
- [CoffeeScript](http://coffeescript.org/) is a "syntactic sugar" for JavaScript. It introduces shorter syntax, allowing us to write clearer and more precise code. Usually, Ruby devs like it.
- [TypeScript](http://www.typescriptlang.org/) is concentrated on adding "strict data typing" to simplify the development and support of complex systems. It is developed by Microsoft.
- [Flow](http://flow.org/) also adds data typing, but in a different way. Developed by Facebook.
- [Dart](https://www.dartlang.org/) is a standalone language that has its own engine that runs in non-browser environments (like mobile apps), but also can be transpiled to JavaScript. Developed by Google.
- [Brython](https://brython.info/) is a Python transpiler to JavaScript that enables the writing of applications in pure Python without JavaScript.
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557

Ce ne sono molti altri. Ovviamente se utilizziamo uno di questi linguaggi, dovremmo almeno conoscere JavaScript, per comprendere cosa stiamo facendo.

## Riepilogo

- JavaScript è stato creato come linguaggio unico per i browser, ma attualmente viene utilizzato con efficacia in molti altri ambienti.
- Attualmente JavaScript si trova in una posizione unica come linguaggio più diffuso per lo sviluppo web, grazie ad una completa integrazione con HTML/CSS.
- Ci sono molti linguaggio che possono essere "convertiti" in JavaScript che risolvono certe esigenze. E' fortemente consigliato di leggere brevemente le funzionalità di alcuni di essi, però solo dopo essersi focalizzati su JavaScript.
