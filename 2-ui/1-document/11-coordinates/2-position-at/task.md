importance: 5

---

# Mostrate una nota vicino l'elemento

Create una funzione `positionAt(anchor, position, elem)` che posizioni `elem` vicino l'elemento `anchor` in base a `position`.

Il parametro `position` deve essere una stringa con uno dei 3 valori seguenti:
- `"top"` - posiziona `elem` proprio sopra `anchor`
- `"right"` - posiziona `elem` subito a destra di `anchor`
- `"bottom"` - posiziona `elem` esattamente sotto `anchor`

Il codice che scriverete viene richiamato dalla funzione `showNote(anchor, position, html)`, che trovate nel codice sorgente dell'esercizio e che crea una nota con l'`html` passato come parametro e lo mostra nella `position` assegnata vicino all'elemento `anchor`.

Ecco un esempio:

[iframe src="solution" height="350" border="1" link]
