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
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c
</script>
```
