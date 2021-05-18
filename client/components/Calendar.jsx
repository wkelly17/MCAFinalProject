import React, { useState } from 'react';
import * as dateFns from 'date-fns';
import Container from './Container';
import { v4 as uuid } from 'uuid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import fakeData from '../fakeData';
import { PaperclipOutlineIcon, GridOutlineIcon } from './Icons';
import Logo from './Logo';
import { Link } from 'react-router-dom';
import { pagesRoutes } from '../constants/pages';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import ROUTES from '../constants/ApiRoutes';
import {
  getCalendar,
  postNewMealToCalendar,
  patchCalendar,
  DeleteCalendarMeal,
  getRecipes,
} from '../utils/apiFunctions';
import Fuse from 'fuse.js';
import FuseSearchBar from './FuseSearchBar';
import RecipeInput from '../containers/CreateRecipeInput';

export default function Calendar(props) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [search, setSearch] = useState();
  // const [mealsPlanned, setMealsPlanned] = React.useState([]);
  const [notes, setNotes] = useState([]);

  const {
    isLoading: CalendarIsLoading,
    isError: CalendarisError,
    data: mealsPlanned,
    error: CalendarError,
  } = useQuery('calendar', getCalendar);
  const {
    isLoading: RecipeIsLoading,
    isError: RecipeisError,
    data: recipes,
    error: RecipeError,
  } = useQuery('recipes', getRecipes);
  // debugger;

  const queryClient = useQueryClient();

  const PostMutation = useMutation(postNewMealToCalendar, {
    onSuccess: () => {
      queryClient.invalidateQueries('calendar');
    },
  });
  const PatchMutation = useMutation(patchCalendar, {
    onSuccess: () => {
      queryClient.invalidateQueries('calendar');
    },
  });
  const DeleteMutation = useMutation(DeleteCalendarMeal, {
    onSuccess: () => {
      queryClient.invalidateQueries('calendar');
    },
  });

  function deleteMeal(id) {
    // debugger;
    let mealToDelete = mealsPlanned.meals.find((meal) => meal._id === id);
    DeleteMutation.mutate(mealToDelete);
  }

  const FuseOptions = {
    keys: ['name'],
  };
  const fuse = new Fuse(recipes, FuseOptions);
  let FuseResult;
  if (search) {
    let result = fuse.search(search);
    // getting rid of ref index on fuse
    FuseResult = result.map((result) => result.item);
  } else {
    FuseResult = recipes;
  }

  const onDragEnd = (result) => {
    // debugger;
    const { source, destination, draggableId } = result;
    if (!destination) {
      return;
    }
    // REORDERING = PATCH
    if (source.droppableId === destination.droppableId) {
      return mealsPlanned;
      // todo: the logic for keeping order important is not in database right now
      // let newOrder;
      // return PatchMutation.mutate((mealsPlanned) =>
      //   reorder(mealsPlanned, source, destination)
      // );
    }
    // MOVING BETWEEN CELLS = PATCH
    else if (
      destination.droppableId.match(/(Breakfast)|(Lunch)|(Supper)/) &&
      source.droppableId.match(/(Breakfast)|(Lunch)|(Supper)/)
    ) {
      let movedItem = moveBetweenCells(
        mealsPlanned,
        source,
        destination,
        draggableId
      );
      return PatchMutation.mutate(movedItem);
    }
    // ! ADDING A NEW MEAL
    else if (destination.droppableId.match(/(Breakfast)|(Lunch)|(Supper)/)) {
      let newMeals = copy(FuseResult, mealsPlanned, source, destination);
      PostMutation.mutate(newMeals);
    } else {
      return mealsPlanned;
    }
  };

  if (CalendarIsLoading || RecipeIsLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center text-xl bg-$primary6">
        <p>Just fetching that awesome meal plan</p>
      </div>
    );
  }
  if (CalendarisError || RecipeisError) {
    return <span>Error: {CalendarError.message || RecipeError.message}</span>;
  }

  // ! DEBUGGER
  // debugger;
  return (
    <Container className="flex flex-wrap min-h-screen ">
      <Container
        as="header"
        id="navBar"
        id="pageHeaderContainer"
        className="w-full bg-$primary4 w-full py-4 px-2 text-$base8 flex items-center"
      >
        <Link
          to={pagesRoutes.HOME}
          className="text-$base9 opacity-90 hover:(text-$base7 transform scale-110) focus:(text-$base7 transform scale-110) inline-block mx-1  "
        >
          <Logo />
        </Link>
        <Container className="ml-auto">
          <RecipeInput />
        </Container>
      </Container>
      <DragDropContext onDragEnd={onDragEnd}>
        <Container className="p-2 w-1/8 sm:(w-1/6) md:(w-1/5) lg:(w-1/4) overflow-y-auto customScrollBar bg-$secondary4">
          <FuseSearchBar
            value={search || ''}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 rounded bg-$base2 text-$base7 w-54 text-xs mx-auto block"
            placeholder="Search For a Recipe here"
          />
          <MealCards items={FuseResult} />
        </Container>
        <Container className="flex flex-col w-7/8 sm:(w-5/6) md:(w-4/5) lg:(w-3/4)">
          <div
            id="calendar"
            className="calendar border flex flex-col min-h-2xl max-w-[1600px] p-4"
          >
            <div>
              <Calendar.Header
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
              />
            </div>
            <div>
              <Calendar.WeekDays
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
              />
            </div>

            <div className="flex-grow">
              <Calendar.WeekCells
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                mealsPlanned={mealsPlanned}
                deleteMeal={deleteMeal}
                notes={notes}
              />
            </div>
          </div>
        </Container>
      </DragDropContext>
    </Container>
  );
}

Calendar.Header = function CalendarHeader({ currentDate, setCurrentDate }) {
  const dateFormat = 'MMMM yyyy';
  const nextMonth = () => {
    setCurrentDate(dateFns.addWeeks(currentDate, 1));
  };
  const prevMonth = () => {
    setCurrentDate(dateFns.subWeeks(currentDate, 1));
  };
  return (
    <div className="flex justify-around p-1 ">
      <button
        className="bg-$primary4 text-$base2 px-2 py-1 rounded"
        onClick={prevMonth}
      >
        Previous
      </button>

      <div className="">
        <span className="text-xl uppercase bold">
          {dateFns.format(currentDate, dateFormat)}
        </span>
      </div>

      <button
        className="bg-$primary4 text-$base2 px-2 py-1 rounded"
        onClick={nextMonth}
      >
        Next
      </button>
    </div>
  );
};

Calendar.WeekDays = function CalendarWeekDays({ currentDate, setCurrentDate }) {
  const dateFormat = 'EEE';
  const days = [];
  let startDate = dateFns.startOfWeek(currentDate);

  for (let i = 0; i < 7; i++) {
    days.push(
      <div className="" key={i}>
        {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
      </div>
    );
  }

  return <div className="flex justify-around w-full p-1 border">{days}</div>;
};

Calendar.WeekCells = function CalendarWeekCells({
  currentDate,
  setCurrentDate,
  selectedDate,
  setSelectedDate,
  mealsPlanned,
  deleteMeal,
  notes,
}) {
  //   const monthStart = dateFns.startOfMonth(currentDate);
  //   const monthEnd = dateFns.endOfMonth(monthStart);
  const startDate = dateFns.startOfWeek(currentDate);
  const endDate = dateFns.endOfWeek(currentDate);
  const dateFormat = 'd';
  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = '';

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = dateFns.format(day, dateFormat);
      const cloneDay = day;

      days.push(
        <div
          className={` border flex flex-col h-full flex-grow w-1/7`}
          key={day}
        >
          <span
            className={` ${
              dateFns.isSameDay(day, selectedDate)
                ? 'bg-$primary6 text-$base1'
                : ''
            } font-bold text-center`}
          >
            {formattedDate}
          </span>

          {/* todo: droppable date */}
          <DroppableMealTime
            droppableId={dateFns.format(day, 'P') + 'Breakfast'}
            items={mealsPlanned.meals}
            timeOfDay="B"
            deleteMeal={deleteMeal}
            notes={notes}
          />

          <DroppableMealTime
            droppableId={dateFns.format(day, 'P') + 'Lunch'}
            items={mealsPlanned.meals}
            timeOfDay="L"
            deleteMeal={deleteMeal}
            notes={notes}
          />
          <DroppableMealTime
            droppableId={dateFns.format(day, 'P') + 'Supper'}
            items={mealsPlanned.meals}
            timeOfDay="S"
            deleteMeal={deleteMeal}
            notes={notes}
          />
        </div>
      );
      day = dateFns.addDays(day, 1);
    }
    rows.push(
      <div className="flex justify-around h-full max-h-xl" key={day}>
        {days}
      </div>
    );
    days = [];
  }
  return <div className="h-full">{rows}</div>;
};

//
function DroppableMealTime(props) {
  function listStyles(isDraggingOver) {
    let styles = 'bg-gray-100 h-1/3 border border-$secondary6 ';
    if (isDraggingOver) {
      styles += '!bg-green-100';
    }
    return styles;
  }

  return (
    <Droppable droppableId={props.droppableId}>
      {(provided, snapshot) => (
        <div
          data-role="droppableDay"
          className={listStyles(snapshot.isDraggingOver)}
        >
          <span>{props.timeOfDay}</span>
          <ul
            ref={provided.innerRef}
            className="max-w-full overflow-y-auto list-inside text-small h-4/5 list-style-disc"
          >
            {props.items
              .filter((meal) => meal.currentlyDroppedIn == props.droppableId)
              .map((item, index) => (
                <Draggable key={item._id} draggableId={item._id} index={index}>
                  {(provided, snapshot) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={
                        'w-full text-xs p-2 py-1 items-center leading-relaxed relative border-$secondary2 flex flex-wrap'
                      }
                      style={provided.draggableProps.style}
                    >
                      <span className=" inline-block truncate w-full max-w-[75%]">
                        {item.recipe.name}
                      </span>

                      <button
                        onClick={(e) => props.deleteMeal(item._id)}
                        className="absolute top-0 right-0 inline-block p-1 font-bold text-red-600 cursor-pointer bg-none0 "
                      >
                        X
                      </button>
                      {/* //todo... on page navigate away, would save this data so that I could then call it back from db. */}
                      <Link
                        to={pagesRoutes.COMPUTESINGLE(item.recipe._id)}
                        className="absolute top-0 inline-block text-blue-400 cursor-pointer right-4"
                      >
                        <PaperclipOutlineIcon />
                      </Link>
                    </li>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
            {/* //todo: hook up notes by filtering like with draggables, and add create note functionality */}
            {props.notes.map((note, idx) => {
              return <RecipeNotes note={note} key={idx} />;
            })}
          </ul>
        </div>
      )}
    </Droppable>
  );
}

function RecipeNotes(props) {
  return <li className={'text-red-400'}>{props.note}</li>;
}

function MealCards(props) {
  return (
    <Copyable
      droppableId="MEALCARDS"
      className="gap-2 p-4 text-xs break-all list-none calendarGrid"
      items={props.items}
    />
  );
}

function Copyable(props) {
  return (
    <Droppable
      renderClone={getRenderItem(props.items, props.className)}
      droppableId={props.droppableId}
      isDropDisabled={true}
    >
      {(provided, snapshot) => (
        <ul ref={provided.innerRef} className={props.className}>
          {props.items.map((item, index) => {
            // id's are numbers; snapshot id's are strings;  Purposeful loose comparison
            const shouldRenderClone = item._id == snapshot.draggingFromThisWith;
            return (
              <React.Fragment key={item._id}>
                {shouldRenderClone ? (
                  <li className="react-beatiful-dnd-copy text-center text-$base2 bg-$base8 list-none  flex-wrap ml-2 p-2 rounded shadow-md ">
                    <img
                      className="object-cover w-full h-7/10"
                      src={item.image}
                      alt={item.name}
                    />
                    {item.name}
                  </li>
                ) : (
                  <Draggable draggableId={String(item._id)} index={index}>
                    {(provided, snapshot) => (
                      <React.Fragment>
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={
                            snapshot.isDragging
                              ? 'dragging '
                              : 'react-beatiful-dnd-copy text-small text-$base2 list-none flex-wrap p-2 rounded shadow-md bg-$base7 text-center'
                          }
                        >
                          <img
                            className="object-cover w-full h-7/10"
                            src={item.image}
                            alt={item.name}
                          />

                          {item.name}
                        </li>
                      </React.Fragment>
                    )}
                  </Draggable>
                )}
              </React.Fragment>
            );
          })}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
}

const reorder = (list, source, destination) => {
  // debugger;
  // state , source, destination
  //    reorder(state, source.index, destination.index)
  const cells = list.filter(
    (meal) => meal.currentlyDroppedIn == destination.droppableId
  );
  const rest = list.filter(
    (meal) => meal.currentlyDroppedIn !== destination.droppableId
  );
  const [removed] = cells.splice(source.index, 1);
  cells.splice(destination.index, 0, removed);
  return [...cells, ...rest];
};

const copy = (source, destination, droppableSource, droppableDestination) => {
  // debugger;
  const item = source[droppableSource.index];

  let newMealPlanned = {
    recipe: item._id,
    currentlyDroppedIn: droppableDestination.droppableId,
  };
  return newMealPlanned;
};

function moveBetweenCells(
  mealsPlanned,
  droppableSource,
  droppableDestination,
  draggableId
) {
  //    copy(state, source, destination)
  // debugger;
  const item = mealsPlanned.meals.find((meal) => meal._id === draggableId);
  item.currentlyDroppedIn = droppableDestination.droppableId;

  return item;
}

const getRenderItem = (items, className) => (provided, snapshot, rubric) => {
  const item = items[rubric.source.index];
  return (
    <React.Fragment>
      <li
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        style={provided.draggableProps.style}
        className={
          snapshot.isDragging
            ? 'dragging text-small text-$base2 list-none flex items-center rounded shadow-md bg-$primary3 overflow-hidden text-xs !max-w-180px !max-h-60px'
            : 'react-beautiful-dnd-copy'
        }
      >
        <img
          className="object-cover h-full max-w-3/5"
          src={item.image}
          alt={item.name}
        />
        <span className="inline-block p-1"> {item.name} </span>
      </li>
    </React.Fragment>
  );
};
