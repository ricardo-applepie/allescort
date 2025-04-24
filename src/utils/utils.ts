import { useState } from "react";

// utils.ts
const backendUrl = process.env.ENDPOINT_URL || 'http://localhost:4000'

// Generic GET request function
export async function getData(url: string, authToken?: string | null) {
  try {
    const response = await fetch(backendUrl+url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `${authToken}`, // Add JWT token to Authorization header
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("GET request failed", error);
    throw error; // Propagate the error to handle it later
  }
}

// Generic POST request function
export async function postData(url: string, body: object, authToken?: string | null) {
  try {
    const response = await fetch(backendUrl+url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `${authToken}`, // Add JWT token to Authorization header
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("POST request failed", error);
    throw error; // Propagate the error to handle it later
  }
}
