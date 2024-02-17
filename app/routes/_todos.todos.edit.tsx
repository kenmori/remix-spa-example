import React from 'react';
import { Link, Outlet, useLoaderData, useRouteError } from '@remix-run/react';
import { ClientActionFunctionArgs } from '@remix-run/react';
import { Form, useActionData, useNavigation } from '@remix-run/react';
import { json, redirect } from '@remix-run/node';

const updateProjectName = (value) => {};

const deleteStuff = (id: string) => {
  fetch(`https://65cd3e7edd519126b8404907.mockapi.io/api/v1/todos/${id}`, {
    method: 'DELETE',
  })
    .then((res) => {
      if (res.ok) {
        return redirect('/');
      }
      // handle error
    })
    .then((task) => {
      // Do something with deleted task
    })
    .catch((error) => {
      // handle error
    });
};
export async function clientLoader() {
  const response = await fetch(
    'https://65cd3e7edd519126b8404907.mockapi.io/api/v1/todos'
  );
  const data = await response.json();
  return data;
}

export async function clientAction({ request }: ClientActionFunctionArgs) {
  let formData = await request.formData();
  const intent = formData.get('intent');
  switch (intent) {
    case 'update': {
      console.log(formData);
      const title = String(formData.get('title'));
      let errors = { title: '' };
      if (title === '') {
        errors.title = 'Invalid title address';
      }

      if (title.length < 12) {
        errors.title = 'title should be at least 12 characters';
      }
      if (Object.keys(errors).length > 0) {
        return json({ errors });
      }
      console.log('title', formData.get('title'));

      return updateProjectName(formData.get('title'));
    }
    case 'delete': {
      // do your delete
      const id = formData.get('id');
      if (id === null) return;
      return deleteStuff(id as string);
    }
    default: {
      throw new Error('Unexpected action');
    }
  }
}

export function ErrorBoundary() {
  const error = useRouteError();
  // When NODE_ENV=production:
  // error.message = "Unexpected Server Error"
  // error.stack = undefined
  console.log(error);
}

type User = {
  title: string;
  createdAt: string;
  isCompleted: boolean;
  id: string;
};

export default function Todos() {
  const data = useLoaderData<User[]>();
  const inputRef = React.useRef<HTMLButtonElement>(null);
  let actionData = useActionData<typeof clientAction>();
  const { state } = useNavigation();
  const busy = state === 'submitting';

  return (
    <div>
      <hr />
      here is edit page
      <ul>
        {data.map((e) => (
          <li className="item">
            <input
              id={e.id}
              type="text"
              minLength={1}
              name="title"
              defaultValue={e.title}
            />
            <Link to={`/todos/edit/${e.id}`}>{e.id}</Link>
            <Form method="post" className="deleteButton">
              <button type="submit" value="delete" name="intent">
                <input type="hidden" name="id" value={e.id} />
                delete
              </button>
            </Form>
          </li>
        ))}
      </ul>
      {actionData?.errors?.title ? <em>{actionData?.errors.title}</em> : null}
      <Form
        method="patch"
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          if (target.value === '') {
            target.setCustomValidity('値が空です');
            if (inputRef.current) {
              inputRef.current.disabled = true;
            }
          } else {
            target.setCustomValidity('');
            if (inputRef.current) {
              inputRef.current.disabled = false;
            }
          }
          target.reportValidity();

          e.stopPropagation();
        }}
      >
        <button
          type="submit"
          name="intent"
          value="update"
          ref={inputRef}
          disabled={busy}
        >
          {busy ? 'Creating...' : 'Edit ToDo'}
        </button>
      </Form>
      <hr />
      <Outlet />
    </div>
  );
}
