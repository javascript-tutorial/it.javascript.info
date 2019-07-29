# Hello, world!

<<<<<<< HEAD
Il seguente tutorial tratta del core (nucleo) JavaScript, che è indipendente dalla piattaforma. Inoltre, più avanti, imparerai Node.js e altre piattaforme che ne fanno utilizzo.
=======
This part of the tutorial is about core JavaScript, the language itself.
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

Abbiamo bisogno di un ambiente di lavoro per eseguire i nostri script, e il fatto che questo libro sia online, rende il browser un ottima scelta. Cercheremo di mantenere al minimo l'utilizzo dei comandi specifici per browser (come `alert`), cosi non dovrai perdere la testa se deciderai di spostarti in altri ambienti come Node.JS. In ogni caso, i dettagli browser vengono spiegati in dettaglio nella [prossima parte](/ui) del tutorial.

Quindi prima di tutto, vediamo come inserire uno script in una pagina web. Per ambienti server-side, è sufficiente eseguirli con un comando come `"node my.js"` in Node.JS.

## Il tag "script"

I programmi JavaScript possono essere inseriti in qualunque parte di un documento HTML, con l'utilizzo del tag `<script>`.

Ad esempio:

```html run height=100
<!DOCTYPE HTML>
<html>

<body>

  <p>Before the script...</p>

*!*
  <script>
    alert( 'Hello, world!' );
  </script>
*/!*

  <p>...After the script.</p>

</body>

</html>
```

```online
Puoi eseguire l'esempio cliccando su "Play" tramite il bottone in altro a destra.
```

Il tag `<script>` contiene codice JavaScript che viene automaticamente eseguito quando il browser incontra il tag.

## La segnatura moderna

Il tag `<script>` ha un paio di attributi che vengono utilizzati raramente, ma è comunque possibile trovarli nei vecchi codici:

 L'attributo `type`: <code>&lt;script <u>type</u>=...&gt;</code>

<<<<<<< HEAD
 : Il vecchio standard HTML4 richiedeva che ogni script avesse un `type` (tipo). Solitamente era `type="text/javascript"`. Ora non è più richiesto. Infatti, i nuobi standard hanno completamente cambiato il significato di questo attributo. Adesso viene utilizzato per i moduli JavaScript. Questo è un argomento avanzato e ne parleremo più avanti in un'altra parte del tutorial.
=======
The `type` attribute: <code>&lt;script <u>type</u>=...&gt;</code>
: The old HTML standard, HTML4, required a script to have a `type`. Usually it was `type="text/javascript"`. It's not required anymore. Also, the modern HTML standard totally changed the meaning of this attribute. Now, it can be used for JavaScript modules. But that's an advanced topic; we'll talk about modules in another part of the tutorial.
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

 L'attributo `language`: <code>&lt;script <u>language</u>=...&gt;</code>
  : Questo attributo intendeva mostrare il linguaggio dello script. Questo attributo ormai non ha più signigicato, poichè JavaScript è il linguaggio di default. Non è necessario utilizzarlo.

Commenti prima e dopo lo script.
: Nei più vecchi libri, è possibile trovare un commento all'interno dell'elemento `<script>`, come segue:

    ```html no-beautify
    <script type="text/javascript"><!--
        ...
    //--></script>
    ```

    Questo trucco non viene più utilizzato nel moderno JavaScript. I commenti venivano utilizzati per nascondere il codice JavaScript dai vecchi browser che non conoscevano il tag `<script>`.I browser rilasciati negli utlimi 15 anni non hanno questo problema, questo tipo di strategia può aiutarti a riconsocere i vecchi codici.

## Script esterni

Se abbiamo molto codice JavaScript, possiamo inserirlo in un file separato.

Il file dello script viene integrato nel codice HTML tramtie l'attributo `src`:

```html
<script src="/path/to/script.js"></script>
```

<<<<<<< HEAD
Questo `/path/to/script.js` è il percorso assoluto al file che contiene lo script (dalla root del sito).

E' anche possibile fornire un percorso relativo a partire dalla pagina corrente. Per esempio `src="script.js"` significa che il file `"script.js"` si trova nella cartella corrente.
=======
Here, `/path/to/script.js` is an absolute path to the script from the site root. One can also provide a relative path from the current page. For instance, `src="script.js"` would mean a file `"script.js"` in the current folder.
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

Possiamo anche fornire un URL. Per esempio:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js"></script>
```

Per integrare più script, utilzzate più volte il tag:

```html
<script src="/js/script1.js"></script>
<script src="/js/script2.js"></script>
…
```

```smart
Come regola da seguire, solo gli script molto semplici vanno inseriti all'interno dell'HTML. Quelli più complessi vanno inseriti in file separati.

Il beneficio di inserire gli script in file separati è che il browser andrà a scaricarli e li memorizzerà nella sua [cache](https://en.wikipedia.org/wiki/Web_cache).

Cosi facendo, le altre pagine che vorranno utilizzare lo stesso script lo preleveranno dallacache invece che riscaricarlo. Quindi il file verrà scaricato una sola volta.

Questo risparmierà traffico e renderà le pagine più veloci.
```

````warn header="Se `src` è impostato, il contenuto all'interno di script verrà ignorato."
Quindi un tag `<script>` non può avere sia `src` che codice incorporato.

Questo non funziona:

```html
<script *!*src*/!*="file.js">
  alert(1); // il contenuto viene ignorato, perchè src è impostato
</script>
```

Dobbiamo scegliere: o esterno `<script src="…">` o il semplice tag `<script>` con all'interno il codice.

L'esempio precedete può essere diviso in due script:

```html
<script src="file.js"></script>
<script>
  alert(1);
</script>
```

## Riepilogo

- Possiamo usare il tag `<script>` per aggiungere codice JavaScript alla pagina.
- Gli attributi `type` e `language` non sono richiesti.
- Uno script in un file esterno può essere inserito con `<script src="path/to/script.js"></script>`.

C'e ancora molto da imparare riguaro gli script browser e la loro interazione con le pagine web. Ma tenete a mente che questa parte del tutorial è dedicata al linguaggio JavaScript, quindi non dobbiamo distrarci da questo obbiettivo. Andremo ad utilizzare il browser come piattaforma in cui eseguire JavaScript, che è molto utile, ma è solo uno dei tanti modi. 
