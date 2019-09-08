importance: 3

---

# Controlla il login

Scrivi il codice che richiede un login tramite `prompt`.

Se l'utente digita `"Admin"`, allora si richiede una password tramite `prompt`, se l'input è una stringa vuota o `key:Esc` -- mostra "Canceled.", se invece è un'altra stringa -- allora mostra "I don't know you".

La passoword viene controllata con le seguenti regole:

- Se è uguale a "TheMaster", allora mostra "Welcome!",
- Un'altra stringa -- mostra "Wrong password",
- Per una stringa vuota o `key:Esc`, mostra "Canceled."

Lo schema:

![](ifelse_task.svg)

Utilizzate blocchi `if` annidati. Tenete a mente anche la leggibilità del codice.

Suggerimento: passare un input vuoto tramite prompt ritorna una stringa vuota `''`. Premere `key:ESC` con prompt aperto ritorna `null`.

[demo]
