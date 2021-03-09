1. Si, è vero. L'elemento `elem.lastChild` è sempre l'ultimo, non ha `nextSibling`.
2. No, è falso, perché `elem.children[0]` è il primo figlio tra i nodi di tipo *elemento*, ma potrebbero esserci nodi di tipo diverso. Ad esempio `previousSibling` potrebbe essere un nodo di testo.

Nota: in entrambi i casi, se non ci sono figli si verificherà un errore.

Se non ci sono figli, `elem.lastChild` è `null`, quindi non possiamo accedere a `elem.lastChild.nextSibling`. E la collection `elem.children` sarà vuota (Come un array vuoto `[]`).
