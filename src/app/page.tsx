"use client";
import { useState } from "react";

export default function Home() {
  const [response, setResponse] = useState<any>(null);

  type MessageProps = {
    id: number;
    name: string;
  };
  const message: MessageProps = {
    id: 1,
    name: "kagami",
  };

  type ItemProps = {
    name: string;
  };
  const item: ItemProps = {
    name: "PC",
  };

  const sendMessage = async (item: ItemProps) => {
    const res = await fetch("http://localhost:8000/item_subs/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    if (res.ok) {
      // レスポンスのJSONデータを取得
      const jsonData = await res.json();

      // jsonDataを画面に表示
      setResponse(jsonData);
    } else {
      alert("エラーが発生しました");
    }
  };

  return (
    <div className='bg-slate-600 h-screen flex flex-col items-center justify-center'>
      <h1 className='text-3xl font-bold'>FastAPI Ping</h1>
      <form>
        <button
          type='button'
          className='bg-blue-300 hover:bg-blue-700 text-white p-3 rounded-md mt-4'
          onClick={() => sendMessage(item)}
        >
          送信
        </button>
      </form>
      {response && (
        <div className='mt-4 bg-green-100 p-4 rounded-md'>
          <p className='text-green-500 font-medium'>サーバーからの応答:</p>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
