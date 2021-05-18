import React from 'react';
import { BowlSolidIcon } from './Icons';

export default function Logo({ children, classNames }) {
  return (
    <h1 className="font-cursive text-center pb-4 text-4xl text-$base8 opacity-80 inline-block">
      CurryOn <BowlSolidIcon className="inline-block" />
    </h1>
  );
}
