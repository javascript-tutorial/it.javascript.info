# Struttura del codice

La prima cosa che studieremo riguarda la struttura del codice.

## Istruzioni

Le istruzioni sono dei costrutti sintattici e comandi che permettono di eseguire azioni.

Abbiamo già visto un'istruzione `alert('Hello, world!')`, che mostra il messaggio "Hello world!".

All'interno del codice possiamo avere tutte le istruzioni che desideriamo. Le istruzioni possono essere separate da un punto e virgola.

Ad esempio, qui dividiamo il messaggio in due alert:

```js run no-beautify
alert('Hello'); alert('World');
```
Di solito ogni istruzione viene scritta in una riga separata per rendere il codice molto più leggibile:

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

In questo caso, JavaScript interpreta la fine della riga come un punto e virgola "implicito". Viene anche chiamata [inserimento automatico del punto e virgola](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion).

**In molti casi la nuova riga viene interpretata come un punto e virgola implicito. Ma "in molti casi" non significa "sempre"!**

Ci sono casi in cui la nuova riga non implica una punto e virgola, per esempio:

```js run no-beautify
alert(3 +
1
+ 2);
```

Il codice stampa `6` perché, in questo caso, JavaScript non inserisce un punto e virgola. E' abbastanza ovvio che se la riga finisce con un `"+"`, allora è un "espressione incompleta", quindi il punto e virgola non verrà inserito. Per questo, nell'esempio sopra, tutto funziona come dovrebbe.

**Ma ci sono casi in cui JavaScript "fallisce" nell'interpretare un punto e virgola, dove invece sarebbe necessario.**

Gli errori di questo tipo sono molto difficili da trovare e sistemare.

````smart header="Un esempio di errore"
Se sei curioso di vedere un esempio concreto di questo tipo di errore, dai un occhiata al seguente codice:

```js run
[1, 2].forEach(alert)
```

Non c'e bisogno di pensare al significato delle parentesi `[]` e al `forEach`. Li studieremo più avanti, per ora è sufficiente sapere il risultato: mostrerà `1` e poi `2`.

Adesso andiamo ad aggiungere un `alert` prima del codice e *non* concludiamo la riga con il punto e virgola:

```js run no-beautify
alert("There will be an error")

[1, 2].forEach(alert)
```

Adesso se lo eseguiamo, solo il primo `alert` viene mostrato, poi avremmo un errore!

Ma tutto si risolve aggiungendo un punto e virgola dopo `alert`:
```js run
alert("All fine now");

[1, 2].forEach(alert)  
```

Adesso avremmo il messaggio "All fine now", successivamente `1` seguito da `2`.

L'errore nel non aver messo il punto e virgola è avvenuto perché JavaScript non inserisce automaticamente un punto e virgola prima delle parentesi quadre `[...]`.

Quindi, poiché il punto e virgola non viene auto-inserito, il codice del precedente esempio viene trattato come un istruzione singola. Infatti il motore JavaScript lo vede cosi:

```js run no-beautify
alert("There will be an error")[1, 2].forEach(alert)
```

Anche se se in realtà sono due istruzioni separate, non una singola. Questo tipo di interpretazione, in questo caso è errata. Ci possono essere altre situazioni in cui si verifica questo tipo di errore.
````

E' consigliato quindi, di inserire il punto e virgola fra ogni istruzione, anche se vengono scritte in righe diverse. Questa è una regola largamente adottata dalla community. Ripetiamolo nuovamente -- *è possibile* omettere il punto e virgola la maggior parte delle volte. Ma è più sicuro -- specialmente per un novizio -- inserirlo al termine di ogni istruzione.

## Commenti

Con il passare del tempo, i programmi sono diventati sempre più complessi. Ed è diventato necessario aggiungere *commenti* per poter descrivere i comportamenti del codice.

I commenti possono essere messi in qualsiasi punto dello script. Infatti non hanno alcun effetto sull'esecuzione del codice, poiché il motore JavaScript semplicemente li ignora.

**I commenti su una singola linea si inseriscono con due caratteri di slash `//`.**

Il resto della linea è il commento. Può occupare un intera linea oppure essere posta in seguito ad un'istruzione.

Vediamo un esempio:
```js run
// Questo commento occupa un'intera riga
alert('Hello');

alert('World'); // Questo commento segue un istruzione
```

**I commenti multilinea incominciano con un singolo carattere di slahs ed un asterisco <code>/&#42;</code> e finiscono con un asterisco ed un carattere di slash <code>&#42;/</code>.**

Come nell'esempio:

```js run
/* Un esempio con due messaggi.
Questo è un commento multilinea.
*/
alert('Hello');
alert('World');
```

Il contenuto dei commenti viene ignorato, quindi se inseriamo codice al suo interno <code>/&#42; ... &#42;/</code> non verrà eseguito.

Qualche volta può essere utile per bloccare temporaneamente qualche porzione di codice:
```js run
/* Commentiamo il codice
alert('Hello');
*/
alert('World');
```

```smart header="Usa le scorciatoie da tastiera!"
In molti editor una linea di codice può essere commentata con la combinazione da tastiera dei tasti `key:Ctrl+/` e una combinazione simile a `key:Ctrl+Shift+/` -- per i commenti multilinea (selezionate prima una parte di codice e poi utilizzate la combinazione di tasti). Su Mac dovrebbe funzionare la combinazione `key:Cmd` al posto di `key:Ctrl`.
```

````warn header="I commenti annidati non sono supportati!"
Non si possono inserire `/*...*/` all'interno di altri `/*...*/`.

Questo codice genererebbe un errore:

```js run no-beautify
/*
  /* commento annidato ?!? */
*/
alert( 'World' );
```
````
Non abbiate paura di utilizzare i commenti nel codice.

I commenti aumenteranno il peso finale dello script, ma questo non sarà un problema. Ci sono tantissimi strumenti che possono minimizzare("minify") il codice prima di pubblicarlo nel server. Questi strumenti rimuovono i commenti, quindi non appariranno nello script che verrà eseguito. Perciò i commenti non hanno alcun effetto negativo sul codice prodotto.

Inoltre più avanti nel tutorial ci sarà un capitolo <info:coding-style> che illustrerà come scrivere commenti in maniera ottimale.
