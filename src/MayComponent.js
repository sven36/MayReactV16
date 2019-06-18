
// export const fakeObject = {
//     enqueueSetState: returnFalse,
//     isMounted: returnFalse
// };
export function Component(props, context, updater) {
    this.props = props;
    this.context = context;
    this.updater = updater || null;
}