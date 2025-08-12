'use client'
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AccountForm } from '@/components/AccountForm';
import { FormContainer, PageMain, PageWrapper } from '@/styles/Layout.styled';


const Account = () => {
  return (
     <PageWrapper>
         <Navbar />
         <PageMain>
           <FormContainer>
             <AccountForm />
           </FormContainer>
         </PageMain>
         <Footer />
       </PageWrapper>
  );
};

export default Account;
