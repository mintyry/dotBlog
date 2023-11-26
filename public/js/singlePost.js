//add comment

const newFormHandler = async (event) => {
    event.preventDefault();


    const url = window.location.href;
    const match = url.match(/\/singlePost\/(\d+)/);


    if (match && match[1]) { // Add a check for match[1]

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

document.querySelector('#add-comment').addEventListener('click', newFormHandler)

// delete post
//used if check just to ensure error doesnt pop up when viewing others' posts, because otherwise, error will log for this function because a button won't be found, since the button only shows up if you're the owner of that post.
const deletePost = document.querySelector('#delete-post');

if (deletePost) {
    deletePost.addEventListener('click', async (event) => {
        event.preventDefault();
        console.log('delete incoming');

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
}
