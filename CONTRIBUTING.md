# The Modern JavaScript tutorial in Italiano
Ciao a tutti! Questa è la traduzione italiana del tutorial [The Modern JavaScript Tutorial](https://javascript.info/).

Tutti possono contribuire, ed ogni contributo è ben accetto. Partecipare al progetto è facile, basta conosce l'inglese e seguire le poche linee guida che trovate in questo documento.

Se hai poca dimestichezza con GitHub non preoccuparti: di seguito trovi una utile guida che ti aiuterà a partire. E se non conosci benissimo JavaScript, nessun problema, puoi partecipare rivedendo e/o correggendo articoli che trattano argomenti semplici. Sarà anche occasione per apprendere e migliorare le tue competenze su questo linguaggio.

Per una coordinazione più rapida ed informale abbiamo creato un canale Discord, a cui puoi unirti per discutere di qualsiasi cosa riguardante la traduzione o anche solo per chiedere informazioni su come iniziare. 

- **[Canale Discord](https://discord.gg/Dj9P3jCt6K)**

## Come contribuire

Il tutorial è scritto utilizzando una versione migliorata del linguaggio **[markdown](https://guides.github.com/features/mastering-markdown/)**, facile da comprendere ed utilizzare.

Sebbene si possa iniziare a tradurre online, direttamente su GitHub (questa modalità è più indicata per le piccole correzioni che per la traduzione di interi articoli), ti consigliamo di lavorare in locale utilizzando il tuo editor di testo preferito, servendoti anche di uno strumento per il controllo ortografico (molti editor li hanno come plugins o estensioni), questo faciliterà il tuo lavoro di traduzione e quello di approvazione dei reviewers.

Il flusso di lavoro è abbastanza semplice e presuppone alcune piccole accortezze che ci aiuteranno ad automatizzare e facilitare la progressione.

Per prima cosa trova come puoi renderti utile al progetto:

  - **Tradurre un articolo non ancora tradotto**: Leggi la issue [Italian Translation Progress](https://github.com/javascript-tutorial/it.javascript.info/issues/1) e trova, tra gli articoli non ancora spuntati, quello che vorresti tradurre. Quindi **rispondi alla issue con un messaggio contenete il solo titolo dell'articolo** scelto. In questo modo il [bot](https://javascript.info/translate/bot) che aiuta i team di traduzione ti affiderà il lavoro.

  - **Correzione errori**: Se hai notato un errore nei testi già tradotti, comunicalo con una nuova issue. Ci occuperemo di correggerlo, o, se vorrai, ti spiegheremo come potrai correggerlo tu stesso.

Una volta che avrai scelto cosa fare ed i maintainers ti avranno assegnato l'articolo, potrai iniziare. Se hai già collaborato a qualche progetto opensource su GitHub non avrai difficoltà, se invece sei nuovo, abbiamo preparato una piccola [guida](#sei-nuovo-su-github?) che trovi più in basso.

Se vuoi avere una preview dei file che stai editando, puoi usare una versione locale del server che si occupa della pubblicazione online del tutorial: [javascript.info server](https://github.com/javascript-tutorial/server). Sulla repository trovi le istruzioni per l'installazione ed il funzionamento. 

Quando avrai terminato la traduzione, invia una pull request usando come titolo il titolo dell'articolo tradotto, quindi monitora la review nel caso ti venga chiesto di apportare qualche modifica o correzione.
## Sei nuovo su GitHub?

Tutto il progetto è ospitato da GitHub. La seguente guida presuppone che tu conosca le basi di git (add, commit, ecc...) e ti aiuterà a capire il flusso di lavoro su GitHub.

  1. Esegui un `fork` di questo repository cliccando sul tasto in alto a destra nell'interfaccia di GitHub. In questo modo avrai una tua versione del progetto sulla quale potrai lavorare senza temere di fare pasticci.

  2. Fai un [`clone`](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/cloning-a-repository) del tuo fork `git clone url-del-fork-personale.git`. Bene ora hai la tua copia locale della repository sulla quale potrai iniziare a lavorare.

  3. Scegli un articolo da tradurre. Consulta la issue [it.javascript.info](https://github.com/javascript-tutorial/it.javascript.info/issues/1) per visualizzare la lista degli articoli, scegline uno che non sia già stato assegnato o tradotto.

  ```
    [ ] Generators (@mean2me)   // articolo già assegnato
    [X] Generators (@mean2me)   // articolo già tradotto
    [ ] Generators              // articolo disponibile
  ```

  4. Notifica l'articolo scelto. Per prenotare l'articolo da tradurre è importante lasciare un commento all'interno della issue [Italian Translation Progress](https://github.com/javascript-tutorial/it.javascript.info/issues/1) contenente *solo il titolo* dell'articolo che volete tradurre, in questo modo l'articolo vi verrà assegnato dal bot e si eviterà che uno stesso articolo venga tradotto da più persone. Una volta commentato con il titolo dell'articolo che volete tradurre, potete iniziare subito con la sua traduzione, non aspettate una risposta da parte dei maintainer.

  5. Dopo che ti verrà assegnato un articolo da tradurre/correggere/revisionare, procedi creando in locale un nuovo `branch`. **E' importante lavorare sempre su un branch secondario, mai su quello principale (master o main)**. Per creare un nuovo branch puoi digitare il comando `git checkout -b nome-del-nuovo-branch`. Per convenzione, come nome del nuovo branch, usa il formato `article/nome-del-file-da-tradurre`.
  Prima di iniziare a modificare i files, assicurati sempre di trovarti nel branch di lavoro `git checkout nome-del-nuovo-branch`. Ora puoi iniziare a tradurre: lavora bene, con attenzione e dacci dentro :muscle:
  
  6. Una volta terminato il lavoro, è il momento di inviarlo tramite una "pull request" affinché venga approvato ed incluso nel progetto originale (`merge`). Per prima cosa, se non lo hai già fatto, invia il tuo branch di lavoro verso il tuo "remote" su GitHub `git push -u origin nome_brach_di_lavoro`. Quindi dall' interfaccia di Github puoi inviare la pull request cliando sul pulsante "Create pull request." oppure usando le funzioni "Pull requesto" o "Compare".
 **Come titolo della PR inserisci il titolo dell'articolo che stai traducendo**, lo trovi nella issue [Italian Translation Progress](https://github.com/javascript-tutorial/it.javascript.info/issues/1).

  7. Da questo momento il tuo articolo si troverà in fase di revisione (`review`) da parte dei maintainers, i quali potrebbero chiederti di correggere o migliorare qualche cosa. Tieni monitorata la tua pull request, così potrai interagire durante la fase di review e procedere speditamente verso l'approvazione. Nel caso in cui ti venga richiesto di apportare delle modifiche, una volta terminato, lascia un commento nella PR con `/done`, in questo modo il bot segnalera il tuo articolo come "pronto alla revisione".

  8. Se tutto è andato per il verso giusto, il tuo lavoro verrà approvato ed incorporato nel progetto ... ora puoi festeggiare :tada: :tada: :tada:

  9. Se hai intenzione di continuare a collaborare, ti sarà utile mantenere la tua repository sincronizzata col lavoro di traduzione in corso. Per farlo ti consigliamo di aggiungere la repository originale come nuovo remote `git remote add upstream https://github.com/javascript-tutorial/it.javascript.info.git`, ed eseguire il comando `git pull upstream master` seguito da `git push origin master` tutte le volte prima di iniziare un nuovo lavoro di traduzione o correzione.
