import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type ErrorToastProps = {
	message: string
}

const ErrorToast = ({ message }: ErrorToastProps) => {
	toast.error(message, {
		position: 'top-right',
		autoClose: 15000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	})

	return <ToastContainer/>
}

export { ErrorToast }