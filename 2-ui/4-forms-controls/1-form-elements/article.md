# Form properties and methods

Forms and control elements, such as `<input>` have a lot of special properties and events.

Lavorando con i forms, questi saranno molto comodi quando li avremo imparati.

## Navigazione: form e elements

Document forms are members of the special collection `document.forms`.

That's a so-called "named collection": it's both named and ordered. We can use both the name or the number in the document to get the form.

```js no-beautify
document.forms.my - the form with name="my"
document.forms[0] - the first form in the document
```

Quando abbiamo un form, allora tutti gli elementi saranno contenuti nella named collection `form.elements`.

For instance:

```html run height=40
<form name="my">
  <input name="one" value="1">
  <input name="two" value="2">
</form>

<script>
  // get the form
  let form = document.forms.my; // <form name="my"> element

  // get the element
  let elem = form.elements.one; // <input name="one"> element

  alert(elem.value); // 1
</script>
```

There may be multiple elements with the same name, that's often the case with radio buttons.

In that case `form.elements[name]` is a collection, for instance:

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

These navigation properties do not depend on the tag structure. All control elements, no matter how deep they are in the form, are available in `form.elements`.


````smart header="Fieldsets as \"subforms\""
A form may have one or many `<fieldset>` elements inside it. They also have `elements` property that lists form controls inside them.

For instance:

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

    // we can get the input by name both from the form and from the fieldset
    alert(fieldset.elements.login == form.elements.login); // true
*/!*
  </script>
</body>
```
````

````warn header="Notazione breve: `form.name`"
Esiste una notazione breve: possiamo accedere all'elemento come `form[index/name]`.

In other words, instead of `form.elements.login` we can write `form.login`.

Funziona ugualmente, ma c'è un piccolo problema: se accediamo a un elemento, che in successivamente cambia il suo `name`, questo sarà ancora accessibile sia attraverso il vecchio nome, ma anche tramite quello nuovo.

That's easy to see in an example:

```html run height=40
<form id="form">
  <input name="login">
</form>

<script>
  alert(form.elements.login == form.login); // true, the same <input>

  form.login.name = "username"; // change the name of the input

  // form.elements updated the name:
  alert(form.elements.login); // undefined
  alert(form.elements.username); // input

*!*
  // form allows both names: the new one and the old one
  alert(form.username == form.login); // true
*/!*
</script>
```

That's usually not a problem, because we rarely change names of form elements.

````

## Backreference: element.form

For any element, the form is available as `element.form`. So a form references all elements, and elements reference the form.

Come possiamo vedere in figura:

![](form-navigation.svg)

For instance:

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

## Form elements

Let's talk about form controls.

### input and textarea

We can access their value as `input.value` (string) or `input.checked` (boolean) for checkboxes.

Like this:

```js
input.value = "New value";
textarea.value = "New text";

input.checked = true; // per una checkbox o un radio button
```

```warn header="Usare `textarea.value`, e non `textarea.innerHTML`"
Nota bene che, nonostante anche `<textarea>...</textarea>` contenga il suo valore come HTML annidato, non dovremmo mai usare `textarea.innerHTML` per accedervi.

It stores only the HTML that was initially on the page, not the current value.
```

### select and option

A `<select>` element has 3 important properties:

1. `select.options` -- the collection of `<option>` subelements,
2. `select.value` -- the *value* of the currently selected `<option>`,
3. `select.selectedIndex` -- the *number* of the currently selected `<option>`.

They provide three different ways of setting a value for a `<select>`:

1. Find the corresponding `<option>` element (e.g. among `select.options`) and set its `option.selected` to `true`.
2. If we know a new value: set `select.value` to the new value.
3. If we know the new option number: set `select.selectedIndex` to that number.

Here is an example of all three methods:

```html run
<select id="select">
  <option value="apple">Apple</option>
  <option value="pear">Pear</option>
  <option value="banana">Banana</option>
</select>

<script>
  // all three lines do the same thing
  select.options[2].selected = true; 
  select.selectedIndex = 2;
  select.value = 'banana';
  // please note: options start from zero, so index 2 means the 3rd option.
</script>
```

Unlike most other controls, `<select>` allows to select multiple options at once if it has `multiple` attribute. This attribute is rarely used though.

Per valori multipli selezionati, usiamo il primo modo per impostare i valori: aggiungere/rimuovere la proprietà `selected` dai sottoelementi `<option>`.

Here's an example of how to get selected values from a multi-select:

```html run
<select id="select" *!*multiple*/!*>
  <option value="blues" selected>Blues</option>
  <option value="rock" selected>Rock</option>
  <option value="classic">Classic</option>
</select>

<script>
  // get all selected values from multi-select
  let selected = Array.from(select.options)
    .filter(option => option.selected)
    .map(option => option.value);

  alert(selected); // blues,rock  
</script>
```

The full specification of the `<select>` element is available in the specification <https://html.spec.whatwg.org/multipage/forms.html#the-select-element>.

### new Option

Nelle specifiche [specification](https://html.spec.whatwg.org/multipage/forms.html#the-option-element) viene descritta una sintassi breve ed elegante per creare una elemento  `<option>`:

```js
option = new Option(text, value, defaultSelected, selected);
```

This syntax is optional. We can use `document.createElement('option')` and set attributes manually. Still, it may be shorter, so here are the parameters:

- `text` -- the text inside the option,
- `value` -- the option value,
- `defaultSelected` -- if `true`, then `selected` HTML-attribute is created,
- `selected` -- if `true`, then the option is selected.

La differenza tra `defaultSelected` e `selected` è che `defaultSelected` imposta l'attributo HTML (che possiamo ottenere usando `option.getAttribute('selected')`, mentre `selected` definisce lo stato della selezione (se è selezionata o meno).

In practice, we usually should set both values to `true` or `false` (or omit, that's the same as `false`).

For instance, here's a new "unselected" option:

```js
let option = new Option("Text", "value");
// creates <option value="value">Text</option>
```

The same option, but selected:

```js
let option = new Option("Text", "value", true, true);
```

Option elements have properties:

`option.selected`
: Is the option selected.

`option.index`
: The number of the option among the others in its `<select>`.

`option.text`
: Text content of the option (seen by the visitor).

## References

- Specification: <https://html.spec.whatwg.org/multipage/forms.html>.

## Summary

Form navigation:

`document.forms`
: A form is available as `document.forms[name/index]`.

`form.elements`  
: Gli elementi del form sono disponibili come `form.elements[name/index]`, oppure, più semplicemente con `form[name/index]`. La proprietà `elements` esiste anche per i `<fieldset>`.


`element.form`
: Elements reference their form in the `form` property.

Value is available as `input.value`, `textarea.value`, `select.value` etc, or `input.checked` for checkboxes and radio buttons.

For `<select>` we can also get the value by the index `select.selectedIndex` or through the options collection `select.options`.

Queste sono le basi da cui partire con i form. Incontreremo molti esempi più avanti nel tutorial.


In the next chapter we'll cover `focus` and `blur` events that may occur on any element, but are mostly handled on forms.
