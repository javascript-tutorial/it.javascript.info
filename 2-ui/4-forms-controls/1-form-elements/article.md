# Proprietà dei form e metodi

I forms e gli elementi control, come `<input>` hanno una serie di eventi e proprietà peculiari.

Lavorando con i forms, questi saranno molto comodi quando li avremo imparati.

## Navigazione: form e elements

I form del documento sono membri della speciale collezione `document.forms`.

Questa è una cosiddetta *"named collection"*: è sia associativa che ordinata. Possiamo usare sia il nome che l'indice nel documento per accedervi.

```js no-beautify
document.forms.my - il form con name="my"
document.forms[0] - il primo form del documento
```

Quando abbiamo un form, allora tutti gli elementi saranno contenuti nella named collection `form.elements`.

Per esempio:

```html run height=40
<form name="my">
  <input name="one" value="1">
  <input name="two" value="2">
</form>

<script>
  // ottiene il form
  let form = document.forms.my; // <form name="my"> element

  // ottiene l'elemento
  let elem = form.elements.one; // <input name="one"> element

  alert(elem.value); // 1
</script>
```

Potrebbero esserci elementi multipli con lo stesso nome, ed è una cosa che capita spesso con i radio buttons ed i checkbox.

In questo caso `form.elements[name]` sarà una *collection*, per esempio:

```html run height=40
<form>
  <input type="radio" *!*name="age"*/!* value="10">
  <input type="radio" *!*name="age"*/!* value="20">
</form>

<script>
let form = document.forms[0];

let ageElems = form.elements.age;

*!*
alert(ageElems[0]); // [object HTMLInputElement]
*/!*
</script>
```

Queste proprietà di navigazione non dipendono dalla struttura dei tags. Ogni control element, è irrilevante quanto in profondità sia dentro il form, sarà contenuto ed accessibile da `form.elements`.


````smart header="Fieldsets come \"subforms\""
Un form può avere uno o più elementi `<fieldset>` all'interno. Questi hanno anche proprietà `elements` che mostrano dei form controls all'interno.

Per esempio:

```html run height=80
<body>
  <form id="form">
    <fieldset name="userFields">
      <legend>info</legend>
      <input name="login" type="text">
    </fieldset>
  </form>

  <script>
    alert(form.elements.login); // <input name="login">

*!*
    let fieldset = form.elements.userFields;
    alert(fieldset); // HTMLFieldSetElement

    // possiamo ottenere l'input sia dal nome del form sia dal fieldset
    alert(fieldset.elements.login == form.elements.login); // true
*/!*
  </script>
</body>
```
````

````warn header="Notazione breve: `form.name`"
Esiste una notazione breve: possiamo accedere all'elemento come `form[index/name]`.

In altre parole, invece di `form.elements.login` possiamo scrivere `form.login`.

Funziona ugualmente, ma c'è un piccolo problema: se accediamo a un elemento, che in successivamente cambia il suo `name`, questo sarà ancora accessibile sia attraverso il vecchio nome, ma anche tramite quello nuovo.

È facile capirlo da un esempio:

```html run height=40
<form id="form">
  <input name="login">
</form>

<script>
  alert(form.elements.login == form.login); // true, lo stesso <input>

  form.login.name = "username"; // cambio del nome dell'input

  // form.elements ha aggiornato il nome:
  alert(form.elements.login); // undefined
  alert(form.elements.username); // input

*!*
  // form permette entrambi i nomi: sia quello nuovo che quello vecchio
  alert(form.username == form.login); // true
*/!*
</script>
```

Solitamente non è un problema, in quanto raramente andiamo a modificare il nome degli elementi dei form.

````

## Backreference: element.form

Per ogni elemento, il form è disponibile come `element.form`. Quindi un form referenzia tutti gli elementi, e gli elementi referenziano il form.

Come possiamo vedere in figura:

![](form-navigation.svg)

Per esempio:

```html run height=40
<form id="form">
  <input type="text" name="login">
</form>

<script>
*!*
  // form -> element
  let login = form.login;

  // element -> form
  alert(login.form); // HTMLFormElement
*/!*
</script>
```

## Elementi del form

Parliamo un po' dei form controls.

### input e textarea

<<<<<<< HEAD
Possiamo accedere ai lori valori tramite `input.value` (string) o `input.checked` (boolean) per i checkbox.
=======
We can access their value as `input.value` (string) or `input.checked` (boolean) for checkboxes and radio buttons.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Come in questo caso:

```js
input.value = "Nuovo valore";
textarea.value = "Nuovo testo";

input.checked = true; // per una checkbox o un radio button
```

```warn header="Usare `textarea.value`, e non `textarea.innerHTML`"
Nota bene che, nonostante anche `<textarea>...</textarea>` contenga il suo valore come HTML annidato, non dovremmo mai usare `textarea.innerHTML` per accedervi.

Esso conterrà solamente l'HTML che era stato inizialmente impostato nella pagina, e non il valore attuale.
```

### select ed option

Un elemento `<select>` contiene 3 importanti proprietà:

1. `select.options` -- la collezione di sottoelementi `<option>`,
2. `select.value` -- il *valore* di `<option>` attualmente selezionato,
3. `select.selectedIndex` -- l'*indice* di `<option>` attualmente selezionato.

Forniscono tre modi differenti per impostare un valore per un `<select>`:

1. Trova il corrispondente elemento `<option>` (ad esempio tra i `select.options`) ed imposta il suo `option.selected` a `true`.
2. Se conosciamo il nuovo valore: imposta `select.value` al nuovo valore.
3. Se conosciamo l'indice della nuova opzione: imposta `select.selectedIndex` su quell'indice.

Ecco un esempio per tutti e tre i metodi:

```html run
<select id="select">
  <option value="apple">Mela</option>
  <option value="pear">Pera</option>
  <option value="banana">Banana</option>
</select>

<script>
  // tutte e tre le righe di codice fanno la stessa cosa
  select.options[2].selected = true; 
  select.selectedIndex = 2;
  select.value = 'banana';
  // nota bene: le options cominciano da indice zero, quindi indice 2 significa la option numero 3.
</script>
```

Diversamente da altri controls, `<select>` permette di selezionare più opzioni alla volta se contiene l'attributo `multiple`. Comunque questo attributo viene usato raramente.

Per valori multipli selezionati, usiamo il primo modo per impostare i valori: aggiungere/rimuovere la proprietà `selected` dai sottoelementi `<option>`.

Ecco un esempio di come ottenere i valori selezionati da un multi-select:

```html run
<select id="select" *!*multiple*/!*>
  <option value="blues" selected>Blues</option>
  <option value="rock" selected>Rock</option>
  <option value="classic">Classic</option>
</select>

<script>
  // ottiene tutti i valori selezionati dal multi-select
  let selected = Array.from(select.options)
    .filter(option => option.selected)
    .map(option => option.value);

  alert(selected); // blues,rock  
</script>
```

Le specifiche complete dell'elemento `<select>` sono disponibili nelle specifiche <https://html.spec.whatwg.org/multipage/forms.html#the-select-element>.

### new Option

Nelle specifiche [specification](https://html.spec.whatwg.org/multipage/forms.html#the-option-element) viene descritta una sintassi breve ed elegante per creare una elemento  `<option>`:

```js
option = new Option(text, value, defaultSelected, selected);
```

Questa sintassi è opzionale. Possiamo usare `document.createElement('option')` ed impostare gli attributi manualmente. Tuttavia, potrebbe essere breve, quindi ecco i parametri:

- `text` -- il testo dentro option,
- `value` -- il valore di option,
- `defaultSelected` -- se `true`, allora verrà creato l'attributo HTML `selected`,
- `selected` -- se `true`, allora l'opzione verrà selezionata.

La differenza tra `defaultSelected` e `selected` è che `defaultSelected` imposta l'attributo HTML (che possiamo ottenere usando `option.getAttribute('selected')`, mentre `selected` definisce lo stato della selezione (se è selezionata o meno).

In pratica, solitamente possiamo impostare entrambi i valori a `true` o `false` (oppure ometterli, che equivale a `false`).

Per esempio, ecco un nuovo elemento option "non selezionato":

```js
let option = new Option("Testo", "value");
// crea <option value="value">Testo</option>
```

La stesso elemento option, ma stavolta selezionato:

```js
let option = new Option("Testo", "value", true, true);
```

Gli elementi option hanno delle proprietà:

`option.selected`
: Se l'opzione è selezionata.

`option.index`
: L'indice dell'opzione in mezzo agli altri elementi option del suo elemento `<select>`.

`option.text`
: Il contenuto testuale dell'elemento option (visto dall'utente).

## Riferimenti

- Specification: <https://html.spec.whatwg.org/multipage/forms.html>.

## Riepilogo

Navigazione dei form:

`document.forms`
: Un form è disponibile come `document.forms[name/index]`.

`form.elements`  
: Gli elementi del form sono disponibili come `form.elements[name/index]`, oppure, più semplicemente con `form[name/index]`. La proprietà `elements` esiste anche per i `<fieldset>`.

`element.form`
: Gli elementi referenziano i loro form nella proprietà `form`.

Il valore è disponibile come `input.value`, `textarea.value`, `select.value` etc. Oppure come `input.checked` per determinare la selezione per checkbox e radio buttons.

Per `<select>` possiamo anche ottenere il valore tramite l'indice `select.selectedIndex` o attraverso la collezione di options `select.options`.

Queste sono le basi da cui partire con i form. Incontreremo molti esempi più avanti nel tutorial.

Nel prossimo capitolo affronteremo gli eventi `focus` e `blur` che possono avvenire per qualunque evento, ma sono maggiormente gestiti nei form.
