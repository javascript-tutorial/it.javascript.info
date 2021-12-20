# Introduzione a JavaScript

Vediamo cosa rende JavaScript così speciale, cosa è possibile ottenere tramite il suo utilizzo e tutte le tecnologie che possono essere applicate per renderlo adatto ad ogni necessità.

## Cos'è JavaScript?

*JavaScript* è stato creato con lo scopo di "dare vita alle pagine web".

I programmi che sfruttano questo linguaggio vengono chiamati *script*. Possono essere scritti direttamente nel documento HTML ed eseguiti in automatico al caricamento della pagina.

Gli script vengono scritti ed eseguiti come testo semplice. Per questo non richiedono alcuna fase di preparazione o compilazione per essere eseguiti.

Sotto questo aspetto, JavaScript è molto differente da un altro linguaggio chiamato [Java](https://en.wikipedia.org/wiki/Java_(programming_language)).

```smart header="Perché si chiama <u>Java</u>Script?"
In origine JavaScript aveva un altro nome: "LiveScript". In quel periodo Java era molto popolare, per questo si è pensato che identificare Javascript come il "fratello minore" di Java potesse aiutare alla sua diffusione.

Evolvendosi, JavaScript è diventato un linguaggio completamente indipendente, le cui specifiche sono definite da [ECMAScript](http://en.wikipedia.org/wiki/ECMAScript), e adesso non ha quasi nulla in comune con Java.
```

Attualmente, JavaScript può essere eseguito non solo nei browser, ma anche nei server web e in altri ambienti che supportano il [motore JavaScript](https://en.wikipedia.org/wiki/JavaScript_engine) (JavaScript engine).

Il browser ha un suo motore JavaScript integrato, chiamato alle volte "JavaScript Virtual Machine".

Esistono altri motori JavaScript, tra cui:

<<<<<<< HEAD
- [V8](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)) -- per Chrome e Opera.
- [SpiderMonkey](https://en.wikipedia.org/wiki/SpiderMonkey) -- per Firefox.
- ...Ci sono altri codenames come "Chakra" per IE, "JavaScriptCore", "Nitro" e "SquirrelFish" per Safari, etc.

I nomi citati sopra possono essere utili da ricordare, poiché si possono trovare spesso in articoli che trattano di sviluppo web. Anche noi li useremo. Ad esempio, se "una caratteristica X è supportata da V8", probabilmente funzioneranno senza problemi in Chrome e Opera.
=======
- [V8](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)) -- in Chrome, Opera and Edge.
- [SpiderMonkey](https://en.wikipedia.org/wiki/SpiderMonkey) -- in Firefox.
- ...There are other codenames like "Chakra" for IE, "JavaScriptCore", "Nitro" and "SquirrelFish" for Safari, etc.

The terms above are good to remember because they are used in developer articles on the internet. We'll use them too. For instance, if "a feature X is supported by V8", then it probably works in Chrome, Opera and Edge.
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831

```smart header="Come funzionano questi motori?"

Il funzionamento di questi motori è complicato, ma i concetti alla base sono semplici.


1. I motori (integrati nei browser) leggono ("analizzano") lo script.
2. Successivamente convertono ("compilano") lo script nel linguaggio della macchina.
3. Infine il "codice macchina" viene eseguito, molto rapidamente.

Il motore ottimizza il codice ad ogni passaggio del processo, anche durante l'esecuzione dello script già compilato, quando ne analizza il flusso dati. Nonostante tutto l'esecuzione dello script risulta essere molto veloce.
```

## Cosa può fare JavaScript a livello browser?

JavaScript, al giorno d'oggi, è un linguaggio di programmazione "sicuro". Non consente alcun accesso di basso livello alla memoria o alla CPU. Questo perché è stato creato con lo scopo di funzionare nei browser, che non richiedono questi tipi di privilegi.

Le capacità di JavaScript dipendono molto dall'ambiente in cui lo si esegue. Ad esempio, [Node.js](https://wikipedia.org/wiki/Node.js) supporta funzioni che consentono a JavaScript di scrivere/leggere file, eseguire richieste web, etc.

Integrato nel browser Javascript può fare qualsiasi cosa legata alla manipolazione della pagina, all'interazione con l'utente e con il server.

Ad esempio, è possibile:

- Aggiungere HTML alla pagina, cambiare il contenuto esistente, modificare lo stile.
- Reagire alle azioni dell'utente, click del mouse, movimenti del cursore, input da tastiera.
- Inviare richieste al server tramite la rete, caricare e scaricare file (con l'ausilio di[AJAX](https://en.wikipedia.org/wiki/Ajax_(programming)) e [COMET](https://en.wikipedia.org/wiki/Comet_(programming))).
- Prelevare e impostare cookies, interrogare l'utente, mostrare messaggi.
- Memorizzare i dati client-side ("memorizzazione locale").

## Cosa NON può fare JavaScript a livello browser?

<<<<<<< HEAD
Per la sicurezza dell'utente, le possibilità di JavaScript nel browser sono limitate. L'intento è di prevenire che una pagina "maligna" tenti di accedere alle informazioni personali o di danneggiare i dati degli utenti.
=======
JavaScript's abilities in the browser are limited for the sake of a user's safety. The aim is to prevent an evil webpage from accessing private information or harming the user's data.
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831

Esempi di queste restrizioni possono essere:

- JavaScript, in una pagina web, non può leggere o scrivere in qualsiasi file nell'hard disk, né copiare o eseguire programmi. Non ha accesso diretto alle funzioni del sistema operativo.

    I moderni browser gli consentono di lavorare con i file, sempre con un accesso limitato e comunque solo se il comando proviene da utente, come il "dropping" di un file nella finestra del browser, o con la selezione  tramite il tag `<input>`.

    Ci sono anche funzionalità che consentono di interagire con la camera/microfono e altri dispositivi, ma in ogni caso richiedono il permesso esplicito dell'utente. Quindi una pagina con JavaScript abilitato non può attivare la web-cam di nascosto, osservare i nostri comportamenti e inviare  informazioni alla [CIA](https://it.wikipedia.org/wiki/Central_Intelligence_Agency).
- Pagine o schede diverse generalmente non sono a conoscenza dell'esistenza delle altre. In certi casi, tuttavia, può capitare; ad esempio quando una finestra ne apre un'altra tramite JavaScript. Ma anche in questo caso, il codice JavaScript non può accedere all'altra pagina se non appartiene allo stesso sito (stesso dominio, protocollo o porta).

    Questa viene definita la  "Same Origin Policy" ("Politica di Appartenenza alla Stessa Origine"). Per poter aggirare questo limite, *entrambe le pagine* devono contenere uno speciale codice JavaScript che consente di gestire lo scambio di dati.

    Questa limitazione è sempre dovuta alla sicurezza dell'utente. Una pagina proveniente da `http://anysite.com` che è stata aperta da un utente, ad esempio, non deve essere in grado di accedere ad un'altra scheda del browser con l'URL `http://gmail.com`  e rubarne le informazioni.
- JavaScript può facilmente comunicare con il server da cui la pagina proviene. Ma la sua abilità di ricevere dati da altri siti/domini è limitata. Sebbene sia possibile, sono richieste esplicite autorizzazioni (passate tramite HTTP headers) dall'indirizzo remoto. Ancora una volta, una limitazione dovuta alla sicurezza.

![](limitations.svg)

Queste limitazioni non si pongono se JavaScript viene eseguito fuori dal browser, ad esempio in un server. I browser moderni permettono l'installazione di plugin ed estensioni che consentono di estendere vari permessi.

## Cosa rende JavaScript unico?

Ci sono almeno *tre* cose che rendono JavaScript cosi unico:

```compare
<<<<<<< HEAD
+ Completa integrazione con HTML/CSS.
+ Operazioni semplici vengono eseguite semplicemente.
+ Supportato dai maggiori browser ed integrato di default.
=======
+ Full integration with HTML/CSS.
+ Simple things are done simply.
+ Supported by all major browsers and enabled by default.
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831
```
JavaScript è l'unica tecnologia in ambiente browser che combina queste tre caratteristiche.

Questo rende JavaScript unico. Ed è il motivo per cui è lo strumento più diffuso per creare interfacce web.

Quando si ha in programma di imparare una nuova tecnologia, è fondamentale verificare le sue prospettive. Quindi diamo uno sguardo alle nuove tendenze che includono nuovi linguaggi e tecnologie.

## Linguaggi "oltre" JavaScript

La sintassi di JavaScript non soddisfa le necessità di tutti. Alcune persone necessitano di caratteristiche differenti.

Questo è prevedibile, poiché i progetti e i requisiti sono diversi da persona a persona.

Recentemente, per questo motivo, sono nati molti nuovi linguaggi che vengono *convertiti* in JavaScript prima di essere eseguiti nel browser.

Gli strumenti moderni rendono la conversione molto veloce e pulita, consentendo agli sviluppatori di programmare in un altro linguaggio e di auto-convertirlo *under the hood*.

Esempi di alcuni linguaggi:

- [CoffeeScript](http://coffeescript.org/) è un linguaggio che introduce una sintassi semplificata che consente di scrivere codice più leggibile. Amato dagli sviluppatori provenienti da Ruby.
- [TypeScript](http://www.typescriptlang.org/) si occupa di aggiungere la "tipizzazione", per semplificare lo sviluppo e supportare sistemi più complessi. E' stato sviluppato da Microsoft.
- [Flow](http://flow.org/) anche'esso aggiunge la tipizzazione dei dati, ma in un modo differente. Sviluppato da Facebook.
- [Dart](https://www.dartlang.org/) è un linguaggio autonomo che possiede il suo motore, che esegue in ambienti esterni al browser (come mobile apps). E' stato introdotto da Google come alternativa a JavaScript, ma attualmente i browser richiedono la conversione in JavaScript, proprio come i precedenti.
- [Brython](https://brython.info/) è un *transpiler*, scritto in Python, che consente di scrivere applicazioni in quest'ultimo senza utilizzare JavaScript.
- [Kotlin](https://kotlinlang.org/docs/reference/js-overview.html) è un moderno, conciso e sicuro linguaggio di programmazione mirato ai browsers o a Node.

Ce ne sono molti altri. Ovviamente, per comprendere cosa stiamo facendo, se utilizziamo uno di questi linguaggi dovremmo altresì conoscere JavaScript.

## Riepilogo

<<<<<<< HEAD
- JavaScript è stato creato specificamente per i browser, ma attualmente viene utilizzato con efficacia in molti altri ambienti.
- Attualmente, per quanto riguarda lo sviluppo del web, JavaScript si trova in una posizione unica grazie ad una completa integrazione con HTML/CSS.
- Ci sono molti linguaggi che possono essere "convertiti" in JavaScript; essi provvedono le stesse funzionalità e risolvono gli stessi problemi. E' fortemente consigliato di leggere brevemente le funzionalità di alcuni di essi, dopo avert studiato e compreso JavaScript.
=======
- JavaScript was initially created as a browser-only language, but it is now used in many other environments as well.
- Today, JavaScript has a unique position as the most widely-adopted browser language, fully integrated with HTML/CSS.
- There are many languages that get "transpiled" to JavaScript and provide certain features. It is recommended to take a look at them, at least briefly, after mastering JavaScript.
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831
