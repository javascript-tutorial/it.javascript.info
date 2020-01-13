# Ricevi utenti da GitHub con Fetch

<<<<<<< HEAD
Crea la funzione async `getUsers(names)` che riceve un array di GitHub logins ed esegue il fetch degli utenti da GitHub. Infine ritorna l'array degli utenti stessi.

Usa l'url di GitHub per le informazioni degli utenti, indicando l'utente al posto del segnaposto `USERNAME`: `https://api.github.com/users/USERNAME`.
=======
Create an async function `getUsers(names)`, that gets an array of GitHub logins, fetches the users from GitHub and returns an array of GitHub users.

The GitHub url with user information for the given `USERNAME` is: `https://api.github.com/users/USERNAME`.
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874

C'è un esempio di test nella sandbox.

Dettagli importanti:

1. Ci dovrebbe essere una sola richiesta `fetch` per utente.
2. Le richieste non dovrebbero essere bloccanti, così che i dati possano arrivare il prima possibile.
3. Se una richiesta fallisce, o se non esiste tale utente, la funzione dovrebbe restituire `null` nell'array dei risultati.
