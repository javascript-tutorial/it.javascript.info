# Inserimento dopo la sezione head

Abbiamo una stringa e un documento HTML.

Scrivete un'espressione regolare che inserisca `<h1>Hello</h1>` subito dopo il tag `<body>`. Il tag può avere degli attributi.

Per esempio:

```js
let regexp = /your regular expression/;

let str = `
<html>
  <body style="height: 200px">
  ...
  </body>
</html>
`;

str = str.replace(regexp, `<h1>Hello</h1>`);
```

<<<<<<< HEAD
Dopo l'inserimento il valore di `str` dovrebbe essere:
=======
After that the value of `str` should be:

>>>>>>> 5dff42ba283bce883428c383c080fa9392b71df8
```html
<html>
  <body style="height: 200px"><h1>Hello</h1>
  ...
  </body>
</html>
```
