//add comment
const newFormHandler = async (event) => {
    event.preventDefault();

    const url = window.location.href;
    const match = url.match(/\/singlePost\/(\d+)/);

    if (match && match[1]) { // Adds a check for match[1]

        const targetId = match[1];
        const newComment = document.querySelector('#newcomment').value.trim();

        if (newComment) {
            const response = await fetch(`/api/comments`, {
                method: 'POST',
                body: JSON.stringify({ newComment, targetId }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                document.location.reload();
            } else {
                alert('Failed to add comment');
            }
        }
    }
};
//when user clicks to add a comment, the above function runs
document.querySelector('#add-comment').addEventListener('click', newFormHandler)

// delete post
//used if check just to ensure error doesnt pop up when viewing others' posts, because otherwise, error will log for this function because a button won't be found, since the button only shows up if you're the owner of that post.
const deletePost = document.querySelector('#delete-post');

if (deletePost) {
    deletePost.addEventListener('click', async (event) => {
        event.preventDefault();

        const deleteId = window.location.pathname.split('/').pop();

        const response = await fetch(`/api/posts/${deleteId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard')
        } else {
            alert('Failed to delete post');
        };
    });
};

// update post
//used if check just to ensure error doesnt pop up when viewing others' posts, because otherwise, error will log for this function because a button won't be found, since the button only shows up if you're the owner of that post.
const updatePost = document.querySelector('#update-post');

if (updatePost) {
    updatePost.addEventListener('click', async (event) => {
        event.preventDefault();
        const upPost = document.getElementById('upPost');
        upPost.style.display = 'block';
    });
};

const updateForm = document.querySelector('#update');
updateForm.addEventListener('click', async (event) => {
    event.preventDefault();
    const updateId = window.location.pathname.split('/').pop();
    const updatedTitle = document.querySelector('#up-title').value.trim();
    const updatedContent = document.querySelector('#up-body').value.trim();

    const response = await fetch(`/api/posts/${updateId}`, {
        method: 'PUT',
        body: JSON.stringify({ title: updatedTitle, content: updatedContent }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        document.location.replace('/dashboard')
    } else {
        alert('Failed to delete post');
    };
});