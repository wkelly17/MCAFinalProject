import React, { useContext } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ColorSwatchOutlineIcon } from './Icons';
import { AppContext } from '../AppContext';

export default function ThemeMenu(props) {
  const { themeColor, addThemeToHTML } = useContext(AppContext);

  return (
    <Menu
      as="div"
      className="absolute right-0 px-8 py-4 ml-auto text-right w-max"
    >
      {({ open }) => (
        <>
          <Menu.Button aria-label="themePicker">
            <ColorSwatchOutlineIcon
              className={'text-$complementary4 h-8 w-8 '}
            />
          </Menu.Button>

          {/*
			Use the Transition component + open render prop to add transitions.
		 */}
          <Transition
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            {/* Don't forget to mark your Menu.Items as static! */}
            <Menu.Items
              as="ul"
              className="list-none bg-$base7 w-48 text-right p-0 text-$base1 mt-1 rounded-lg"
              static
            >
              <Menu.Item>
                {({ active }) => (
                  <li
                    onClick={(e) => addThemeToHTML('orangeTheme')}
                    className={`${
                      active && 'bg-orange-700'
                    } inline-block w-full py-2 px-4 `}
                  >
                    Orange Theme
                  </li>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <li
                    onClick={(e) => addThemeToHTML('purpleTheme')}
                    className={`${
                      active && 'bg-purple-700'
                    } inline-block w-full py-2 px-4 `}
                  >
                    Purple Theme
                  </li>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <li
                    onClick={(e) => addThemeToHTML('defaultTheme')}
                    className={`${
                      active && 'bg-teal-700'
                    } inline-block w-full py-2 px-4 `}
                  >
                    Teal (Default) Theme
                  </li>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <li
                    onClick={(e) => addThemeToHTML('darkTheme')}
                    className={`${
                      active && 'bg-$base2 text-$base8'
                    } inline-block w-full py-2 px-4 `}
                  >
                    Dark Theme
                  </li>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
