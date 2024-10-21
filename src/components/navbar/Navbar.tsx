export default function Navbar () {
  return (
    <nav className="relative w-full h-96 bg-cover" style={{backgroundImage: `url('/src/assets/bg-img-1.avif')` }}>
      <div className="absolute inset-o bg-black bg-opacity-50" />

      <div className="relative z-10 flex items-center justify-between p-6">
        <div className="text-black font-bold text-2xl">Holidaze</div>
        <div className="flex space-x-2 text-black">
          <button className="border rounded-md py-2 px-4 font-semibold bg-white  text-black">Register</button>
          <button className="border rounded-md py-2 px-4 font-semibold bg-white bg-opacity-75">Login</button>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center h-full px-6">
          <h1 className="text-2xl bg-black text-white p-2">Calendar content here</h1>
      </div>
    </nav>
  )
}