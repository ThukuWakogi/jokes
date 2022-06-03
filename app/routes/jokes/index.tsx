import { Joke } from '@prisma/client';
import { json, LoaderFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { db } from '~/utils/db.server';

export const loader: LoaderFunction = async () => {
  const count = await db.joke.count();
  const randomRowNumber = Math.floor(Math.random() * count);
  const [randomJoke] = await db.joke.findMany({
    take: 1,
    skip: randomRowNumber,
  });

  return json({ randomJoke });
};

export default function JokesIndexRoute() {
  const data = useLoaderData<{ randomJoke: Joke }>();
  console.log({ data });

  return (
    <div>
      <p>Here's a random joke:</p>
      <p>{data.randomJoke.content}</p>
      <Link to={data.randomJoke.id}>"{data.randomJoke.name}" Permalink</Link>
    </div>
  );
}
