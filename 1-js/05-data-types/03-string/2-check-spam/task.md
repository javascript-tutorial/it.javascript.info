importance: 5

---

# Controllo spam

Scrivete una funzione `checkSpam(str)` che ritorna `true` se `str` contiene 'viagra' o 'XXX', altrimenti `false.

La funzione non deve essere sensibile al timbro delle lettere (quindi lettere maiuscole e minuscole vengono trattate allo stesso modo):

```js
checkSpam('buy ViAgRA now') == true
checkSpam('free xxxxx') == true
checkSpam("innocent rabbit") == false
```

