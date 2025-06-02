import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';


import { User, UserRound } from "lucide-react"

const OnlineApplication=()=> {
  return (
    <div className="max-w-5xl mx-auto space-y-6 p-4">
      {/* Reference Details Section */}
      <div className="border rounded-lg p-6 bg-white shadow-sm">
        <div className="flex items-center gap-2 mb-6 text-gray-800 font-medium">
          <User className="h-5 w-5 text-blue-700" />
          <h2 className="text-lg uppercase font-bold">REFERENCE DETAILS :</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="rank" className="block text-sm font-medium text-gray-700">
              Rank/Designation
            </label>
            <input
              type="text"
              id="rank"
              placeholder="Enter rank/designation"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="serviceId" className="block text-sm font-medium text-gray-700">
              Service/ID No
            </label>
            <input
              type="text"
              id="serviceId"
              placeholder="Enter service/ID no"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="relationship" className="block text-sm font-medium text-gray-700">
              Relationship With Applicant
            </label>
            <input
              type="text"
              id="relationship"
              placeholder="Enter relationship"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Personal Details Section */}
      <div className="border rounded-lg p-6 bg-white shadow-sm">
        <div className="flex items-center gap-2 mb-6 text-gray-800 font-medium">
          <UserRound className="h-5 w-5 text-blue-700" />
          <h2 className="text-lg uppercase font-bold">PERSONAL DETAILS :</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label htmlFor="personalName" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="personalName"
              placeholder="Enter name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="text"
              id="dob"
              placeholder="dd-mm-yyyy"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              type="text"
              id="age"
              placeholder="Enter age"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700">
              Father's/Spouse Name
            </label>
            <input
              type="text"
              id="fatherName"
              placeholder="Enter father's/spouse name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone No
            </label>
            <input
              type="text"
              id="phone"
              placeholder="Enter phone number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email ID
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-2">
            <label htmlFor="permanentAddress" className="block text-sm font-medium text-gray-700">
              Permanent Address
            </label>
            <textarea
              id="permanentAddress"
              placeholder="Enter permanent address"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div className="space-y-2">
            <label htmlFor="correspondenceAddress" className="block text-sm font-medium text-gray-700">
              Correspondence Address
            </label>
            <textarea
              id="correspondenceAddress"
              placeholder="Enter correspondence address"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div className="space-y-2">
            <label htmlFor="workingAddress" className="block text-sm font-medium text-gray-700">
              Working Address
            </label>
            <textarea
              id="workingAddress"
              placeholder="Enter working address"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div className="space-y-2">
            <label htmlFor="remark" className="block text-sm font-medium text-gray-700">
              Remark, If Any
            </label>
            <textarea
              id="remark"
              placeholder="Enter remark"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-2">
            <label htmlFor="memberPhoto" className="block text-sm font-medium text-gray-700">
              Member Photo
            </label>
            <input
              type="file"
              id="memberPhoto"
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-gray-50 file:text-gray-700
                hover:file:bg-gray-100"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="signaturePhoto" className="block text-sm font-medium text-gray-700">
              Member Signature Photo
            </label>
            <input
              type="file"
              id="signaturePhoto"
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-gray-50 file:text-gray-700
                hover:file:bg-gray-100"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnlineApplication