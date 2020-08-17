importanza: 5

---

# Perchè è necessario Origin?

Come probabilmente saprai, l HTTP-header `Referer`, contiene comunemente l'url della pagina dalla quale inizia la network request.

Per esempio, quando richiediamo `http://google.com` da `http://javascript.info/some/url`, le headers dovrebbero essere:

```
Accept: */*
Accept-Charset: utf-8
Accept-Encoding: gzip,deflate,sdch
Connection: keep-alive
Host: google.com
*!*
Origin: http://javascript.info
Referer: http://javascript.info/some/url
*/!*
```

Come puoi vedere sia `Referer` che `Origin` sono presenti.

Le domande sono:

<<<<<<< HEAD
1. Perché `Origin` è necessaria se `Referer` possiede la stessa informazione?
2. È possibile che non ci sia `Referer` o `Origin`, oppure ciò sarebbe scorretto?
=======
1. Why `Origin` is needed, if `Referer` has even more information?
2. Is it possible that there's no `Referer` or `Origin`, or is it incorrect?
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05
