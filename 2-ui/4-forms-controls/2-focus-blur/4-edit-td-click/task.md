importance: 5

---

# Modificare un TD al click

Rendete le celle della tabella modificabili al click.

<<<<<<< HEAD
- Al click -- la cella dovrebbe diventare "modificabile" (compare una textarea al suo interno), e possiamo modificarne l'HTML. Non dovrebbe essere possibile il ridimensionamento, tutte le geometrie dovrebbero rimanere intatte.
- I pulsanti OK e CANCEL devono apparire sotto la cella per completare/cancel la modifica.
- Si può modificare solamente una cella per volta. Mentre un `<td>` è in modalità "edit mode", i click nelle altre celle vengono ignorati.
- La tabella può avere tante celle. Usare la event delegation.
=======
- On click -- the cell should become "editable" (textarea appears inside), we can change HTML. There should be no resize, all geometry should remain the same.
- Buttons OK and CANCEL appear below the cell to finish/cancel the editing.
- Only one cell may be editable at a moment. While a `<td>` is in "edit mode", clicks on other cells are ignored.
- The table may have many cells. Use event delegation.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

La demo:

[iframe src="solution" height=400]
