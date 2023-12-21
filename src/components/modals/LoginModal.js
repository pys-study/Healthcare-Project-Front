
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
const LoginModal = () => {
  const [isOpen, setIsOpen] = useState(true);

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
    alert("로그인 버튼 클릭");
    setIsOpen(false);
    /* 
      fetch('/login',{
        method: "POST",
        conteasdas/ json/,
        body : JSON.sty({email, password})
      }).then(e=>e.json()).then(e=>{
        const {isExist} = e.data
        if(isExist){
          localStorage.setItem("email","test@naver.com")
    closeModal();
        }else {
          alert("아이디 패스워드 틀림")
        }
      })
    */

  }

  const closeModal = (e) => {
    // 클릭한 이벤트의 타겟이 오버레이(배경)인지 확인합니다.
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  // 모달 내부 컨텐츠를 클릭해도 모달이 닫히지 않도록
  const handleModalContentClick = (e) => {
    e.stopPropagation(); // 이벤트 전파 방지
  };

  const handleChangeId = (event) => {
    const value = event.target.value
    setEmail(value)
  }
  const handleChangePassword = (event) => {
    const value = event.target.value
    setPassword(value)
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
          <MDBContainer fluid>

            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
              <MDBCol col='12'>

                <MDBCard className='bg-dark text-white my-5 mx-auto'
                  style={{ borderRadius: '1rem', maxWidth: '400px' }}
                  onClick={handleModalContentClick} // 모달 내부 컨텐츠 클릭 이벤트 핸들러
                >
                  <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

                    <h2 className="fw-bold mb-2 text-uppercase">로그인</h2>
                    <p className="text-white-50 mb-5">이메일과 비밀번호를 입력해주세요</p>

                    <MDBInput onChange={handleChangeId} wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='이메일' id='formControlLg' type='email' size="lg" />
                    <MDBInput onChange={handleChangePassword} wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='비밀번호' id='formControlLg' type='password' size="lg" />

                    <p className="small mb-3 pb-lg-2"><a class="text-white-50" href="#!">비밀번호를 잊으셨나요?</a></p>
                    <MDBBtn onClick={handleClickLoginBtn} style={{ width: '150px', height: '55px' }} outline className='mx-2 px-5' color='white' size='lg'>
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
      )}
    </>
  )
}

export default LoginModal