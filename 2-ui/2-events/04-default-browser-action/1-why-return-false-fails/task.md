importance: 3

---

# Perchè "return false" non funziona?

Perchè nel seguente codice `return false` non funziona per niente?

```html autorun run
<script>
  function handler() {
    alert( "..." );
    return false;
  }
</script>

<a href="https://w3.org" onclick="handler()">il browser andrà su w3.org</a>
```

Il browser andrà all'URL al click, ma non è ciò che vogliamo.

Come si può sistemare?
