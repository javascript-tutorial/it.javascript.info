importance: 3

---

# Controlla il login

Scrivi il codice che richiede un login tramite `prompt`.

Se l'utente digita `"Admin"`, si richiede una password tramite `prompt`; se l'input è una stringa vuota o `key:Esc` -- mostra "Canceled."; se  è diversa da `"Admin"`, mostra "I don't know you".

La passoword viene controllata secondo i seguenti criteri:

- Se è uguale a "TheMaster", mostra "Welcome!",
- Un stringa diversa da "TheMaster" -- mostra "Wrong password",
- Una stringa vuota o `key:Esc` -- mostra "Canceled."

Lo schema:

![](ifelse_task.svg)

Utilizza blocchi `if` annidati e tieni a mente la leggibilità del codice.

Suggerimento: passare un input vuoto tramite prompt ritorna una stringa vuota `''`. Premere `key:ESC` metre il prompt è aperto ritorna `null`.

[demo]
