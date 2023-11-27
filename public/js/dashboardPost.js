//when user clicks button to make a new post, makes form appear

document.querySelector('#new-post').addEventListener('click', (event) => {
    event.preventDefault();

    const postBtn = document.getElementById('new-post');
    postBtn.style.display = 'none';

    const myForm = document.getElementById('myForm');
    myForm.style.display = 'block';
});


//when user clicks button to submit new post

document.querySelector('#submitpost').addEventListener('click', async (event) => {
    event.preventDefault();

    //take values from form
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-body').value.trim();
    //pass it into fetch
    const response = await fetch('/api/posts/', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert('Failed to create post');
    }

});