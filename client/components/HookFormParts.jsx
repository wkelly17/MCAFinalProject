import React from 'react';
import { useForm } from 'react-hook-form';

// ! smart form component from : https://react-hook-form.com/advanced-usage#SmartFormComponent
export default function HookForm({
  id,
  children,
  className,
  defaultValues,
  onSubmit,
}) {
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className} id={id}>
      {React.Children.map(children, (child) => {
        return React.createElement(child.type, {
          ...{
            ...child.props,
            register: methods.register,
            key: child.props.name,
          },
        });
      })}
    </form>
  );
}

// @LABEL REMINDER
// To associate the <label> with an <input> element, you need to give the <input> an id attribute. The <label> then needs a for attribute whose value is the same as the input's id.

// Alternatively, you can nest the <input> directly inside the <label>, in which case the for and id attributes are not needed because the association is implicit:

HookForm.Input = function HookInput({
  register,
  name,
  labelText,
  labelClasses,
  inputClasses,
  wrapperTag: Component,
  wrapperClasses,
  ...rest
}) {
  if (Component) {
    return (
      <Component className={wrapperClasses}>
        <label htmlFor={name} className={labelClasses}>
          {labelText}
        </label>
        <input
          {...register(name)}
          {...rest}
          id={name}
          className={inputClasses}
        />
      </Component>
    );
  } else {
    return (
      <>
        <label htmlFor={name} className={labelClasses}>
          {labelText}
        </label>
        <input
          {...register(name)}
          {...rest}
          id={name}
          className={inputClasses}
        />
      </>
    );
  }
};

HookForm.Select = function HookSelect({
  register,
  options,
  name,
  labelText,
  labelClasses,
  ...rest
}) {
  return (
    <>
      <label htmlFor={name} className={labelClasses}>
        {labelText}
      </label>
      <select {...register(name)} id={name} {...rest}>
        {options.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </>
  );
};

HookForm.TextArea = function HookTextArea({
  register,
  name,
  labelText,
  labelClasses,
  inputClasses,
  ...rest
}) {
  return (
    <>
      <label htmlFor={name} className={labelClasses}>
        {labelText}
      </label>
      <textarea
        {...register(name)}
        {...rest}
        id={name}
        className={inputClasses}
      />
    </>
  );
};

HookForm.SubmitButton = function HookSubmitButton({
  name,
  className,
  children,
  ...rest
}) {
  return (
    <button name={name} type="submit" className={className}>
      {children}
    </button>
  );
};

// Container expliclity for grouping forms together as needed with a container (e.g. giv)
HookForm.Container = function HookContainer({
  className,
  children,
  as: Component,
  ...rest
}) {
  return (
    <Component className={className} {...rest}>
      {React.Children.map(children, (child) => {
        return React.createElement(child.type, {
          ...{
            ...child.props,
            key: child.props.name,
            ...rest,
          },
        });
      })}
    </Component>
  );
};

HookForm.Container.defaultProps = {
  as: 'div',
};

HookForm.FormTitle = function HookFormTitle({
  className,
  children,
  as: Component,
  register,
  ...rest
}) {
  // register not needed in  smart form, but picked off here so ...rest can be used

  return (
    <Component className={className} {...rest}>
      {children}
    </Component>
  );
};

HookForm.FormTitle.defaultProps = {
  as: 'h1',
};