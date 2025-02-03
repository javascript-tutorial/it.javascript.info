# Bubbling e capturing

Cominciamo con un esempio.

Questo gestore è assegnato al `<div>`, ma viene eseguito anche se clicchiamo qualunque tag come ad esempio `<em>` oppure `<code>`:

```html autorun height=60
<div onclick="alert('The handler!')">
  <em>If you click on <code>EM</code>, the handler on <code>DIV</code> runs.</em>
</div>
```

Non è un po' strano? Perché il gestore su `<div>` viene eseguito se il click è su `<em>`?

## Bubbling

Il principio alla base del *bubbling* è semplice.

**Quando viene innescato un evento su un elemento, come prima cosa vengono eseguiti i gestori ad esso assegnati, poi ai nodi genitori, ed infine risale fino agli altri nodi antenati.**

Poniamo il caso di avere 3 elementi annidati `FORM > DIV > P` con un gestore per ognuno di essi:

```html run autorun
<style>
  body * {
    margin: 10px;
    border: 1px solid blue;
  }
</style>

<form onclick="alert('form')">FORM
  <div onclick="alert('div')">DIV
    <p onclick="alert('p')">P</p>
  </div>
</form>
```

Un click sul `<p>` interno innescherà `onclick`:
1. Su questo `<p>`.
2. Sul `<div>` esterno.
3. Ed infine sul `<form>`.
4. E così via fino a risalire fino all'oggetto `document`.

![](event-order-bubbling.svg)

Quindi se clicchiamo su `<p>`, vedremo 3 alerts: `p` -> `div` -> `form`.

Il processo viene soprannominato "bubbling", perché gli eventi si comportano come delle "bolle": dall'elemento interno vanno risalendo sempre più in alto, attraversando gli elementi genitori, come farebbe una bolla d'aria nell'acqua.

```warn header="*Quasi* tutti gli eventi sono soggetti al bubbling."
La parola chiave in questa frase è "quasi".

L'evento `focus`, per esempio, non è tra questi. Ci sono anche altri esempi, che incontreremo. Ma ancora una volta è un'eccezione, piuttosto che una regola, in quanto la maggior parte degli eventi sono soggetti al *bubbling*.
```

## event.target

Un gestore su un elemento genitore può sempre ottenere i dettagli relativi all'elemento che ha innescato l'evento.

**L'elemento annidato più in profondità che ha innescato l'evento viene chiamato elemento *target*, accessibile come `event.target`.**

Notare le differenze rispetto a `this` (=`event.currentTarget`):

- `event.target` -- è l'elemento "target" che ha innescato l'evento, ed esso non cambia durante il processo di *bubbling*. 
- `this` -- è l'elemento attuale, quello che sta eseguendo l'handler su di esso.

Per esempio, se abbiamo un gestore singolo `form.onclick`, esso è in grado di "catturare" tutti i click dentro il form. Non importa dove sia avvenuto il click, risalirà fino al `<form>` ed eseguirà il gestore.

Nel gestore `form.onclick`:

- `this` (=`event.currentTarget`) è l'elemento `<form>`, perché il gestore è in esecuzione su di esso.
- `event.target` è l'elemento all'interno del form che è stato cliccato.

Proviamolo:

[codetabs height=220 src="bubble-target"]

È possibile che `event.target` equivalga a `this` -- succede quando si clicca direttamente sull'elemento `<form>`.

## Interrompere il bubbling

Un evento di bubbling va dall'elemento target verso l'alto, normalmente fino al tag `<html>`, poi fino all'oggetto `document`. Alcuni eventi arrivano ad incontrare l'oggetto `window`, chiamando tutti i gestori lungo il suo cammino.

Ogni gestore può decidere che quell'evento è stato completamente processato ed interrompere il *bubbling*.

Il metodo per fare ciò è `event.stopPropagation()`.

Per esempio, qui `body.onclick` non funziona se clicchiamo su `<button>`:

```html run autorun height=60
<body onclick="alert(`il bubbling non arriva fino a qui`)">
  <button onclick="event.stopPropagation()">Cliccami</button>
</body>
```

```smart header="event.stopImmediatePropagation()"
Se un elemento ha gestori multipli su un singolo elemento, allora se uno di questi interrompe il *bubbling*, gli altri continuano ad essere eseguiti.

In altri termini, `event.stopPropagation()` interrompe il *bubbling* da lì in poi, ma tutti gli altri gestori assegnati all'elemento corrente verranno eseguiti.

Per interrompere il *bubbling* ed evitare di eseguire i gestori sull'elemento attuale, c'è il metodo `event.stopImmediatePropagation()`. Dopo di esso non verrà eseguito nessun altro gestore.
```

```warn header="Non interrompere il *bubbling* senza una necessità!"
Il *bubbling* è conveniente. Non interromperlo senza una reale necessità: è ovvio ed architetturalmente ben congegnato.

Talvolta `event.stopPropagation()` nasconde piccole insidie che successivamente possono diventare problemi.

Ad esempio:

1. Creiamo un menù annidato. Ogni sottomenù gestisce i click nei suoi elementi e chiama `stopPropagation` in modo che gli altri menù non inneschino eventi.
2. Successivamente decidiamo di catturare i click nell'intera finestra, per tenere traccia dei comportamenti dell'utente (dove gli utenti cliccano). Alcuni sistemi analitici lo fanno. Solitamente il codice usa `document.addEventListener('click'…)` per catturare tutti i click.
3. I nostri sistemi analitici non funzioneranno laddove i click vengano interrotti da`stopPropagation`. E, purtroppo, avremo delle "zone morte".

In genere non ci sono reali necessità di interrompere il *bubbling*. Un problema che apparentemente lo richiede,   può essere spesso risolto in altre maniere. Una di queste è quella di usare eventi personalizzati, di cui ci occuperemo più avanti. Possiamo anche scrivere i nostri dati dentro l'oggetto `event` in un gestore, e poi farli leggere da un altro, in questo modo possiamo passare ai gestori dei nodi genitori informazioni sui processi che avvengono più in basso.
```


## Capturing

C'è un'altra fase nell'elaborazione degli eventi, chiamata "capturing". Viene usata raramente nel codice, ma talvolta può essere utile.

<<<<<<< HEAD
Lo standard [DOM Events](http://www.w3.org/TR/DOM-Level-3-Events/) descrive 3 fasi nella propagazione dell'evento:
=======
The standard [DOM Events](https://www.w3.org/TR/DOM-Level-3-Events/) describes 3 phases of event propagation:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

1. Fase capturing -- l'evento va sull'elemento.
2. Fase target -- l'evento ha raggiunto l'elemento target.
3. Fase bubbling -- l'evento risale su dall'elemento.

<<<<<<< HEAD
Ecco la figura estratta dalle specifiche, di un click su un `<td>` dentro una tabella:
=======
Here's the picture, taken from the specification, of the capturing `(1)`, target `(2)` and bubbling `(3)` phases for a click event on a `<td>` inside a table:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

![](eventflow.svg)

Ossia: per un click su `<td>` l'evento prima attraversa la catena degli antenati e scende giù fino all'elemento (fase *capturing*), dopodiché raggiunge il target ed è lì che viene innescato (fase *target*), ed infine risale su (fase di *bubbling*) chiamando i gestori lungo il suo cammino.

<<<<<<< HEAD
**Prima abbiamo accennato solo al *bubbling*, in quanto la fase *capturing* è usata raramente. Normalmente è assolutamente trasparente.**

I gestori aggiunti usando le proprietà `on<event>` o tramite gli attributi HTML o usando solo due argomenti in `addEventListener(event, handler)` non sanno nulla della fase di *capturing*, ma verranno coinvolti solo nella seconda e terza fase.
=======
Until now, we only talked about bubbling, because the capturing phase is rarely used.

In fact, the capturing phase was invisible for us, because handlers added using `on<event>`-property or using HTML attributes or using two-argument `addEventListener(event, handler)` don't know anything about capturing, they only run on the 2nd and 3rd phases.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Per catturare un evento in questa fase, abbiamo bisogno di impostare l'opzione `capture` a `true` nel gestore:

```js
elem.addEventListener(..., {capture: true})
<<<<<<< HEAD
// oppure solamente "true" che è un alias per {capture: true}
=======

// or, just "true" is an alias to {capture: true}
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
elem.addEventListener(..., true)
```

Ci sono due possibili valori dell'opzione `capture`:

- Se `false` (valore predefinito), il gestore è impostato nella fase di *bubbling*.
- Se `true`, il gestore è impostato nella fase di *capturing*.


Notare che mentre formalmente esistono 3 fasi, la seconda fase ("fase target": l'evento ha raggiunto l'elemento) non viene gestita separatamente: i gestori, sia nella fase di *capturing* che nella fase di *bubbling* innescano in questa fase.

Vediamo le fasi di *capturing* e di *bubbling* in azione:

```html run autorun height=140 edit
<style>
  body * {
    margin: 10px;
    border: 1px solid blue;
  }
</style>

<form>FORM
  <div>DIV
    <p>P</p>
  </div>
</form>

<script>
  for(let elem of document.querySelectorAll('*')) {
    elem.addEventListener("click", e => alert(`Capturing: ${elem.tagName}`), true);
    elem.addEventListener("click", e => alert(`Bubbling: ${elem.tagName}`));
  }
</script>
```

Il codice imposta i gestori di click per *ogni*  elemento nel documento per vedere quali sono in azione.

Se clicchiamo su `<p>`, la sequenza sarà:

<<<<<<< HEAD
1. `HTML` -> `BODY` -> `FORM` -> `DIV` (fase di *capturing*, il primo listener):
2. `P` (fase target, viene innescata due volte, dato che abbiamo impostato due listener: *capturing* e *bubbling*)
3. `DIV` -> `FORM` -> `BODY` -> `HTML` (fase *bubbling*, il secondo listener).
=======
1. `HTML` -> `BODY` -> `FORM` -> `DIV -> P` (capturing phase, the first listener):
2. `P` -> `DIV` -> `FORM` -> `BODY` -> `HTML` (bubbling phase, the second listener).

Please note, the `P` shows up twice, because we've set two listeners: capturing and bubbling. The target triggers at the end of the first and at the beginning of the second phase.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

La proprietà `event.eventPhase` restituisce il numero della fase in cui l'evento è stato catturato, ma viene usata raramente, dato che possiamo dedurla dal gestore.

```smart header="Per rimuovere un gestore, `removeEventListener` ha bisogno della stessa fase"
Se abbiamo assegnato l'evento con `addEventListener(..., true)`, allora siamo obbligati a fare menzione della stessa fase in `removeEventListener(..., true)` per rimuovere l'handler con successo.
```

<<<<<<< HEAD
````smart header="A parità di elemento e fase, i listeners verranno eseguiti secondo l'ordine di assegnazione"
Nel caso in cui avessimo più gestori assegnati alla stessa fase, assegnati allo stesso evento, tramite `addEventListener`, verranno eseguiti secondo l'ordine di creazione:
=======
````smart header="Listeners on the same element and same phase run in their set order"
If we have multiple event handlers on the same phase, assigned to the same element with `addEventListener`, they run in the same order as they are created:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
elem.addEventListener("click", e => alert(1)); // vi è garanzia che venga eseguito prima
elem.addEventListener("click", e => alert(2));
```
````

```smart header="The `event.stopPropagation()` during the capturing also prevents the bubbling"
The `event.stopPropagation()` method and its sibling `event.stopImmediatePropagation()` can also be called on the capturing phase. Then not only the futher capturing is stopped, but the bubbling as well.

In other words, normally the event goes first down ("capturing") and then up ("bubbling"). But if `event.stopPropagation()` is called during the capturing phase, then the event travel stops, no bubbling will occur.
```


## Riepilogo

Quando viene scatenato un evento, l'elemento più annidato viene etichettato come "elemento target" (`event.target`).

- Quindi l'evento si sposta in giù dalla *root* del documento fino all'`event.target`, chiamando gli eventi assegnati con `addEventListener(..., true)` lungo il suo cammino (`true` è una scorciatoia per `{capture: true}`).
- Dopodiché vengono chiamati i gestori assegnati all'elemento stesso.
- Quindi gli eventi risalgono verso l'alto dall'`event.target` alla *root*, chiamando i gestori assegnati tramite `on<event>`, gli attributi HTML oppure `addEventListener` privo però del terzo parametro `false/{capture:false}`.

Ogni handler accede alle proprietà dell'oggetto `event`:

- `event.target` -- L'elemento più interno che ha generato l'evento.
- `event.currentTarget` (=`this`) -- l'elemento che sta attualmente gestendo l'evento (quello che ha il gestore su di esso)
- `event.eventPhase` -- la fase corrente (capturing=1, target=2, bubbling=3).

Qualunque gestore può interrompere la propagazione dell'evento chiamando `event.stopPropagation()`, ma non è raccomandabile, in quanto non possiamo essere del tutto sicuri che non ne abbiamo bisogno ai livelli superiori, magari per questioni del tutto differenti.

<<<<<<< HEAD
La fase di *capturing* viene usata molto raramente, solitamente gestiamo gli eventi nella fase di *bubbling*. Ed in questo c'è una logica.
=======
The capturing phase is used very rarely, usually we handle events on bubbling. And there's a logical explanation for that.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Nel mondo reale, quando avviene un incidente, prima intervengono le autorità locali. Loro conoscono meglio il posto dove è avvenuto. Quindi intervengono e autorità di alto livello in caso di necessità. 

Per gli eventi è lo stesso. Il codice che assegna il gestore su un particolare elemento ha il massimo livello di dettagli dell'elemento e di cosa fa. Un gestore su un particolare `<td>` può essere adattato perfettamente per quel `<td>`, sa tutto su di esso, quindi dovrebbe avere la prima possibilità. Dopodiché i nodi immediatamente superiori conoscono il contesto, anche se un po' meno, e così via fino ad arrivare al nodo di più alto livello che gestisce concetti generali e che quindi viene eseguito per ultimo.

Bubbling e Capturing gettano le basi per il concetto di "event delegation" un pattern di gestione degli eventi estremamente potente, che studieremo nel prossimo capitolo.
