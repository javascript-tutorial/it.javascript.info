# Azioni predefinite del browser

Molti eventi vengono emessi al verificarsi di determinate azioni del browser.

Per esempio:

- Un click su un link - inizializza la navigazione verso il suo URL.
- Un click su un pulsante di invio di un form - inizializza l'invio dello stesso al server.
- Premendo il pulsante del mouse e spostandoci su un testo - lo si seleziona.

Quando gestiamo un evento con JavaScript, potremmo non volere che la corrispondente azione del browser avvenga, vorremmo invece implementare un altro comportamento.

## Prevenire le azioni del browser

Ci sono due modi per comunicare al browser che non vogliamo che esegua l'azione predefinita:

- Il più comune è quello di usare il metodo `event.preventDefault()`, incluso nell'oggetto `event`.
- Se il gestore viene assegnato tramite `on<event>` (e non tramite `addEventListener`), allora restituire `false` sortirà lo stesso effetto.

<<<<<<< HEAD
In questo HTML un click su un link non innescherà la navigazione verso l'URL, e di fatto il browser non farà nulla:
=======
In this HTML, a click on a link doesn't lead to navigation; the browser doesn't do anything:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```html autorun height=60 no-beautify
<a href="/" onclick="return false">Clicca qui</a>
o
<a href="/" onclick="event.preventDefault()">qui</a>
```

Nel prossimo esempio useremo questa tecnica per creare un menù potenziato tramite JavaScript.

```warn header="Restituire `false` da un gestore è un'eccezione"
Il valore restituito da un gestore di eventi solitamente viene ignorato.

L'unica eccezione è il `return false` di un gestore assegnato con l'uso di `on<event>`.

In tutti gli altri casi, il valore del `return` viene ignorato. Nello specifico, non ha alcun senso restituire `true`.
```

### Esempio: il menù

Consideriamo un menù di questo tipo:

```html
<ul id="menu" class="menu">
  <li><a href="/html">HTML</a></li>
  <li><a href="/javascript">JavaScript</a></li>
  <li><a href="/css">CSS</a></li>
</ul>
```

Ecco come appare applicando qualche stile CSS:

[iframe height=70 src="menu" link edit]

Gli elementi del menù sono implementati come links HTML `<a>`, e non come pulsanti `<button>`. Ci sono tante ragioni per fare ciò, per esempio:

- A molte persone piace usare "tasto destro" -- "apri in una nuova finestra". Se usassimo `<button>` oppure `<span>`, questa funzionalità non potrebbe essere usata.
- I motori di ricerca seguono i link `<a href="...">` nel processo di indicizzazione.

Questo è il motivo per cui usiamo `<a>` nel markup. Ma dato che normalmente intendiamo gestire i click tramite JavaScript, dovremo prevenire le azioni predefinite del browser.

Come in questo caso:

```js
menu.onclick = function(event) {
  if (event.target.nodeName != 'A') return;

  let href = event.target.getAttribute('href');
  alert( href ); // ...possono derivare dai dati scaricati dal server, dalla generazione della UI, etc. 

*!*
  return false; // previene l'azione del browser (non reindirizza verso l'URL)
*/!*
};
```

Se omettessimo `return false`, subito dopo l'esecuzione del nostro codice, il browser compirebbe la sua "azione predefinita" -- navigando quindi verso l'URL impostato nell'`href`. E non è ciò che vogliamo, dal momento che stiamo gestendo noi stessi il click.

A proposito, qui l'utilizzo dell'event delegation rende il nostro menù molto flessibile. Possiamo aggiungere liste annidate e stilizzarle usando i CSS per farle "scendere a mo' di tendina".

````smart header="Eventi a seguire"
Certi eventi scorrono in una sola direzione. Se preveniamo il primo evento, quello seguente (conseguentemente correlato) non ci sarà.

Ad esempio, il `mousedown` su un campo `<input>` porta al focus su di esso, e a seguire all'evento `focus`. Se preveniamo l'evento `mousedown`, il focus non ci sarà.

Proviamo a cliccare sul primo `<input>` -- verrà innescato l'evento `focus`. Cliccando una seconda volta, no.

```html run autorun
<input value="Il focus funziona" onfocus="this.value=''">
<input *!*onmousedown="return false"*/!* onfocus="this.value=''" value="Cliccami">
```

Questo perché l'azione del browser viene annullata sul `mousedown`. Il focus sarà ancora possibile se usiamo un altro modo per entrare nell'input. Ad esempio con il tasto `key:Tab` per spostasi dal primo input al secondo. Ma non più con il click del mouse.
````

## L'opzione "passive" del gestore

L'opzione facoltativa `passive: true` di `addEventListener` segnala al browser che il gestore non chiamerà `preventDefault()`.

<<<<<<< HEAD
Perché dovrebbe essere necessaria una cosa del genere?
=======
Why might that be needed?
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ci sono alcuni eventi come `touchmove` su dispositivi *mobile* (quando l'utente sposta le dita lungo lo schermo), che di default causerebbero lo scrolling, ma ciò può essere evitato con `preventDefault()` sul gestore.

E così quando il browser rileva questo evento, prima elabora tutti i vari gestori, ed infine, solo nel caso in cui `preventDefault` non sia stato chiamato da nessuno dei gestori, procede con lo scrolling. Questa cosa potrebbe causare dei ritardi non voluti o dei "jitters" a video sulla UI.

L'opzione `passive: true` comunica al browser che il gestore non annullerà lo scrolling e il browser scrollerà la pagina immediatamente fornendo un'esperienza con la massima fluidità, con gli eventi che verranno gestiti all'occorrenza.

Per alcuni browser (Firefox, Chrome), `passive` è impostato a `true` di default per gli eventi `touchstart` e `touchmove`.


## event.defaultPrevented

La proprietà `event.defaultPrevented` sarà `true` se l'azione predefinita sarà stata prevenuta, altrimenti sarà `false`.

Relativamente a questo, c'è un caso d'uso interessante.

Ricordate nel capitolo <info:bubbling-and-capturing> quando abbiamo discusso di `event.stopPropagation()` e del perché interrompere il bubbling fosse una cattiva idea?

Qualche volta, possiamo usare `event.defaultPrevented`, per avvisare gli altri gestori che l'evento è stato gestito.

Vediamo un esempio pratico.

Di default il browser, nell'evento `contextmenu` (tasto destro del mouse) mostra il menù contestuale con le opzioni standard. Possiamo prevenirlo e mostrare il nostro, come in questo esempio:

```html autorun height=50 no-beautify run
<button>Il click sul tasto destro mostra il menù contestuale</button>

<button *!*oncontextmenu="alert('Mostra il nostro menu'); return false"*/!*>
  Il click sul tasto destro mostra il nostro menù contestuale
</button>
```

Adesso, in aggiunta a questo menù, ci piacerebbe implementare un menù contestuale sul *documento*.

Al click sul tasto destro, dovrebbe comparire il relativo menù contestuale.

```html autorun height=80 no-beautify run
<p>Click sul tasto destro per il menù contestuale del documento</p>
<button id="elem">Clicca qui col tasto destro per il menu contestuale del pulsante</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Menu contestuale del pulsante");
  };

  document.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Menu contestuale del documento");
  };
</script>
```

Il problema è che così facendo, cliccando su `elem`, otterremmo due menù: quello del pulsante (l'evento va risalendo per via del bubbling) e quello del documento.

Come possiamo evitarlo? Una delle soluzioni è fare questo ragionamento: "Quando gestiamo il click sul tasto destro nel gestore del pulsante, interrompiamo il bubbling" e usiamo `event.stopPropagation()`:

```html autorun height=80 no-beautify run
<p>Click sul tasto destro per il documento</p>
<button id="elem">Click sul tasto destro per il menù del pulsante (sistemato con event.stopPropagation)</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
*!*
    event.stopPropagation();
*/!*
    alert("Menu contestuale del pulsante");
  };

  document.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Menu contestuale del documento");
  };
</script>
```

A questo punto il menù del pulsante funzionerà come previsto. Ma il prezzo sarà alto, perché a quel punto negheremo per sempre l'accesso alle informazioni relative ai click sul tasto destro, a qualunque altro codice esterno, inclusi contatori che raccolgono statistiche e così via. Ed è una cosa poco saggia.

Una soluzione alternativa potrebbe essere quella di controllare nel gestore del `document` se l'azione predefinita sia stata prevenuta. Se così fosse, significherebbe che l'evento è stato gestito, e quindi non sarà necessario gestirlo nuovamente.


```html autorun height=80 no-beautify run
<p>Click sul tasto destro per il menu del documento (aggiunto un controllo per event.defaultPrevented)</p>
<button id="elem">Click sul tasto destro per il menù del pulsante</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Menu contestuale del pulsante");
  };

  document.oncontextmenu = function(event) {
*!*
    if (event.defaultPrevented) return;
*/!*

    event.preventDefault();
    alert("Menu contestuale del documento");
  };
</script>
```

Ora funziona tutto correttamente. Se abbiamo elementi annidati, ed ognuno di essi ha un suo menù contestuale, funzionerà anche questo. Dobbiamo solo assicurarci di controllare `event.defaultPrevented` in ogni gestore di `contextmenu`.

```smart header="event.stopPropagation() and event.preventDefault()"
Come possiamo chiaramente notare, `event.stopPropagation()` ed `event.preventDefault()` (conosciuto anche come `return false`) sono due cose diverse. Non sono relazionate tra loro.
```

```smart header="Architettura dei menù contestuali annidati"
Ci sono pure dei modi alternativi per implementare i menù contestuali annidati. Uno di questi è quello di avere un singolo oggetto globale con un solo gestore per `document.oncontextmenu`, e metodi che ci permettono di gestire altri gestori al suo interno.

L'oggetto catturerà ogni click sul tasto destro, controllando tra i suoi gestori ed eseguire quello appropriato.

Ma in questo caso ogni pezzo di codice che vuole implementare un menù contestuale, dovrebbe conoscere l'esistenza di questo oggetto e del suo supporto, invece di avere il proprio gestore per `contextmenu`.
```

## Riepilogo

Ci sono tante azioni predefinite del browser:

- `mousedown` -- comincia una selezione (spostare il mouse per continuare a selezionare).
- `click` su `<input type="checkbox">` -- check/uncheck sull'`input`.
- `submit` -- cliccando su `<input type="submit">` o premendo su `key:Enter` dentro un campo del form, scatena questo evento, ed il browser invia il form subito dopo.
- `keydown` -- premendo un tasto può portare ad aggiungere un carattere dentro un campo, o altre azioni.
- `contextmenu` -- viene scatenato al click sul tasto destro, e l'azione che ne deriva è quella di mostrare il menù contestuale del browser.
- ...e molti altri...

Tutte le azione predefinite possono essere prevenute se vogliamo gestire gli eventi esclusivamente tramite JavaScript.

Per prevenire un'azione predefinita -- si possono usare `event.preventDefault()` oppure  `return false`. Il secondo metodo è valido solo con gestori assegnati con `on<event>`.

L'opzione `passive: true` di  `addEventListener` comunica al browser che l'azione non sarà prevenuta. La sua utilità si palesa per eventi su dispositivi mobiles, come ad esempio `touchstart` e `touchmove`, per comunicare al browser che non deve attendere l'esecuzione di tutti i gestori prima di effettuare lo scrolling.

Se l'azione predefinita è stata prevenuta, il valore di `event.defaultPrevented` diventa `true`, altrimenti è `false`.

```warn header="Aderire alla semantica, non farne abuso"
Tecnicamente, prevenendo le azioni predefinite del browser e aggiungendo JavaScript, possiamo personalizzare il comportamento di qualunque elemento. Per esempio, possiamo fare in modo che un link `<a>` si comporti come un  pulsante, e un pulsante `<button>` come un link (redirezione su un altro URL o cose del genere).

Generalmente però, dovremmo mantenere il significato semantico degli elementi HTML. Per esempio, `<a>` dovrebbe comportare una navigazione, e non essere un pulsante.

Non è "solamente una cosa buona", ciò rende l'HTML migliore in termini di accessibilità.

Inoltre se consideriamo l'esempio con `<a>`, notiamo bene che: un browser ci permette di default di aprire questi links in una nuova finestra (cliccando sul tasto destro e con altri mezzi). E agli utenti questo piace. Ma se invece creiamo un pulsante, che si comporta come se fosse un link usando JavaScript, e che appaia come se fosse un link con l'ausilio dei CSS, le funzionalità del browser, che specificatamente dedicate agli elementi `<a>`, non funzioneranno per il pulsante.
```
