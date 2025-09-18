'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

type ResumeType = 'swe' | 'ml';

export default function ResumePage() {
  const [resumeType, setResumeType] = useState<ResumeType>('swe');

  const resumeFiles = {
    swe: '/resume-swe.pdf',
    ml: '/resume-ml.pdf'
  };

  const resumeLabels = {
    swe: 'Software Engineer',
    ml: 'Machine Learning'
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header with toggle buttons */}
      <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Home
              </Link>
              <h1 className="text-2xl font-bold">Resume</h1>
            </div>

            {/* Resume type toggle */}
            <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1">
              {(Object.keys(resumeFiles) as ResumeType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setResumeType(type)}
                  className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                    resumeType === type
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  {resumeLabels[type]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 p-4">
        <motion.div
          key={resumeType}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-7xl mx-auto"
        >
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
            <iframe
              src={resumeFiles[resumeType]}
              className="w-full h-[calc(100vh-120px)]"
              title={`${resumeLabels[resumeType]} Resume`}
            />
          </div>
        </motion.div>
      </div>

      {/* Fixed action buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3">
        {/* Home button */}
        <Link href="/">
          <motion.div
            className="flex items-center justify-center w-14 h-14 bg-gray-700 text-white rounded-full font-medium hover:bg-gray-600 transition-colors shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Back to Home"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </motion.div>
        </Link>

        {/* Download button */}
        <motion.a
          href={resumeFiles[resumeType]}
          download={`Steric_Tsui_Resume_${resumeType.toUpperCase()}.pdf`}
          className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition-colors shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Download
        </motion.a>
      </div>
    </div>
  );
}