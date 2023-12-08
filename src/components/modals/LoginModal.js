
import React from 'react'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
}
  from 'mdb-react-ui-kit';
const LoginModal = () => {
  return (
    <div style={{
      position: 'fixed',
      width: '100%',
      height: '100%',
      backgroundColor: '#00000090',
      top: 0,
      left: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999 // Adjust the z-index as needed
    }}>
      <MDBContainer fluid>

        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
          <MDBCol col='12'>

            <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
              <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

                <h2 className="fw-bold mb-2 text-uppercase">로그인</h2>
                <p className="text-white-50 mb-5">이메일과 비밀번호를 입력해주세요</p>

                <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='이메일' id='formControlLg' type='email' size="lg" />
                <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='비밀번호' id='formControlLg' type='password' size="lg" />

                <p className="small mb-3 pb-lg-2"><a class="text-white-50" href="#!">비밀번호를 잊으셨나요?</a></p>
                <MDBBtn onClick={() => { alert("로그인 성공") }} style={{ width: '150px', height: '55px' }} outline className='mx-2 px-5' color='white' size='lg'>
                  로그인
                </MDBBtn>

                <div className='d-flex flex-row mt-3 mb-5'>
                  <MDBBtn tag='a' color='none' className='m-3' style={{ width: '21px', height: '24px', color: 'white' }}>
                    <MDBIcon fab icon='github' size="lg" />
                  </MDBBtn>

                  <MDBBtn onClick={() => { alert("카카오 로그인 성공") }} tag='a' color='none' className='m-3' style={{ width: '21px', height: '24px', color: 'yellow' }}>
                    <MDBIcon class='fas fa-comment' size="lg" />
                  </MDBBtn>

                  <MDBBtn onClick={() => { alert("구글 로그인 성공") }} tag='a' color='none' className='m-3' style={{ width: '21px', height: '24px', color: 'white' }}>
                    <MDBIcon fab icon='google' size="lg" />
                  </MDBBtn>
                </div>

                <div>
                  <p className="mb-0">계정이 없으신가요? <a href="#!" class="text-white-50 fw-bold">회원가입</a></p>

                </div>
              </MDBCardBody>
            </MDBCard>

          </MDBCol>
        </MDBRow>

      </MDBContainer>

    </div>
  )
}

export default LoginModal