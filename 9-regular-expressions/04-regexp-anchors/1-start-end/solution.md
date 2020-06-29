<<<<<<< HEAD:9-regular-expressions/12-regexp-anchors/1-start-end/solution.md

L'unica corrispondenza si ha con la stringa vuota: inizia e poi finisce immediatamente.
=======
An empty string is the only match: it starts and immediately finishes.
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8:9-regular-expressions/04-regexp-anchors/1-start-end/solution.md

Questo task dimostra ancora che gli ancoraggi non rappresentano caratteri, bensì test.

La stringa è vuota `""`. Il motore prima fa cerca corrispondenze per `pattern:^` (inizio input), ed è presente, e subito dopo cerca la fine `pattern:$`, e c'è anch'essa. Quindi c'è corrispondenza.
