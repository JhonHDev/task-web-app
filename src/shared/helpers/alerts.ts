import Swal from 'sweetalert2';

const showSuccessAlert = (title: string) => {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title,
    showConfirmButton: true,
  });
};

const showErrorAlert = (message: string) => {
  Swal.fire('Error', message, 'error');
};

const showQuestionAlert = (title: string) => {
  return Swal.fire({
    title,
    showCancelButton: true,
    cancelButtonText: 'No',
    cancelButtonColor: '#b92121',
    confirmButtonText: 'Si',
    confirmButtonColor: '#124EBC',
  });
};

export { showSuccessAlert, showErrorAlert, showQuestionAlert };
