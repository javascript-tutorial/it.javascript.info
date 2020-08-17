
Per eseguire il fetch di un utente usa: `fetch('https://api.github.com/users/USERNAME')`.

Se lo status del response è `200`, chiama `.json()` per leggere l'oggetto (object) JS.

<<<<<<< HEAD
Altrimenti, se il `fetch` dovesse fallire, o lo status della risposta non è 200, ritorna `null` nell'array dei risultati.
=======
Otherwise, if a `fetch` fails, or the response has non-200 status, we just return `null` in the resulting array.
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05

So here's the code:

```js demo
async function getUsers(names) {
  let jobs = [];

  for(let name of names) {
    let job = fetch(`https://api.github.com/users/${name}`).then(
      successResponse => {
        if (successResponse.status != 200) {
          return null;
        } else {
          return successResponse.json();
        }
      },
      failResponse => {
        return null;
      }
    );
    jobs.push(job);
  }

  let results = await Promise.all(jobs);

  return results;
}
```

Nota che: la chiamata `.then` è agganciata direttamente al `fetch`, cosi che quando riceveremo una risposta, non ci sarà attesa per le altre fetches ma inizierà immediatamente la lettura di `.json()`.

Se invece usassimo `await Promise.all(names.map(name => fetch(...)))` e chiamassimo `.json()` sui risultati, dovremmo attendere che tutte le fetches rispondano. Aggiungendo direttamente `.json()` ad ogni `fetch` invece ci assicureremo che ogni singolo fetch inizi la lettura dei dati come JSON senza attendere le altre.

Questo è un esempio di come l'API low-level Promise possa ancora essere utile anche se usiamo principalmente `async/await`.
