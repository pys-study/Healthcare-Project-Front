
import React, { useEffect, useState } from 'react'
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
import { getAccessToken } from '../../Api/getAccessToken';
import { getUserId } from '../../Api/getUserId';

const LoginModal = () => {
  // 모달의 가시성 상태 관리
  const [isOpen, setIsOpen] = useState(true);
  // 회원가입 모달 상태 관리
  const [isSignup, setIsSignup] = useState(false)
  // isSignup이 false 회원가입을 안해도 된다.  => setIsSignup(false)
  // isSignup이 true 회원가입을 해라 => setIsSignup(true)

  const [userId, setUserId] = useState("");

  // useState 훅을 사용하여 email과 password 두 상태 변수 선언
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    /* 
      로그인 되어있는지 체크 해서
      const email = localStorage.getItem("email")
      if(!email){
        setIsOpen(true)
      }
    */

  }, [])


  const handleClickLoginBtn = () => {

    // 요청 본문 생성
    const requestBody = JSON.stringify({ username: email, password });


    getAccessToken(requestBody)
      .then(response => {

        // 서버 응답을 문자열로 변환
        const accessToken = response.data.accessToken;
        console.log(accessToken);

        // 로컬 스토리지에 accessToken 저장
        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
        }
      })
      .catch(error => {
        console.log(error);
      })

    getUserId()
      .then(response => {
        const userId = response.data;
        console.log(userId);

        if (userId) {
          alert("로그인 성공");
          setIsOpen(false);
        }
      })
      .catch(error => console.log(error));
  }



  // // api 호출 테스트
  // function fetchMembers() {
  //   setIsOpen(false);
  //   testMemberApi()
  //     .then(response => {
  //       console.log("test");
  //     })
  //     .catch(error => console.log(error))
  // }

  // 모달 닫기 함수
  const closeModal = (e) => {
    // 클릭한 이벤트의 타겟이 오버레이(배경)인지 확인합니다.
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  // 모달 내부 컨텐츠를 클릭해도 모달이 닫히지 않도록
  const handleModalContentClick = (e) => {
    // 모달 내부의 특정 요소를 클릭할 때만 모달 종료
    if (!e.target.classList.contains('custom-close-button')) {
      e.stopPropagation(); // 이벤트 전파 방지
    }
  };

  // 이메일 상태 업데이트 함수
  const handleChangeId = (event) => {
    const value = event.target.value
    setEmail(value)
  }
  // 비밀번호 상태 업데이트 함수
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
                    <h3 className="fw-bold mb-2 text-uppercase">로그인</h3>
                    <p className="text-white-50 mb-5">이메일과 비밀번호를 입력해주세요</p>

                    <MDBInput onChange={handleChangeId} onKeyDown={handleKeyPress} wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='이메일' id='emailInput' type='email' size="lg" />
                    <MDBInput onChange={handleChangePassword} onKeyDown={handleKeyPress} wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='비밀번호' id='passwordInput' type='password' size="lg" />


                    <p className="small mb-3 pb-lg-2"><a className="text-white-50" href="#!">비밀번호를 잊으셨나요?</a></p>
                    <MDBBtn onClick={handleClickLoginBtn} style={{ width: '150px', height: '55px' }} outline className='mx-2 px-5' color='white' size='lg'>
                      로그인
                    </MDBBtn>

                    <div className='d-flex flex-row mt-3 mb-5'>
                      <MDBBtn tag='a' color='none' className='m-3' style={{ width: '21px', height: '24px', color: 'white' }}>
                        <MDBIcon fab icon='github' size="lg" />
                      </MDBBtn>

                      <MDBBtn onClick={() => { alert("카카오 로그인 성공") }} tag='a' color='none' className='m-3' style={{ width: '21px', height: '24px', color: 'yellow' }}>
                        <MDBIcon className='fas fa-comment' size="lg" />
                      </MDBBtn>

                      <MDBBtn onClick={() => { alert("구글 로그인 성공") }} tag='a' color='none' className='m-3' style={{ width: '21px', height: '24px', color: 'white' }}>
                        <MDBIcon fab icon='google' size="lg" />
                      </MDBBtn>
                    </div>

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