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