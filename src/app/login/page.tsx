'use client';

import './login.scss';
import Form from "../components/form/Form";
import SearchFilter from '../components/searchFilter/searchFilter';

export default function Login() {

  return (
    <div className="container h-full	font-[family-name:var(--font-geist-sans)] login-page">
      <main className="flex flex-col h-full	">
        {/* <SearchFilter hideSearchResult={true} />   */}
        <div className="mt-10">
          <Form type="login" />
        </div>
      </main>
    </div>
  );
}