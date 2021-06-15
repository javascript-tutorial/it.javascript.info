importance: 5

---

# Modificare un TD al click

Rendete le celle della tabella modificabili al click.

- Al click -- la cella dovrebbe diventare "modificabile" (compare una textarea al suo interno), e possiamo modificarne l'HTML. Non dovrebbe essere possibile il ridimensionamento, tutte le geometrie dovrebbero rimanere le stesse.
- I pulsanti OK e CANCEL devono apparire sotto la cella per completare/cancel la modifica.
- Si può modificare solamente una cella per volta. Mentre un `<td>` è in modalità "edit", i click nelle altre celle vengono ignorati.
- La tabella può avere più celle. Usare la event delegation.

La demo:

[iframe src="solution" height=400]
