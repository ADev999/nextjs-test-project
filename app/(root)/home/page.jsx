"use client";
import './table.css';
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button className="btn text-sm text-white bg-purple-500 hover:bg-purple-600 shadow-sm group" onClick={signoust}>sign out</button>
      <table style={{margin: 'auto', fontSize: 18, width: 1000}} >
        <thead style={{fontSize: 28, fontWeight: 'bold'}}>
          <tr>
            <td width={100}>no</td>
            <td width={300}>name</td>
            <td width={800}>address</td>
          </tr>
        </thead>
        <tbody>
            {
              list.map((item, idx) => 
                <tr key={idx}>
                  <td>{item.no}</td>
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                </tr>
              )
            }
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">Total: {list.length} items</td>
          </tr>
        </tfoot>
      </table>
    </main>
  )
}