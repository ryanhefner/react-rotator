import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cleanProps from 'clean-react-props';
import uuid from 'uuid/v4';

class Rotator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: props.index,
      keyPrefix: `rotator-${uuid()}`,
    };

    this.onIndicatorChange = this.onIndicatorChange.bind(this);
    this.onItemActive = this.onItemActive.bind(this);
    this.onItemFinish = this.onItemFinish.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {
      index,
    } = nextProps;

    if (index !== this.props.index) {
      this.setState({
        index,
      });
    }
  }

  onIndicatorChange(index) {
    const {
      onChange,
    } = this.props;

    this.setState({
      index,
    });

    onChange({
      index,
    });
  }

  onItemActive(index) {
    const {
      onChange,
    } = this.props;

    this.setState({
      index,
    });

    onChange({
      index,
    });
  }

  onItemFinish() {
    const {
      children,
      onChange,
    } = this.props;

    const {
      index,
    } = this.state;

    let nextIndex = index + 1;
    if (nextIndex === React.Children.count(children)) {
      nextIndex = 0;
    }

    this.setState({
      index: nextIndex,
    });

    onChange({
      index: nextIndex,
    });
  }

  render() {
    const {
      children,
      component,
      indicator,
    } = this.props;

    const {
      index,
      keyPrefix,
    } = this.state;

    const clonedChildren = React.Children.toArray(children).map((child, childIndex) => {
      return React.cloneElement(child, {
        index: childIndex,
        key: `${keyPrefix}-child-${childIndex}`,
        position: (index - childIndex) * -1,
        onActive: this.onItemActive,
        onFinish: this.onItemFinish,
      });
    });

    const clonedIndicator = indicator
      ? React.cloneElement(indicator, {
          index,
          key: `${keyPrefix}-indicator`,
          length: children.length,
          onChange: this.onIndicatorChange,
        })
      : null;

    return React.createElement(component, {
        ...cleanProps(this.props)
      },
      [...clonedChildren, clonedIndicator]
    );
  }
}

Rotator.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),
  index: PropTypes.number,
  indicator: PropTypes.element,
  onChange: PropTypes.func,
};

Rotator.defaultProps = {
  component: 'div',
  index: 0,
  onChange: () => {},
};

export default Rotator;
