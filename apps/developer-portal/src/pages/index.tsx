/*
 * Developer Portal Homepage (http(s)://[hosturl]/)
 * 
 * (Description on the way)
 * 
 * Written by Daniel "Ludo" DeAnda (dcd180001) for CS4485.0W1
 * (Nebula Platform CS Project) starting March 21, 2023
 */

import React from 'react';
import { Button } from 'components';
import trpc from '../utils/trpc';

export default function Home() {
  const hello = trpc.hello.useQuery({ text: 'Developer Portal' });
  if (!hello.data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1 className="pb-10">{hello.data.greeting}</h1>
      <Button />
    </div>
  );
}
