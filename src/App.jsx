//import "./App.css"
function App() {

  return (
    <div className="app-container bg-[url('/bg1.jpg')] bg-cover bg-center bg-no-repeat bg-fixed contrast-[1.2] saturate-[1.1] flex flex-col h-dvh text-white transition-all" style={{backgroundAttachment: 'fixed'}}>
     <header className="w-full flex justify-between items-center p-4 border-b border-gray-300 sticky top-0 bg-opacity-70 bg-black z-10">
      <div className="logo ">logo</div>
      <ul className="flex gap-4 list-none p-0 m-0">
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
     </header>
     <main className="flex flex-col justify-center items-center gap-8 flex-1 px-4">
      <h1 className="text-4xl font-bold text-center">Welcome to My Website.</h1>
      <h3 className="text-lg mt-4">i'm a beginner developer, by mobile phone</h3>
      <p className="text-center">If you want to know more about me, click the button below.</p>
       <button className="bg-[#d97706] text-white px-4 py-2 rounded hover:bg-[#b45309] transition-colors">about me</button>{/*"bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 */}
     </main>
     <footer className="flex ">
      <p>thank you for visiting my website.</p>
     </footer>
    </div>
  )
}

export default App
