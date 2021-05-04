import React, { useState } from 'react';
import * as dateFns from 'date-fns';
import Container from './Container';
import { v4 as uuid } from 'uuid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import fakeData from '../fakeData';
import { PaperclipOutlineIcon } from './Icons';
import { Link } from 'react-router-dom';
import { pagesRoutes } from '../constants/pages';
// This method is needed for rendering clones of draggables

export default function Calendar(props) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [mealsPlanned, setMealsPlanned] = React.useState([]);
  const [notes, setNotes] = useState([]);
  const onDragEnd = React.useCallback(
    (result) => {
      debugger;
      const { source, destination, draggableId } = result;
      if (!destination) {
        return;
      }

      if (source.droppableId === destination.droppableId) {
        return setMealsPlanned((state) => reorder(state, source, destination));
      } else if (
        destination.droppableId.match(/(Breakfast)|(Lunch)|(Supper)/) &&
        source.droppableId.match(/(Breakfast)|(Lunch)|(Supper)/)
      ) {
        return setMealsPlanned((state) =>
          moveBetweenCells(state, source, destination, draggableId)
        );
      } else if (
        destination.droppableId.match(/(Breakfast)|(Lunch)|(Supper)/)
      ) {
        setMealsPlanned((state) => copy(fakeData, state, source, destination));
      } else {
        return mealsPlanned;
      }
    },
    [setMealsPlanned]
  );
  function deleteMeal(id) {
    debugger;
    setMealsPlanned((currentState) => {
      return currentState.filter((meal) => meal.id !== id);
    });
  }

  return (
    <Container className="flex min-h-screen ">
      <DragDropContext onDragEnd={onDragEnd}>
        <Container className="p-2 w-1/8 sm:(w-1/6) md:(w-1/5) lg:(w-1/4) overflow-y-auto customScrollBar">
          <MealCards items={fakeData} />
        </Container>
        <Container className="flex-grow flex flex-col">
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
    setCurrentDate(dateFns.addMonths(currentDate, 1));
  };
  const prevMonth = () => {
    setCurrentDate(dateFns.subMonths(currentDate, 1));
  };
  return (
    <div className="flex justify-around p-3 ">
      <button
        className="bg-$primary4 text-$base2 px-2 py-1 rounded"
        onClick={prevMonth}
      >
        Previous
      </button>

      <div className="">
        <span className="text-xl bold uppercase">
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

  return <div className="w-full flex justify-around p-2 border">{days}</div>;
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
            items={mealsPlanned}
            timeOfDay="B"
            deleteMeal={deleteMeal}
            notes={notes}
          />

          <DroppableMealTime
            droppableId={dateFns.format(day, 'P') + 'Lunch'}
            items={mealsPlanned}
            timeOfDay="L"
            deleteMeal={deleteMeal}
            notes={notes}
          />
          <DroppableMealTime
            droppableId={dateFns.format(day, 'P') + 'Supper'}
            items={mealsPlanned}
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
            className="text-small h-4/5 max-w-full list-style-disc list-inside overflow-y-auto"
          >
            {props.items
              .filter((meal) => meal.currentlyDroppedIn == props.droppableId)
              .map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
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
                        {item.name}
                      </span>

                      <button
                        onClick={(e) => props.deleteMeal(item.id)}
                        className="font-bold  p-1 inline-block text-red-600 absolute top-0 right-0 cursor-pointer bg-none0
                      "
                      >
                        X
                      </button>
                      {/* //todo... on page navigate away, would save this data so that I could then call it back from db. */}
                      <Link
                        to={pagesRoutes.COMPUTESINGLE(item.recipeId)}
                        className="cursor-pointer inline-block text-blue-400  absolute top-0 right-4"
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
      className=" calendarGrid gap-2 break-all text-xs list-none p-4 "
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
            const shouldRenderClone = item.id == snapshot.draggingFromThisWith;
            return (
              <React.Fragment key={item.id}>
                {shouldRenderClone ? (
                  <li className="react-beatiful-dnd-copy text-small text-$base2 list-none  flex-wrap ml-2 p-2 rounded shadow-md ">
                    <img
                      className="max-w-full"
                      src={item.image}
                      alt={item.name}
                    />
                    {item.name}
                  </li>
                ) : (
                  <Draggable draggableId={String(item.id)} index={index}>
                    {(provided, snapshot) => (
                      <React.Fragment>
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={
                            snapshot.isDragging
                              ? 'dragging '
                              : 'react-beatiful-dnd-copy text-small text-$base2 list-none flex-wrap p-2 rounded shadow-md '
                          }
                        >
                          <img
                            className="max-w-full"
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

//e.e.g shoppingBag
function MealsPlanned(props) {
  return (
    <Droppable droppableId="BAG">
      {(provided, snapshot) => (
        <ul ref={provided.innerRef} className="">
          {props.items.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) => (
                <li
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={provided.draggableProps.style}
                >
                  {item.name}
                </li>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
}
const COLLECTION = [
  { id: '1', label: 'Apple', ingredients: 'yep' },
  { id: '2', label: 'Banana' },
  { id: '3', label: 'orange' },
];

const reorder = (list, source, destination) => {
  debugger;
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
  const item = source[droppableSource.index];
  destination.splice(droppableDestination.index, 0, {
    ...item,
    recipeId: item.id,
    id: uuid(),
    currentlyDroppedIn: droppableDestination.droppableId,
  });
  return destination;
};

function moveBetweenCells(
  currentMeals,
  droppableSource,
  droppableDestination,
  draggableId
) {
  //    copy(state, source, destination)

  const item = currentMeals.find((meal) => meal.id === draggableId);
  item.currentlyDroppedIn = droppableDestination.droppableId;
  return currentMeals;
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
          className="max-w-3/5 h-full object-cover"
          src={item.image}
          alt={item.name}
        />
        <span className="p-1 inline-block"> {item.name} </span>
      </li>
    </React.Fragment>
  );
};
