Quando il browser legge un attributo `on*` come `onclick`, crea il gestore dal suo contenuto.

Nel caso di `onclick="handler()"` la funzione sarà:

```js
function(event) {
  handler() // il contenuto del click
}
```

Possiamo osservare che il valore restituito da `handler()` non viene usato e non influenza il risultato.

Il fix è semplice:

```html run
<script>
  function handler() {
    alert("...");
    return false;
  }
</script>

<a href="https://w3.org" onclick="*!*return handler()*/!*">w3.org</a>
```

Possiamo anche usare `event.preventDefault()`, come in questo esempio:

```html run
<script>
*!*
  function handler(event) {
    alert("...");
    event.preventDefault();
  }
*/!*
</script>

<a href="https://w3.org" onclick="*!*handler(event)*/!*">w3.org</a>
```
