function concat(arrays) {
  // somma delle lunghezze dei singoli array
  let totalLength = arrays.reduce((acc, value) => acc + value.length, 0);

  let result = new Uint8Array(totalLength);
  
  if (!arrays.length) return result;

  // ogni array, lo copiamo in result
  // l'array successivo viene copiato subito dopo quello precedente
  let length = 0;
  for(let array of arrays) {
    result.set(array, length);
    length += array.length;
  }

  return result;
}
