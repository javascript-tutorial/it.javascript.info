importance: 5

---

# Catturare i links nell'elemento

Fate in modo che tutti i links dentro l'elemento con `id="contents"` chiedano all'utente se vuole davvero abbandonare la pagina al click. Se risponde no, allora non deve seguire il link.

Come nell'esempio seguente:

[iframe height=100 border=1 src="solution"]

Dettagli:

- L'HTML dentro l'elemento potrebbe essere caricato o rigenerato in qualunque istante, quindi non possiamo trovare tutti i links ed inserirvi dei gestori all'interno. Utilizzare invece la event delegation.
- Il contenuto può contenere tags annidati. Anche dentro i links, per esempio potremmo avere `<a href=".."><i>...</i></a>`.
