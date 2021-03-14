# Tastiera: keydown e keyup

Prima di andare alla tastiera, è bene ricordare che nei dispositivi moderni esistono altre maniere per "inserire qualche dato". Per esempio citiamo l'uso del riconoscimento vocale (specialmente sui dispositivi mobile) o il copia/incolla con il mouse.

Quindi se vogliamo tenere traccia di qualunque input dentro un campo `<input>`, allora gli eventi della tastiera non saranno sufficienti. Esite però un altro evento chiamato `input` per tenere traccia delle modifiche su un `<input>`, di qualunque natura. E questa potrebbe essere la scelta corretta per qursto tipo di attività. Verrà affrontato più avanti nel capitolo <info:events-change-input>.

Gli eventi della tastiera dovrebbero essere usati per gestire azioni da tastiera (comprese le tastiere virtuali). Per esempio, per reagire ai tasti freccia `key:Up` e `key:Down` oppure alle scorciatoie (includendo quindi combinazioni di tasti).


## Banco di test [#keyboard-test-stand]

```offline
Per capire meglio gli eventi da tastiera, possiamo usare il [banco di test](sandbox:keyboard-dump).
```

```online
Per capire meglio gli eventi da tastiera, possiamo usare il seguente banco di test.

Proviamo diverse combinazioni di tasti nel campo di testo.

[codetabs src="keyboard-dump" height=480]
```


## Keydown e keyup

L'evento `keydown` avviene quando viene premuto un tasto, e `keyup` quando viene rilasciato.

### event.code e event.key

La proprietà `key` dell'oggetto evento, permette di ottenere il carattere, mentre la proprietà `code` ci restituisce "codice del tasto fisico".

Ad esempio, a parità di `key:Z` potrebbe essere stato premuto con o senza il `key:Shift`. Questo potrebbe darci due differenti caratteri: minuscolo `z` e maiuscolo `Z`.

`event.key` è esattamente il carattere, e sarà differente. Invece `event.code` è sempre lo stesso:

| Key          | `event.key` | `event.code` |
|--------------|-------------|--------------|
| `key:Z`      |`z` (minuscolo)         |`KeyZ`        |
| `key:Shift+Z`|`Z` (maiuscolo)          |`KeyZ`        |


Se un utente fa uso di diverse lingue, passare ad un'altra significherebbe avere tutt'altro carattere rispetto a `"Z"`. Quest'ultimo diverrebbe il valore di `event.key`, mentre `event.code` sarebbe sempre `"KeyZ"`.

```smart header="\"KeyZ\" e altri codici tasto"
Ogni tasto ha un codice che dipende dalla sua posizione sulla tastiera. I codici dei tasti vengono descritti nelle [specifiche dei codici Evento UI](https://www.w3.org/TR/uievents-code/).

Per esempio:
- I tasti lettera hanno dei codici: `"Key<letter>"`: `"KeyA"`, `"KeyB"` etc.
- I tasti numerici hanno dei codici: `"Digit<number>"`: `"Digit0"`, `"Digit1"` etc.
- I tasti speciali sono codificati con i loro nomi: `"Enter"`, `"Backspace"`, `"Tab"` etc.

Esiste una grande varietà di layout di tastiera, e le specifiche danno un codice per ognuno di essi.

Per avere informazioni sui vari codici [sezione alfanumerica delle specifiche](https://www.w3.org/TR/uievents-code/#key-alphanumeric-section), oppure basta premere un tasto nel [banco di test](#keyboard-test-stand) precedente.
```

```warn header="La distinzione tra maiuscolo e minuscolo è importante: `\"KeyZ\"`, e non `\"keyZ\"`"
Sembra ovvio, ma le persone sbagliano ancora.

Bisogna evitare di scrivere in modo scorretto: è `KeyZ`, e non `keyZ`. Un controllo fatto in questo modo `event.code=="keyZ"` non funziona: la prima lettera di `"Key"` deve essere maiuscaola.
```

Cosa succederebbe se un tasto non restituisse nessun carattere? Per esempio, `key:Shift` oppure `key:F1` o altri ancora. Per questi tasti il valore di `event.key` è approssiamtivamente lo stesso di `event.code`:

| Key          | `event.key` | `event.code` |
|--------------|-------------|--------------|
| `key:F1`      |`F1`          |`F1`        |
| `key:Backspace`      |`Backspace`          |`Backspace`        |
| `key:Shift`|`Shift`          |`ShiftRight` or `ShiftLeft`        |

Nota bene che `event.code` specifica esattamente il tasto premuto. Per esempio, la maggioranza delle tastiere hanno due tasti `key:Shift`: uno nel lato sinistro e uno nel lato destro. `event.code` ci dice esattamente quale viene premuto, ed `event.key` è responsable invece del "significato" del tasto: cosa è (uno "Shift").

Mettiamo il caso che volessimo gestire una scorciatoia: `key:Ctrl+Z` (o `key:Cmd+Z` su Mac). La maggiorparte degli editor di testo aggancia su di esso l'azione "Undo". Possiamo impostare un listener sul `keydown` e controllare quale tasto viene premuto.

Ma qui c'è un dilemma: in questo listener, dovremmo controllare il valore di `event.key` oppure quello di `event.code`?

Da una parte, il valore di `event.key` è un carattere, e cambia a seconda del linguaggio. Se il visitatore ha più lingue nel suo sistema operativo e passa da uno all'altro, lo stesso tasto restituirà caratteri differenti. Quindi ha senso controllare `event.code`, che è sempre lo stesso.

Ecco un esempio:

```js run
document.addEventListener('keydown', function(event) {
  if (event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)) {
    alert('Undo!')
  }
});
```

D'altra parte, c'è un problema con `event.code`. Per layout di tastiera differenti, possono corrispondere caratteri differenti.

Per esempio, qui abbiamo un layout americano ("QWERTY") ed un layout Tedesco ("QWERTZ") sotto di esso (da Wikipedia):

![](us-layout.svg)

![](german-layout.svg)

A parità di tasto, sul layout americano corrisponde a "Z", mentre per quello tedesco corrisponde a "Y" (le lettere sono scambiate tra di loro).

Letteralmente, `event.code` equivale a `KeyZ` per gli utenti con il layout tedesco quando premono `key:Y`.

Se andiamo a controllare `event.code == 'KeyZ'` nel nostro codice, per gli utenti con il layout tedesco, il test passerà alla pressione del tasto `key:Y`.

Questo può sembrare strano,ma è così. Le [specifiche](https://www.w3.org/TR/uievents-code/#table-key-code-alphanumeric-writing-system) menzionano in modo esplicito questo comportamento.

Quindi, `event.code` può corrispondere a un carattere errato da layout inaspettati. A parità di lettera, per layout differenti potrebbero essere mappati a tasti fisici differenti, portando a codici differenti. Fortunatamente, questo avviene solo con alcuni codici, ad esempio `keyA`, `keyQ`, `keyZ` (come abbiamo visto), e non avviene con i tasti speciali come `Shift`. Si può vedere la lista nelle [specifiche](https://www.w3.org/TR/uievents-code/#table-key-code-alphanumeric-writing-system).

Per il tracciamento affidabile di carattere dipendenti dal layout, `event.key` potrebbe essere la soluzione migliore.

D'altra parte, `event.code` ha il beneficio di essere sempre lo stesso, legato alla posizione fisica del tasto, anche se il visitatore dovesse modificare la lingua. Quindi le scorciatoie relative ad essi funzionano bene anche in caso di cambio lingua.

Vogliamo gestire dei tasti dipendenti dal layout? Allora `event.key` è la quello che fa per noi.

Oppure volgiamo una scorciatoia che funzioni anche al cambio lingua? Allora `event.code` potrebbe essere meglio.

## Auto-repeat

Se un tasto viene premuto abbastanza a lungo, comincia l'"auto-repeat": l'evento `keydown` viene scaturito ancora e ancora, e alla fine quando verrà rilasciato otterremo un evento `keyup`. Quindi è abbastanza normale avere molti `keydown` e un solo `keyup`.

Per eventi generati da auto-repeat, l'oggetto evento ha la proprietà `event.repeat` impostata a `true`.


## Azioni default

Le azioni di default possono variare, dal momento che sono tante le cose che possono essere iniziate con la tastiera.

Per esempio:

- Compare un carattere sullo schermo (lo scenario più ovvio).
- Viene cancellato un carattere (tasto `key:Delete`).
- Si scrolla la pagina (tasto `key:PageDown`).
- Il browser apre la finestra di dialogo "Sala la Pagina" (`key:Ctrl+S`)
-  ...e così via.

Prevenire le azioni di default sul `keydown` può annullare la maggioranza di essere, con l'eccezione delle combinazioni di tasti del sistema operativo. Per esempio, su Windows `key:Alt+F4` chiude la finestra attuale del browser. E non c'è modo per prevenire questa azione predefinita tramite JavaScript.

Per esempio, il seguene campo `<input>` si aspetta un numero di telefono, quindi nn accetta tasti che non siano numeri, `+`, `()` or `-`:

```html autorun height=60 run
<script>
function checkPhoneKey(key) {
  return (key >= '0' && key <= '9') || key == '+' || key == '(' || key == ')' || key == '-';
}
</script>
<input *!*onkeydown="return checkPhoneKey(event.key)"*/!* placeholder="Numero di telefono, per piacere" type="tel">
```

È interessante notare che i tasti speciali, come `key:Backspace`, `key:Left`, `key:Right`, `key:Ctrl+V`, non funzionano nel campo input. Questo è un effetto collaterale delle restrizioni del filtro `checkPhoneKey`.

Facciamolo "rilassare" un attimo:


```html autorun height=60 run
<script>
function checkPhoneKey(key) {
  return (key >= '0' && key <= '9') || key == '+' || key == '(' || key == ')' || key == '-' ||
    key == 'ArrowLeft' || key == 'ArrowRight' || key == 'Delete' || key == 'Backspace';
}
</script>
<input onkeydown="return checkPhoneKey(event.key)" placeholder="Phone, please" type="tel">
```

Adesso le frecce e il tasto cancella funzionano.

...Ma possiamo ancora inserire qualunque valore usando il mouse e facendo tasto destro + Incolla. Quindi il filtro non è al 100% affidabile. Possiamo solo lasciarlo così, dato che funzionerà la maggior parte delle volte. O un approccio alternativo potrebbe essere quello di tenere traccia dell'evento `input`, che viene scaturito dopo ogni modifica. A quel punto, possiamo verificare il nuovo valore e evidenziarlo/modificarlo se non valido.

## Eredità

Nel passato, c'era un evento `keypress`, ed anche le proprietà `keyCode`, `charCode`, `which` dell'oggetto evento.

C'erano tante di quelle incompatibilità tra i vari browser anche mentre ci stavano lavorando, che gli sviluppatori delle specifiche non avevano modo che deprecarli tutti e creare dei nuovi e moderni eventi (descritti sopra in questo capitolo). Il codice vecchio funziona ancora, da momento che i broweser continuano a supportarli, ma assolutamente non c'è nessuna ragione per continuare a farlo.

## Tastiere dei dispositivi mobile

Usando le tastiere virtuali dei dispositivi mobile, conosciute formalmente come IME (Input-Method Editor), the W3C standard states that a KeyboardEvent's [`e.keyCode` should be `229`](https://www.w3.org/TR/uievents/#determine-keydown-keyup-keyCode) and [`e.key` should be `"Unidentified"`](https://www.w3.org/TR/uievents-key/#key-attr-values).

While some of these keyboards might still use the right values for `e.key`, `e.code`, `e.keyCode`... when pressing certain keys such as arrows or backspace, there's no guarantee, so your keyboard logic might not always work on mobile devices.

## Summary

Pressing a key always generates a keyboard event, be it symbol keys or special keys like `key:Shift` or `key:Ctrl` and so on. The only exception is `key:Fn` key that sometimes presents on a laptop keyboard. There's no keyboard event for it, because it's often implemented on lower level than OS.

Keyboard events:

- `keydown` -- on pressing the key (auto-repeats if the key is pressed for long),
- `keyup` -- on releasing the key.

Main keyboard event properties:

- `code` -- the "key code" (`"KeyA"`, `"ArrowLeft"` and so on), specific to the physical location of the key on keyboard.
- `key` -- the character (`"A"`, `"a"` and so on), for non-character keys, such as `key:Esc`, usually has the same value  as `code`.

In the past, keyboard events were sometimes used to track user input in form fields. That's not reliable, because the input can come from various sources. We have `input` and `change` events to handle any input (covered later in the chapter <info:events-change-input>). They trigger after any kind of input, including copy-pasting or speech recognition.

We should use keyboard events when we really want keyboard. For example, to react on hotkeys or special keys.
