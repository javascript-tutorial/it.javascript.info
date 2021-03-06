Si, sembra strano.

Ma `instanceof` non prende in considerazione la funzione, ma piuttosto il suo `prototype`, che trova riscontro nella catena dei prototye.

In questo caso `a.__proto__ == B.prototype`, quindi `instanceof` ritorna `true`.

Quindi, secondo la logica di `instanceof`, è il `prototype` a definire il tipo, non il costruttore.
