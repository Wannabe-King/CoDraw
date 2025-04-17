"use client"

export function AuthPage({ isSignin }: { isSignin: boolean }) {
  return (
    <div className="w-screen h-screen flex justify-center items-center ">
      <div className="m-2 rounded bg-white text-black flex flex-col">
        <input className="p-2 m-2 border-2 border-black rounded-3xl " type="text" placeholder="Email"></input>
        <input className="p-2 m-2 border-2 border-black rounded-3xl " type="password" placeholder="Password"></input>
        <button className="bg-stone-400 rounded m-2 py-2 font-bold hover:bg-stone-600" onClick={() => {}}>{isSignin ? "SignIn" : "SignUp"}</button>
      </div>
    </div>
  );
}
