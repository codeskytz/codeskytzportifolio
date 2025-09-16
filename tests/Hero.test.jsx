import React from 'react'
import { render, screen } from '@testing-library/react'
import Hero from '../components/Hero'

test('renders hero headline', ()=>{
  render(<Hero />)
  expect(screen.getByText(/Innovation With No Limit/i)).toBeInTheDocument()
})
