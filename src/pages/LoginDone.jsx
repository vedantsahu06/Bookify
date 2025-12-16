import React from 'react'

function LoginDone() {
  return (
    <div className="min-h-screen py-8">
      <div className="container-center">
        <div className="form-card text-center">
          <div className="mb-6">
            <svg className="w-20 h-20 mx-auto text-emerald-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Login Successful!</h2>
            <p className="text-slate-600 mb-6">You're now signed in to your Bookify account.</p>
            <a href="/" className="btn btn-primary inline-flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Go to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginDone
