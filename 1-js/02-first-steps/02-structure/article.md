# Struttura del codice

<<<<<<< HEAD
La prima cosa da studiare riguarda il come è strutturato il codice.
=======
The first thing we'll study is the building blocks of code.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

## Istruzioni

Le istruzioni sono dei costrutti sintattici e comandi che eseguono azioni.

<<<<<<< HEAD
Abbiamo già visto un'istruzione `alert('Hello, world!')`, che mostra il messaggio "Hello world!".

All'interno del codice possiamo avere tutte le istruzioni che desideriamo. Una seconda istruzione può essere separata tramite il punto e virgola.

Ad esempio, qui dividiamo il messaggio in due:
=======
We've already seen a statement, `alert('Hello, world!')`, which shows the message "Hello, world!".

We can have as many statements in our code as we want. Statements can be separated with a semicolon.

For example, here we split "Hello World" into two alerts:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js run no-beautify
alert('Hello'); alert('World');
```
<<<<<<< HEAD
Di solito ogni istruzione viene scritta in una linea separata -- questo rende il codice molto più leggibile:
=======

Usually, statements are written on separate lines to make the code more readable:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js run no-beautify
alert('Hello');
alert('World');
```

## Punto e virgola [#semicolon]

Un punto e virgola può essere omesso nella maggior parte dei casi quando si interrompe una riga.

Questo funzionerà ugualmente:

```js run no-beautify
alert('Hello')
alert('World')
```

<<<<<<< HEAD
Qui JavaScript interpreta la fine della riga come un punto e virgola "implicito". Viene anche chiamato [automatic semicolon insertion](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion).

**In molti casi la nuova riga viene interpretata come un punto e virgola implicito. Ma "in molti casi" non significa "sempre"!**

Ci sono casi in cui la nuova riga non implica una punto e virgola, per esempio:
=======
Here, JavaScript interprets the line break as an "implicit" semicolon. This is called an [automatic semicolon insertion](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion).

**In most cases, a newline implies a semicolon. But "in most cases" does not mean "always"!**

There are cases when a newline does not mean a semicolon. For example:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js run no-beautify
alert(3 +
1
+ 2);
```

Il codice stampa `6` perchè JavaScript non inserisce un punto e virgola qui. E' abbastanza ovvio che se la riga finisce con un `"+"`, allora è un "espressione incompleta", quindi il punto e virgola non è richiesto. Quindi in questo caso tutto funziona come dovrebbe.

**Ma ci sono casi in cui JavaScript "fallisce"  But there are situations where JavaScript "fails" nell'interpretare un punto e virgola.**

Gli errori di questo tipo sono molto difficili da trovare e sistemare.

````smart header="Un esempio di errore"
Se sei curioso di vedere un esempio concreto di questo tipo di errore, dai un occhiata al seguente codice:

```js run
[1, 2].forEach(alert)
```

<<<<<<< HEAD
Non c'e bisogno di pensare al significato delle parentesi `[]` e al `forEach`. Li studieremo più avanti, per ora non hanno importanza. Sappiate che il risultato mostra `1` e poi `2`.

Adesso andiamo ad aggiungere un `alert` prima del codice e *non* concludiamo la riga con il punto e virgola:
=======
No need to think about the meaning of the brackets `[]` and `forEach` yet. We'll study them later. For now, just remember the result of the code: it shows `1` then `2`.

Now, let's add an `alert` before the code and *not* finish it with a semicolon:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js run no-beautify
alert("There will be an error")

[1, 2].forEach(alert)
```

<<<<<<< HEAD
Adesso se noi lo eseguiamo, solo il primo `alert` viene mostrato, poi avremmo un errore!
=======
Now if we run the code, only the first `alert` is shown and then we have an error!
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Ma tutto si risolve se aggiungiamo un punto e virgola dopo `alert`:
```js run
alert("All fine now");

[1, 2].forEach(alert)  
```

<<<<<<< HEAD
Adesso avremmo il messaggio "All fine now" e successivamente `1` seguito da `2`.

L'errore nel non aver messo il punto e virgola è avvenuto perchè JavaScript non implica un punto e virgola prima delle parentesi quadre `[...]`.

Quindi, poichè il punto e virgola non viene auto-inserito, il codice del precedente esempio viene trattato come un istruzione singola. Quindi il motore JavaScript lo vede cosi:
=======
Now we have the "All fine now" message followed by `1` and `2`.


The error in the no-semicolon variant occurs because JavaScript does not assume a semicolon before square brackets `[...]`.

So, because the semicolon is not auto-inserted, the code in the first example is treated as a single statement. Here's how the engine sees it:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js run no-beautify
alert("There will be an error")[1, 2].forEach(alert)
```

<<<<<<< HEAD
Anche se dovrebbero essere due istruzioni separate, non una singola. 
But it should be two separate statements, not a single one. Questo tipo di unione, in questo caso è errata, quindi produce un errore. Ci sono altre situazioni in cui si verifica questo tipo di errore.
````

E' consigliato quindi, di mettere il punto e virgola fra ogni istruzione, anche se vengono scritte in righe diverse. Questa regola è largamente adottata dalla community. Ripetiamolo nuovamente -- *è possibile* evitare di scrivere il punto e virgola la maggior parte delle volte. Ma è più sicuro -- specialmente per un beginner -- inserirle al termine di ogni istruzione.
=======
But it should be two separate statements, not one. Such a merging in this case is just wrong, hence the error. This can happen in other situations.
````

We recommend putting semicolons between statements even if they are separated by newlines. This rule is widely adopted by the community. Let's note once again -- *it is possible* to leave out semicolons most of the time. But it's safer -- especially for a beginner -- to use them.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

## Commenti

<<<<<<< HEAD
Con il passare del tempo, i programmi sono diventati sempre più complessi. E' diventato necessario aggiungere *commenti* che descrivessero i comportamenti del codice e il perchè.

I commenti possono essere messi in qualsiasi punto dello script. Infatti non hanno alcun effetto sull'esecuzione del codice, poichè il motore JavaScript semplicemente li ignora.
=======
As time goes on, programs become more and more complex. It becomes necessary to add *comments* which describe what the code does and why.

Comments can be put into any place of a script. They don't affect its execution because the engine simply ignores them.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

**I commenti su una singola linea incominciano con due caratteri di slash `//`.**

Il resto della linea è il commento. Può occupare un intera linea oppure seguire l'istruzione.

Come segue:
```js run
// This comment occupies a line of its own
alert('Hello');

alert('World'); // This comment follows the statement
```

**I commenti multilinea incominciano con un singolo carattere di slahs ed un asterisco <code>/&#42;</code> e finiscono con un asterisco ed un carattere di slash <code>&#42;/</code>.**

Come segue:

```js run
/* An example with two messages.
This is a multiline comment.
*/
alert('Hello');
alert('World');
```

<<<<<<< HEAD
Il contenuto dei commenti viene ignorato, quindi se inseriamo codice al suo interno <code>/&#42; ... &#42;/</code> non verrà eseguito.
=======
The content of comments is ignored, so if we put code inside <code>/&#42; ... &#42;/</code>, it won't execute.

Sometimes it can be handy to temporarily disable a part of code:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Qualche volta diventa utile per bloccare temporaneamente qualche porzione di codice:
```js run
/* Commenting out the code
alert('Hello');
*/
alert('World');
```

<<<<<<< HEAD
```smart header="Usa le scorciatoie da tastiera!"
In molti editor una linea di codice può essere commentata con la combinazione da tastiera dei tasti `key:Ctrl+/` e una combinazione simile a `key:Ctrl+Shift+/` -- per i commenti multilinea (selezionate prima una parte di codice e poi utilizzate la combinazione di tasti). Su Mac dovrebbe funzionare la combinazione `key:Cmd` al posto di `key:Ctrl`.
=======
```smart header="Use hotkeys!"
In most editors, a line of code can be commented out by pressing the `key:Ctrl+/` hotkey for a single-line comment and something like `key:Ctrl+Shift+/` -- for multiline comments (select a piece of code and press the hotkey). For Mac, try `key:Cmd` instead of `key:Ctrl`.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb
```

````warn header="I commenti annidati non sono supportati!"
Non si possono inserire `/*...*/` all'interno di altri `/*...*/`.

Questo codice si bloccherebbe con un errore:

```js run no-beautify
/*
  /* nested comment ?!? */
*/
alert( 'World' );
```
````
Non abbiate paura di utilizzare i commenti nel codice.

<<<<<<< HEAD
I commenti aumenteranno il peso finale dello script, ma questo non sarà un problema. Ci sono tantissimi strumenti che possono minimizzare("minify") il codice prima di pubblicarlo nel server. Questi strumenti rimuovono i commenti, quindi non appariranno nello script che verrà eseguito. Perciò i commenti non hanno alcun effetto negativo sul codice prodotto.

Inoltre più avanti nel tutorial ci sarà un capitolo <info:coding-style> che illustrerà come scrivere commenti in maniera ottimale.
=======
Please, don't hesitate to comment your code.

Comments increase the overall code footprint, but that's not a problem at all. There are many tools which minify code before publishing to a production server. They remove comments, so they don't appear in the working scripts. Therefore, comments do not have negative effects on production at all.

Later in the tutorial there will be a chapter <info:code-quality> that also explains how to write better comments.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb
