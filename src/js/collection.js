export class MyCollection {
  storage = [];

  set(key, value) {
    this.storage.push({
      //добавляя элементы в конец массива выполняется условие хранения элементов в зависимости очередности добавления
      key: key,
      value: value,
      index: this.storage.length,
    });
  }
  has(key) {
    let result = false;
    this.storage.forEach((item) => {
      if (item.key === key) {
        result = true;
      }
    });
    return result;
  }
  hasIndex(index) {
    let result = false;
    this.storage.forEach((item) => {
      if (item.index === index) {
        result = true;
      }
    });
    return result;
  }
  //- возвращает массив значений по ключу
  get(key) {
    const result = [];
    this.storage.forEach((item) => {
      if (item.key === key) {
        result.push(item.value);
      }
    });
    return result;
  }

  getByIndex(index) {
    if (!this.hasIndex(index)) {
      return undefined;
    }
    this.storage.forEach((item) => {
      if (item.index === index) {
        return item.value;
      }
    });
  }
  removeByKey(key) {
    const result = this.storage.filter((item) => item.key !== key);
    this.storage = result.map((item, i) => {
      return { ...item, index: i };
    });
  }
  get size() {
    return this.storage.length;
  }
}
