C'è un tranello in questo esercizio.

Al momento dell'esecuzione di `<script>` l'ultimo nodo del DOM è esattamente `<script>`, dal momento che il browser non ha ancora elaborato il resto della pagina.

Pertanto il risultato è `1` (nodo elemento).

```html run height=60
<html>

<body>
  <script>
    alert(document.body.lastChild.nodeType);
  </script>
</body>

</html>
```
