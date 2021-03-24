# SWF

[![NPM](https://img.shields.io/npm/v/@raulpesilva/swf.svg)](https://www.npmjs.com/package/@raulpesilva/swf)
![NPM](https://img.shields.io/npm/l/@raulpesilva/swf)
![node-current](https://img.shields.io/node/v/@raulpesilva/swf)
![npm bundle size](https://img.shields.io/bundlephobia/min/@raulpesilva/swf)

simple manager api fetch inspired by SWR

## Installation

```sh
npm install @raulpesilva/swf
```

or

```sh
yarn add @raulpesilva/swf
```

## TODO

- [ ] - Examples
- [ ] - Tests
- [ ] - Doc

## Usage

```js
import useSWF from '@raulpesilva/swf'


type TodoProps = {
  id: number;
  userId: number;
  title: string;
  completed: boolean
}

const instanceGet = async (url: Url) => await fetch(url, { method: 'get' }).then(data => data.json())

const Foo = () => {
  const { loading, send, error, result } = useSWF<TodoProps[]>('https://jsonplaceholder.typicode.com/todos', instanceGet);

  useEffect(() => {
    send();
  }, [send]);

  if (loading) return <div>loading...</div>;
  if (error) return <div>{JSON.stringify(error)}</div>;
  if (!result?.length) return <div>Empty</div>;
  return (
    <div>
      {result.map((todo) => {
        return (
          <div key={todo.id}>
            <p>{todo.title}</p>
            <input type="checkbox" checked={todo.completed} />
          </div>
        );
      })}
    </div>
  );
};

```

or

```js
import useSWF from '@raulpesilva/swf'


type TodoProps = {
  id: number;
  userId: number;
  title: string;
  completed: boolean
}

const instanceGet = async (url: Url) => await fetch(url, { method: 'get' }).then(data => data.json())

const Foo = () => {
  const { loading, send, error, result, preFetch } = useSWF<TodoProps[]>('https://jsonplaceholder.typicode.com/todos', instanceGet);

  useEffect(() => {
    preFetch();
  }, [preFetch]);

  const handleSendRequest = () => {
    send();
  };

  if (loading) return <div>loading...</div>;
  if (error) return <div>{JSON.stringify(error)}</div>;
  if (!result?.length)
    return (
      <div>
        <h1>Empty</h1>
        <button onClick={handleSendRequest}>Request todos</button>
      </div>
    );
  return (
    <div>
      {result.map((todo) => {
        return (
          <div key={todo.id}>
            <p>{todo.title}</p>
            <input type="checkbox" checked={todo.completed} />
          </div>
        );
      })}
    </div>
  );
};

```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT © [raulpesilva](https://github.com/raulpesilva)
