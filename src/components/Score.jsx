import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function Score(props) {
  const { onClick, value, className } = props;
  return (
    <div onClick={onClick} className={className}>{value}</div>
  );
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

export const colorPropType = createColorPropType(false);
colorPropType.isRequired = createColorPropType(true);


Score.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  color: PropTypes.oneOf(['red', 'green']).isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  className: PropTypes.string,
};

Score.defaultProps = {
  className: '',
};

export const StyledScore = styled(Score)`
  font-size: 5em;
  color: white;
  background-color: ${props => props.color};
  display: inline-block;
  width: 50%;
  text-align: center;
`;
