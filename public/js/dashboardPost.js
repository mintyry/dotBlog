document.querySelector('#new-post').addEventListener('click', (event) => {
    event.preventDefault();

    const postBtn = document.getElementById('new-post');
    postBtn.style.display ='none';

    const myForm = document.getElementById('myForm');
    myForm.style.display = 'block';

    //take values from form
    //pass it into fetch
});