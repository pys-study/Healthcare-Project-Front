import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBIcon } from 'mdb-react-ui-kit';

const SignupModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 모달 닫기 함수
  const closeModal = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  // 모달 내부 컨텐츠 클릭 시 이벤트 핸들러
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  // 이름 입력값 변경 이벤트 핸들러
  const handleChangeName = (event) => {
    const value = event.target.value;
    setName(value);
  };

  // 성별 입력값 변경 이벤트 핸들러
  const handleChangeGender = (event) => {
    const value = event.target.value;
    setGender(value);
  };

  // 생년월일 입력값 변경 이벤트 핸들러
  const handleChangeBirthdate = (event) => {
    const value = event.target.value;
    setBirthdate(value);
  };

  // 이메일 입력값 변경 이벤트 핸들러
  const handleChangeEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  // 비밀번호 입력값 변경 이벤트 핸들러
  const handleChangePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  // 회원가입 버튼 클릭 시 처리
  const handleSignup = () => {
    // 회원가입 버튼 클릭 시 처리할 로직을 여기에 추가하면 됩니다.
    alert('회원가입 버튼 클릭');
    setIsOpen(false);
    window.location.reload(); // 현재 페이지 새로 고침
  };

  // 뒤로가기 버튼 클릭 시 처리
  const handleBack = () => {
    window.location.reload(); // 현재 페이지 새로 고침
  }

  return (
    <>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            width: '100%',
            height: '100%',
            backgroundColor: '#00000090',
            top: 0,
            left: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999
          }}
          onClick={closeModal}
        >
          <MDBContainer fluid>
            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
              <MDBCol col='12'>
                <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }} onClick={handleModalContentClick}>
                  <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
                    <h3 className='fw-bold mb-2 text-uppercase'>회원가입</h3>
                    <MDBInput onChange={handleChangeName} wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='이름' id='nameInput' type='text' size='lg' />
                    <MDBInput onChange={handleChangeGender} wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='성별' id='genderInput' type='text' size='lg' />
                    <MDBInput onChange={handleChangeBirthdate} wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='생년월일' id='birthdateInput' type='text' size='lg' />
                    <MDBInput onChange={handleChangeEmail} wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='이메일' id='emailInput' type='email' size='lg' />
                    <MDBInput onChange={handleChangePassword} wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='비밀번호' id='passwordInput' type='password' size='lg' />
                    <MDBBtn onClick={handleSignup} style={{ width: '170px', height: '55px' }} outline className='mx-2 px-5' color='white' size='lg'>
                      회원가입
                    </MDBBtn>
                    <MDBBtn onClick={handleBack} style={{ width: '100px', height: '30px' }} color='white' size='md'>
                      뒤로가기
                    </MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      )}
    </>
  );
};

export default SignupModal;