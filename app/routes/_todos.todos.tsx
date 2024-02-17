import { ActionFunctionArgs } from '@remix-run/node';
import {
  Link,
  Outlet,
  redirect,
  useLoaderData,
  useNavigation,
} from '@remix-run/react';
import { Form } from '@remix-run/react';

export async function clientLoader() {
  const response = await fetch(
    'https://65cd3e7edd519126b8404907.mockapi.io/api/v1/todos'
  );
  const data = await response.json();
  return data;
}

export async function clientAction({ request }: ActionFunctionArgs) {
  const body = await request.formData();

  console.log('fafa', JSON.stringify(body));
  const res = await fetch(
    'https://65cd3e7edd519126b8404907.mockapi.io/api/v1/todos',
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      // Send your data in the request body as JSON)
      body: JSON.stringify(body),
    }
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      // handle error
    })
    .then((task) => {
      // do something with the new task
    })
    .catch((error) => {
      // handle error
    });
  return redirect('/todos');
}

type User = {
  title: string;
  createdAt: string;
  isCompleted: boolean;
  id: string;
};

export default function Todos() {
  const data = useLoaderData<User[]>();
  const { state } = useNavigation();
  const busy = state === 'submitting';
  return (
    <div className="wrapPage">
      <div>here is index page</div>
      <Link to={`/todos/edit`}>edit page</Link>
      <ul>
        {data.map((e) => (
          <li>
            <Link to={`/todos/edit/${e.id}`}>
              <div id={e.id}>{e.title}</div>
            </Link>
          </li>
        ))}
      </ul>
      <Form method="post">
        <input type="text" placeholder="some" name="title" />
        <button type="submit">{busy ? 'Creating...' : 'add task'}</button>
      </Form>
      <Outlet />
    </div>
  );
}
