"use client"
// pages/history.js

import React, { useState, useEffect } from 'react';
import Head from 'next/head';

const Application = () => {
  // Sample data (replace with actual API fetch)
  const [proposals, setProposals] = useState([
    { id: 1, title: 'Proposal 1', description: 'Description for Proposal 1' },
    { id: 2, title: 'Proposal 2', description: 'Description for Proposal 2' },
    // Add more proposal objects as needed
  ]);

  const [applications, setApplications] = useState([
    { id: 1, title: 'Application 1', description: 'Description for Application 1' },
    { id: 2, title: 'Application 2', description: 'Description for Application 2' },
    // Add more application objects as needed
  ]);

  
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>History - Your Website Name</title>
      </Head>

      {/* Header with Navigation Bar (Create your Navbar component) */}
      <header>
        {/* Your Navbar goes here */}
      </header>

      {/* Main Content Area */}
      <main className="my-4">
        {/* Proposals Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Proposals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {proposals.map((proposal) => (
              <div key={proposal.id} className="bg-white p-4 rounded-md shadow-md">
                <h3 className="text-xl font-bold">{proposal.title}</h3>
                <p className="text-gray-600">{proposal.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Applications Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Applications</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {applications.map((application) => (
              <div key={application.id} className="bg-white p-4 rounded-md shadow-md">
                <h3 className="text-xl font-bold">{application.title}</h3>
                <p className="text-gray-600">{application.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer (Create your Footer component) */}
      <footer className="mt-8 text-center">
        {/* Your Footer goes here */}
      </footer>
    </div>
  );
};

export default Application
