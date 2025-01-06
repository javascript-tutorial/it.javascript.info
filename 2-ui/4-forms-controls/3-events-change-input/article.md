# Eventi: change, input, cut, copy, paste

In questa sezione, affronteremo vari argomenti associati alle modifica dei dati.

## Evento: change

L'evento `change` viene scatenato quando si termina la modifica su un elemento.

Per gli input di testo, ciò si verifica alla perdita del focus.

Ad esempio, mentre scriviamo del testo nel campo di testo seguente -- l'evento non viene scaturito. Ma non appena spostiamo il focus su qualcos'altro, per esempio, clicchiamo su un pulsante -- verrà scatenato un evento `change`:

```html autorun height=40 run
<input type="text" onchange="alert(this.value)">
<input type="button" value="Button">
```

Per altri elementi: `select`, `input type=checkbox/radio` viene scaturito subito dopo il cambio di selezione:

```html autorun height=40 run
<select onchange="alert(this.value)">
  <option value="">Seleziona qualcosa</option>
  <option value="1">Opzione 1</option>
  <option value="2">Opzione 2</option>
  <option value="3">Opzione 3</option>
</select>
```


## Evento: input

L'evento `input` viene scatenato dopo ogni modifica di un valore da parte dell'utente.

Viene scaturito per qualunque valore modificato, e diversamente dagli eventi da tastiera, anche per azioni che non la coinvolgono direttamente: incollare qualcosa con il mouse o dettare un testo tramite riconoscimento vocale.

Per esempio:

```html autorun height=40 run
<input type="text" id="input"> oninput: <span id="result"></span>
<script>
  input.oninput = function() {
    result.innerHTML = input.value;
  };
</script>
```

Se vogliamo gestire ogni modifica di un `<input>` questo evento è la scelta migliore.

Di contro, l'evento `input` non viene generato tramite input da tastiera e altre azioni che non coinvolgono modifiche dei valori, di conseguenza è esclusa la generazione dell'evento per azioni quali i tasti freccia `key:⇦` `key:⇨` mentre si è dentro l'input.

```smart header="Non possiamo prevenire nulla su `oninput`"
L'evento `input` avviene dopo che il valore viene modificato.

Di conseguenza non possiamo usare `event.preventDefault()` -- sarebbe già troppo tardi, e non avrebbe alcun effetto.
```

## Eventi: taglia, copia, incolla

Questi eventi si scatenano nelle operazioni di taglia/copia/incolla di un valore.

Appartengono alla classe [ClipboardEvent](https://www.w3.org/TR/clipboard-apis/#clipboard-event-interfaces) e forniscono un accesso ai dati che vengono copiati ed incollati.

È anche previsto l'uso di `event.preventDefault()` per annullare l'azione, in modo che non venga copiato/incollato nulla.

Ad esempio, il seguente codice previene tutti questi eventi, mostrando cosa stiamo provando di tagliare/copiare/incollare:

```html autorun height=40 run
<input type="text" id="input">
<script>
  input.onpaste = function(event) {
    alert("paste: " + event.clipboardData.getData('text/plain'));
    event.preventDefault();
  };

  input.oncut = input.oncopy = function(event) {
    alert(event.type + '-' + document.getSelection());
    event.preventDefault();
  };
</script>
```

Nota bene, è possibile copiare/incollare non soltanto testo, ma qualunque cosa. Per esempio possiamo copiare un file nel sistema operativo ed incollarlo nel documento.

Questo perché `clipboardData` implementa l'interfaccia `DataTransfer`, usata comunemente per il drag'n'drop ed il copia/incolla. Va un pochino oltre i nostri scopi, ma puoi trovare i relativi metodi [nelle specifiche](https://html.spec.whatwg.org/multipage/dnd.html#the-datatransfer-interface).

```warn header="ClipboardAPI: restrizione per la sicurezza dell'utente"
La clipboard è una caratteristica "globale" a livello del sistema operativo. I browser quindi, per ragioni di sicurezza, consentono l'accesso in lettura/scrittura solo per certe azioni dell'utente, ad esempio nei gestori evento `onclick`.

<<<<<<< HEAD
Inoltre è vietato generare eventi clipboard "personalizzati" tramite `dispatchEvent` in tutti i browser eccetto Firefox.
```
=======
That's because `clipboardData` implements `DataTransfer` interface, commonly used for drag'n'drop and copy/pasting. It's a bit beyond our scope now, but you can find its methods in the [DataTransfer specification](https://html.spec.whatwg.org/multipage/dnd.html#the-datatransfer-interface).

Also, there's an additional asynchronous API of accessing the clipboard: `navigator.clipboard`. More about it in the specification [Clipboard API and events](https://www.w3.org/TR/clipboard-apis/), [not supported by Firefox](https://caniuse.com/async-clipboard).

### Safety restrictions

The clipboard is a "global" OS-level thing. A user may switch between various applications, copy/paste different things, and a browser page shouldn't see all that.

So most browsers allow seamless read/write access to the clipboard only in the scope of certain user actions, such as copying/pasting etc.

It's forbidden to generate "custom" clipboard events with `dispatchEvent` in all browsers except Firefox. And even if we manage to dispatch such event, the specification clearly states that such "synthetic" events must not provide access to the clipboard.

Even if someone decides to save `event.clipboardData` in an event handler, and then access it later -- it won't work.

To reiterate, [event.clipboardData](https://www.w3.org/TR/clipboard-apis/#clipboardevent-clipboarddata) works solely in the context of user-initiated event handlers.

On the other hand, [navigator.clipboard](https://www.w3.org/TR/clipboard-apis/#h-navigator-clipboard) is the more recent API, meant for use in any context. It asks for user permission, if needed.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## Riepilogo

Eventi di modifica dati:

| Evento | Descrizione | Speciali |
|---------|----------|-------------|
| `change`| È stato modificato un valore. | Per il testo viene generato alla perdita del focus. |
| `input` | Per gli input di testo ad ogni modifica. | Viene generato immediatamente diversamente da `change`. |
| `cut/copy/paste` | Azioni di taglia/copia/incolla. | L'azione può essere prevenuta. La proprietà `event.clipboardData` dà accesso in lettura/scrittura alla clipboard. |
