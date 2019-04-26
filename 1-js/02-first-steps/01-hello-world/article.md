# Hello, world!

<<<<<<< HEAD
Il seguente tutorial tratta del core(nucleo) JavaScript, che è indipendente dalla piattaforma. Inoltre, più avanti, imparerai Node.JS e altre piattaforme che ne fanno utilizzo.

Abbiamo bisogno di un ambiente di lavoro per eseguire i nostri script, e il fatto che questo libro sia online, rende il browser un ottima scelta. Cercheremo di mantenere al minimo l'utilizzo dei comandi specifici per browser (come `alert`), cosi non dovrai perdere la testa se deciderai di spostarti in altri ambienti come Node.JS. In ogni caso, i dettagli browser vengono spiegati in dettaglio nella [prossima parte](/ui) del tutorial.

Quindi prima di tutto, vediamo come inserire uno script in una pagina web. Per ambienti server-side, è sufficiente eseguirli con un comando come `"node my.js"` in Node.JS.
=======
The tutorial that you're reading is about core JavaScript, which is platform-independent. Later on, you'll learn about Node.js and other platforms that use it.

But we need a working environment to run our scripts and, since this book is online, the browser is a good choice. We'll keep the amount of browser-specific commands (like `alert`) to a minimum so that you don't spend time on them if you plan to concentrate on another environment (like Node.js). We'll focus on JavaScript in the browser in the [next part](/ui) of the tutorial.

So first, let's see how we attach a script to a webpage. For server-side environments (like Node.js), you can execute the script with a command like `"node my.js"`.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

## Il tag "script"

I programmi JavaScript possono essere inseriti in qualunque parte di un documento HTML, con l'utilizzo del tag `<script>`.

<<<<<<< HEAD
Ad esempio:
=======
JavaScript programs can be inserted into any part of an HTML document with the help of the `<script>` tag.

For instance:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

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
<<<<<<< HEAD
Puoi eseguire l'esempio cliccando su "Play" tramite il bottone in altro a destra.
```

Il tag `<script>` contiene codice JavaScript che viene automaticamente eseguito quando il browser incontra il tag.

## La segnatura moderna

Il tag `<script>` ha un paio di attributi che vengono utilizzati raramente, ma è comunque possibile trovarli nei vecchi codici:

 L'attributo `type`: <code>&lt;script <u>type</u>=...&gt;</code>

 : Il vecchio standard HTML4 richiedeva che ogni script avesse un tipo. Solitamente era `type="text/javascript"`. Ora non è più richiesto. Infatti, i nuobi standard hanno completamente cambiato il significato di questo attributo. Adesso viene utilizzato per i moduli JavaScript. Questo è un argomento avanzato e ne parleremo più avanti in un'altra parte del tutorial.

 L'attributo `language`: <code>&lt;script <u>language</u>=...&gt;</code>
  : Questo attributo intendeva mostrare il linguaggio dello script. Questo attributo ormai non ha più signigicato, poichè JavaScript è il linguaggio di default. Non è necessario utilizzarlo.

Commenti prima e dopo lo script.
: Nei più vecchi libri, è possibile trovare un commento all'interno dell'elemento `<script>`, come segue:
=======
You can run the example by clicking the "Play" button in the right-top corner of the box above.
```

The `<script>` tag contains JavaScript code which is automatically executed when the browser processes the tag.


## Modern markup

The `<script>` tag has a few attributes that are rarely used nowadays but can still be found in old code:

The `type` attribute: <code>&lt;script <u>type</u>=...&gt;</code>
: The old HTML standard, HTML4, required a script to have a `type`. Usually it was `type="text/javascript"`. It's not required anymore. Also, the modern HTML standard, HTML5, totally changed the meaning of this attribute. Now, it can be used for JavaScript modules. But that's an advanced topic; we'll talk about modules in another part of the tutorial. 

The `language` attribute: <code>&lt;script <u>language</u>=...&gt;</code>
: This attribute was meant to show the language of the script. This attribute no longer makes sense because JavaScript is the default language. There is no need to use it.

Comments before and after scripts.
: In really ancient books and guides, you may find comments inside `<script>` tags, like this:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

    ```html no-beautify
    <script type="text/javascript"><!--
        ...
    //--></script>
    ```

<<<<<<< HEAD
    Questo trucco non viene più utilizzato nel moderno JavaScript. I commenti venivano utilizzati per nascondere il codice JavaScript dai vecchi browser che non conoscevano il tag `<script>`.I browser rilasciati negli utlimi 15 anni non hanno questo problema, questo tipo di strategia può aiutarti a riconsocere i vecchi codici.
=======
    This trick isn't used in modern JavaScript. These comments hid JavaScript code from old browsers that didn't know how to process the `<script>` tag. Since browsers released in the last 15 years don't have this issue, this kind of comment can help you identify really old code.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

## Script esterni

Se abbiamo molto codice JavaScript, possiamo inserirlo in un file separato.

<<<<<<< HEAD
Il file dello script viene integrato nel codice HTML tramtie l'attributo `src`:
=======
If we have a lot of JavaScript code, we can put it into a separate file.

Script files are attached to HTML with the `src` attribute:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

```html
<script src="/path/to/script.js"></script>
```

<<<<<<< HEAD
Questo `/path/to/script.js` è il percorso assoluto al file che contiene lo script (dalla root del sito).

E' anche possibile fornire un percorso relativo a partire dalla pagina corrente. Per esempio `src="script.js"` significa che il file `"script.js"` si trova nella cartella corrente.
=======
Here, `/path/to/script.js` is an absolute path to the script file (from the site root).

You can also provide a relative path from the current page. For instance, `src="script.js"` would mean a file `"script.js"` in the current folder.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

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

<<<<<<< HEAD
Il beneficio di inserire gli script in file separati è che il browser andrà a scaricarli e li memorizzerà nella sua [cache](https://en.wikipedia.org/wiki/Web_cache).

Cosi facendo, le altre pagine che vorranno utilizzare lo stesso script lo preleveranno dallacache invece che riscaricarlo. Quindi il file verrà scaricato una sola volta.

Questo risparmierà traffico e renderà le pagine più veloci.
```

````warn header="Se `src` è impostato, il contenuto all'interno di script verrà ignorato."
Quindi un tag `<script>` non può avere sia `src` che codice incorporato.
=======
The benefit of a separate file is that the browser will download it and store it in its [cache](https://en.wikipedia.org/wiki/Web_cache).

Other pages that reference the same script will take it from the cache instead of downloading it, so the file is actually downloaded only once.

That reduces traffic and makes pages faster.
```

````warn header="If `src` is set, the script content is ignored."
A single `<script>` tag can't have both the `src` attribute and code inside.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

Questo non funziona:

```html
<script *!*src*/!*="file.js">
  alert(1); // the content is ignored, because src is set
</script>
```

<<<<<<< HEAD
Dobbiamo scegliere: o esterno `<script src="…">` o il semplice tag `<script>` con all'interno il codice.
=======
We must choose either an external `<script src="…">` or a regular `<script>` with code.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

L'esempio precedete può essere diviso in due script:

```html
<script src="file.js"></script>
<script>
  alert(1);
</script>
```

<<<<<<< HEAD
## Riepilogo
=======
- We can use a `<script>` tag to add JavaScript code to a page.
- The `type` and `language` attributes are not required.
- A script in an external file can be inserted with `<script src="path/to/script.js"></script>`.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

- Possiamo usare il tag `<script>` per aggiungere codice JavaScript alla pagina.
- Gli attributi `type` e `language` non sono richiesti.
- Uno script in un file esterno può essere inserito con `<script src="path/to/script.js"></script>`.

<<<<<<< HEAD
C'e ancora molto da imparare riguaro gli script browser e la loro interazione con le pagine web. Ma tenete a mente che questa parte del tutorial è dedicata al linguaggio JavaScript, quindi non dobbiamo distrarci da questo obbiettivo. Andremo ad utilizzare il browser come piattaforma in cui eseguire JavaScript, che è molto utile, ma è solo uno dei tanti modi. 
=======
There is much more to learn about browser scripts and their interaction with the webpage. But let's keep in mind that this part of the tutorial is devoted to the JavaScript language, so we shouldn't distract ourselves with browser-specific implementations of it. We'll be using the browser as a way to run JavaScript, which is very convenient for online reading, but only one of many.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847
