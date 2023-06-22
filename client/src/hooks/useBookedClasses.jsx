import Swal from 'sweetalert2'
import useAxiosSecure from './useAxiosSecure'

function useBookedClasses() {
    const [axiosSecure] = useAxiosSecure()

    const bookedStatusHandler = async (classInfo, userEmail) => {
        const bookedItem = { studentEmail: userEmail, classId: classInfo._id,paymentStatus:'selected' }
        console.log(bookedItem)
        await axiosSecure.post(`book_classes`, bookedItem)
            .then(res => {
                console.log(res)
                if(res.data?.insertedId){
                    Swal.fire(
                        'Good job!',
                        'Added Successfully (^_^)',
                        'success'
                      )
                }
                else{
                    Swal.fire(
                        'oops!',
                        'already added',
                        'error'
                      )
                }
            })
    }

    return [bookedStatusHandler]
}

export default useBookedClasses