import { useState, useEffect } from "react";

export default function PostCreate() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        author: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [currentUser, setCurrentUser] = useState(null);


    useEffect(() => {
        const fetchCurrentUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setMessage('Please log in to create posts');
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/auth/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setCurrentUser(data.user)
                    //Setting user's name in the form
                    setFormData(prev => ({
                        ...prev,
                        author: `${data.user.firstName} ${data.user.lastName}`
                    }));
                } else {
                    setMessage('Failed to get user info. Please log in again.');
                }
            } catch (error) {
                console.error('Error fetching user:', error);
                setMessage('Error connecting to server');
            }
        };

        fetchCurrentUser();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.title.trim() || !formData.description.trim()) {
            setMessage('Please fill in all required fields');
            return;
        }

        if (!currentUser) {
            setMessage('Please log in to create posts');
            return;
        }

        setIsLoading(true);
        setMessage('');

        try {
            const postData = {
                title: formData.title.trim(),
                description: formData.description.trim(),
                author: formData.author.trim() || `${currentUser.firstName} ${currentUser.lastName}`,
                userId: parseInt(currentUser.id)
            };

            const response = await fetch('http://localhost:3000/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData)
            });

            if (response.ok) {
                const newPost = await response.json();
                setMessage('Post created successfully!');
                setFormData({
                    title: '',
                    description: '',
                    author: `${currentUser.firstName} ${currentUser.lastName}`
                });
                console.log('New post created:', newPost);
            } else {
                const errorData = await response.json();
                setMessage(`Error: ${errorData.message || 'Failed to create post'}`);
            }
        } catch (error) {
            console.error('Error creating post:', error);
            setMessage('Error connecting to server. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setFormData({
            title: '',
            description: '',
            author: currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : ''
        });
        setMessage('');
    };

    if (!currentUser && !message) {
        return (
            <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
                <div className="text-center">Loading...</div>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Create New Post
            </h2>

            {message && (
                <div className={`mb-4 p-3 rounded-md text-sm ${
                    message.includes('successfully') 
                        ? 'bg-green-100 text-green-700 border border-green-300' 
                        : 'bg-red-100 text-red-700 border border-red-300'
                }`}>
                    {message}
                </div>
            )}

            {currentUser ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter post title"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows="4"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                            placeholder="Enter post description"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                            Author
                        </label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            value={formData.author}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Author name"
                        />
                    </div>

                    <div className="flex space-x-3 pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`flex-1 py-2 px-4 rounded-md text-white font-medium ${
                                isLoading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                            } transition duration-200`}
                        >
                            {isLoading ? 'Creating...' : 'Create Post'}
                        </button>

                        <button
                            type="button"
                            onClick={handleReset}
                            disabled={isLoading}
                            className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200"
                        >
                            Reset
                        </button>
                    </div>
                </form>
            ) : (
                <div className="text-center text-gray-600">
                    <p>Please log in to create a post.</p>
                </div>
            )}
        </div>
    );
}
