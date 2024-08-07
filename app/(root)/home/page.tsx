"use client";
import { useRouter } from "next/navigation";

export default function SignIn() {

  const list = [
    { no: 1, name: 'John Doe', address: '123 Main St' },
    { no: 2, name: 'Jane Smith', address: '456 Oak St' },
    { no: 3, name: 'Alice Johnson', address: '789 Pine St' },
  ];
	const router = useRouter();

  const signoust = () => {
    router.push("/");
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <button className="btn text-sm text-white bg-purple-500 hover:bg-purple-600 shadow-sm group" onClick={signoust}>sign out</button>
      <table className="mt-5 w-3/5 border border-white-500" >
        <thead className="text-2xl border-2 border-white-500 ">
          <tr className="border border-white-500">
            <td className="w-1/6 p-3 border border-white-500" >no</td>
            <td className="w-2/6 p-3 border border-white-500" >name</td>
            <td className="w-3/6 p-3 border border-white-500" >address</td>
          </tr>
        </thead>
        <tbody>
            {
              list.map((item, idx) => 
                <tr className={idx%2?"bg-cyan-500/100":"bg-cyan-500/75"} key={idx}>
                  <td className="p-4 border border-white-500">{item.no}</td>
                  <td className="p-4 border border-white-500">{item.name}</td>
                  <td className="p-4 border border-white-500">{item.address}</td>
                </tr>
              )
            }
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} className="col-span-12 p-4">Total: {list.length} items</td>
          </tr>
        </tfoot>
      </table>
    </main>
  )
}