# Hello, world!

Il seguente tutorial tratta del core (nucleo) di JavaScript, il quale è indipendente dalla piattaforma.

Abbiamo bisogno di un ambiente di lavoro per eseguire i nostri script, e il fatto che questo tutorial sia online, rende il browser un ottima scelta. Cercheremo di mantenere al minimo l'utilizzo dei comandi specifici per browser (come `alert`), cosi non dovrai perdere la testa se deciderai di spostarti in altri ambienti (come Node.jd). In ogni caso, ci concentreremo sulle caratteristiche JavaScript specifiche per il browser nella [prossima parte](/ui) del tutorial.

Quindi prima di tutto, vediamo come inserire uno script in una pagina web. Per ambienti server-side (come Node.js), è sufficiente eseguirli con un comando come `"node my.js"`.

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

Il tag `<script>` contiene codice JavaScript che viene automaticamente eseguito quando il browser processa il tag.

## La segnatura moderna

Il tag `<script>` ha un paio di attributi che vengono utilizzati raramente, ma è comunque possibile trovarli nei vecchi codici:

L'attributo `type`: <code>&lt;script <u>type</u>=...&gt;</code>
: Il precedente standard HTML, HTML4, richiedeva che lo script avesse una proprietà `type`. Solitamente era `type="text/javascript"`. Ora non è più richiesto. Inoltre, lo standard attuale HTML, ha completamente cambiato il suo significato. Ora può essere utilizzato per i moduli JavaScript. Ma questo è un argomento avanzato, parleremo dei moduli più avanti nel tutorial.

L'attributo `language`: <code>&lt;script <u>language</u>=...&gt;</code>
: Questo attributo aveva lo scopo di mostrare il linguaggio utilizzato dallo script. Ora questo linguaggio non ha più molto senso, poiché JavaScript è il linguaggio utilizzato di default. Quindi non ha più senso utilizzarlo.

I commenti prima e dopo gli script.
: Nei vecchi libri e tutorial, potreste trovare commenti all'interno del tag `<script>`, come questo:

    ```html no-beautify
    <script type="text/javascript"><!--
        ...
    //--></script>
    ```

    Questo trucco non viene più utilizzato. Questi commenti avevano lo scopo di nascondere il codice JavaScript ai vecchi browser che non erano in grado di elaborare il tag `<script>`. Poiché i browser rilasciati negli ultimi 15 anni non hanno più questo problema, questo tipo di commenti possono aiutarti ad identificare codici molto vecchi.


## Script esterni

Se abbiamo molto codice JavaScript, possiamo inserirlo in un file separato.

Il file dello script viene integrato nel codice HTML tramite l'attributo `src`:

```html
<script src="/path/to/script.js"></script>
```

Questo `/path/to/script.js` è il percorso assoluto al file che contiene lo script a partire dalla root del sito. Ad esempio, `src="script.js"` significherebbe un file `"script.js"` che si trova nella cartella corrente.

E' anche possibile fornire un percorso relativo a partire dalla pagina corrente. Per esempio `src="script.js"` significa che il file `"script.js"` si trova nella cartella corrente.

Possiamo anche fornire un URL. Ad esempio:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js"></script>
```

Per integrare più script, possiamo utilizzare più volte il tag:

```html
<script src="/js/script1.js"></script>
<script src="/js/script2.js"></script>
…
```

```smart
Come regola da seguire, solo gli script molto semplici vanno inseriti all'interno dell'HTML. Quelli più complessi vanno inseriti in file separati.

Il beneficio di inserire gli script in file separati è che il browser andrà a scaricarli e li memorizzerà nella sua [cache](https://en.wikipedia.org/wiki/Web_cache).

Cosi facendo, le altre pagine che vorranno utilizzare lo stesso script lo preleveranno dalla cache invece che riscaricarlo. Quindi il file verrà scaricato una sola volta.

Questo risparmierà traffico e renderà il caricamento delle pagine più veloce.
```

````warn header="Se `src` è impostato, il contenuto all'interno di script verrà ignorato."
Quindi un tag `<script>` non può avere sia `src` che codice incorporato.

Questo non funziona:

```html
<script *!*src*/!*="file.js">
  alert(1); // il contenuto viene ignorato, perché src è impostato
</script>
```

Dobbiamo scegliere fra le due possibilità: script esterno `<script src="…">` o il semplice tag `<script>` con all'interno il codice.

L'esempio precedente può essere diviso in due script:

```html
<script src="file.js"></script>
<script>
  alert(1);
</script>
```

## Riepilogo

- Possiamo usare il tag `<script>` per aggiungere codice JavaScript alla pagina.
- Gli attributi `type` e `language` non sono più richiesti.
- Uno script in un file esterno può essere inserito con `<script src="path/to/script.js"></script>`.

C'e ancora molto da imparare riguardo gli script browser e la loro interazione con le pagine web. Ma tenete a mente che questa parte del tutorial è dedicata al linguaggio JavaScript, quindi non dobbiamo distrarci da questo obbiettivo. Andremo ad utilizzare il browser come piattaforma in cui eseguire JavaScript, che è molto comodo, ma è solo uno dei tanti modi. 
