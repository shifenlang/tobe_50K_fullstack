/**
 * @version 0.0.1
 * @author Chengcheng ZHOU
 */

/**
 * funtions:
 *     1 Manage data (CRUD)
 *     2 Add subscriber
 */
function createZtore(...args) {
    const _version = '0.0.1';
    let _data = {};
    let _subscribers = {};

    // init _data and _subscribers
    args.length > 0 ? init(_data, args[0], args[1], _subscribers) : null;

    //build Proxy of data
    let _proxyHandler = {
        get: (target, key) => target[key],
        set: (target, key, value) => {
            (Object.keys(_subscribers).includes(key)) ? _subscribers[key](target[key], value) : null;
            target[key] = value;
        },
    }
    let _dataProxy = new Proxy(_data, _proxyHandler);

    //add data
    this.add = (key, value, fn = null) => {
        if (_dataProxy[key] === undefined) {
            _dataProxy[key] = value;
            (fn && typeof fn === 'function') ?
                (() => { _subscribers[key] = fn })() :
                (() => { console.warn(`The third parameter should be a function, please kindly comfirm with it. Prop ==> [${key}]`) })();
        } else {
            console.warn(`The key [${key}] you want store has been exsited, please rename it with other name.`)
        }
    }

    //find data
    this.find = (key) => {
        if (_dataProxy[key] !== undefined) {
            return (typeof value === 'function') ? (() => {
                console.warn(`You can't get prop '${key}', because it's a function`);
                return null;
            })() : _dataProxy[key]
        } else {
            console.warn(`You have not stored [${key}] to ztore, please kindly recheck with it.`)
        }
    }

    //update data
    this.update = (key, value) => {
        if (_dataProxy[key] !== undefined) {
            (key && key !== 0) ?
                _dataProxy[key] = value :
                (() => { console.warn(`The key must be defined. please kindly recheck with it.`) })()
        } else {
            console.warn(`You have not store [${key}] to 'ztore'. You can use 'add' to add more data to 'ztore'`)
        }
    }

    //delete data
    this.delete = (key) => {
        if (_dataProxy[key] !== undefined) {
            //delete data
            delete _dataProxy[key];

            //delete specific subscriber
            if (_subscribers[key]) {
                delete _subscribers[key];
            }
        } else {
            console.warn(`You have not stored [${key}] to ztore, please kindly recheck with it.`)
        }
    }

    //bind data subscriber 
    this.bind = (key, fn = null) => {
        if (_dataProxy[key] !== undefined) {
            if (typeof fn === 'function') {
                _subscribers[key] = fn;
            } else {
                console.warn(`The second parameter must be function, please kindly recheck with it.`)
            }
        } else {
            console.warn(`You have not stored [${key}] to ztore, please kindly recheck with it.`)
        }
    }

    //unbind data subscriber
    this.unbind = (key) => {
        if (_subscribers[key] !== undefined) {
            delete _subscribers[key];
        } else {
            console.warn(`You have not subscribe [${key}], please kindly recheck with it.`)
        }
    }

    this.version = () => {
        console.log(`Current version is: ${_version}`);
    }
}

function init(_data, args0, args1, _subscribers) {
    //init _data
    Object.keys(args0).length > 0 ? (function (keys) {
        keys.forEach(key => {
            let value = args0[key];
            if (typeof value === 'function') {
                _data[key] = value;
            } else {
                _data[key] = JSON.parse(JSON.stringify(value));
            }
        });
    })(Object.keys(args0)) : null;

    //init _subscribers
    Object.keys(args1).length > 0 ? (function (keys) {
        keys.forEach(key => {
            let value0 = args0[key];
            let value1 = args1[key];
            if (value0) {
                (typeof value0 === 'function') ?
                    (() => { console.log(`You can't subscribe a function. The key is 'key', please kindly comfirm with it.`) })()
                    : _subscribers[key] = value1;
            } else {
                console.warn(`You have not subscribe [${key}], please kindly recheck with it.`)
            }
        });
    })(Object.keys(args1)) : null;
}

window.createZtore = createZtore;