import PropTypes from 'prop-types';

export const pageSpinnerPropTypes = {
  /** Specifies showing Page Spinner */
  show: PropTypes.bool,
  /** Specifies showing Overlay backdrop */
  overlay: PropTypes.bool
};

export const pageSpinnerDefaultProps = {
  show: true,
  overlay: true
};
