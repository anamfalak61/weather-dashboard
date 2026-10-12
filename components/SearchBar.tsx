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
      className="flex items-center gap-2 rounded-2xl bg-emerald-900/40 p-2 ring-1 ring-emerald-400/20 backdrop-blur"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="ml-3 h-5 w-5 shrink-0 text-emerald-300"
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
        placeholder="Search city"
        className="min-w-0 flex-1 bg-transparent px-1 py-2.5 text-emerald-50 outline-none placeholder:text-emerald-200/50"
      />

      <button
        type="submit"
        disabled={disabled}
        className="rounded-xl bg-emerald-400 px-5 py-2.5 font-semibold text-emerald-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {disabled ? 'Searching...' : 'Search'}
      </button>
    </form>
  )
}