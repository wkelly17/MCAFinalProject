import React, { useState, useRef } from 'react';
import formatQuantity from 'format-quantity';

import { Link, useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import fakeData from '../fakeData';
import { pagesRoutes } from '../constants/pages';
import { LeftArrowCircleOutlineIcon } from './Icons';

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

Recipe.EditButton = function RecipeEditButton({
  children,
  recipe,
  className,
  ...restProps
}) {
  let history = useHistory();

  function navToEditRecipe() {
    history.push({
      pathname: pagesRoutes.CREATE_EDIT,
      state: { recipe: recipe },
    });
  }

  return (
    <>
      <button onClick={navToEditRecipe} className={className}>
        Edit Recipe
      </button>
    </>
  );
};

Recipe.BackLink = function RecipeBackLink({
  children,
  className,
  ...restProps
}) {
  let history = useHistory();

  return (
    <>
      <a onClick={(e) => history.goBack()}>
        <LeftArrowCircleOutlineIcon className={className} />
      </a>
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
  // todo: return a default icon or small picure of a yummy emoji or placeholder
  if (image) {
    return (
      <>
        <img src={image} alt={name} className={className} />
      </>
    );
  } else {
    return (
      <div className="bg-gray-500 p-8 text-white rounded-md opacity-90 flex justify-center">
        Something Yummy...
      </div>
    );
  }
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
  function getDomain(source) {
    if (source && source.match(/(https*)/)) {
      let a = document.createElement('a');
      a.setAttribute('href', source);
      return a.hostname;
    } else {
      return 'Domain from a URL will go here;';
    }
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
  stringVersion,
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

  if (stringVersion) {
    return (
      <li>
        <span className={className}>{stringVersion}</span>
      </li>
    );
  } else
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
  stringVersion,
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

  if (stringVersion) {
    return (
      <li id={id} className={className}>
        {stringVersion}
      </li>
    );
  } else
    return (
      <>
        <li
          id={id}
          onClick={(e) => handleClick(e)}
          className={clickedClasses()}
        >
          {instruction}
        </li>
      </>
    );
};
