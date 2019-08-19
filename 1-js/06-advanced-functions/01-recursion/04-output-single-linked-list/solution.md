# Soluzione iterativa

La soluzione iterativa:

```js run
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printList(list) {
  let tmp = list;

  while (tmp) {
    alert(tmp.value);
    tmp = tmp.next;
  }

}

printList(list);
```

Da notare l'utilizzo di una variabile temporanea `tmp` per attraversare la lista. Tecnicamente, potremmo utilizzare `list`:

```js
function printList(list) {

  while(*!*list*/!*) {
    alert(list.value);
    list = list.next;
  }

}
```

<<<<<<< HEAD
...Ma potrebbe portare ad errori. In futuro potremmo voler estendere una funzione, fare qualcos altro con la lista. Se modifichiamo `list`, perderemmo questa capacità.
=======
...But that would be unwise. In the future we may need to extend a function, do something else with the list. If we change `list`, then we lose such ability.
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

Parlando della scelta dei nomi delle variabili, `list` è la lista stessa. Il primo elemento. E dovrebbe rimanere tale. 

D'altra parte, l'utilizzo di `tmp` ha esclusivamente lo scopo di attraversare la lista, come `i` nel caso di cicli `for`.

# Soluzione ricorsiva

La variante ricorsiva di `printList(list)` segue una semplice logica: per stampare una lista dovremmo stampare l'elemento corrente `list`, e fare lo stesso per `list.next`:

```js run
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printList(list) {

  alert(list.value); // output the current item

  if (list.next) {
    printList(list.next); // do the same for the rest of the list
  }

}

printList(list);
```

In questo caso qual'è la soluzione migliore?

Tecnicamente, la soluzione iterativa è più efficace. Queste due varianti portano allo stesso risultato, ma il ciclo non spende risorse aggiuntive per le chiamate annidate.

D'altra parte, la soluzione ricorsica è più breve e talvolta più semplice da capire.
