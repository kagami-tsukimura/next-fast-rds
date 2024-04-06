"use client";
import { useState } from "react";
import { Item } from "../../types";

export default function Home() {
  const [response, setResponse] = useState<any>(null);
  const [id, setId] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // GET
  const getMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const item: Item = {
      name,
    };
    let url: string;

    id
      ? (url = `http://localhost:8000/item_subs/${id}`)
      : (url = `http://localhost:8000/item_subs/`);

    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) {
        throw new Error("Error");
      }
      const items = await res.json();
      setResponse(items);
      setMessage("Item Got!");
      return items;
    } catch (error: unknown) {
      console.log(error);
    }
  };

  // POST
  const postMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const item: Item = {
      name,
    };

    try {
      const res = await fetch("http://localhost:8000/item_subs/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      if (res.ok) {
        const jsonData = await res.json();
        setResponse(jsonData);
        setMessage("Item Created!");
      } else {
        throw new Error("Error");
      }
    } catch (error: unknown) {
      console.log(error);
    }
  };

  // PUT
  const putMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const item: Item = {
      name,
    };

    try {
      const res = await fetch(`http://localhost:8000/item_subs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      if (res.ok) {
        const jsonData = await res.json();
        setResponse(jsonData);
        setMessage("Item Updated!");
      } else {
        throw new Error("Error");
      }
    } catch (error: unknown) {
      console.log(error);
    }
  };

  // DELETE
  const deleteMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const item: Item = {
      name,
    };

    try {
      const res = await fetch(`http://localhost:8000/item_subs/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const jsonData = await res.json();
        setResponse(jsonData);
        setMessage("Item Deleted!");
      } else {
        throw new Error("Error");
      }
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <div className='bg-slate-600 h-screen flex flex-col items-center justify-center'>
      <h1 className='text-3xl font-bold'>FastAPI Ping</h1>

      <div className='flex justify-center'>
        {/* GET */}
        <form
          className='flex flex-col justify-center m-4'
          onSubmit={getMessage}
        >
          <input
            type='number'
            className='shadow border rounded w-full py-2 px-4 m-4 text-gray-700 leading-tight focus:outline-none'
            placeholder='Enter item_sub Id'
            onChange={(e) => setId(parseInt(e.target.value))}
          />
          <button
            type='submit'
            className='w-full bg-blue-300 hover:bg-blue-700 text-white py-2 px-4 m-4 rounded-md'
          >
            GET
          </button>
        </form>

        {/* POST */}
        <form
          className='flex flex-col justify-center m-4'
          onSubmit={postMessage}
        >
          <input
            type='text'
            className='shadow border rounded w-full py-2 px-4 m-4 text-gray-700 leading-tight focus:outline-none'
            placeholder='Enter item_sub Name'
            onChange={(e) => setName(e.target.value)}
          />
          <button
            type='submit'
            className='w-full bg-blue-300 hover:bg-blue-700 text-white py-2 px-4 m-4 rounded-md'
          >
            POST
          </button>
        </form>
      </div>

      <div className='flex justify-center'>
        {/* PUT */}
        <form className='flex flex-col justify-center' onSubmit={putMessage}>
          <input
            type='number'
            className='shadow border rounded w-full py-2 px-4 m-4 text-gray-700 leading-tight focus:outline-none'
            placeholder='Enter item_sub Id'
            onChange={(e) => setId(parseInt(e.target.value))}
          />
          <input
            type='text'
            className='shadow border rounded w-full py-2 px-4 m-4 text-gray-700 leading-tight focus:outline-none'
            placeholder='Enter item_sub Name'
            onChange={(e) => setName(e.target.value)}
          />
          <button
            type='submit'
            className='w-full bg-blue-300 hover:bg-blue-700 text-white py-2 px-4 m-4 rounded-md'
          >
            PUT
          </button>
        </form>

        {/* DELETE */}
        <form
          className='flex flex-col justify-center m-4'
          onSubmit={deleteMessage}
        >
          {/* 位置調整 */}
          <input
            type='hidden'
            className='shadow border rounded w-full py-2 px-4 m-4 text-gray-700 leading-tight focus:outline-none'
          />
          <input
            type='number'
            className='shadow border rounded w-full py-2 px-4 m-4 text-gray-700 leading-tight focus:outline-none'
            placeholder='Enter item_sub Id'
            onChange={(e) => setId(parseInt(e.target.value))}
          />
          <button
            type='submit'
            className='w-full bg-blue-300 hover:bg-blue-700 text-white py-2 px-4 m-4 rounded-md'
          >
            DELETE
          </button>
        </form>
      </div>

      {response && (
        <div className='mt-4 bg-green-100 p-4 rounded-md'>
          <p className='text-green-500 font-medium'>
            サーバーからの応答：{message}
          </p>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
