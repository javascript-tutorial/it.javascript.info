# Focusing: focus/blur

Un elemento riceve il focus sia quando l'utente ci clicca sopra, sia quando usa il tasto `key:Tab` della tastiera. Esiste anche un attributo HTML `autofocus` che imposta il focus in un elemento di default al caricamento della pagina ed anche altri modi per ottenere il focus.

Porre il focus su un elemento in genere significa: "preparati ad accettare il dato qui", quindi è questo il momento in cui possiamo eseguire il codice per inizializzare la funzionalità richiesta.

Il momento della perdita del focus ("blur") può essere ancora più importante. Si concretizza quando un utente clicca da qualche altra parte o preme il tasto `key:Tab` per spostarsi al prossimo campo del form, ma ci sono altri modi per farlo.

Perdere il focus generalmente significa: "il dato è stato inserito", quindi possiamo eseguire il codice per controllarlo oppure salvarlo sul server e così via.

Ci sono delle peculiarità importanti da considerare quando si lavora con gli eventi focus. Faremo il nostro meglio per affrontarle più avanti.

## Gli eventi focus/blur

L'evento `focus` viene emesso quando si entra dentro un elemento (focusing), e `blur` -- quando l'elemento perde il focus.

Proviamo questi due eventi per la validazione di un campo di input.

Nell'esempio seguente:

- Il gestore `blur` controlla se il campo contiene un indirizzo email, altrimenti -- mostra un errore.
- Il gestore `focus` nasconde il messaggio d'errore (sul `blur` verrà controllato nuovamente):

```html run autorun height=60
<style>
  .invalid { border-color: red; }
  #error { color: red }
</style>

Inserire la mail: <input type="email" id="input">

<div id="error"></div>

<script>
*!*input.onblur*/!* = function() {
  if (!input.value.includes('@')) { // non si tratta di una email
    input.classList.add('invalid');
    error.innerHTML = 'Per favore inserire un indirizzo email valido.'
  }
};

*!*input.onfocus*/!* = function() {
  if (this.classList.contains('invalid')) {
    // rimuove il messaggio di "errore", in quanto l'utente vuole reinserire qualcosa
    this.classList.remove('invalid');
    error.innerHTML = "";
  }
};
</script>
```

Il codice HTML moderno, ci permette di eseguire diverse validazioni tramite gli attributi degli input: `required`, `pattern` e così via. E talvolta sono sufficienti per le nostre esigenze. JavaScript può essere usato se vogliamo più flessibilità. Inoltre potremmo voler inviare in automatico il valore al server nel caso sia corretto.


## I metodi focus/blur

I metodi `elem.focus()` e `elem.blur()` attivano/disattivano il focus su un elemento.

Per esempio, facciamo in modo che l'utente non possa spostarsi da un input fintanto che il valore sia scorretto:

```html run autorun height=80
<style>
  .error {
    background: red;
  }
</style>

La tua email: <input type="email" id="input">
<input type="text" style="width:220px" placeholder="scrivi un indirizzo email non valido e prova a spostarti qui">

<script>
  input.onblur = function() {
    if (!this.value.includes('@')) { // non si tratta di una email
      // mostra l'errore
      this.classList.add("error");
*!*
      // ...e rimette il focus
      input.focus();
*/!*
    } else {
      this.classList.remove("error");
    }
  };
</script>
```

Funziona su tutti i browser tranne che su Firefox ([bug](https://bugzilla.mozilla.org/show_bug.cgi?id=53579)).

Se inseriamo qualcosa nell'input e proviamo ad usare `key:Tab` o cliccare fuori dall'input `<input>`, `onblur` rimette il focus sull'input.

Nota bene che non possiamo "prevenire la perdita del focus" chiamando `event.preventDefault()` su `onblur`, poiché `onblur` viene creato *dopo* che l'elemento ha perso il focus.

<<<<<<< HEAD
```warn header="Perdita del focus creata tramite JavaScript"
La perdita del focus può avvenire per varie ragioni.
=======
In practice though, one should think well, before implementing something like this, because we generally *should show errors* to the user, but *should not prevent their progress* in filling our form. They may want to fill other fields first.

```warn header="JavaScript-initiated focus loss"
A focus loss can occur for many reasons.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Una di queste è quando il visitatore clicca da qualche altra parte. Ma anche JavaScript stesso può causarlo, per esempio:

- Un `alert` sposta il focus su sé stesso, questo causa la perdita del focus sull'elemento (evento `blur`), e quando l'`alert` viene dismesso, il focus ritorna sull'elemento (evento `focus`).
- La rimozione di un elemento dal DOM, causa essa stessa la perdita del focus. Nel caso in cui venga reinserito, ovviamente il focus non ritornerà su di esso.

Queste caratteristiche causano, nei gestori `focus/blur`, dei comportamenti inattesi -- a scatenarsi quando non richiesto.

La pratica migliore è quella di fare attenzione nell'uso di questi eventi. Se vogliamo tenere traccia della perdita del focus causata volontariamente dall'utente, dovremmo evitare di causarla noi stessi.
```
## Permettere il focus su ogni elemento: tabindex

Di default, alcuni elementi non supportano il focus.

La lista varia leggermente a seconda del browser, ma una cosa è sempre vera: il supporto al `focus/blur` viene garantito per elementi con i quali l'utente può interagire: `<button>`, `<input>`, `<select>`, `<a>` e così via.

D'altra parte, gli elementi che esistono per formattare qualcosa, come `<div>`, `<span>`, `<table>` -- di default non sono soggetti al focus. Il metodo `elem.focus()` su di essi non funziona, e gli eventi `focus/blur` non verranno mai scatenati.

La cosa può essere cambiata attraverso l'uso dell'attributo HTML `tabindex`.

Se possiede `tabindex` ogni elemento può avere il focus. Il valore dell'attributo è l'indice dell'elemento che segue il `key:Tab` (o qualcosa di equivalente) per spostarsi da un elemento a un altro.

Ossia: se abbiamo due elementi, il primo dei quali ha `tabindex="1"`, ed il secondo ha `tabindex="2"`, premendo `key:Tab` mentre siamo sul primo elemento -- sposterà il focus nel secondo.

L'ordine di spostamento è: gli elementi con `tabindex` da `1` in sù vanno prima ( nell'ordine `tabindex`), e successivamente gli altri elementi privi di `tabindex` (ad esempio un normale `<input>`).

Gli elementi senza un corrispondente `tabindex` vengono scambiati nell'ordine originale del documento (l'ordine predefinito).

Ci sono due valori speciali:

- `tabindex="0"` pone un elemento tra quelli senza `tabindex`. Ossia, quando ci spostiamo tra gli elementi, quelli con `tabindex=0` andranno dopo quelli con `tabindex ≥ 1`.

    Solitamente viene usato per permettere il focus su un elemento, ma tenendo conto dell'ordine di cambio predefinito. Per rendere un elemento parte di un form alla pari di`<input>`.

- `tabindex="-1"` su un elemento, ne permette solamente il focus programmatico. Il tasto `key:Tab` ignora questi elementi, ma il metodo `elem.focus()` funziona.

Per esempio, qui abbiamo una lista. Clicca il primo elemento e premi `key:Tab`:

```html autorun no-beautify
Premi il primo elemento e premi Tab. Tieni traccia dell'ordine. Nota bene che  molti Tab consecutivi possono spostare il focus fuori dall'iframe dell'esempio.
<ul>
  <li tabindex="1">Uno</li>
  <li tabindex="0">Zero</li>
  <li tabindex="2">Due</li>
  <li tabindex="-1">Meno uno</li>
</ul>

<style>
  li { cursor: pointer; }
  :focus { outline: 1px dashed green; }
</style>
```

L'ordine è questo: `1 - 2 - 0`. Normalmente, `<li>` non supporta il focus, ma `tabindex` lo attiva pienamente, rendendolo compatibile con eventi e agli stili di `:focus`.

```smart header="Funziona anche la proprietà `elem.tabIndex`"
Possiamo aggiungere `tabindex` da JavaScript usando la proprietà `elem.tabIndex`. La cosa ha lo stesso effetto.
```

## Delegation: focusin/focusout

Gl eventi `focus` e `blur` non sono soggetti al bubbling.

Per esempio, non possiamo mettere `onfocus` sul `<form>` per evidenziarlo, come in questo caso:

```html autorun height=80
<!-- al focus nel form -- inserisce la classe -->
<form *!*onfocus="this.className='focused'"*/!*>
  <input type="text" name="name" value="Name">
  <input type="text" name="surname" value="Surname">
</form>

<style> .focused { outline: 1px solid red; } </style>
```

L'esempio non può funzionare, perché quando un utente pone il focus su un `<input>`, l'evento `focus` viene scatenato solo sull'input. Non va "salendo". Quindi `form.onfocus` non verrà mai generato.

Ci sono due soluzioni.

Nella prima soluzione, sfruttiamo una buffa caratteristica storica: `focus/blur` non è soggetta al bubbling, ma propaga in basso nella fase *capturing*.

Questo funziona:

```html autorun height=80
<form id="form">
  <input type="text" name="name" value="Name">
  <input type="text" name="surname" value="Surname">
</form>

<style> .focused { outline: 1px solid red; } </style>

<script>
*!*
  // pone il gestore nella fase capturing (ultimo argomento impostato a true)
  form.addEventListener("focus", () => form.classList.add('focused'), true);
  form.addEventListener("blur", () => form.classList.remove('focused'), true);
*/!*
</script>
```

Per la seconda soluzione, sfruttiamo gli eventi `focusin` e `focusout` -- esattamente lo stesso di `focus/blur`, solo che questi sono soggetti al bubbling.

Nota bene che devono essere assegnati tramite `elem.addEventListener`, e non con `on<event>`.

Quindi ecco un'altra variante funzionante:

```html autorun height=80
<form id="form">
  <input type="text" name="name" value="Name">
  <input type="text" name="surname" value="Surname">
</form>

<style> .focused { outline: 1px solid red; } </style>

<script>
*!*
  form.addEventListener("focusin", () => form.classList.add('focused'));
  form.addEventListener("focusout", () => form.classList.remove('focused'));
*/!*
</script>
```

## Riepilogo

Gli eventi `focus` e `blur` vengono generati su un elemento quando si pone/perde il focus su di esso.

Le loro peculiarità sono:
- Non sono soggetti al bubbling. Si può però ricorrere all'uso dello stato *capturing* oppure di `focusin/focusout`.
- La maggioranza degli elementi non supporta il focus di default. Si può usare `tabindex` su ogni elemento per attivarne il supporto.

L'elemento con il focus attualmente attivo è disponibile con `document.activeElement`.
