
let LISTENERS = {}; // 订阅者集合
let STORE = {};  // 数据集合

/**
 * 订阅者
 *
 * @param {*} name
 * @param {*} self
 * MPX.getter('KEY',this)
 */
function getter(name, self) {
    let pages = LISTENERS[name], data = STORE[name], o = {};
    (Array.isArray(pages) && !pages.includes(self)) ? pages.push(self) : LISTENERS[name] = [self];
    if (data) { // 若有值，直接更新STORE值
        o[name] = data;
        self.setData(o)
    }
}


/**
 * 删除订阅者
 *
 * @param {*} name
 * @param {*} self
 * ex: MPX.remove('KEY',this)
 */
function remove(name, self) {
    let pages = LISTENERS[name];
    if (Array.isArray(pages)) {
        LISTENERS[name] = pages.filter(item => item != self)
    }
}

/**
 * 发布者
 *
 * @param {*} name
 * @param {*} data
 */
function setter(name, data) {
    let pages = LISTENERS[name], o = {};
    STORE[name] = data;
    o[name] = data;
    if (Array.isArray(pages)) {
        pages.map((item) => item.setData(o))
    }
}

exports.getter = getter;
exports.remove = remove;
exports.setter = setter;
