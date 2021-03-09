Ci sono molti modi per farlo.

Eccone alcuni:

```js
// 1. La tabella con `id="age-table"`.
let table = document.getElementById('age-table')

// 2. Tutti gli elementi label dentro la tabella
table.getElementsByTagName('label')
// oppure
document.querySelectorAll('#age-table label')

// 3. Il primo td dentro la tabella (con la parola "Age")
table.rows[0].cells[0]
// oppure
table.getElementsByTagName('td')[0]
// oppure
table.querySelector('td')

// 4. La form con il nome "search"
// supponendo ci sia solo un elemento con name="search" nel documento
let form = document.getElementsByName('search')[0]
// oppure, form specificamente
document.querySelector('form[name="search"]')

// 5. Il primo input nella form.
form.getElementsByTagName('input')[0]
// oppure
form.querySelector('input')

// 6. L'ultimo input nella form
let inputs = form.querySelectorAll('input') // trova tutti gli input
inputs[inputs.length-1] // prendi l'ultimo
```
