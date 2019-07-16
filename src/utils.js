
const hasSymbol = typeof Symbol === 'function' && Symbol['for'];

export const LegacyRoot = 0;
export const BatchedRoot = 1;
export const ConcurrentRoot = 2;

export const REACT_ELEMENT_TYPE = hasSymbol
    ? Symbol.for('react.element')
    : 0xeac7;
export const REACT_PORTAL_TYPE = hasSymbol
    ? Symbol.for('react.portal')
    : 0xeaca;
export const REACT_FRAGMENT_TYPE = hasSymbol
    ? Symbol.for('react.fragment')
    : 0xeacb;
export const REACT_STRICT_MODE_TYPE = hasSymbol
    ? Symbol.for('react.strict_mode')
    : 0xeacc;
export const REACT_PROFILER_TYPE = hasSymbol
    ? Symbol.for('react.profiler')
    : 0xead2;
export const REACT_PROVIDER_TYPE = hasSymbol
    ? Symbol.for('react.provider')
    : 0xeacd;
export const REACT_CONTEXT_TYPE = hasSymbol
    ? Symbol.for('react.context')
    : 0xeace;
// TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?
export const REACT_ASYNC_MODE_TYPE = hasSymbol
    ? Symbol.for('react.async_mode')
    : 0xeacf;
export const REACT_CONCURRENT_MODE_TYPE = hasSymbol
    ? Symbol.for('react.concurrent_mode')
    : 0xeacf;
export const REACT_FORWARD_REF_TYPE = hasSymbol
    ? Symbol.for('react.forward_ref')
    : 0xead0;
export const REACT_SUSPENSE_TYPE = hasSymbol
    ? Symbol.for('react.suspense')
    : 0xead1;
export const REACT_SUSPENSE_LIST_TYPE = hasSymbol
    ? Symbol.for('react.suspense_list')
    : 0xead8;
export const REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
export const REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
export const REACT_EVENT_COMPONENT_TYPE = hasSymbol
    ? Symbol.for('react.event_component')
    : 0xead5;
export const REACT_EVENT_TARGET_TYPE = hasSymbol
    ? Symbol.for('react.event_target')
    : 0xead6;

// React event targets
export const REACT_EVENT_TARGET_TOUCH_HIT = hasSymbol
    ? Symbol.for('react.event_target.touch_hit')
    : 0xead7;
export const ELEMENT_TYPE_STRING = 1;
export const ELEMENT_TYPE_FUNCTION = 2;
export const ELEMENT_TYPE_SVG = 3;
//之前是数字表示，时间长了就会分不清，故改成文字形式
export const REF_TYPE_STRING = 1;
export const REF_TYPE_FUNCTION = 2;
export const REF_TYPE_OBJECT = 3;

export const FunctionComponent = 0;
export const ClassComponent = 1;
export const IndeterminateComponent = 2; // Before we know whether it is function or class
export const HostRoot = 3; // Root of a host tree. Could be nested inside another node.
export const HostPortal = 4; // A subtree. Could be an entry point to a different renderer.
export const HostComponent = 5;
export const HostText = 6;
export const Fragment = 7;
export const Mode = 8;
export const ContextConsumer = 9;
export const ContextProvider = 10;
export const ForwardRef = 11;
export const Profiler = 12;
export const SuspenseComponent = 13;
export const MemoComponent = 14;
export const SimpleMemoComponent = 15;
export const LazyComponent = 16;
export const IncompleteClassComponent = 17;
export const DehydratedSuspenseComponent = 18;
export const EventComponent = 19;
export const EventTarget = 20;
export const SuspenseListComponent = 21;

// Don't change these two values. They're used by React Dev Tools.
export const NoEffect = /*              */ 0b000000000000;
export const PerformedWork = /*         */ 0b000000000001;

// You can change the rest (and add more).
export const Placement = /*             */ 0b000000000010;
export const Update = /*                */ 0b000000000100;
export const PlacementAndUpdate = /*    */ 0b000000000110;
export const Deletion = /*              */ 0b000000001000;
export const ContentReset = /*          */ 0b000000010000;
export const Callback = /*              */ 0b000000100000;
export const DidCapture = /*            */ 0b000001000000;
export const Ref = /*                   */ 0b000010000000;
export const Snapshot = /*              */ 0b000100000000;
export const Passive = /*               */ 0b001000000000;

// Passive & Update & Callback & Ref & Snapshot
export const LifecycleEffectMask = /*   */ 0b001110100100;

// Union of all host effects
export const HostEffectMask = /*        */ 0b001111111111;

export const Incomplete = /*            */ 0b010000000000;
export const ShouldCapture = /*         */ 0b100000000000;

export const ReactCurrentOwner = {
    current: null
}

const __typeOf = Object.prototype.toString;
export function getType(param) {
    return __typeOf.call(param);
}