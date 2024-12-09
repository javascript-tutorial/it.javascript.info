
# Elemento Template

<<<<<<< HEAD
L'elemento built-in `<template>` funziona come uno storage per i templates del markup HTML. Il browser ignora il suo contenuto, controllandone solamente la validità della sintassi, ma possiamo accedervi ed usarli via JavaScript, per creare altri elementi.
=======
A built-in `<template>` element serves as a storage for HTML markup templates. The browser ignores its contents, only checks for syntax validity, but we can access and use it in JavaScript, to create other elements.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

In teoria, possiamo creare qualunque elemento invisibile in qualunque punto dell'HTML, al solo scopo di salvare del markup HTML. Cos'altro possiamo dire su `<template>`?

Prima di tutto il contenuto può essere qualunque HTML valido, anche se, normalmente richiede un tag di inclusione appropriato.

Per esempio, possiamo inserire la riga di una tabella `<tr>`:
```html
<template>
  <tr>
    <td>Contenuti</td>
  </tr>
</template>
```

Solitamente, se proviamo a inserire un `<tr>`, per esempio, dentro un `<div>`, il browser riconoscerà una struttura non valida, "correggendola", aggiungendovi una tabella attorno. Questo non è il comportamento corretto, ma d'altra parte `<template>` mantiene le cose esattamente come le inseriamo.

Dentro i tag `<template>` possiamo anche inserire stili e scripts:

```html
<template>
  <style>
    p { font-weight: bold; }
  </style>
  <script>
    alert("Hello");
  </script>
</template>
```

Il browser considera il contenuto di `<template>` "avulso dal documento": gli stili non verranno applicati, gli script non verranno eseguiti, i `<video autoplay>` non partiranno in automatico, etc.

Il contenuto prende vita (gli stili vengono applicati, gli script vengono eseguiti, etc) solo quando viene inserito dentro il documento.

## Inserimento del template

Il contenuto del template è disponibile nella proprietà `content` come [DocumentFragment](info:modifying-document#document-fragment), un particolare tipo di nodo DOM.

Possiamo trattarlo come ogni altro nodo del DOM, tranne per una sua peculiarità: quando lo inseriamo da qualche parte, come DocumentFragment, vengono inseriti solo i suoi figli.

Per esempio:

```html run
<template id="tmpl">
  <script>
    alert("Hello");
  </script>
  <div class="message">Hello, world!</div>
</template>

<script>
  let elem = document.createElement('div');

*!*
  // Clona il contenuto del template per riutilizzarlo piu' volte
  elem.append(tmpl.content.cloneNode(true));
*/!*

  document.body.append(elem);
  // Ora lo script dentro <template> viene eseguito
</script>
```

Riscriviamo un esempio di Shadow DOM, preso dal capitolo precedente, usando però `<template>`:

```html run untrusted autorun="no-epub" height=60
<template id="tmpl">
  <style> p { font-weight: bold; } </style>
  <p id="message"></p>
</template>

<div id="elem">Cliccami</div>

<script>
  elem.onclick = function() {
    elem.attachShadow({mode: 'open'});

*!*
    elem.shadowRoot.append(tmpl.content.cloneNode(true)); // (*)
*/!*

    elem.shadowRoot.getElementById('message').innerHTML = "Saluti dalle ombre!";
  };
</script>
```

Nella riga `(*)` quando cloniamo ed inseriamo `tmpl.content`, come `DocumentFragment`, vengono inseriti i suoi figli (`<style>`, `<p>`).

Questi formano lo shadow DOM:

```html
<div id="elem">
  #shadow-root
    <style> p { font-weight: bold; } </style>
    <p id="message"></p>
</div>
```

## Riepilogo

- il contenuto di `<template>` può essere qualunque HTML sintatticamente corretto.
- il contenuto di `<template>` essendo considerato "avulso dal documento", non modificherà, né eseguirà alcunché al suo interno.
- Possiamo accedere a `template.content` via JavaScript, ed anche clonarlo per poterlo riutilizzare in un nuovo componente.

Il tag `<template>` ha delle peculiarità uniche, in quanto:

- Il browser controlla la sintassi HTML al suo interno (diversamente dall'uso di un template string dentro uno script).
- ...Tuttavia è permesso l'uso di tag HTML top-level, anche quelli che non avrebbero alcun senso se privi del loro appropriato contenitore (per esempio i `<tr>`).
- Il contenuto diventa interattivo (gli scripts vengono eseguiti, i `<video autoplay>` partono, etc) quando viene inserito dentro il documento.

L'elemento `<template>` non comprende alcun tipo di meccanismo di interazione, data binding o sostituzioni di variabili, ma possiamo implementarli.
