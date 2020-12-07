# The Modern JavaScript Tutorial in italiano

Benvenuti a tutti i nuovi contributors! 👋

In questa repository viene pubblicata la traduzione italiana del tutorial [javascript.info](https://javascript.info).

Ci piacerebbe ricevere il tuo contributo nella traduzione e/o revisione degli articoli. 

Se hai idee da proporre o suggerimenti, allora fai riferimento al [repository inglese](https://github.com/javascript-tutorial/en.javascript.info).

Prima di iniziare ti segnalo che esiste anche un **[Canale Discord](https://discord.gg/Dj9P3jCt6K)** in cui potrai parlare con gli altri contributors di quello che riguarda la traduzione e revisione degli articoli. O anche ricevere delle indicazioni su come iniziare!

Se hai deciso di contribuire innanzitutto ti ringrazio per il supporto, e ti chiedo di leggere fino alla fine questo documento, in modo da velocizzare le revisioni e ridurre gli errori!

## Indice
  - [Note importanti](#importante)
  - [Come contribuire](#come-contribuire)
  - [Consigli per la traduzione](#consigli-per-la-traduzione)

<<<<<<< HEAD
## Importante
=======
**You can edit the text in any editor.** The tutorial uses enhanced "markdown" format, easy to grasp. And if you want to see how it looks on-site, there's a server to run the tutorial locally at <https://github.com/javascript-tutorial/server>.
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

- Quando effettui le traduzioni lavora **sempre** in un branch dedicato, in questo modo manteniamo il branch `master` il più pulito possibile. Continua a leggere per maggiori informazioni.

- Quando effettui le traduzioni fai sempre riferimento al [repository inglese](https://github.com/javascript-tutorial/en.javascript.info). Il tutorial è in costante aggiornamento, quindi gli articoli presenti in questo repository potrebbero non essere aggiornati all'ultima versione.

## Come contribuire

### 1. Visita la pagina con l'elenco degli articoli: [it.javascript.info](https://github.com/javascript-tutorial/it.javascript.info/issues/1)

  Scorri la lista e scegli un articolo non ancora assegnato o tradotto. E' possibile riconoscere gli articoli già assegnati poiché riportano il nome del contributor:

  ```
    [ ] Generators (@mean2me)  // articolo già assegnato
    [X] Generators (@mean2me)  // articolo già tradotto
  ```

### 2. Notifica l'articolo scelto

  Prima di cominciare la traduzione ricordati di lasciare un commento con indicato il nome dell'articolo che desideri tradurre, in questo modo evitiamo che un articolo venga tradotto da più persone.

### 3. Esegui un fork del repository

  Ora puoi iniziare con la traduzione! Per iniziare, devi eseguire un `fork` del repository!

### 4. Crea un branch dedicato

  Una volta eseguito il `fork` ti chiedo di creare un branch separato su cui lavorare alla traduzione, in questo modo teniamo il ramo `master` pulito.
  Il nome del branch creato deve seguire il formato seguente:

  ```
    article/NomeArticolo
  ```

### 5. Traduzione

  **Importante**
  Per lavorare alla traduzione ti chiedo di prendere come riferimento l'articolo inglese, che puoi trovare al [seguente repository](https://github.com/javascript-tutorial/en.javascript.info).
  Il tutorial è in costante aggiornamento, quindi la versione inglese presente nel repository italiano potrebbe non essere aggiornata all'ultima versione!

  Se l'articolo contiene esercizi, è necessaria anche la loro traduzione.

### 6. Inoltra la traduzione

  Una volta completata la traduzione è quasi fatta, rimangono ancora un paio di cose da fare:

  1. Effettua un rapido controllo ortografico. Puoi farlo utilizzando un qualsiasi tool online gratuito, ad esempio [Language Tool](https://languagetool.org/).

  2. Inoltra un `Pull Request` al branch `master` del repository.

  3. (Opzionale) Notifica il completamento della traduzione tramite il **[Canale Discord](https://discord.gg/Dj9P3jCt6K)** in modo da rendere più rapide le revisioni.

### 7. Tieni monitorata la PR

  Tieni monitorata la Pull Request in caso ti venga richiesto di apportare delle modifiche.
  A questo punto, in attesa di approvazione, puoi prendere in carico la traduzione di un altro articolo.


# Grazie per la collaborazione 😍

## Consigli per la traduzione
Lascio un elenco rapido da consultare durante la traduzione per mantenere la guida più conforme possibile.

Cosa tradurre:
  - Tradurre l'articolo nella sua interezza, compresi i task e le solution
  - Tradurre anche i commenti negli esempi all'interno degli articoli

Cosa **non** tradurre:
  - Non è necessario tradurre gli esempi, è sufficiente la traduzione dei commenti. Quindi il contenuto degli alert, console.log, nomi delle funzioni/classi deve rimanere in lingua inglese.

  ```
    function sayHello() {
      alert("Hello, World!") // show the text 'Hello, World!'
    }
  ```

  verrà tradotto come segue:

  ```
    function sayHello() {
      alert("Hello, World!") // mostra il testo 'Hello, World!'
    }
  ```

  - Non è necessario tradurre le immagini utilizzate durante le spiegazioni

Alcuni termini ricorrenti:
  - Nomi dei tipi vanno mantenuti in inglese:

      **Date is a JavaScript data type.**

      Verrà tradotto come:
      
        ✅ Date è un tipo di dato in JavaScript.

        ❌ Data è un tipo di dato in JavaScript.
  
  - **Summary**, il termine che troverete a fine di ogni articolo va tradotto come **Riepilogo**

### FAQ

  <details>
    <summary>In quale formato sono scritti gli articoli?</summary>

    Il tutorial segue lo standard testuale "Markdonw", è molto semplice da utilizzare. In ogni caso non vi è richiesto di mettere mano al formato, è sufficiente la traduzione del testo.
  </details>

  <details>
    <summary>Cosa posso utilizzare per tradurre gli articoli?</summary>

    Puoi tradurre gli articoli utilizzando il tool con cui ti tovi più comodo. Puoi farlo direttamente con l'editor di testo intergato di GitHub se ti trovi più a tuo agio.

    L'importante è rispettare le linee guida fornite sopra!
  </details>

---  
♥  
Ilya Kantor @iliakan

