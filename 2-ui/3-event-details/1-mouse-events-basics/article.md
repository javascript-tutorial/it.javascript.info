<<<<<<< HEAD
# Eventi del mouse 
=======

# Mouse events
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

In questo capitolo andremo un po' più a fondo sugli eventi del mouse e le loro proprietà.

Nota bene: questi eventi potrebbero derivare non solo da "dispositivi mouse", ma anche da dispositivi di altro tipo, come telefoni e tablets, nei quali sono emulati per compatibilità.

## Tipi di eventi del mouse

Abbiamo visto precedentemente alcuni di questi eventi:

`mousedown/mouseup`
: Il pulsante del mouse viene premuto/rilasciato su un elemento.

`mouseover/mouseout`
: Il puntatore del mouse passa sopra/abbandona un elemento.

`mousemove`
: Ogni movimento del mouse su un elemento genera questo evento.

`click`
: Scaturito dopo l'evento `mousedown` e quindi `mouseup` sullo stesso elemento se viene usato il pulsante sinistro del mouse.

`dblclick`
: Generato quando avvengono due click sullo stesso elemento in un piccolo intervallo di tempo. Oggigiorno usato raramente.

`contextmenu`
: Scaturito quando viene premuto il pulsante destro del mouse. Ci sono altri modi per aprire un menù contestuale, per esempio usando un particolare tasto della tastiera, quindi viene generato anche in quest'ultimo caso e non è propriamente un evento del mouse.

...Ci sono tanti altri eventi, che affronteremo successivamente.

## Ordine degli eventi

Come possiamo notare dalla lista appena descritta, un'azione dell'utente può generare eventi multipli.

Per esempio, un click sul pulsante sinistro del mouse genera `mousedown`, quando il pulsante viene premuto, quindi `mouseup` e `click` quando viene rilasciato.

Quando un'azione singola inizia eventi multipli, il loro ordine è fisso. Ossia, i gestori vengono chiamati nell'ordine `mousedown` -> `mouseup` -> `click`.

```online
Premi il seguente pulsante e vedrai gli eventi. prova anche il doppio click.

<<<<<<< HEAD
Nel banco di prova in basso, vengono elencati tutti gli eventi del mouse, e se passa più di un secondo tra uno e l'altro vengono separati da una riga orizzontale.

Possiamo inoltre notare la proprietà `button` che permette di rilevare il pulsante del mouse, viene spiegato successivamente.
=======
On the teststand below, all mouse events are logged, and if there is more than a 1 second delay between them, they are separated by a horizontal rule.

Also, we can see the `button` property that allows us to detect the mouse button; it's explained below.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

<input onmousedown="return logMouse(event)" onmouseup="return logMouse(event)" onclick="return logMouse(event)" oncontextmenu="return logMouse(event)" ondblclick="return logMouse(event)" value="Cliccami con il pulsante destro o sinistro del mouse" type="button"> <input onclick="logClear('test')" value="Clear" type="button"> <form id="testform" name="testform"> <textarea style="font-size:12px;height:150px;width:360px;"></textarea></form>
```

## Pulsante del mouse

Gli eventi relativi al click contengono sempre la proprietà `button`, che permette di conoscere esattamente quale pulsante del mouse viene premuto.

Solitamente non lo usiamo per gli eventi `click` e `contextmenu`, perché il primo avviene solo per il click sul pulsante sinistro, ed il secondo -- solo per quelli sul tasto destro.

<<<<<<< HEAD
D'altra parte, i gestori `mousedown` e `mouseup` potrebbero necessitare di `event.button`, in quanto questi eventi vengono generati su qualunque pulsante, quindi `button` permette di discriminare tra "mousedown destro" e "mousedown sinistro".
=======
On the other hand, `mousedown` and `mouseup` handlers may need `event.button`, because these events trigger on any button, so `button` allows to distinguish between "right-mousedown" and "left-mousedown".
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

I valori possibili di `event.button` sono:

| Button state | `event.button` |
|--------------|----------------|
| Pulsante sinistro (principale) | 0 |
| Pulsante medio (ausiliario) | 1 |
| Pulsante destro (secondario) | 2 |
| Pulsante X1 (indietro) | 3 |
| Pulsante X2 (avanti) | 4 |

La maggioranza dei mouse hanno solo il tasto destro e sinistro, quindi i valori possibili sono `0` o `2`. Anche i dispositivi touch generano event simili al tocco.

Inoltre esiste la proprietà `event.buttons` che include tutti i pulsanti attualmente premuti, rappresentati come numero intero, una cifra per pulsante. In pratica questa proprietà viene usata raramente, ma si possono trovare i dettagli su [MDN](mdn:/api/MouseEvent/buttons) in caso di necessità.

```warn header="L'obsoleta `event.which`"
Codice più antiquato potrebbe fare uso della proprietà `event.which` che è un vecchio e non standard modo di ottenere informazioni sul pulsante, con questi possibili valori:

- `event.which == 1` – pulsante sinistro,
- `event.which == 2` – pulsante centrale,
- `event.which == 3` – pulsante destro.

Attualmente, `event.which` è deprecato e non dovremmo usarlo.
```

## Modificatori: shift, alt, ctrl e meta

Tutti gli eventi del mouse includono informazioni circa i tasti modificatori premuti.

Proprietà dell'evento:

- `shiftKey`: `key:Shift`
- `altKey`: `key:Alt` (oppure `key:Opt` per Mac)
- `ctrlKey`: `key:Ctrl`
- `metaKey`: `key:Cmd` per Mac

Vengono valorizzati a `true` quando il tasto corrispondente viene premuto.

Per esempio, il seguente pulsante funziona solamente con `key:Alt+Shift`+click:

```html autorun height=60
<button id="button">Alt+Shift+Click qui!</button>

<script>
  button.onclick = function(event) {
*!*
    if (event.altKey && event.shiftKey) {
*/!*
      alert('Urrà!');
    }
  };
</script>
```

```warn header="Attenzione: su Mac solitamente si usa `Cmd` invece di `Ctrl`"
Su Windows e Linux esistono i tasti modificatori `key:Alt`, `key:Shift` e `key:Ctrl`. Su Mac ne esiste uno in più: `key:Cmd`, corrispondente alla proprietà `metaKey`.

Nella maggior parte delle applicazioni, quando Windows/Linux usano `key:Ctrl`, su Mac si usa `key:Cmd`.

Ossia: quando un utente Windows preme `key:Ctrl+Enter`  o `key:Ctrl+A`, un utente Mac premerebbe `key:Cmd+Enter` o `key:Cmd+A`, e così via.

Ne consegue che se vogliamo dare supporto a combinazioni di tasti come `key:Ctrl`+click, allora per Mac ha senso usare `key:Cmd`+click, che è molto più comodo per utenti Mac.

Anche se volessimo forzare gli utenti Mac a usare `key:Ctrl`+click -- si va incontro a una certa tipologia di ostacolo. Il problema è che: un click col tasto destro con un `key:Ctrl` su Mac viene interpretato come un *click sul tasto destro*, e genera l'evento `contextmenu`, non un `click` come su Windows/Linux.

Quindi se vogliamo che gli utenti di tutti i sistemi operativi lavorino si sentano a proprio agio, allora insieme a `ctrlKey` dovremmo controllare `metaKey`.

Per il codice JS ciò significa che dovremmo controllare `if (event.ctrlKey || event.metaKey)`.
```

```warn header="Esistono anche i dispositivi mobile"
Le combinazioni di tasti vanno bene in aggiunta al flusso di lavoro. Quindi se il visitatore usa una tastiera -- andranno bene. 

Ma in mancanza di questa -- allora dovrebbe esserci una maniera per poter "vivere" senza tasti modificatori.
```

## Coordinate: clientX/Y, pageX/Y

Tutti gli eventi del mouse forniscono le coordinate in due modi:

1. Relative alla Window: `clientX` e `clientY`.
2. Relative al Document: `pageX` e `pageY`.

Abbiamo già affrontato la differenza tra le due nel capitolo <info:coordinates>.

In soldoni, le coordinate relative al documento `pageX/Y` vengono misurate a partire dall'angolo in alto a sinistra del documento, e non cambiano se la pagina viene scrollata, mentre invece `clientX/Y` vengono misurate a partire dall'angolo in alto a sinistra della finestra. Quando la pagina viene scrollata, i loro valori cambiano.

Per esempio, se avessimo una finestra di dimensioni 500x500, ed il puntatore del mouse fosse nell'angolo in alto a destra, allora `clientX` e `clientY` sarebbero valorizzate a `0`, senza alcuna considerazione del fatto che la pagina sia scrollata o meno. 

E se il puntatore fosse al centro, allora `clientX` e `clientY` sarebbero valorizzati a `250`, senza tenere conto del punto in cui si trovi rispetto al documento. In qualche modo sono simili a `position:fixed` da questo punto di vista.

````online
Muovere il mouse sopra il campo di testo per vedere `clientX/clientY` (l'esempio è dentro un `iframe`, quindi le coordinate sono relative a questo `iframe`):

```html autorun height=50
<input onmousemove="this.value=event.clientX+':'+event.clientY" value="Muovi il mouse sopra me">
```
````

## Prevenire la selezione su mousedown

<<<<<<< HEAD
Il doppio click del mouse ha un effetto collaterale che potrebbe dare fastidio in alcune interfacce: seleziona il testo.
=======
Double mouse click has a side effect that may be disturbing in some interfaces: it selects text.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Per esempio, il doppio click sul seguente testo lo seleziona in aggiunta al nostro gestore:

```html autorun height=50
<span ondblclick="alert('dblclick')">Doppio click su di me</span>
```

Se si preme sul pulsante sinistro del mouse e, senza rilasciarlo, si muove il mouse, si ottiene una selezione, spesso non voluta.

Ci sono vari modi per prevenire la selezione, consultabili nel capitolo <info:selection-range>.

In questo caso particolare la maniera più ragionevole è di prevenire l'azione del browser su `mousedown`. La cosa previene entrambe queste selezioni:

```html autorun height=50
Prima...
<b ondblclick="alert('Click!')" *!*onmousedown="return false"*/!*>
  Double-click me
</b>
...Dopo
```

Adesso l'elemento in grassetto non viene selezionato al doppio click, e premendo il pulsante sinistro su di esso non comincerà la selezione.

Nota bene: il testo all'interno è ancora selezionabile. Comunque, la selezione dovrebbe cominciare non sul testo stesso, ma prima o dopo di esso. Solitamente la cosa è accettabile per gli utenti.

````smart header="Prevenire la copia"
Se volessimo disabilitare la selezione per proteggere il contenuto della nostra pagina dal copia-incolla, potremmo usare un altro evento: `oncopy`.

```html autorun height=80 no-beautify
<div *!*oncopy="alert('Copying forbidden!');return false"*/!*>
  Caro utente,
  La copia è vietata.
  Sebbene, nel caso in cui tu conosca JS or HTML, allora potrai prendere tutto dal sorgente della pagina.
</div>
```
Se provassimo a copiare un pezzo del testo all'interno del `<div>`, la copia non andrà a buon fine, perché l'azione predefinita `oncopy` sarà stata prevenuta.

Sicuramente l'utente ha accesso al sorgente HTML della pagina, e potrà prendere il contenuto da lì, ma non tutti conoscono come farlo.
````

## Riepilogo

Gli eventi del mouse contengono le seguenti proprietà:

- Pulsante: `button`.
- Tasti modificatori (`true` se premuto): `altKey`, `ctrlKey`, `shiftKey` e `metaKey` (Mac).
  - Se vogliamo gestire `key:Ctrl`, allora non dobbiamo dimenticarci degli utenti Mac, che solitamente usano `key:Cmd`, quindi sarebbe meglio controllare `if (e.metaKey || e.ctrlKey)`.

- Coordinate relative alla Window: `clientX/clientY`.
- Coordinate relative al Document: `pageX/pageY`.

L'azione predefinita del browser di `mousedown` è la selezione del testo, se non è cosa gradita per l'interfaccia, allora dovrebbe essere prevenuta.

Nel prossimo capitolo vedremo più in dettaglio gli eventi che seguono i movimenti del puntatore e come tenere traccia degli elementi che cambiano sotto di esso.
