'use client'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { ResetPassword } from '@/components/ResetPassword'
import { FormContainer, PageMain, PageWrapper } from '@/styles/Layout.styled'

const resetPassword = () => {
  return (
 <PageWrapper>
      <Navbar />
      <PageMain>
        <FormContainer>
          <ResetPassword />
        </FormContainer>
      </PageMain>
      <Footer />
    </PageWrapper>
  )
}

export default resetPassword
