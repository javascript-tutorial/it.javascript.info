# Le tecniche moderne, "use strict"

Per molto tempo JavaScript si è evoluto senza problemi di compatibilità. Nuove funzionalità venivano aggiunte al linguaggio, ma quelle vecchie non cambiavano.

Questo ha consentito al vecchio codice di non diventare obsoleto. Ma lo svantaggio è stato che cosi facendo gli errori e le decisioni imperfette fatte dai creatori di JavaScript, rimarranno nel linguaggio per sempre.

Cosi è stato fino al 2009 quando è apparsa ECMAScript 5 (ES5). Ha aggiungo nuove funzionalità al linguaggio e ne ha modificate alcune già esistenti. Per far si che il vecchio codice continui a funzionare, molte modifiche vengono disattivate di default. Diventa quindi necessario abilitarle esplicitamente con la direttiva `"use strict"`.

## "use strict"

La direttiva è simile ad una stringa: `"use strict"` o `'use strict'`. Quando viene inserita all'inizio dello script, da quel momento l'intero script funziona nello stile "moderno".

Per esempio:

```js
"use strict";

// questo codice viene eseguito secondo gli standard moderni
...
```

Impareremo presto le funzioni (un modo per raggruppare le istruzioni).

Guardando avanti, notiamo che `"use strict"` può essere applicato all'inizio di una funzione (la maggior parte) piuttosto che all'intero script. La modalità strict sarà quindi attiva solo all'interno di quella funzione. Solitamente si utilizza nell'intero script.

````warn header="Assicurati che \"use strict\" sia all'inizio"
Assicurati `"use strict"` sia all'inizio dello script, altrimenti la modalità script non verrà abilitata.

Qui vediamo un esempio in cui non verrà attivata la modalità strict:

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

Una volta abilitata la modalità strict, non c'e ritorno.
```

## Browser console

In futuro, quando utilizzerete la console integrata in un browser, dovete tenere a mente che di default non vale `use strict`.

In certe situazioni, `use strict` fa veramente la differenza, quindi potreste ottenere dei risultati indesiderati.

Potete provare con `key:Shift+Enter` per inserire più righe di codice, con `use strict` in cima, come nell'esempio:

```js
'use strict'; <Shift+Enter for a newline>
//  ...your code
<Enter to run>
```

Funziona nella maggior parte dei browser, tra cui Firefox e Chrome.

Nel caso in cui non funzioni, la miglior strada da seguire è quella di assicurarsi che `use strict` venga inserito, in questo modo:

```js
"use strict";

// codice
...
```


## Dovremmo utilizzare "use strict"?

Può sembrare una domanda ovvia, ma non lo è.

Potrebbero consigliarvi di iniziare tutti gli script con `"use strict"`... Ma sapete cosa c'è di bello?

JavaScript moderno supporta le "classi" e  i "moduli" - delle strutture avanzate del linguaggio (a cui arriveremo più avanti), che abilitano `use strict` in automatico. Quindi non è necessario inserire la direttiva `"use strict"` se utilizziamo queste funzionalità.

**Quindi, per ora `"use strict";` è un ospite ben accetto nei vostri script. Più avanti, quando il vostro codice sarà suddiviso in classi e moduli, potrete ometterlo.**

Al momento, è sufficenete una conoscenza generica di `use strict`.

Nei prossimi capitoli, quando impareremo nuove funzionalità del linguaggio, vedremo più nel dettaglio le differenze tra la "strict mode" e la "vecchia modalità". Fortunatamente, non sono molte e sono anche molto utili.

Tutti gli esempi in questo tutorial assumono che la "strict mode" sia attiva, tranne in alcuni rarissimi casi (in cui sarà specificato).
