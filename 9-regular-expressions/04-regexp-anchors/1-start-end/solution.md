<<<<<<< HEAD:9-regular-expressions/12-regexp-anchors/1-start-end/solution.md

L'unica corrispondenza si ha con la stringa vuota: inizia e poi finisce immediatamente.
=======
An empty string is the only match: it starts and immediately finishes.
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc:9-regular-expressions/04-regexp-anchors/1-start-end/solution.md

Questo task dimostra ancora che gli ancoraggi non rappresentano caratteri, bensì test.

La stringa è vuota `""`. Il motore prima fa cerca corrispondenze per `pattern:^` (inizio input), ed è presente, e subito dopo cerca la fine `pattern:$`, e c'è anch'essa. Quindi c'è corrispondenza.
