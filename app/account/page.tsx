'use client'
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AccountForm } from '@/components/AccountForm';


const AccountPage = () => {
  return (
    <>
      <Navbar />
      <AccountForm />
      <Footer />
    </>
  );
};

export default AccountPage;
