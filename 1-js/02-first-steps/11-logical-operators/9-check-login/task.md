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

![](ifelse_task.png)

Utilizzate blocchi `if` annidati. Tenete a mente anche la leggibilità del codice.

<<<<<<< HEAD:1-js/02-first-steps/10-ifelse/4-check-login/task.md
Suggerimento: passare un input vuoto tramite prompr ritorna una stringa vuota `''`. Premere `key:ESC` con prompt aperto ritorna `null`.
=======
Hint:  passing an empty input to a prompt returns an empty string `''`. Pressing `key:ESC` during a prompt returns `null`.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:1-js/02-first-steps/11-logical-operators/9-check-login/task.md

[demo]
