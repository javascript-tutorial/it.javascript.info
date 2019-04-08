importance: 5

---

# Stampare una single-linked list

Ipotizziamo di avere una single-linked list (descritta nel capitolo <info:recursion>):

```js
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
```

Scrivete una funzione `printList(list)` che ritorna gli elementi uno ad uno.

Create due varianti della soluzione: iterativa e ricorsiva.

Qual'è la migliore: ricorsione o senza?
