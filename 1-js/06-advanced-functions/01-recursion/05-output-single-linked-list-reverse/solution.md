# Soluzione ricorsiva

In questo caso la logica ricorsiva è un pò più complessa.

Dobbiamo prima stampare il resto della lista e *successivamente* stampare l'elemento corrente:

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

function printReverseList(list) {

  if (list.next) {
    printReverseList(list.next);
  }

  alert(list.value);
}

printReverseList(list);
```

# Soluzione iterativa

Anche la soluzione iterativa risulta essere un pò complicata.

Non abbiamo alcun modo per ottenere l'ultimo valore della nostra `list`. E comunque non potremmo "andare indietro".

Quindi quello che dobbiamo fare in questo caso è attraversare gli elementi e memorizzarli in un array, successivamente stamparli in ordine inverso:

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

function printReverseList(list) {
  let arr = [];
  let tmp = list;

  while (tmp) {
    arr.push(tmp.value);
    tmp = tmp.next;
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    alert( arr[i] );
  }
}

printReverseList(list);
```

Da notare che la soluzione ricorsiva fa esattamente la stessa cosa: scorre la lista, memorizza gli elementi nel contesto d'esecuzione, e successivamente li stampa. 
