/*
 * Platform Portal Homepage (http(s)://[hosturl]/)
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
  const hello = trpc.hello.useQuery({ text: 'Platform Portal' });
  if (!hello.data) {
    return <div>Loading...</div>;
  }
  return (
    <div className="ml-2">
      <h1 className="pb-10 text-brand">{hello.data.greeting}</h1>
      <Button
        style="secondary"
        action="https://github.com/UTDNebula/platform/issues/1"
        text="Regenerate"
        icon="refresh"
      />
    </div>
  );
}
