# Trovate l'intero tag

Scrivete una regexp per trovare il tag `<style...>`. Essa dovrebbe trovare corrispondenza con l'intero tag: esso potrebbe non avere alcun attributo `<style>` o averne diversi `<style type="..." id="...">`.

La regexp, tuttavia, non dobrebbe accettare `<styler>`!

Per esempio:

```js
let regexp = /your regexp/g;

alert( '<style> <styler> <style test="...">'.match(regexp) ); // <style>, <style test="...">
```
