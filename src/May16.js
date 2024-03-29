// import { Children } from 'react-core/Children';
// import { PropTypes } from 'react-core/PropTypes';
import { Component, PureComponent } from './MayComponent';
// import { PureComponent } from 'react-core/PureComponent';
// import { createRef, forwardRef } from 'react-core/createRef';
// import { createPortal } from 'react-core/createPortal';
// import { createContext } from 'react-core/createContext';
// import { useState, useReducer, useEffect, useLayoutEffect, useCallback, useMemo, useRef, useContext, useImperativeHandle } from 'react-core/hooks';

import {
    createElement,
    // cloneElement,
    // isValidElement,
    // createFactory
} from '../src/MayElement';
// import { Fragment, getWindow } from 'react-core/util';

// import { findDOMNode } from './findDOMNode';
// import { DOMRenderer } from './DOMRenderer';
// let win = getWindow();
// let prevReact = win.React;
let prevReact = null;
let React;
if (prevReact && prevReact.eventSystem) {
    React = prevReact; //解决引入多个
} else {
    React = {
        createElement,
        Component,
        PureComponent
    }
    // let {
    //     render,
    //     eventSystem,
    //     unstable_renderSubtreeIntoContainer,
    //     unmountComponentAtNode
    // } = DOMRenderer;

    // React = win.React = win.ReactDOM = {
    //     //平台相关API
    //     eventSystem,
    //     findDOMNode,
    //     unmountComponentAtNode,
    //     unstable_renderSubtreeIntoContainer,
    //     //fiber底层API
    //     version: 'VERSION',
    //     render: render,
    //     hydrate: render,
    //     unstable_batchedUpdates: DOMRenderer.batchedUpdates,
    //     Fragment,
    //     PropTypes,
    //     Children,
    //     createPortal,
    //     createContext,
    //     Component,
    //     createRef,
    //     forwardRef,
    //     useState,
    //     useContext,
    //     useEffect,
    //     useLayoutEffect,
    //     useReducer,
    //     useCallback,
    //     useMemo,
    //     useRef,
    //     useImperativeHandle,
    //     createElement,
    //     cloneElement,
    //     PureComponent,
    //     isValidElement,
    //     createFactory
    // };
}
export default React;