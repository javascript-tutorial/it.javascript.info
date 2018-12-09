# Le tecniche moderne, "use strict"

Per molto tempo JavaScript si è evoluto senza problemi di compatibilità. Nuove funzioanlità venivano aggiunte al linguaggio, ma quelle vecchie non cambiavano.

Questo ha consentio al vecchio codice di non diventare obsoleto. Ma lo svantaggio è stato che cosi facendo gli errori e le decisioni imperefette fatte dai creatori di JavaScript, rimarranno nel linguaggio per sempre.

Cosi è statto fino al 2009 quando è apparsa ECMAScript 5 (ES5). Ha aggiungo nuove funzionalità al linguaggio e ne ha modificate alcune già esistenti. Per far si che il vecchio codice continui a funzionare, molte modifiche vengono disattivate di default. Diventa quindi necessario abilitarle espilicitamente con la direttiva `"use strict"`.

## "use strict"

La direttiva è simile ad una stringa: `"use strict"` o `'use strict'`. Quando viene inserita all'inizio dello script, da quel momennto l'intero script funziona nello stile "moderno".

Per esempio:

```js
"use strict";

// this code works the modern way
...
```

Impareremo presto le funzioni(un modo per raggruppare le istruzioni).

Guardando avanti, notiamo che `"use strict"` può essere applicato all'inizio di una funzione(la maggior parte) piuttosto che all'intero script. La modalità strict sarà quindi attiva solo all'interno di quella funzione. Solitamente si utilizza nell'intero script.

````warn header="Assicurati che \"use strict\" sia all'inizio"
Assicurati `"use strict"` sia all'inizio dello script, altrimenti la modalità script non verra abilitata.

Qui non ai attiva la modalità strict:

```js no-strict
alert("some code");
// "use strict" below is ignored, must be on the top

"use strict";

// strict mode is not activated
```

Solo i commenti possono apparire prima di `"use strict"`.
````

```warn header="Non c'e nessun modo per annullare `use strict`"
Non esiste nessuna direttiva `"no use strict"` o simile, che possa ripotare lo script alla vecchia modalità.

Una volta abilitata la modalità strict, non c'e ritorno.
```

## Usare sempre "use strict"

Le differenze tra `"use strict"` contro la modalità di "default" non è ancora stata spiegata.

Nel prossimo capitolo, mentre impareremo le caratteristiche del linguaggio, terremo d'occhio anche le differenze tra la modalità strict e quella di default. Fortunatamente non sono molte. E senza dubbio renderanno migliore la scrittura del codice.

A questo punto è sufficiente sapere le regole generali:

1. L'utilizzo della direttiva `"use strict"` cambia la modalità del motore JavaScript al il metodo moderno, cambiando i comportamenti di alcune caratteristiche integrate. Vedremo meglio i dettagli man mano che studiamo.
2. La modalità strict viene abilitata tramite l'istruzione `"use strict"` posta all'inizio. In ogni caso ci sono alcune caratteristiche del linguaggio come "classi" e "moduli" che attivano la modalità strict in automatico.
3. La modalità strict è supportata da tutti i moderni browser.
4. E' sempre raccomandato iniziare lo script con `"use strict"`. Tutti gli esempi del tutorail assumo che esso sia attivo, tranne in alcuni esempi(veramente pochi) in cui verra specificato esplicitamente.
