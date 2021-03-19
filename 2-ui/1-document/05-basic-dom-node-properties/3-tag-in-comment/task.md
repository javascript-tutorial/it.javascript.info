importance: 3

---

# Tag nel commento

Cosa mostrerà questo codice?

```html
<script>
  let body = document.body;

  body.innerHTML = "<!--" + body.tagName + "-->";

  alert( body.firstChild.data ); // cosa c'è qui?
</script>
```
