const sha256 = require('js-sha256');

class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {

  constructor(numBuckets = 2) {
    // Your code here
    this.count = 0;
    this.capacity = numBuckets;
    this.data = new Array(this.capacity);

    for (let idx = 0; idx < this.data.length; idx++) {
      this.data[idx] = null;
    }
  }

  hash(key) {
    // Your code here
    
    let hash = sha256(key);
    let first8Chars = String(hash).slice(0, 8);
   
    let newKey = parseInt(first8Chars, 16)

    return newKey;
  }

  hashMod(key) {
    // Your code here
    return this.hash(key) % this.data.length;
  }

  insertNoCollisions(key, value) {
    // Your code here
    let index = this.hashMod(key);
    let keyVal = new KeyValuePair(key, value);

    if (this.data[index] === null) {
      this.data[index] = keyVal;
      this.count++;
    } else {
      throw Error("hash collision or same key/value pair already exists!")
    }

  }

  insertWithHashCollisions(key, value) {
    // Your code here
    let index = this.hashMod(key);
    let keyVal = new KeyValuePair(key, value);

    if (this.data[index] === null) {
      this.data[index] = keyVal;
    } else if (this.data[index]) {
      keyVal.next = this.data[index];
      this.data[index] = keyVal;
    }

    this.count++;
  }

  insert(key, value) {
    // Your code here
    let index = this.hashMod(key);
    let keyVal = new KeyValuePair(key, value);

    if (!this.data[index]) {
      this.data[index] = keyVal;
      this.count++;
    } else {
      let temp = this.data[index];
      let signal = false;

      while (temp) {

        if (key === temp.key) {
          temp.value = value;
          signal = true;
        }
        
        temp = temp.next;
      }

      if (!signal) {
        keyVal.next = this.data[index];
        this.data[index] = keyVal;
        this.count++;
      }


    }

  }

}

let ht = new HashTable(2);
ht.insertWithHashCollisions("key-1", "val-1");
ht.insertWithHashCollisions("key-2", "val-2");
ht.insertWithHashCollisions("key-3", "val-3");
console.log(ht.data);


module.exports = HashTable;