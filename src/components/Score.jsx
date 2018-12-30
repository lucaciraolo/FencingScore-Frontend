import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Score extends PureComponent {
  constructor(props) {
    super(props);
    this.ScoreStyle = {
      fontSize: '100px',
      display: 'inline-block',
      color: props.color,
    };
  }

  render() {
    const { onClick, value } = this.props;
    return (
      <button onClick={onClick} style={this.ScoreStyle} type="button">{value}</button>
    );
  }
}

function createColorPropType(isRequired) {
  return (props, propName, componentName) => {
    const { [propName]: inputColor } = props;

    if (inputColor == null && isRequired) {
      throw new Error(`Missing color prop in ${componentName}`);
    } else if (!(inputColor === 'red' || inputColor === 'green')) {
      return new Error(`Invalid prop ${propName} supplied to ${componentName}. Validation failed.`);
    }
    return null;
  };
}

const colorPropType = createColorPropType(false);
colorPropType.isRequired = createColorPropType(true);


Score.propTypes = {
  color: colorPropType.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};
