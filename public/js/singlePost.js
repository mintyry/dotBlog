const newFormHandler = async (event) => {
    event.preventDefault();

    const url = window.location.href;
    const match = url.match(/\/posts\/(\d+)/);
    const targetId = match[1];

   

    if (match) {
        const newComment = document.querySelector('#newcomment').value.trim();

        if (newComment) {
            const response = await fetch(`/api/comments`, {
                method: 'POST',
                body: JSON.stringify({ newComment, targetId }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('fetch happened');
            console.log(response);
            if (response.ok) {
                document.location.reload();
            } else {
                alert('Failed to add comment');
            }
        }
    }
};

document.querySelector('#add-comment').addEventListener('submit', newFormHandler);