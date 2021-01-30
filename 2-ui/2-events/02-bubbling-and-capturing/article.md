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
La parole chiave è in questa frase è "quasi".

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

Un evento risale dall'elemento target risalendo direttamente verso l'alto. Normalmente fino al tag `<html>`, poi fino all'oggetto `document`, ed alcuni eventi arrivano ad incontrare la `window`, chiamando tutti i gestori lungo il suo cammino.

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

In altri termini, `event.stopPropagation()` interrompe il *bubbling* da lì in poi, ma sull'elemento attuale tutti gli altri gestori verranno eseguiti.

Per interrompere il *bubbling* ed evitare di eseguire i gestori sull'elemento attuale, c'è il metodo `event.stopImmediatePropagation()`. Dopo di esso non verrà eseguito nessun altro gestore.
```

```warn header="Non interrompere il *bubbling* senza una necessità!"
Il *bubbling* è conveniente. Non interromperlo senza una reale necessità: è ovvio ed architetturalmente ben congegnato.

Talvolta `event.stopPropagation()` genera piccole trappole che successivamente possono diventare problemi.

Ad esempio:

1. Creiamo un menù annidato. Ogni sottomenù gestisce i click nei suoi elementi e chiama `stopPropagation` in modo che gli altri menù non inneschino eventi.
2. Successivamente decidiamo di catturare i click nell'intera finestra, per tenere traccia dei comportamenti dell'utente (dove gli utenti cliccano). Alcuni sistemi analitici lo fanno. Solitamente il codice usa `document.addEventListener('click'…)` per catturare tutti i click.
3. I nostri sistemi analitici non funzioneranno laddove i click vengano interrotti da`stopPropagation`. E, purtroppo, avremo delle "zone morte".

In genere non ci sono reali necessità di interrompere il *bubbling*. Magari è un'attività che richiede visibilmente di essere risolta in altre maniere. Uno di questi è quello di usare eventi personalizzati, di cui ci occuperemo più avanti. Possiamo anche scrivere i nostri dati dentro l'oggetto `event` in un gestore, e poi farli leggere da un altro, in questo modo possiamo passare ai gestori dei nodi genitori informazioni sulle processi che avvengono più in basso.
```


## Capturing

Un'altra fase sul processamento degli eventi soprannominato "capturing". Viene usata raramente nel codice, ma talvolta può essere utile.

Lo standard [DOM Events](http://www.w3.org/TR/DOM-Level-3-Events/) descrive 3 fasi dei propagazione dell'evento:

1. Fase capturing -- l'evento va sull'elemento.
2. Fase target -- l'evento ha raggiunto l'elemento target.
3. Fase bubbling -- l'evento risale su dall'elemento.

Ecco la figura estratta dalle specifiche, di un click su un `<td>` dentro una tabella:

![](eventflow.svg)

Ossia: per un click su `<td>` l'evento prima attraversa la catena degli antenati e scende giù fino all'elemento (fase *capturing*), dopodiché raggiunge il target ed è lì che viene innescato (fase *target*), ed infine risale su (fase di *bubbling*) chiamando i gestori lungo il suo cammino.

**Prima abbiamo accennato solo al *bubbling*, in quanto la fase *capturing* è usata raramente. Normalmente è assolutamente trasparente.**

I gestori aggiunti usando le proprietà `on<event>` o tramite gli attributi HTML o usando solo due argomenti in `addEventListener(event, handler)` non sanno nulla della fase di *capturing*, ma verranno coinvolti solo nella seconda e terza fase.

Per catturare un evento in questa fase, abbiamo bisogno di impostare l'opzione `capture` a `true` nel gestore:

```js
elem.addEventListener(..., {capture: true})
// oppure solamente "true" che è un alias per {capture: true}
elem.addEventListener(..., true)
```

Ci sono due possibili valori dell'opzione `capture`:

- Se `false` (valore predefinito), il gestore è impostato nella fase di *bubbling*.
- Se `true`, il gestore è impostato nella fase di *capturing*.


Notare che mentre formalmente esistono 3 fasi, la seconda fase ("fase target": l'evento ha raggiunto l'elemento) non viene gestita separatamente: i gestori, sia nella fase di *capturing* che nella fase di *bubbling* innescano in questa fase.

Vediamo la fase di *capturing* e di *bubbling* in azione entrambi:

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

Il codice imposta i gestori in *ogni*  elemento nel documento per vedere quali che stanno funzionando.

Se clicchiamo su `<p>`, la sequenza sarà:

1. `HTML` -> `BODY` -> `FORM` -> `DIV` (fase di *capturing*, il primo listener):
2. `P` (fase target, viene innescata due volte, dato che abbiamo impostato due listener: *capturing* e *bubbling*)
3. `DIV` -> `FORM` -> `BODY` -> `HTML` (fase *bubbling*, il secondo listener).

La proprietà `event.eventPhase` restituisce il numero della fase in cui l'evento è stato catturato, ma viene usata raramente, dato che possiamo dedurla dal gestore.

```smart header="Per rimuovere un gestore, `removeEventListener` ha bisogno della stessa fase"
Se abbiamo assegnato l'evento con `addEventListener(..., true)`, allora siamo obbligati a fare menzione della stessa fase in `removeEventListener(..., true)` per rimuovere l'handler con successo.
```

````smart header="A parità di elemento e fase, i listeners verranno eseguiti secondo l'ordine di assegnazione"
Nel caso in cui avessimo più gestori assegnati alla stessa fase, assegnati allo stesso evento, tramite `addEventListener`, verranno eseguiti secondo l'ordine di creazione:

```js
elem.addEventListener("click", e => alert(1)); // vi è garanzia che venga eseguito prima
elem.addEventListener("click", e => alert(2));
```
````


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

La fase di *capturing* viene usata molto raramente, solitamente gestiamo gli eventi nella fase di *bubbling*. Ed in questo c'è una logica.

Nel mondo reale, quando avviene un incidente, prima intervengono le autorità locali. Loro conoscono meglio il posto dove è avvenuto. Quindi intervengono e autorità di alto livello in caso di necessità. 

Per gli eventi è lo stesso. Il codice che assegna il gestore su un particolare elemento ha il massimo livello di dettagli dell'elemento e cosa fa. Un gestore su un particolare `<td>` può essere adattato perfettamente per quel `<td>`, sa tutto su di esso, quindi dovrebbe avere la prima possibilità. Dopodiché i nodi immediatamente superiori conoscono il contesto, anche se un po' meno, e così via fino ad arrivare al nodo di più alto livello che gestisce concetti generali e che quindi viene eseguito per ultimo.

Bubbling e Capturing gettano le basi per il concetto di "event delegation" un pattern di gestione degli eventi estremamente potente, che studieremo nel prossimo capitolo.
