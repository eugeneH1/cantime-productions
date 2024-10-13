import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center text-white">
      {/* Background Image */}
      <Image
        src="/logo.jpeg?height=1080&width=1920"
        alt="Background"
        fill
        className="object-cover"
        priority
      />
      
      {/* Overlay to ensure text is readable */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      
      {/* Content */}
      <div className="relative z-10 space-y-8">
        {/* Logo */}
        <div className="mx-auto w-32 h-32 bg-white rounded-full flex items-center justify-center">
          <Image
            src="/logo.png?height=100&width=100"
            alt="Logo"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
        
        {/* Heading */}
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Welcome to Cantime Productions
        </h1>
        
        {/* Call to Action Button */}
        <Link
          href="/about"
          className="inline-flex h-12 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-gray-900 shadow transition-colors hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
        >
          Get Started
        </Link>
      </div>
    </section>
  )
}