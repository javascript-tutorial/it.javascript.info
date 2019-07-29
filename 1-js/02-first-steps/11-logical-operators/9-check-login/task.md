importance: 3

---

# Controlla il login

Scrivi il codice che richiede un login tramite `prompt`.

<<<<<<< HEAD
Se l'utente digita `"Admin"`, allora si richiede una password tramite `prompt`, se l'input è una stringa vuota o `key:Esc` -- mostra "Canceled.", se invece è un'altra stringa -- allora mostra "I don't know you".
=======
If the visitor enters `"Admin"`, then `prompt` for a password, if the input is an empty line or `key:Esc` -- show "Canceled", if it's another string -- then show "I don't know you".
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

La passoword viene controllata con le seguenti regole:

<<<<<<< HEAD
- Se è uguale a "TheMaster", allora mostra "Welcome!",
- Un'altra stringa -- mostra "Wrong password",
- Per una stringa vuota o `key:Esc`, mostra "Canceled."
=======
- If it equals "TheMaster", then show "Welcome!",
- Another string -- show "Wrong password",
- For an empty string or cancelled input, show "Canceled"
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

Lo schema:

![](ifelse_task.svg)

Utilizzate blocchi `if` annidati. Tenete a mente anche la leggibilità del codice.

Suggerimento: passare un input vuoto tramite prompt ritorna una stringa vuota `''`. Premere `key:ESC` con prompt aperto ritorna `null`.

[demo]
