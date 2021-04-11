Risposta: **1 e 3**.

Entrambi i commandi risultano nell'aggiunta di `text` "come testo" dentro a `elem`.
Ecco un esempio:

```html run height=80
<div id="elem1"></div>
<div id="elem2"></div>
<div id="elem3"></div>
<script>
  let text = '<b>text</b>';

  elem1.append(document.createTextNode(text));
  elem2.innerHTML = text;
  elem3.textContent = text;
</script>
```
