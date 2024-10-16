
export default function Navbar () {
  return (
    <nav className="relative w-full h-96 bg-cover" style={{backgroundImage: `url('/src/assets/bg-img-2.avif')` }}>
      <div className="absolute inset-o bg-black bg-opacity-50" />

      <div className="relative z-10 flex items-center justify-between p-6">
        <div className="text-black font-bold text-2xl">Holidaze</div>
        <div className="flex space-x-2 text-black">
          <button className="border rounded-md py-2 px-4 font-semibold bg-white bg-opacity-25">Register</button>
          <button className="border rounded-md py-2 px-4 font-semibold bg-white bg-opacity-25">Login</button>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between h-full px-6">
          <h1>Calendar content here</h1>
      </div>
    </nav>
  )
}