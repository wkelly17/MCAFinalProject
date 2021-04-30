import React, { useState } from 'react';
import * as dateFns from 'date-fns';
import Container from './Container';
import { v4 as uuid } from 'uuid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// This method is needed for rendering clones of draggables

export default function Calendar(props) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [mealsPlanned, setMealsPlanned] = React.useState([]);
  const onDragEnd = React.useCallback(
    (result) => {
      const { source, destination } = result;

      if (!destination) {
        return;
      }
      debugger;
      switch (source.droppableId) {
        // source and destination are the same = reorder
        case destination.droppableId:
          setMealsPlanned((state) =>
            reorder(state, source.index, destination.index)
          );
          break;
        case 'SHOP':
          setMealsPlanned((state) =>
            copy(COLLECTION, state, source, destination)
          );
          break;
        default:
          break;
      }
    },
    [setMealsPlanned]
  );

  return (
    <Container className="flex min-h-screen ">
      <DragDropContext onDragEnd={onDragEnd}>
        <Container className="w-1/3">
          <Shop items={COLLECTION} />
        </Container>
        <Container className="flex-grow">
          <div
            id="calendar"
            className="calendar border flex flex-col h-full max-w-[1600px] p-4"
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
                meals={mealsPlanned}
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
  meals,
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
  const onDateClick = (day) => {
    setSelectedDate(day);
  };

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = dateFns.format(day, dateFormat);
      const cloneDay = day;
      days.push(
        <div
          className={`${
            dateFns.isSameDay(day, selectedDate) ? 'bg-red-100' : ''
          }  border flex flex-col h-full flex-grow`}
          key={day}
          onClick={() =>
            onDateClick(dateFns.parse(cloneDay, dateFormat, new Date()))
          }
        >
          <span className="">{formattedDate}</span>

          {/* todo: droppable date */}
          <DroppableDay droppableId={uuid()} items={meals} />

          <div className="h-1/3 border border-$secondary6">
            <p>Lunch</p>
            <ul></ul>
          </div>
          <div className="h-1/3 border border-$secondary6">
            <p>Dinner</p>
            <ul></ul>
          </div>
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
function DroppableDay(props) {
  debugger;
  return (
    <Droppable droppableId={props.droppableId}>
      {(provided, snapshot) => (
        <div
          data-role="droppableDay"
          className="h-1/3 border border-$secondary6"
        >
          <span>Breakfast</span>
          <ul ref={provided.innerRef} className="h-full bg-gray-100">
            {props.items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={provided.draggableProps.style}
                  >
                    {item.label}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        </div>
      )}
    </Droppable>
  );
}

function Shop(props) {
  debugger;
  return <Copyable droppableId="SHOP" className="w-max" items={props.items} />;
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
            const shouldRenderClone = item.id === snapshot.draggingFromThisWith;
            return (
              <React.Fragment key={item.id}>
                {shouldRenderClone ? (
                  <li className="react-beatiful-dnd-copy">{item.label}</li>
                ) : (
                  <Draggable draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <React.Fragment>
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={snapshot.isDragging ? 'dragging' : ''}
                        >
                          {item.label}
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
        <ul ref={provided.innerRef} className="shopping-bag">
          {props.items.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) => (
                <li
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={provided.draggableProps.style}
                >
                  {item.label}
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

const reorder = (list, startIndex, endIndex) => {
  const [removed] = list.splice(startIndex, 1);
  list.splice(endIndex, 0, removed);
  return list;
};

const copy = (source, destination, droppableSource, droppableDestination) => {
  const item = source[droppableSource.index];
  destination.splice(droppableDestination.index, 0, { ...item, id: uuid() });
  return destination;
};

const getRenderItem = (items, className) => (provided, snapshot, rubric) => {
  const item = items[rubric.source.index];
  return (
    <React.Fragment>
      <li
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        style={provided.draggableProps.style}
        className={snapshot.isDragging ? 'dragging' : ''}
      >
        {item.label}
      </li>
    </React.Fragment>
  );
};
