export function AuthPage({ isSignin }: { isSignin: boolean }) {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="p-2 m-2 rounded bg-white ">
        <input type="text" placeholder="Email"></input>
        <input type="password" placeholder="Password"></input>
        
      </div>
    </div>
  );
}
