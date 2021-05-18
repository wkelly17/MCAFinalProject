import React, { useState } from 'react';
import Container from '../components/Container';
import { FilterSolidIcon } from '../components/Icons';
import { Popover } from '@headlessui/react';
import { usePopper } from 'react-popper';
// import CreateFoldersPopover from '../components/AddFoldersPopover';
import { Desktop, Tablet, Mobile, Default } from '../components/MediaQueryHocs';

export default function SortableFunnelContainer({ handleSort }) {
  let [referenceElement, setReferenceElement] = useState();
  let [popperElement, setPopperElement] = useState();
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'right-end',
    modifiers: [
      {
        name: 'offset',
        enabled: true,
        options: {
          offset: [10, 5],
        },
      },
    ],
  });
  return (
    <>
      <Popover className="inline-block align-middle">
        <Popover.Button ref={setReferenceElement}>
          <FilterSolidIcon className="inline-block fill-$base1" />
        </Popover.Button>

        <Popover.Panel
          className="bg-$base4 text-$base7 border-3 border-$secondary8 rounded-md max-w-42"
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <div>
            <p className="uppercase opacity-70 border-b-2 border-$secondary7 text-center px-2 pt-1">
              Sort By:
            </p>
            <ul className="">
              <PopOverPanelListItem onClick={(e) => handleSort('NEW')}>
                Newest
              </PopOverPanelListItem>
              <PopOverPanelListItem onClick={(e) => handleSort('OLD')}>
                Oldest
              </PopOverPanelListItem>
              <PopOverPanelListItem onClick={(e) => handleSort('RATING')}>
                Highest Rating
              </PopOverPanelListItem>
            </ul>
          </div>
        </Popover.Panel>
      </Popover>
      {/* icon - onClick;  Sort, setSort of FuseData */}

      {/*  */}
    </>
  );
}

function PopOverPanelListItem(props) {
  return (
    <>
      <li
        className="p-2 hover:(bg-$primary7 text-$base2 opacity-90)"
        onClick={props.onClick}
      >
        {props.children}
      </li>
    </>
  );
}
