const newFormHandler = async (event) => {
    event.preventDefault();
    console.log('hi');

    const url = window.location.href;
    const match = url.match(/\/singlePost\/(\d+)/);
    console.log('we got to here 1')

    if (match && match[1]) { // Add a check for match[1]
        console.log('we got to here 2')
        const targetId = match[1];
        const newComment = document.querySelector('#newcomment').value.trim();
        console.log('we got to here 3')

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

document.querySelector('#add-comment').addEventListener('click', newFormHandler)