<<<<<<< HEAD:9-regular-expressions/12-regexp-anchors/1-start-end/solution.md

L'unica corrispondenza si ha con la stringa vuota: inizia e poi finisce immediatamente.
=======
An empty string is the only match: it starts and immediately finishes.
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b:9-regular-expressions/04-regexp-anchors/1-start-end/solution.md

Questo task dimostra ancora che gli ancoraggi non rappresentano caratteri, bensì test.

La stringa è vuota `""`. Il motore prima fa cerca corrispondenze per `pattern:^` (inizio input), ed è presente, e subito dopo cerca la fine `pattern:$`, e c'è anch'essa. Quindi c'è corrispondenza.
