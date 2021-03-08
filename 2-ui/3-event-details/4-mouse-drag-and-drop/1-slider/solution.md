Come possiamo notare dall'HTML/CSS, lo slider è un `<div>` con sfondo colorato, che contiene un altro `<div>` con `position:relative`.

Per posizionare il cursore useremo `position:relative`, per fornire le coordinate relative al genitore, ed in questo caso è meglio usarlo al posto di `position:absolute`.

Quindi andremo a implementare il Drag'n'Drop esclusivamente orizzontale con il vincolo sulla larghezza.
