import React from 'react';

export default function Container({
  className,
  children,
  as: Component,
  ...rest
}) {
  return (
    <Component className={className} {...rest}>
      {children}
    </Component>
  );
}

Container.defaultProps = {
  as: 'div',
};
