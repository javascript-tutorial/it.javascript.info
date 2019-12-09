# Hello, world!

Il seguente tutorial tratta del core (nucleo) JavaScript, che è indipendente dalla piattaforma.

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

: Nei più vecchi libri, è possibile trovare un commento all'interno dell'elemento `<script>`, come segue:

    ```html no-beautify
    <script type="text/javascript"><!--
        ...
    //--></script>
    ```

<<<<<<< HEAD
    Questo trucco non viene più utilizzato nel moderno JavaScript. I commenti venivano utilizzati per nascondere il codice JavaScript dai vecchi browser che non conoscevano il tag `<script>`.I browser rilasciati negli utlimi 15 anni non hanno questo problema, questo tipo di strategia può aiutarti a riconsocere i vecchi codici.
=======
    This trick isn't used in modern JavaScript. These comments hide JavaScript code from old browsers that didn't know how to process the `<script>` tag. Since browsers released in the last 15 years don't have this issue, this kind of comment can help you identify really old code.
>>>>>>> 5b195795da511709faf79a4d35f9c5623b6dbdbd

## Script esterni

Se abbiamo molto codice JavaScript, possiamo inserirlo in un file separato.

Il file dello script viene integrato nel codice HTML tramtie l'attributo `src`:

```html
<script src="/path/to/script.js"></script>
```

Questo `/path/to/script.js` è il percorso assoluto al file che contiene lo script (dalla root del sito).

E' anche possibile fornire un percorso relativo a partire dalla pagina corrente. Per esempio `src="script.js"` significa che il file `"script.js"` si trova nella cartella corrente.

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
