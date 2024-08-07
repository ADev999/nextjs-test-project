"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import httpReq from "@/lib/httpReq";
import { useCookies } from "react-cookie";
import Link from 'next/link'

export default function SignIn() {
	const [name, setName] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [cookies, setCookie] = useCookies(["token"]);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const tmpName = 'test';
	const tmpPwd = '123';

	const onSignIn = async (e: any) => {
		e.preventDefault();
		if (!name) {
			toast.warning("Enter your name.");
			return;
		}
		if (!password) {
			toast.warning("Enter your password.");
			return;
		}
		if (tmpName == name && tmpPwd == password) {
			// httpReq.post("/api/login", { name, password })
			// 	.then(res =>{
			// 		if (res) {
			// 			setCookie("token", res); // When a login is successful in the backend, a token value should be generated and response to the frontend...
			// 			router.push("/home");
			// 		} else {
			// 			toast.warning("server error.");
			// 		}
			// 	})
			setLoading(true);
			try {
				const res = await httpReq.post("/api/login", { name, password });
				setLoading(false);
				if (res) {
					const token = await httpReq.get("/api/me");
					if (token) {
						setCookie("token", res);
						router.push('/home');
					} else {
						toast.warning("unknown token error.");
					}
				}
			} catch (error) {
				toast.warning('network error');
				router.push('/home');
			}
		} else {
			toast.warning("Incorrect username or passowrd.");
			return;
		}
		
	};

	return (
		<div className="m-auto">
			<div className="max-w-3xl mx-auto text-center pb-12">
			<div className="mb-5">
				<Link className="inline-flex" href="/">
				</Link>
			</div>
				<h1 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60">Sign in to your account</h1>
			</div>
			<div className="max-w-sm mx-auto">
				<form>
					<div className="space-y-4">
						<div>
							<label className="block text-sm text-slate-300 font-medium mb-1" htmlFor="name">
								name
							</label>
							<input id="name" className="form-input w-full" placeholder="test" type="text" value={name} onChange={(e) => setName(e.target.value)} />
						</div>
						<div>
							<div className="flex justify-between">
								<label className="block text-sm text-slate-300 font-medium mb-1" htmlFor="password">
									Password
								</label>
							</div>
							<input id="password" className="form-input w-full" type="password" autoComplete="on" value={password} onChange={(e) => setPassword(e.target.value)} />
						</div>
					</div>
					<div className="mt-7">
						<button style={{width: '40%', float: 'right'}} className="btn text-sm text-white bg-purple-500 hover:bg-purple-600 w-full shadow-sm group" onClick={onSignIn} disabled={loading}>
							Sign In <span className="tracking-normal text-purple-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1"></span>
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
