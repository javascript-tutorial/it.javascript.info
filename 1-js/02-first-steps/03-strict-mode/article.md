# Le tecniche moderne, "use strict"

Per molto tempo JavaScript si è evoluto senza problemi di compatibilità. Nuove funzionalità venivano aggiunte al linguaggio, ma quelle vecchie non cambiavano.

Questo ha consentito al vecchio codice di non diventare obsoleto. Ma lo svantaggio è stato che cosi facendo gli errori e le decisioni imperefette fatte dai creatori di JavaScript, rimarranno nel linguaggio per sempre.

Cosi è stato fino al 2009 quando è apparsa ECMAScript 5 (ES5). Ha aggiungo nuove funzionalità al linguaggio e ne ha modificate alcune già esistenti. Per far si che il vecchio codice continui a funzionare, molte modifiche vengono disattivate di default. Diventa quindi necessario abilitarle esplicitamente con la direttiva `"use strict"`.

## "use strict"

La direttiva è simile ad una stringa: `"use strict"` o `'use strict'`. Quando viene inserita all'inizio dello script, da quel momento l'intero script funziona nello stile "moderno".

Per esempio:

```js
"use strict";

// questo codice viene eseguito secondo gli standard moderni
...
```

<<<<<<< HEAD
Impareremo presto le funzioni(un modo per raggruppare le istruzioni).

Guardando avanti, notiamo che `"use strict"` può essere applicato all'inizio di una funzione(la maggior parte) piuttosto che all'intero script. La modalità strict sarà quindi attiva solo all'interno di quella funzione. Solitamente si utilizza nell'intero script.
=======
Quite soon we're going to learn functions (a way to group commands), so let's note in advance that `"use strict"` can be put at the beginning of a function. Doing that enables strict mode in that function only. But usually people use it for the whole script.
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

````warn header="Assicurati che \"use strict\" sia all'inizio"
Assicurati `"use strict"` sia all'inizio dello script, altrimenti la modalità script non verrà abilitata.

Qui non si attiva la modalità strict:

```js no-strict
alert("some code");
// "use strict" qui sotto viene ignorato -- la dichiarazione deve stare sempre in cima

"use strict";

// strict mode non è attiva
```

Solo i commenti possono apparire prima di `"use strict"`.
````

```warn header="Non c'e nessun modo per annullare `use strict`"
Non esiste nessuna direttiva `"no use strict"` o simile, che possa riportare lo script alla vecchia modalità.

<<<<<<< HEAD
Una volta abilitata la modalità strict, non c'e ritorno.
=======
Once we enter strict mode, there's no going back.
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa
```

## Browser console

<<<<<<< HEAD
In futuro, quando utilizzerete la console integrata in un browser, dovete tenere a mente che di default non vale `use strict`.
=======
When you use a [developer console](info:devtools) to run code, please note that it doesn't `use strict` by default.
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

In certe situazioni, `use strict` fa veramente la differenza, quindi potreste ottenere dei risultati indesiderati.

<<<<<<< HEAD
Potete provare con `key:Shift+Enter` per inserire più righe di codice, con `use strict` in cima, come nell'esempio:
=======
So, how to actually `use strict` in the console?

First, you can try to press `key:Shift+Enter` to input multiple lines, and put `use strict` on top, like this:
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

```js
'use strict'; <Shift+Enter for a newline>
//  ...your code
<Enter to run>
```

Funziona nella maggior parte dei browser, tra cui Firefox Chrome.

<<<<<<< HEAD
Nel caso in cui non funzioni, la miglior strada da seguire è quella di assicurarsi che  `use strict` venga inserito, in questo modo:
=======
If it doesn't, e.g. in an old browser, there's an ugly, but reliable way to ensure `use strict`. Put it inside this kind of wrapper:
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

```js
(function() {
  'use strict';

<<<<<<< HEAD
  // ...codice...
=======
  // ...your code here...
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa
})()

<<<<<<< HEAD


## Utilizzare sempre "use strict"

Le differenze tra `"use strict"` contro la modalità di "default" non è ancora stata spiegata.

Nel prossimo capitolo, mentre impareremo le caratteristiche del linguaggio, terremo d'occhio anche le differenze tra la modalità strict e quella di default. Fortunatamente non sono molte. E senza dubbio renderanno migliore la scrittura del codice.

A questo punto è sufficiente sapere le regole generali:

1. L'utilizzo della direttiva `"use strict"` cambia la modalità del motore JavaScript al il metodo moderno, cambiando i comportamenti di alcune caratteristiche integrate. Vedremo meglio i dettagli man mano che studiamo.
2. La modalità strict viene abilitata tramite l'istruzione `"use strict"` posta all'inizio. In ogni caso ci sono alcune caratteristiche del linguaggio come "classi" e "moduli" che attivano la modalità strict in automatico.
3. La modalità strict è supportata da tutti i moderni browser.
4. E' sempre raccomandato iniziare lo script con `"use strict"`. Tutti gli esempi del tutorial assumo che esso sia attivo, tranne in alcuni esempi(veramente pochi) in cui verrà specificato esplicitamente.
=======
## Should we "use strict"?

The question may sound obvious, but it's not so.

One could recommend to start scripts with `"use strict"`... But you know what's cool?

Modern JavaScript supports "classes" and "modules" - advanced language structures (we'll surely get to them), that enable `use strict` automatically. So we don't need to add the `"use strict"` directive, if we use them.

**So, for now `"use strict";` is a welcome guest at the top of your scripts. Later, when your code is all in classes and modules, you may omit it.**

As of now, we've got to know about `use strict` in general.

In the next chapters, as we learn language features, we'll see the differences between the strict and old modes. Luckily, there aren't many and they actually make our lives better.

All examples in this tutorial assume strict mode unless (very rarely) specified otherwise.
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa
