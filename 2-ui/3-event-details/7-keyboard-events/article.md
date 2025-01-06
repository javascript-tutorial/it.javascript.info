# Tastiera: keydown e keyup

Prima di scendere nei dettagli della tastiera, è bene ricordare che nei dispositivi moderni esistono tanti modi per "inserire qualche dato". Per esempio, è doveroso citare l'uso del riconoscimento vocale (specialmente sui dispositivi mobile) o il copia/incolla tramite il mouse.

Quindi, se vogliamo tenere traccia di qualunque input dentro un campo `<input>`, allora gli eventi della tastiera non saranno sufficienti. Esiste però un altro evento chiamato `input` per tenere traccia delle modifiche degli `<input>`, indipendentemente dalla modalità di inserimento. Questa potrebbe essere la scelta corretta per questo tipo di attività. L'argomento verrà affrontato più avanti nel capitolo <info:events-change-input>.

Gli eventi da tastiera dovrebbero essere usati per gestire, appunto, azioni da tastiera (comprese quelle virtuali). Ad esempio, per reagire ai tasti freccia `key:Up` e `key:Down`, oppure per l'uso delle scorciatoie e/o tasti di scelta rapida (includendo quindi combinazioni di tasti).


## Banco di test [#keyboard-test-stand]

```offline
Per capire meglio questo tipo di eventi, possiamo usare il seguente [banco di test](sandbox:keyboard-dump).
```

```online
Per capire meglio gli eventi da tastiera, possiamo usare il seguente banco di test.

Proviamo diverse combinazioni di tasti nel campo di testo.

[codetabs src="keyboard-dump" height=480]
```


## Keydown e keyup

L'evento `keydown` scaturisce alla pressione di un tasto; `keyup`, invece, quando viene rilasciato.

### event.code e event.key

La proprietà `key` dell'oggetto evento permette di ottenere il carattere, mentre la proprietà `code` ci restituisce il "codice fisico del tasto".

Ad esempio, a parità di `key:Z`, quest'ultimo potrebbe essere stato premuto con o senza il `key:Shift`, cosa che potrebbe restituirci due differenti caratteri: `z` minuscolo oppure `Z` maiuscolo.

`event.key` è esattamente il carattere, che può essere diverso secondo alcuni criteri. Invece `event.code`, a parità di tasto, restituisce sempre lo stesso valore:

| Key          | `event.key` | `event.code` |
|--------------|-------------|--------------|
| `key:Z`      |`z` (minuscolo)         |`KeyZ`        |
| `key:Shift+Z`|`Z` (maiuscolo)          |`KeyZ`        |


Prendendo questo tasto come riferimento, se un utente facesse uso di diverse lingue nello stesso sistema operativo, il passaggio ad un'altra lingua potrebbe portare ad avere tutt'altro carattere rispetto a `"Z"`. Quest'ultimo sarebbe il valore di `event.key`, mentre `event.code` sarebbe sempre `"KeyZ"`.

```smart header="\"KeyZ\" e altri codici tasto"
Ogni tasto ha un codice che dipende dalla sua posizione sulla tastiera. Questi codici vengono descritti nelle [specifiche dei codici Evento UI](https://www.w3.org/TR/uievents-code/).

Per esempio:
- I tasti lettera hanno dei codici: `"Key<letter>"`: `"KeyA"`, `"KeyB"` etc.
- I tasti numerici hanno dei codici: `"Digit<number>"`: `"Digit0"`, `"Digit1"` etc.
- I tasti speciali sono codificati con i loro nomi: `"Enter"`, `"Backspace"`, `"Tab"` etc.

Esiste una grande varietà di layout di tastiera, e le specifiche danno un codice per ognuno di essi.

Per avere informazioni sui vari codici, fare riferimento alla [sezione alfanumerica delle specifiche](https://www.w3.org/TR/uievents-code/#key-alphanumeric-section), oppure, è sufficiente premere un tasto nel [banco di test](#keyboard-test-stand) precedente.
```

```warn header="La distinzione tra maiuscolo e minuscolo è importante: è `\"KeyZ\"`, e non `\"keyZ\"`"
Sembra ovvio, ma le persone sbagliano ancora.

Bisogna evitare di scrivere in modo errato: la dicitura corretta è `KeyZ`, e non `keyZ`. Di conseguenza, un controllo scritto così `event.code=="keyZ"` non funziona: la prima lettera di `"Key"` deve essere maiuscola.
```

Cosa succederebbe se un tasto non restituisse nessun carattere? Per esempio, `key:Shift` oppure `key:F1` o altri ancora. Per questi tasti il valore di `event.key` è, con buona approssimazione, lo stesso di `event.code`:

| Key          | `event.key` | `event.code` |
|--------------|-------------|--------------|
| `key:F1`      |`F1`          |`F1`        |
| `key:Backspace`      |`Backspace`          |`Backspace`        |
| `key:Shift`|`Shift`          |`ShiftRight` or `ShiftLeft`        |

È importante sottolineare che `event.code` specifica esattamente il tasto premuto. Per esempio, la maggioranza delle tastiere ha due tasti `key:Shift`: uno nel lato sinistro e uno nel lato destro. `event.code` ci dice esattamente quale dei due viene premuto, `event.key` è invece responsabile del "significato" del tasto: cosa è (cioè uno "Shift").

Mettiamo il caso che volessimo gestire una scorciatoia: `key:Ctrl+Z` (o `key:Cmd+Z` su Mac). La maggior parte degli editor di testo associa a questa combinazione, l'azione "Undo". A quel punto potremmo impostare un listener sul `keydown` e controllare quale tasto venga premuto.

Ma qui ci troveremo di fronte a un dilemma: in questo listener, cosa dovremmo controllare? Il valore di `event.key` oppure quello di `event.code`?

Da una parte, il valore di `event.key` è un carattere, e cambia a seconda del linguaggio. Se il visitatore gestisce più lingue nel suo sistema operativo e passa da una all'altra, lo stesso tasto restituirebbe caratteri differenti. Quindi ha senso controllare `event.code`, che è sempre lo stesso.

Ecco un esempio:

```js run
document.addEventListener('keydown', function(event) {
  if (event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)) {
    alert('Undo!')
  }
});
```

D'altra parte, c'è un problema anche con `event.code`, dato che per layout di tastiera differenti, possono corrispondere caratteri differenti.

Per esempio, qui abbiamo un layout americano ("QWERTY") e sotto di esso un layout Tedesco ("QWERTZ") (da Wikipedia):

![](us-layout.svg)

![](german-layout.svg)

A parità di tasto, sul layout americano corrisponderà il carattere "Z", invece per quello tedesco sarà "Y" (le lettere sono scambiate tra di loro).

Letteralmente, `event.code` equivale a `KeyZ` per gli utenti con il layout tedesco quando premono `key:Y`.

Se andiamo a controllare `event.code == 'KeyZ'` nel nostro codice, per gli utenti con il layout tedesco, il test passerà alla pressione del tasto `key:Y`.

Questo può sembrare strano, ma è così. Le [specifiche](https://www.w3.org/TR/uievents-code/#table-key-code-alphanumeric-writing-system) menzionano in modo esplicito questo comportamento.

Quindi, `event.code` può corrispondere a un carattere errato su layout non contemplati. A parità di lettera, per layout differenti potrebbero essere mappati tasti fisici differenti, portando ad avere codici differenti. Fortunatamente, questo avviene solo con alcuni di questi, ad esempio `keyA`, `keyQ`, `keyZ` (come abbiamo visto), ma non avviene con i tasti speciali come `Shift`. Si può vedere la lista nelle [specifiche](https://www.w3.org/TR/uievents-code/#table-key-code-alphanumeric-writing-system).

Per il tracciamento affidabile dei caratteri che sono dipendenti dal layout, `event.key` potrebbe essere la soluzione migliore.

<<<<<<< HEAD
Di contro, `event.code` ha il beneficio di essere sempre lo stesso, legato alla posizione fisica del tasto, anche se il visitatore dovesse modificare la lingua. E le scorciatoie ad esso relative funzioneranno bene anche in caso di cambio lingua.
=======
On the other hand, `event.code` has the benefit of staying always the same, bound to the physical key location. So hotkeys that rely on it work well even in case of a language switch.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Vogliamo gestire dei tasti dipendenti dal layout? Ecco che `event.key` è quello che fa per noi.

Oppure, vogliamo una scorciatoia che funzioni anche modificando la lingua? Allora `event.code` sarebbe più adatto.

## Auto-repeat

Se un tasto viene premuto abbastanza a lungo, si instaura l'"auto-repeat": l'evento `keydown` scaturisce ancora e ancora e, alla fine, quando viene rilasciato, otteniamo un evento `keyup`. Quindi è abbastanza normale avere molti `keydown` ed un solo `keyup`.

Per eventi generati da auto-repeat, l'oggetto evento coinvolto avrà la proprietà `event.repeat` impostata a `true`.


## Azioni default

Le azioni di default possono essere tante e variegate, dal momento che sono tante le cose che possono essere attivate tramite la tastiera.

Per esempio:

- Appare un nuovo carattere sullo schermo (lo scenario più frequente).
- Viene cancellato un carattere (tasto `key:Delete`).
- Si scrolla la pagina (tasto `key:PageDown`).
- Il browser apre la finestra di dialogo "Salva la pagina" (`key:Ctrl+S`)
-  ...e così via.

Prevenire le azioni di default sul `keydown` può annullare la maggioranza di esse, con l'eccezione delle combinazioni di tasti del sistema operativo. Per esempio, su Windows `key:Alt+F4` chiude la finestra attuale del browser. E non c'è modo per prevenire questa azione predefinita attraverso JavaScript.

Ora un esempio: il seguente campo `<input>` si aspetta un numero di telefono, quindi non accetta tasti che non siano numeri, `+`, `()` o `-`:

```html autorun height=60 run
<script>
function checkPhoneKey(key) {
  return (key >= '0' && key <= '9') || ['+','(',')','-'].includes(key);
}
</script>
<input *!*onkeydown="return checkPhoneKey(event.key)"*/!* placeholder="Inserire un numero di telefono" type="tel">
```

Qui il gestore `onkeydown` utilizza `checkPhoneKey` per controllare i testi premuti. Se sono validi (da `0..9` o uno tra `+-()`), allora ritorna `true`, altrimenti `false`.

Come sappiamo, il valore `false` restituito da un gestore di evento, assegnato usando un attributo o una proprietà DOM, come in questo caso, previene l'azione default, quindi non appare nulla in `<input>` per i tasti che non passano il tets. (Il valore `true` restituito non influenza nulla, conta solo la restituzione di `false`)

È interessante notare che i tasti speciali, come `key:Backspace`, `key:Left`, `key:Right`, `key:Ctrl+V`, non funzionano nel campo input. Questo è un effetto collaterale delle restrizioni del filtro `checkPhoneKey`.

Rendiamolo un po' più rilassato permettendo i tasti freccia `key:Left`, `key:Right` e `key:Delete`, `key:Backspace`::

Please note that special keys, such as `key:Backspace`, `key:Left`, `key:Right`, do not work in the input. That's a side effect of the strict filter `checkPhoneKey`. These keys make it return `false`.

Let's relax the filter a little bit by allowing arrow keys `key:Left`, `key:Right` and `key:Delete`, `key:Backspace`:

```html autorun height=60 run
<script>
function checkPhoneKey(key) {
  return (key >= '0' && key <= '9') ||
    ['+','(',')','-',*!*'ArrowLeft','ArrowRight','Delete','Backspace'*/!*].includes(key);
}
</script>
<input onkeydown="return checkPhoneKey(event.key)" placeholder="Phone, please" type="tel">
```

Adesso le frecce e il tasto cancella funzionano.

Anche se abbiamo il filtro chiave, è comunque possibile inserire qualsiasi cosa utilizzando il mouse e facendo clic con il pulsante destro del mouse + Incolla. I dispositivi mobili forniscono altri mezzi per immettere valori. Quindi il filtro non è affidabile al 100%.

L'approccio alternativo sarebbe quello di tenere traccia dell'evento `oninput`, che si attiva *dopo* qualsiasi modifica. Lì possiamo controllare il nuovo `input.value` e modificarlo/evidenziare `<input>` quando non è valido. Oppure possiamo usare entrambi i gestori di evento insieme.

## Eredità

In passato, c'era l'evento `keypress`, ed anche le proprietà `keyCode`, `charCode`, `which` dell'oggetto evento.

C'erano tante di quelle incompatibilità tra i vari browser, anche durante lo sviluppo delle specifiche da parte degli sviluppatori che cercavano di implementarle, che l'unica soluzione fu quella di deprecarli tutti, e creare degli eventi nuovi e moderni (descritti sopra in questo capitolo). Il codice vecchio funziona ancora, dal momento che i browser continuano a supportarli, ma non c'è assolutamente nessuna ragione per continuare a farlo.

## Tastiere dei dispositivi mobile

Usando le tastiere virtuali dei dispositivi mobile, conosciute formalmente come IME (Input-Method Editor), lo standard W3C ha stabilito che per quanto riguarda il KeyboardEvent, il [`e.keyCode` dovrebbe essere `229`](https://www.w3.org/TR/uievents/#determine-keydown-keyup-keyCode) ed il [`e.key` dovrebbe essere `"Unidentified"`](https://www.w3.org/TR/uievents-key/#key-attr-values).

Mentre alcune tastiere potrebbero usare il valore corretto per `e.key`, `e.code`, `e.keyCode`... premendo certi tasti come le frecce o lo barra spaziatrice, non esistono garanzie di aderenza alle specifiche, quindi la logica della tastiera potrebbe non funzionare sui dispositivi mobile.

## Riepilogo

La pressione di una tasto genera sempre un evento da tastiera, che sia un tasto simbolo o un tasto speciale come `key:Shift`, `key:Ctrl` e così via. L'unica eccezione è rappresentata dal tasto `key:Fn` che a volte è presente nelle tastiere dei portatili. Per questo tasto non ci sono eventi, perché spesso il funzionamento di questo tasto è implementato a un livello più basso del sistema operativo.

Eventi da tastiera:

- `keydown` premendo il tasto (auto-repeat se il tasto viene tenuto premuto a lungo),
- `keyup` rilasciando il tasto.

Le principali proprietà degli eventi da tastiera sono:

- `code` il "codice del tasto" (`"KeyA"`, `"ArrowLeft"` e così via), specifico della posizione fisica del tasto sulla tastiera.
- `key` -- il carattere (`"A"`, `"a"` e così via), per tasti che non rappresentano caratteri, come `key:Esc`, solitamente ha lo stesso valore di `code`.

In passato, gli eventi da tastiera erano talvolta usati per tenere traccia degli input dell'utente nei campi dei form, cosa non molto affidabile perché l'input può avvenire in vari modi. Per gestire qualunque tipo di input abbiamo `input` e `change` (affrontati più avanti nel capitolo <info:events-change-input>). Questi scaturiscono da qualunque tipo di input, inclusi il copia-incolla o il riconoscimento vocale.

In generale, dovremmo usare gli eventi da tastiera solamente quando vogliamo usare, appunto, la tastiera. Ad esempio per scorciatoie o tasti speciali.
