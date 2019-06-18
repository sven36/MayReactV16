
import {
    ELEMENT_TYPE_STRING,
    ELEMENT_TYPE_FUNCTION,
    ELEMENT_TYPE_SVG,
    REF_TYPE_STRING,
    REF_TYPE_FUNCTION,
    REF_TYPE_OBJECT,
    REACT_ELEMENT_TYPE
} from './utils';

let ReactCurrentOwner = {
    current: null
}

/**
 * 
 * @param {*} type dom类型或func
 * @param {*} props dom属性
 * @param {*} children 子节点
 */
export function createElement(type, config, children) {

    var props = {};
    var key = null;
    var ref = null;
    var mtype = null;
    var getContext = null;
    var len = arguments.length - 2;
    //null代表没有ref 1代表ref为func 2为string
    var refType = null;
    //既然render的时候都需要判断下type 是fun或string
    //那把这一步提前 比render循环里判断更好些;
    var _type = typeof type;
    switch (_type) {
        case 'string': //HtmlElement 1  SVG 3
            mtype = type !== 'svg' ? ELEMENT_TYPE_STRING : ELEMENT_TYPE_SVG;
            break;
        case 'function': //component 或statelessComponent
            mtype = ELEMENT_TYPE_FUNCTION;
            //如果有contextTypes代表该组件可以取context
            type.contextTypes && (getContext = true);
            break;
    }
    if (config) {
        key = config.key !== void 0 ? ('' + config.key) : null;
        ref = config.ref || null;
        if (typeof ref === 'number') {
            ref = '' + ref;
        }
        if (ref) {
            var _refType = typeof ref;
            switch (_refType) {
                case 'function':
                    refType = REF_TYPE_FUNCTION;
                    break;
                case 'string':
                    refType = REF_TYPE_STRING;
                    break;
                case 'object':
                    refType = REF_TYPE_OBJECT;
                    break;
            }
        }
        for (var i in config) {
            if (i !== 'key' && i != 'ref') {
                props[i] = config[i];
            }
        }
    }
    var defaultProps = type.defaultProps;
    if (defaultProps) {
        for (var propName in defaultProps) {
            if (props[propName] === void 666) {
                props[propName] = defaultProps[propName];
            }
        }
    }
    if (len > 1) {
        var array = new Array();
        for (var i = 0; i < len; i++) {
            var c = arguments[i + 2];
            if (!Array.isArray(c)) {
                array.push(c);
            } else {
                c.forEach(function (item) {
                    array.push(item);
                });
            }
        }
        props.children = array;
    } else if (len === 1) {
        props.children = children;
    }

    return ReactElement(type, key, ref, props, mtype, getContext, refType, ReactCurrentOwner.current);
}

/**
 * 
 * @param {*} type 
 * @param {*} key 
 * @param {*} ref 
 * @param {*} self 
 * @param {*} source 
 * @param {*} owner 
 * @param {*} props 
 */
var ReactElement = function (type, key, ref, props, mtype, getContext, refType, owner) {
    const element = {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        ref: ref,
        mtype,
        refType,
        props,
        getContext,
        _owner: owner
    }
    return element;
}


// function isArray(o) {
//     return Object.prototype.toString.call(o) == '[object Array]';
// }