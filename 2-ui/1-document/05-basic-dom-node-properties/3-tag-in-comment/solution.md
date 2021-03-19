Risposta: **`BODY`**.

```html run
<script>
  let body = document.body;

  body.innerHTML = "<!--" + body.tagName + "-->";

  alert( body.firstChild.data ); // BODY
</script>
```

Cosa succede passo dopo passo:

1. Il contenuto di `<body>` è rimpiazzato con il commento. Il commento è `<!--BODY-->`, poiché `body.tagName == "BODY"`. Abbiamo detto che, `tagName` è sempre maiuscolo in modalità HTML.
2. Il commento è ora l'unico nodo figlio, perciò è il risultato di `body.firstChild`.
3. La proprietà `data` del commento è il suo contenuto (ovvero ciò che è dentro i tag di apertura e chiusura `<!--...-->`): `"BODY"`.
