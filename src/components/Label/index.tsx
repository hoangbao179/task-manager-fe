import { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { LabelWrapper } from './label.styles';

interface LabelProps {
  className?: string;
  color?:
    | 'primary'
    | 'black'
    | 'secondary'
    | 'error'
    | 'warning'
    | 'success'
    | 'info';
  children?: ReactNode;
}



const Label: FC<LabelProps> = ({
    className,
    color = 'secondary',
    children,
    ...rest
}) => {
    return (
        <LabelWrapper className={'MuiLabel-' + color} {...rest}>
            {children}
        </LabelWrapper>
    );
};

Label.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    color: PropTypes.oneOf([
        'primary',
        'black',
        'secondary',
        'error',
        'warning',
        'success',
        'info'
    ])
};

export default Label;
