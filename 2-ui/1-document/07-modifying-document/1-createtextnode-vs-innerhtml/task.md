importance: 5

---

# createTextNode vs innerHTML vs textContent

Abbiamo `elem`, un elemento DOM vuoto, e una stringa`text`.

Quali di questi 3 comandi fanno esattamente la stessa cosa?

1. `elem.append(document.createTextNode(text))`
2. `elem.innerHTML = text`
3. `elem.textContent = text`
