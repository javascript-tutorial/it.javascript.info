importance: 1

---

# Perché rimane "aaa"?

Nell'esempio sotto, la chiamata a `table.remove()` rimuove la tabella dal documento.

Ma se eseguiamo il codice, potrai vedere che il testo `"aaa"` è ancora visibile. 

Perché?

```html height=100 run
<table id="table">
  aaa
  <tr>
    <td>Test</td>
  </tr>
</table>

<script>
  alert(table); // la tabella, come dovrebbe essere

  table.remove();
<<<<<<< HEAD
  // perché aaa è ancora nel documento?
=======
  // why there's still "aaa" in the document?
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
</script>
```
