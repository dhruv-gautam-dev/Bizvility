import { useState } from 'react';
import { StarIcon, EyeIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

const initialReviews = [
  {
    id: 1,
    reviewer: 'John Smith',
    business: 'The Coffee House',
    rating: 5,
    title: 'Excellent coffee and service!',
    content: 'Amazing coffee quality and friendly staff. The atmosphere is perfect for working or meeting friends.',
    date: '2024-01-15',
    helpful: 12,
    response: 'Thank you so much for your kind words! We appreciate your business.'
  },
  {
    id: 2,
    reviewer: 'Sarah Johnson',
    business: 'Tech Solutions Inc',
    rating: 4,
    title: 'Great technical support',
    content: 'Very professional team with excellent technical knowledge. They solved our issues quickly.',
    date: '2024-01-14',
    helpful: 8,
    response: null
  },
  {
    id: 3,
    reviewer: 'Mike Brown',
    business: 'The Coffee House',
    rating: 3,
    title: 'Good but could be better',
    content: 'Coffee was good but service was a bit slow during peak hours.',
    date: '2024-01-13',
    helpful: 5,
    response: null
  },
  {
    id: 4,
    reviewer: 'Emily Davis',
    business: 'Tech Solutions Inc',
    rating: 5,
    title: 'Outstanding service!',
    content: 'Exceeded our expectations in every way. Highly recommend their services.',
    date: '2024-01-12',
    helpful: 15,
    response: "We're thrilled to hear about your positive experience! Thank you for choosing us."
  },
];

export default function UserMyReviews() {
  const [reviews, setReviews] = useState(initialReviews); // Manage reviews in state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState('all');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.reviewer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.business.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = filterRating === 'all' || review.rating.toString() === filterRating;
    return matchesSearch && matchesRating;
  });

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarIcon
        key={index}
        className={`h-4 w-4 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const handleReply = (reviewId) => {
    if (replyText.trim()) {
      // Update the reviews state by adding the reply to the corresponding review
      setReviews(reviews.map(review => 
        review.id === reviewId ? { ...review, response: replyText } : review
      ));
      // Clear the reply form
      setReplyingTo(null);
      setReplyText('');
    }
  };

  const totalReviews = reviews.length;
  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
  const pendingReplies = reviews.filter(r => !r.response).length;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">My Reviews</h1>
        <div className="text-sm text-gray-600">
          {pendingReplies} reviews need replies
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Reviews</h3>
          <p className="text-2xl font-bold text-gray-900">{totalReviews}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Average Rating</h3>
          <div className="flex items-center">
            <p className="text-2xl font-bold text-gray-900 mr-2">{averageRating}</p>
            <div className="flex">
              {renderStars(Math.round(parseFloat(averageRating)))}
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Pending Replies</h3>
          <p className="text-2xl font-bold text-yellow-600">{pendingReplies}</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search reviews..."
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
        </div>

        {/* Reviews List */}
        <div className="divide-y divide-gray-200">
          {filteredReviews.map((review) => (
            <div key={review.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-sm font-medium text-gray-900">{review.reviewer}</h3>
                    <div className="flex items-center">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>

                  <div className="mb-2">
                    <h4 className="text-sm font-medium text-gray-900">{review.title}</h4>
                    <p className="text-sm text-gray-600">for {review.business}</p>
                  </div>

                  <p className="text-sm text-gray-700 mb-3">{review.content}</p>

                  <div className="text-xs text-gray-500 mb-4">
                    {review.helpful} people found this helpful
                  </div>

                  {/* Business Response */}
                  {review.response && (
                    <div className="bg-blue-50 p-4 rounded-lg mb-4">
                      <div className="flex items-center mb-2">
                        <ChatBubbleLeftRightIcon className="h-4 w-4 text-blue-600 mr-2" />
                        <span className="text-sm font-medium text-blue-900">Your Response</span>
                      </div>
                      <p className="text-sm text-blue-800">{review.response}</p>
                    </div>
                  )}

                  {/* Reply Form */}
                  {replyingTo === review.id && (
                    <div className="mt-4">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write your response..."
                        rows={3}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="flex justify-end space-x-2 mt-2">
                        <button
                          onClick={() => setReplyingTo(null)}
                          className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleReply(review.id)}
                          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          Send Reply
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => alert(`Viewing full review details for ${review.business}`)}
                    className="p-1 text-blue-600 hover:text-blue-800"
                    title="View Details"
                  >
                    <EyeIcon className="h-4 w-4" />
                  </button>
                  {!review.response && (
                    <button
                      onClick={() => setReplyingTo(review.id)}
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Reply
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}