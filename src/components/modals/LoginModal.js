
import React, { useContext, useEffect, useState } from 'react'
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
import SignupModal from './SignupModal';
import logIn from '../../Api/logIn';
import { AuthContext } from '../../contexts/AuthContext';
import Cookies from 'js-cookie';

const LoginModal = () => {
  const { setAccessToken } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(true);
  const [isSignup, setIsSignup] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  //const [accessToken, setAccessToken] = useState("");
  // const [refreshToken, setRefreshToken] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }

  }, []); // 빈 배열을 의존성으로 제공하여 컴포넌트 마운트 시에만 실행됩니다.

  const handleClickLoginBtn = async () => {

    const { accessToken, refreshToken } = await logIn(email, password);

    localStorage.setItem("accessToken", accessToken);
    Cookies.set('refreshToken', refreshToken, { expires: 14, path: '/' }); // 14일 후 만료
    alert("로그인 성공");

    setAccessToken(accessToken); // 상태 변수에 새로운 토큰 값을 설정

    setIsOpen(false); // 모달 닫기
    window.location.reload(); // 현재 페이지 새로 고침

  }

  const closeModal = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  const handleModalContentClick = (e) => {
    if (!e.target.classList.contains('custom-close-button')) {
      e.stopPropagation();
    }
  };

  const handleChangeId = (event) => {
    const value = event.target.value
    setEmail(value)
  }

  const handleChangePassword = (event) => {
    const value = event.target.value
    setPassword(value)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleClickLoginBtn(); // 로그인 버튼 클릭과 동일한 로직 수행
    }
  }

  return (
    <>
      {isOpen && (
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
          zIndex: 999 // 필요에 따라 z-index를 조절합니다.
        }} onClick={closeModal}>
          <MDBContainer fluid style={{ height: '100%' }}>

            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
              <MDBCol col='12'>

                <MDBCard className='bg-dark text-white my-5 mx-auto'
                  style={{ borderRadius: '1rem', maxWidth: '400px' }}
                  onClick={handleModalContentClick} // 모달 내부 컨텐츠 클릭 이벤트 핸들러
                >
                  <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
                    <h2 className="fw-bold mb-2 text-uppercase">로그인</h2>
                    <p className="text-white-50 mb-5">이메일과 비밀번호를 입력해주세요</p>

                    <MDBInput onChange={handleChangeId} onKeyDown={handleKeyPress} wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='이메일' id='emailInput' type='email' size="lg" />
                    <MDBInput onChange={handleChangePassword} onKeyDown={handleKeyPress} wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='비밀번호' id='passwordInput' type='password' size="lg" />


                    <MDBBtn onClick={handleClickLoginBtn} style={{ width: '150px', height: '55px' }} outline className='mx-2 px-5' color='white' size='lg'>
                      로그인
                    </MDBBtn>

                    <div>
                      <p className="mb-0">계정이 없으신가요? <MDBBtn onClick={() => {
                        setIsSignup(true)
                        // 회원가입을 해야 하는 상태 => 회원가입 해라
                        setIsOpen(false)
                      }} style={{ width: '80px', height: '30px' }} color='none' className='m-3' size='sm'>회원가입</MDBBtn></p>

                    </div>
                  </MDBCardBody>
                </MDBCard>

              </MDBCol>
            </MDBRow>

          </MDBContainer>

        </div>
      )}
      {isSignup && <SignupModal />}
      {/* isSignup이 true 이므로 signModal 실행 */}
      {/* isSignup이 true 일때 로그인 된 상태 => 로그인 안함 */}
    </>
  )
}

export default LoginModal