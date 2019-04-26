# Le tecniche moderne, "use strict"

<<<<<<< HEAD
Per molto tempo JavaScript si è evoluto senza problemi di compatibilità. Nuove funzionalità venivano aggiunte al linguaggio, ma quelle vecchie non cambiavano.

Questo ha consentito al vecchio codice di non diventare obsoleto. Ma lo svantaggio è stato che cosi facendo gli errori e le decisioni imperefette fatte dai creatori di JavaScript, rimarranno nel linguaggio per sempre.

Cosi è stato fino al 2009 quando è apparsa ECMAScript 5 (ES5). Ha aggiungo nuove funzionalità al linguaggio e ne ha modificate alcune già esistenti. Per far si che il vecchio codice continui a funzionare, molte modifiche vengono disattivate di default. Diventa quindi necessario abilitarle esplicitamente con la direttiva `"use strict"`.

## "use strict"

La direttiva è simile ad una stringa: `"use strict"` o `'use strict'`. Quando viene inserita all'inizio dello script, da quel momento l'intero script funziona nello stile "moderno".

Per esempio:
=======
For a long time, JavaScript evolved without compatibility issues. New features were added to the language while old functionality didn't change.

That had the benefit of never breaking existing code. But the downside was that any mistake or an imperfect decision made by JavaScript's creators got stuck in the language forever.

This was the case until 2009 when ECMAScript 5 (ES5) appeared. It added new features to the language and modified some of the existing ones. To keep the old code working, most modifications are off by default. You need to explicitly enable them with a special directive: `"use strict"`.

## "use strict"

The directive looks like a string: `"use strict"` or `'use strict'`. When it is located at the top of a script, the whole script works the "modern" way.

For example:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

```js
"use strict";

// this code works the modern way
...
```

Impareremo presto le funzioni(un modo per raggruppare le istruzioni).

<<<<<<< HEAD
Guardando avanti, notiamo che `"use strict"` può essere applicato all'inizio di una funzione(la maggior parte) piuttosto che all'intero script. La modalità strict sarà quindi attiva solo all'interno di quella funzione. Solitamente si utilizza nell'intero script.
=======
Looking ahead, let's just note that `"use strict"` can be put at the start of most kinds of functions instead of the whole script. Doing that enables strict mode in that function only. But usually, people use it for the whole script.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

````warn header="Assicurati che \"use strict\" sia all'inizio"
Assicurati `"use strict"` sia all'inizio dello script, altrimenti la modalità script non verrà abilitata.

<<<<<<< HEAD
Qui non si attiva la modalità strict:
=======
````warn header="Ensure that \"use strict\" is at the top"
Please make sure that `"use strict"` is at the top of your scripts, otherwise strict mode may not be enabled.

Strict mode isn't enabled here:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

```js no-strict
alert("some code");
// "use strict" below is ignored--it must be at the top

"use strict";

// strict mode is not activated
```

Solo i commenti possono apparire prima di `"use strict"`.
````

<<<<<<< HEAD
```warn header="Non c'e nessun modo per annullare `use strict`"
Non esiste nessuna direttiva `"no use strict"` o simile, che possa riportare lo script alla vecchia modalità.

Una volta abilitata la modalità strict, non c'e ritorno.
=======
```warn header="There's no way to cancel `use strict`"
There is no directive like `"no use strict"` that reverts the engine to old behavior.

Once we enter strict mode, there's no return.
```

## Browser console

For the future, when you use a browser console to test features, please note that it doesn't `use strict` by default.

Sometimes, when `use strict` makes a difference, you'll get incorrect results.

Even if we press `key:Shift+Enter` to input multiple lines, and put `use strict` on top, it doesn't work. That's because of how the console executes the code internally.

The reliable way to ensure `use strict` would be to input the code into console like this:

```js
(function() {
  'use strict';

  // ...your code...
})()
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847
```

## Usare sempre "use strict"

<<<<<<< HEAD
Le differenze tra `"use strict"` contro la modalità di "default" non è ancora stata spiegata.

Nel prossimo capitolo, mentre impareremo le caratteristiche del linguaggio, terremo d'occhio anche le differenze tra la modalità strict e quella di default. Fortunatamente non sono molte. E senza dubbio renderanno migliore la scrittura del codice.

A questo punto è sufficiente sapere le regole generali:

1. L'utilizzo della direttiva `"use strict"` cambia la modalità del motore JavaScript al il metodo moderno, cambiando i comportamenti di alcune caratteristiche integrate. Vedremo meglio i dettagli man mano che studiamo.
2. La modalità strict viene abilitata tramite l'istruzione `"use strict"` posta all'inizio. In ogni caso ci sono alcune caratteristiche del linguaggio come "classi" e "moduli" che attivano la modalità strict in automatico.
3. La modalità strict è supportata da tutti i moderni browser.
4. E' sempre raccomandato iniziare lo script con `"use strict"`. Tutti gli esempi del tutorial assumo che esso sia attivo, tranne in alcuni esempi(veramente pochi) in cui verrà specificato esplicitamente.
=======
We have yet to cover the differences between strict mode and the "default" mode.

In the next chapters, as we learn language features, we'll note the differences between the strict and default modes. Luckily, there aren't many and they actually make our lives better.

For now, it's enough to know about it in general:

1. The `"use strict"` directive switches the engine to the "modern" mode, changing the behavior of some built-in features. We'll see the details later in the tutorial.
2. Strict mode is enabled by placing `"use strict"` at the top of a script or function. Several language features, like "classes" and "modules", enable strict mode automatically.
3. Strict mode is supported by all modern browsers.
4. We recommended always starting scripts with `"use strict"`. All examples in this tutorial assume strict mode unless (very rarely) specified otherwise.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847
