import axios from 'axios';
import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { userContext } from '../../context/userContext';

export default function ResetPassword() {
  const { setLogin } = useContext(userContext);
  const [apiError, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

 async function RestPassword(values) {
    setLoading(true);
   await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)
      .then((response) => {
        console.log('success', response);
        if (response.data.token) {
          localStorage.setItem('userToken', response?.data?.token);
          setLogin(response?.data?.token);
          setLoading(false);
          navigate('/login');
        }
      })
      .catch((error) => {
        setLoading(false);
        setError(error.response?.data?.message || 'An error occurred');
      });
  }

  let validationSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Enter a valid email'),
    newPassword: Yup.string().required('Password is required').matches(/^[A-Z][a-z0-9]{6,8}$/, 'Password not valid'),
  });

  let formik = useFormik({
    initialValues: {
      email: '',
      newPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: RestPassword,
  });

  return (
    <>
      <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="bg-white shadow-md rounded-md p-6">
            <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-green-700">
              Reset Password
            </h2>

            {apiError && (
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">{apiError}</span>
              </div>
            )}
            
            <form onSubmit={formik.handleSubmit} className="space-y-6" method="POST">
              <div>
                <label htmlFor="ur-email" className="block text-sm font-medium text-gray-700">Email</label>
                <div className="mt-1">
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    id='ur-email'
                    value={formik.values.email}
                    name='email'
                    type="email"
                    autoComplete="email-address"
                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                  />
                  {formik.errors.email && formik.touched.email && (
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                      <span className="font-medium">{formik.errors.email}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                <div className="mt-1">
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    id='newPassword'
                    value={formik.values.newPassword}
                    name='newPassword'
                    type="password"
                    autoComplete="password"
                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                  />
                  {formik.errors.newPassword && formik.touched.newPassword && (
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                      <span className="font-medium">{formik.errors.newPassword}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={!(formik.isValid && formik.dirty)}
                  className="flex w-full justify-center rounded-md border border-transparent bg-green-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                >
                  {isLoading ? <i className='fa fa-spinner fa-spin mx-3'></i> : null}
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
