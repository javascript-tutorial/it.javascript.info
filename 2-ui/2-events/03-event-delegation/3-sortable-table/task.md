importance: 4

---

# Tabella ordinabile

Rendere la tabella ordinabile: i click sui `<th>` dovrebbero ordinarne i valori secondo la colonna corrispondente.

Ogni `<th>` ha il suo tipo specificato nell'attributo, come in qesto esempio:

```html
<table id="grid">
  <thead>
    <tr>
*!*
      <th data-type="number">Age</th>
      <th data-type="string">Name</th>
*/!*
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>5</td>
      <td>John</td>
    </tr>
    <tr>
      <td>10</td>
      <td>Ann</td>
    </tr>
    ...
  </tbody>
</table>
```

Nell'esempio, la prima colonna contiene numeri, la seconda -- stringhe. La funzione di ordinamento dovrebbe gestire l'ordine secondo il tipo specificato in attributo.

Devono essere supportate solo i tipi `"string"` e `"number"`.

Esempio funzionante:

[iframe border=1 src="solution" height=190]

P.S.: La tabella potrebbe essere grande, con una quantità arbitraria di righe e colonne.
