import React from 'react';
import { Button } from 'components';
import trpc from '../utils/trpc';

export default function Home() {
  const hello = trpc.hello.useQuery({ text: 'Platform Portal' });
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
