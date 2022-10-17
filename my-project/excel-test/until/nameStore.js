class NameStore {
  constructor() {
    this.id = 0;
    this.ids = {};
  }
  setName(name) {
    this.ids[this.id] = name;
    this.id++;
  }
  getID(name) {
    return this.getObjectKey(this.ids, name);
  }
  getNameArr() {
    return this.ids;
  }
  /**
   * 通过对象值来寻找键(key)
   * @param {Object} object 查找的值
   * @param {*} value 需要寻找的键
   * @returns 对象中查找到的key
   */
  getObjectKey(object, value) {
    return Object.keys(object).find((key) => object[key] == value);
  }
}
