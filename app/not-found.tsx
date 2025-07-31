'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-purple-600 via-indigo-700 to-blue-600 p-6 text-center"
    >
      <motion.h1
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
        className="text-white text-6xl font-extrabold mb-4 tracking-wide"
      >
        404
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="text-white text-2xl sm:text-3xl font-semibold mb-4"
      >
        Oops! Page Not Found
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="text-indigo-200 max-w-md mb-8 px-4 sm:px-0"
      >
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <Link
          href="/"
          className="inline-block bg-white text-indigo-700 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-50 transition"
        >
          Go Home
        </Link>
      </motion.div>
    </motion.div>
  )
}
