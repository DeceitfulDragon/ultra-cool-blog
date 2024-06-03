// Handle form for creating a new post
const newFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    if (title && content) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create post.');
        }
    }
};

// Toggle visibility of the edit form
const editPostHandler = (event) => {
    const id = event.target.getAttribute('data-id');
    const editForm = document.querySelector(`#edit-form-${id}`);
    const postCard = document.querySelector(`.post-card[data-id="${id}"]`);

    if (editForm.style.display === 'none' || editForm.style.display === '') {
        editForm.style.display = 'block';
        postCard.querySelector('.post-footer').style.display = 'none';
    } else {
        editForm.style.display = 'none';
        postCard.querySelector('.post-footer').style.display = 'flex';
    }
};

// Handle the form for saving an edited post
const savePostHandler = async (event) => {
    event.preventDefault();

    const id = event.target.getAttribute('data-id');
    const title = document.querySelector(`#title-${id}`).value.trim();
    const content = document.querySelector(`#content-${id}`).value.trim();

    if (title && content) {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to update post.');
        }
    }
};

// Handle the deletion of a post
const deletePostHandler = async (event) => {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to delete post.');
    }
};

// Send to the post page when a post card is clicked
const navigateToPost = (event) => {
    const target = event.target.closest('.post-card');
    if (target && !event.target.classList.contains('edit-post-btn') && !event.target.classList.contains('delete-post-btn') && !event.target.closest('.edit-form')) {
        const postId = target.getAttribute('data-id');
        document.location.replace(`/post/${postId}`);
    }
};

const stopPropagation = (event) => {
    event.stopPropagation();
};

// Adding all the event listeners we need
document.addEventListener('DOMContentLoaded', () => {
    const newPostForm = document.querySelector('.new-post-form');
    const editPostButtons = document.querySelectorAll('.edit-post-btn');
    const deletePostButtons = document.querySelectorAll('.delete-post-btn');
    const savePostButtons = document.querySelectorAll('.save-post-btn');
    const postCards = document.querySelectorAll('.post-card');
    const editForms = document.querySelectorAll('.edit-form');

    if (newPostForm) {
        newPostForm.addEventListener('submit', newFormHandler);
    }

    editPostButtons.forEach(button => {
        button.addEventListener('click', editPostHandler);
    });

    deletePostButtons.forEach(button => {
        button.addEventListener('click', deletePostHandler);
    });

    savePostButtons.forEach(button => {
        button.addEventListener('click', savePostHandler);
    });

    postCards.forEach(card => {
        card.addEventListener('click', navigateToPost);
    });

    editForms.forEach(form => {
        form.addEventListener('click', stopPropagation);
        form.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('click', stopPropagation);
        });
    });

    // Toggle visibility of new post form
    document.querySelector('#new-post-btn').addEventListener('click', () => {
        const newPostForm = document.querySelector('#new-post-form');
        if (newPostForm.style.display === 'none' || newPostForm.style.display === '') {
            newPostForm.style.display = 'block';
        } else {
            newPostForm.style.display = 'none';
        }
    });
});
