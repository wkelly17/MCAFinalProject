import Fuse from 'fuse.js';
import React from 'react';

export default function FuseBar({ search, setSearch, className, ...rest }) {
  return (
    <>
      <label htmlFor="fuseBar" className="sr-only">
        Search For a Recipe Here by Name
      </label>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={className}
        id="fuseBar"
        {...rest}
      />
    </>
  );
}
