import Component from './component'
import { shallowEqual } from 'nerv-utils'

class PureComponent<P, S> extends Component<P, S> {
  isPureComponent = true

  shouldComponentUpdate (nextProps: P, nextState: S) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState)
  }
}

export default PureComponent
