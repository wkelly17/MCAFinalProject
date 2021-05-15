import React, { useState } from 'react';

export default function Folder({ children, className }) {
  return (
    <>
      <ul className={className}>{children}</ul>
    </>
  );
}

Folder.Item = function FolderItem({
  className,
  foldersState,
  setFolders,
  folder,
  ...restProps
}) {
  let [checked, setChecked] = useState(false);

  function handleChange(e) {
    if (e.keyCode && e.keyCode !== 32) {
      return;
    }
    setChecked(!checked);
    if (e.target.checked) {
      setFolders([...foldersState, e.target.value]);
    } else {
      let filtered = foldersState.filter((folder) => folder !== e.target.value);
      // set to empty array since page is checking for folders.length
      filtered.length ? setFolders(filtered) : setFolders([]);
    }
  }

  return (
    <li className={className}>
      <label
        htmlFor={folder}
        className={`w-full h-full flex items-center justify-between text-sm p-2 ${
          checked && 'bg-$secondary5 opacity-80'
        }`}
      >
        {folder}
        <input
          type="checkbox"
          className="invisible"
          tabIndex={1}
          checked={checked}
          value={folder}
          id={folder}
          onChange={(e) => handleChange(e)}
          onClick={(e) => handleChange(e)}
          onKeyDown={(e) => handleChange(e)}
        />
        <span
          className={`h-6 w-6 p-1 rounded-full bg-$base7 inline-flex items-center justify-center ml-2`}
        >
          <span
            className={`w-full h-full inline-block rounded-full h-4 w-4 ${
              checked && 'bg-$secondary4'
            }`}
          ></span>
        </span>
      </label>
    </li>
  );
};
