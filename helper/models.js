import Swal from 'sweetalert2';

export const DeleteModal = () => {
    return new Promise(async (resolve, reject) => {
        await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DC2626',
            cancelButtonColor: '#DC2626',
            confirmButtonText: 'Confirm Delete',
            showClass: {
                popup: 'swal2-show',
                backdrop: 'swal2-backdrop-show backdrop-blur-3xl',
                icon: 'swal2-icon-show'
            },
            customClass: {
                confirmButton: "w-40 rounded-lg",
            }
        }).then((result) => {
            if (result.value) {
                resolve(true)
            } else {
                reject(false)
            }
        })
    })
}


export const ErrorModel = (title, text) => {
    Swal.fire({
        icon: 'error',
        title: title,
        text: text,
        confirmButtonColor: '#DC2626',
        confirmButtonText: 'Ok',
        showClass: {
            popup: 'swal2-show',
            backdrop: 'swal2-backdrop-show backdrop-blur-3xl',
            icon: 'swal2-icon-show'
        },
        customClass: {
            confirmButton: "w-40 rounded-lg",
        }
    })
}

export const SuccessModel = (title, text) => {
    Swal.fire({
        title: title,
        text: text,
        icon: 'success',
        confirmButtonColor: '#DC2626',
        confirmButtonText: 'Ok',
        showClass: {
            popup: 'swal2-show',
            backdrop: 'swal2-backdrop-show backdrop-blur-3xl',
            icon: 'swal2-icon-show'
        },
        customClass: {
            confirmButton: "w-40 rounded-lg",
        }
    })
}