
```html run height=100
<!DOCTYPE html>
<html>
<body>

  <div data-widget-name="menu">Choose the genre</div>

  <script>
    // trovalo
    let elem = document.querySelector('[data-widget-name]');

    // leggi il valore
    alert(elem.dataset.widgetName);
    // oppure
    alert(elem.getAttribute('data-widget-name'));
  </script>
</body>
</html>
```
