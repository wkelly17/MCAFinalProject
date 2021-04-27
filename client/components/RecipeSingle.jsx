import React, { useState, useRef } from 'react';
import formatQuantity from 'format-quantity';

import { Link, useParams } from 'react-router-dom';
import fakeData from '../fakeData';

export default function Recipe({ children, className, ...rest }) {
  return <div className={className}> {children}</div>;
}

Recipe.Name = function RecipeName({ children, name, className, ...restProps }) {
  return (
    <>
      <h1 {...restProps} className={className}>
        {name}
      </h1>
    </>
  );
};

Recipe.Preview = function RecipePreview({
  children,
  name,
  image,
  imageClassName,
  nameClassName,
  linkId,
  ...restProps
}) {
  return (
    <>
      <Link to={`single${linkId}`}>
        <Recipe.Image image={image} className={imageClassName} />
        <p className={nameClassName}>{name}</p>
        <p>[rating]</p>
      </Link>
    </>
  );
};

Recipe.Image = function RecipeImage({
  children,
  name,
  className,
  image,
  ...restProps
}) {
  return (
    <>
      <img src={image} alt={name} className={className} />
    </>
  );
};

Recipe.Rating = function RecipeRating({
  children,
  name,
  className,
  image,
  ...restProps
}) {
  return (
    <>
      <img src={image} alt={name} className={className} />
    </>
  );
};

Recipe.Source = function RecipeSource({
  children,
  className,
  source,
  ...restProps
}) {
  function getDomain(url) {
    let a = document.createElement('a');
    a.setAttribute('href', url);
    return a.hostname;
  }
  return (
    <>
      <a href={source} className={className}>
        {getDomain(source)}
      </a>
    </>
  );
};
Recipe.Prep = function RecipePrep({ children, className, prep, ...restProps }) {
  return (
    <>
      <p className={className}>
        Prep: <span className="font-bold">{prep}</span>
      </p>
    </>
  );
};
Recipe.CookTime = function RecipeCookTime({
  children,
  className,
  cook,
  ...restProps
}) {
  return (
    <>
      <p className={className}>
        Cook Time: <span className="font-bold">{cook}</span>
      </p>
    </>
  );
};
Recipe.Servings = function RecipeServings({
  children,
  servings,
  className,
  ...restProps
}) {
  return (
    <>
      <p className={className}>Servings: {servings}</p>
    </>
  );
};

Recipe.UserNotes = function RecipeUserNotes({
  children,
  notes,
  className,
  ...restProps
}) {
  return (
    <>
      <p className={className}>{notes}</p>
    </>
  );
};

Recipe.IngredientsContainer = function RecipeIngredientsContainer({
  children,
  className,
  ...restProps
}) {
  return (
    <>
      <ul className={className}>{children}</ul>
    </>
  );
};

Recipe.Ingredient = function RecipeIngredients({
  children,
  ingredient, //obj
  className,
  ...restProps
}) {
  const [clicked, setClicked] = useState(false);
  function clickedClasses() {
    if (clicked) {
      return 'line-through opacity-50 cursor-pointer';
    } else {
      return 'cursor-pointer';
    }
  }
  return (
    <>
      <li onClick={(e) => setClicked(!clicked)} className={clickedClasses()}>
        <span className="font-bold">
          {formatQuantity(ingredient.quantity)}{' '}
        </span>
        <span>{ingredient.unitOfMeasure} </span>
        <span>{ingredient.description} </span>
      </li>
    </>
  );
};

Recipe.DirectionsContainer = function RecipeDirectionsContainer({
  children,
  className,
  ...restProps
}) {
  const [current, setCurrent] = useState(null);

  let childrenWithProps = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      current,
      setCurrent,
    });
  });

  return (
    <>
      <ul className={className}>{childrenWithProps}</ul>
    </>
  );
};

Recipe.Direction = function RecipeDirection({
  children,
  instruction, //array
  className,
  id,
  current,
  setCurrent,
  ...restProps
}) {
  const [clicked, setClicked] = useState(false);

  let highlightColor = 'bg-$base4';

  function clickedClasses() {
    if (clicked) {
      return `${highlightColor} cursor-pointer ${className}`;
    } else {
      return `cursor-pointer ${className}`;
    }
  }
  //   todo: eventually, maybe see about refacotring away from this ugly imperative method;  But it works;  useref was confusing me is the thing;
  function handleClick(e) {
    if (e.target.id !== current) {
      e.target.classList.add(highlightColor);
      if (current) {
        document.querySelector(`#${current}`).classList.remove(highlightColor);
      }
    }
    setCurrent(() => e.target.id);
  }

  return (
    <>
      <li id={id} onClick={(e) => handleClick(e)} className={clickedClasses()}>
        {instruction}
      </li>
    </>
  );
};
