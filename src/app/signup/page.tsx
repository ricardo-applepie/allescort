'use client';

import './signUp.scss';
import Form from '../components/form/Form';


export default function SignUp() {

  return (
    <div className="w-full h-full	font-[family-name:var(--font-geist-sans)] signup-page">
      <main className="flex flex-col h-full	">
        <div className=" mt-10">
          <Form type="signup"  />
        </div>
      </main>
    </div>
  );
};