La soluzione è breve, ma potrebbe sembrare difficile, quindi la commenteremo in dettaglio:

```js
let sortedRows = Array.from(table.tBodies[0].rows) // 1
  .sort((rowA, rowB) => rowA.cells[0].innerHTML.localeCompare(rowB.cells[0].innerHTML));

table.tBodies[0].append(...sortedRows); // (3)
```

L'algoritmo passo per passo:

1. Trova tutti i `<tr>` dentro `<tbody>`. 
2. Ordinali comparando il contenuto del primo `<td>` (il campo con il nome).
3. Ora inserisci i nodi nel giusto ordine con `.append(...sortedRows)`.

Non dobbiamo rimuovere gli elementi della fila, solo "re-inserirli", lasciano automaticamente il vecchio posto.

P.S. Nel nostro caso c'è un esplicito `<tbody>` nella tabella; ma se anche non vi fosse, la struttura DOM lo include sempre e comunque. 
