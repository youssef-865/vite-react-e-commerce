import axios from 'axios';
import { useFormik } from 'formik';
import    { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { userContext } from '../../context/userContext';



export default function ForgetPassword() {
  const { setLogin } = useContext(userContext);
  const [apiError, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function SendCode(values) {
    // setLoading(true);
    // setError('');
    // console.log("values",values)

     await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values)
      .then((response) => {
        // console.log('Success:', response.data);
        if (response.data.statusMsg === 'success') {
        
          // console.log('success')
         document.querySelector('.forgetPassword').classList.add("hidden")
         document.querySelector('.verifyCode ').classList.remove("hidden")
       
        }
      })
      .catch((error) => {
        setError(error.response?.data?.message || 'An error occurred');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  let validationSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Enter a valid email'),
  });

  let formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema, 
    onSubmit: SendCode,
  });
  async function SendData(values) {
    setLoading(true);
    setError('');
    // console.log("values being sent:", values); // Debugging line
    
    

    await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values)
    
      .then((response) => {
        console.log('Success', response.data);
        if (response.data.status === 'Success') {
          navigate('/ResetPassword');  // Adjust this path to your actual reset password page
        }
      })
      .catch((error) => {
        setError(error.response?.data?.message || 'An error occurred');
      })
      .finally(() => {
        setLoading(false);
      });
  }
  

  let validationSchema2 = Yup.object({
    resetCode: Yup.string().required('Email is required')
  });

  let verifyFormik = useFormik({
    initialValues: {
      resetCode: '',
    },
    validationSchema: validationSchema2, 
    onSubmit: SendData,
  });

  return (
   <>
    <div className='forgetPassword'>
      <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="bg-white shadow-md rounded-md p-6">
            <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-green-700">
              Forget Password
            </h2>
            {apiError && (
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">{apiError}</span>
              </div>
            )}
            <form onSubmit={formik.handleSubmit} className="space-y-6" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <div className="mt-1">
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    id='email'
                    value={formik.values.email}
                    name='email'
                    type="email"
                    autoComplete="email"
                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                  />
                  {formik.errors.email && formik.touched.email &&  (
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                      <span className="font-medium">{formik.errors.email}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <button 
                  type="submit"
                  disabled={!(formik.isValid && formik.dirty) || isLoading}
                  className="flex w-full justify-center rounded-md border border-transparent bg-green-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                >
               
                  {isLoading ? <i className='fa fa-spinner fa-spin mx-3'></i> : 'Send Code'}
                </button>
               
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    
    
     <div className='verifyCode hidden'>
      <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="bg-white shadow-md rounded-md p-6">
            <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-green-700">
            verify code
            </h2>
            {apiError && (
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">{apiError}</span>
              </div>
            )}
            <form onSubmit={verifyFormik.handleSubmit} className="space-y-6" method="POST">
              <div>
                <label htmlFor="text" className="block text-sm font-medium text-gray-700">reset code</label>
                <div className="mt-1">
                  <input
                    onChange={verifyFormik.handleChange}
                    onBlur={verifyFormik.handleBlur}
                    id='email'
                    value={verifyFormik.values.resetCode}
                    name='resetCode'
                    type="text"
                    autoComplete="resetCode"
                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                  />
                  {verifyFormik.errors.resetCode && verifyFormik.touched.resetCode &&  (
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                      <span className="font-medium">{verifyFormik.errors.resetCode}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <button 
                  type="submit"
                  disabled={!(verifyFormik.isValid && verifyFormik.dirty) || isLoading}
                  className="flex w-full justify-center rounded-md border border-transparent bg-green-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                >
            
                  send code
                  {/* {isLoading ? <i className='fa fa-spinner fa-spin mx-3'></i> : 'Send Code'} */}
                </button>
               
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
   </>
  );
}
