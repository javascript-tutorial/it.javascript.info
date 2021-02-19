importance: 5

---

# Lista selezionabile

Creare una lista nella quale gli elementi siano selezionabili, come nei file manager.

- Un click su una lista seleziona solo quell'elemento (aggiunge la classe `.selected`), e deseleziona tutti gli altri.
- Se un click viene fatto insieme a `key:Ctrl` (`key:Cmd` per Mac), allora la seleziona viene alternata sull'elemento, ma gli altri elementi non vengono modificati.

La demo:

[iframe border="1" src="solution" height=180]

P.S.: Per questo compito possiamo assumere che questi elementi siano composti solamente da testo. Nessun tag annidato.

P.P.S.: Prevenire la selezione nativa del browser sul testo al click.
