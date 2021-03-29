Creeremo una tabella come stringa, `"<table>...</table>"`. e poi la assegneremo a `innerHTML`

L'algoritmo:

1. Crea il header della tabella con `<th>` e i nomi dei giorni. 
2. Crea l'oggetto data `d = new Date(year, month-1)`. Questo è il primo giorno di `month` (prendendo in considerazione che in Javascript i mesi partono da `0`, non da `1`).
3. Le prime celle fino al primo del mese `d.getDay()` sono vuote. Riempiamole con `<td></td>`.
4. Aumentiamo il giorno in `d`: `d.setDate(d.getDate()+1)`. Se `d.getMonth()` non è ancora il mese successivo, aggiungi la nuova cella `<td>` al calendario. Se questo è una domenica, aggiungi una nuova linea <code>"&lt;/tr&gt;&lt;tr&gt;"</code>.
5. Se il mese è finito ma la fila della tabella non è ancora piena, aggiungi un `<td>` vuoto in modo da renderla rettangolare.
