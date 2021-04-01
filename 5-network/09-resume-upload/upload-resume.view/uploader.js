class Uploader {

  constructor({file, onProgress}) {
    this.file = file;
    this.onProgress = onProgress;

    // crea un fileId che identifica univocamente il file
    // potremmo usare l'identificatore di sessione dell'utente (avendone uno) per essere ancora piu' sicuri della sua univocita'
    this.fileId = file.name + '-' + file.size + '-' + file.lastModified;
  }

  async getUploadedBytes() {
    let response = await fetch('status', {
      headers: {
        'X-File-Id': this.fileId
      }
    });

    if (response.status != 200) {
      throw new Error("Can't get uploaded bytes: " + response.statusText);
    }

    let text = await response.text();

    return +text;
  }

  async upload() {
    this.startByte = await this.getUploadedBytes();

    let xhr = this.xhr = new XMLHttpRequest();
    xhr.open("POST", "upload", true);

    // invia il file id, in modo da consentire al server di conoscere quale file ripristinare
    xhr.setRequestHeader('X-File-Id', this.fileId);
    // invia la posizione del byte dal quale stiamo partendo per il ripristino, in modo da informare il server da dove stiamo ripartendo
    xhr.setRequestHeader('X-Start-Byte', this.startByte);

    xhr.upload.onprogress = (e) => {
      this.onProgress(this.startByte + e.loaded, this.startByte + e.total);
    };

    console.log("send the file, starting from", this.startByte);
    xhr.send(this.file.slice(this.startByte));

    // return
    //   true se l'upload e' andato a buon fine
    //   false se annullato
    // throw in caso di errore
    return await new Promise((resolve, reject) => {

      xhr.onload = xhr.onerror = () => {
        console.log("upload end status:" + xhr.status + " text:" + xhr.statusText);

        if (xhr.status == 200) {
          resolve(true);
        } else {
          reject(new Error("Upload failed: " + xhr.statusText));
        }
      };

      // onabort viene scatenato solo se viene chiamato xhr.abort()
      xhr.onabort = () => resolve(false);

    });

  }

  stop() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

}
