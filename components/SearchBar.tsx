'use client'

import { useState, type FormEvent } from 'react'

interface SearchBarProps {
  onSearch: (city: string) => void
  disabled?: boolean
}

export default function SearchBar({ onSearch, disabled = false }: SearchBarProps) {
  const [value, setValue] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const city = value.trim()
    if (city) onSearch(city)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 rounded-2xl bg-white p-2 shadow-lg shadow-violet-200/60 ring-1 ring-violet-100"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="ml-3 h-5 w-5 shrink-0 text-violet-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>

      <label htmlFor="city" className="sr-only">
        City name
      </label>
      <input
        id="city"
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search a city, e.g. Lahore"
        className="min-w-0 flex-1 bg-transparent px-1 py-2.5 text-slate-900 outline-none placeholder:text-slate-400"
      />

      <button
        type="submit"
        disabled={disabled}
        className="rounded-xl bg-violet-600 px-5 py-2.5 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {disabled ? 'Searching...' : 'Search'}
      </button>
    </form>
  )
}