import React, { useState, useRef, useEffect } from "react";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { useTransition, animated } from "@react-spring/web";
import { Link } from "react-router-dom";
import {
  DocumentTextIcon,
  BookOpenIcon,
  ChatBubbleLeftIcon,
  FlagIcon,
  ClockIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";

const SuperDashboard = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleCard = (cardName) => {
    const newExpandedCard = expandedCard === cardName ? null : cardName;
    setExpandedCard(newExpandedCard);
  };

  const AnimatedCard = ({ card, isExpanded, onToggle }) => {
    const contentRef = useRef(null);
    const [contentHeight, setContentHeight] = useState(0);
    const headerRef = useRef(null);
    const [headerHeight, setHeaderHeight] = useState(0);

    useEffect(() => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.scrollHeight);
      }
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    }, [card.content]);

    const totalHeight = headerHeight + (isExpanded ? contentHeight : 0);

    const transitions = useTransition(isExpanded, {
      from: {
        opacity: 0,
        height: headerHeight,
        transform: "translateY(-10px)",
      },
      enter: { opacity: 1, height: totalHeight, transform: "translateY(0px)" },
      leave: {
        opacity: 0,
        height: headerHeight,
        transform: "translateY(-10px)",
      },
      update: { height: totalHeight },
      config: { tension: 220, friction: 20 },
    });

    return transitions((style, item) => (
      <animated.div
        style={{ ...style, overflow: "hidden" }}
        className="bg-white rounded-lg shadow"
      >
        <div
          ref={headerRef}
          className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 hover:bg-gray-100"
          onClick={onToggle}
        >
          <h2 className="text-lg font-semibold">{card.title}</h2>
          <div className="flex items-center space-x-2">
            <EllipsisVerticalIcon className="w-5 h-5 text-gray-500" />
            {isExpanded ? (
              <ChevronUpIcon className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDownIcon className="w-5 h-5 text-gray-500" />
            )}
          </div>
        </div>
        <div
          ref={contentRef}
          style={{ display: isExpanded ? "block" : "none" }}
        >
          {card.content}
        </div>
      </animated.div>
    ));
  };

  const leftColumnCards = [
    {
      id: "siteHealth",
      title: "Site Health Status",
      content: (
        <div className="p-4 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 mb-4 bg-yellow-100 rounded-full">
            <span className="text-2xl font-bold text-yellow-600">!</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            Should be improved
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Your site has a critical issue that should be addressed as soon as
            possible to improve its performance and security.
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Take a look at the 6 items on the{" "}
            <button className="text-blue-600 hover:underline">
              Site Health Screen
            </button>
            .
          </p>
        </div>
      ),
    },
    {
      id: "atGlance",
      title: "At a Glance",
      content: (
        <div className="p-4">
          <p className="mb-4 text-sm text-gray-600">
            This section provides a quick overview of your site stats.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/posts"
              className="flex items-center p-3 space-x-2 transition rounded-lg hover:bg-gray-100"
            >
              <DocumentTextIcon className="w-6 h-6 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">Posts</p>
                <p className="text-sm text-gray-600">15</p>
              </div>
            </Link>
            <Link
              to="/pages"
              className="flex items-center p-3 space-x-2 transition rounded-lg hover:bg-gray-100"
            >
              <BookOpenIcon className="w-6 h-6 text-green-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">Pages</p>
                <p className="text-sm text-gray-600">8</p>
              </div>
            </Link>
            <Link
              to="/comments"
              className="flex items-center p-3 space-x-2 transition rounded-lg hover:bg-gray-100"
            >
              <ChatBubbleLeftIcon className="w-6 h-6 text-purple-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">Comments</p>
                <p className="text-sm text-gray-600">42</p>
              </div>
            </Link>
            <Link
              to="/comments/moderation"
              className="flex items-center p-3 space-x-2 transition rounded-lg hover:bg-gray-100"
            >
              <FlagIcon className="w-6 h-6 text-red-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Comments in moderation
                </p>
                <p className="text-sm text-gray-600">5</p>
              </div>
            </Link>
          </div>
        </div>
      ),
    },
  ];

  const rightColumnCards = [
    {
      id: "activity",
      title: "Activity",
      content: (
        <div className="p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-600">
            Recent Published
          </h3>
          <div className="space-y-3">
            {[
              {
                date: "June 10, 2025, 10:30 AM",
                name: "Coffee Haven",
                slug: "coffee-haven",
              },
              {
                date: "June 9, 2025, 2:15 PM",
                name: "Tech Solutions Inc.",
                slug: "tech-solutions-inc",
              },
              {
                date: "June 8, 2025, 9:00 AM",
                name: "Green Garden Nursery",
                slug: "green-garden-nursery",
              },
            ].map((listing, idx) => (
              <Link
                key={idx}
                to={`/listing/${listing.slug}`}
                className="block p-4 transition border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <ClockIcon className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {listing.name}
                    </p>
                    <p className="text-sm text-gray-600">{listing.date}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <h3 className="mt-6 mb-3 text-sm font-semibold text-gray-600">
            Recent Comments
          </h3>
          <div className="space-y-3">
            {[
              {
                commenter: "John Doe",
                profile: "Customer",
                business: "Coffee Haven",
                comment: "Great coffee and ambiance!",
                slug: "john-doe-coffee-haven",
              },
              {
                commenter: "Sarah Smith",
                profile: "Visitor",
                business: "Tech Solutions Inc.",
                comment: "Very professional service.",
                slug: "sarah-smith-tech-solutions-inc",
              },
              {
                commenter: "Mike Brown",
                profile: "Local",
                business: "Green Garden Nursery",
                comment: "Loved the variety of plants!",
                slug: "mike-brown-green-garden-nursery",
              },
            ].map((comment, idx) => (
              <Link
                key={idx}
                to={`/comment/${comment.slug}`}
                className="block p-4 transition border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 font-medium text-gray-600 bg-gray-300 rounded-full">
                    {comment.commenter[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {comment.commenter}{" "}
                      <span className="text-gray-500">({comment.profile})</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      on {comment.business}
                    </p>
                    <p className="mt-1 text-sm italic text-gray-700">
                      "{comment.comment}"
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "listingPro",
      title: "Recently Edited Listings",
      content: (
        <div className="p-4">
          <p className="mb-4 text-sm text-gray-600">
            Details of recently edited business listings.
          </p>
          <div className="space-y-3">
            {[
              {
                name: "Coffee Haven",
                date: "June 12, 2025, 3:45 PM",
                slug: "coffee-haven",
              },
              {
                name: "Tech Solutions Inc.",
                date: "June 11, 2025, 11:20 AM",
                slug: "tech-solutions-inc",
              },
              {
                name: "Green Garden Nursery",
                date: "June 10, 2025, 9:30 AM",
                slug: "green-garden-nursery",
              },
            ].map((listing, idx) => (
              <Link
                key={idx}
                to={`/edit-listing/${listing.slug}`}
                className="flex items-center block p-4 space-x-3 transition border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center justify-center w-10 h-10 text-blue-600 bg-blue-100 rounded-lg">
                  <PencilIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {listing.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Last edited: {listing.date}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="p-0">
      {/* Promotional Banner */}
      <div
        className="p-6 mb-6 text-white rounded-lg"
        style={{
          background: "linear-gradient(to right, #8b5cf6 0%, #ec4899 60%)",
        }}
      >
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-col items-start flex-1 gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center justify-center w-16 h-16 bg-white rounded-lg bg-opacity-20">
              <span className="text-2xl">🎉</span>
            </div>
            <div>
              <h3 className="text-xl font-bold">
                Unlock ListingPro Lifetime Bundle Deals – Save Up to 95% Off!
              </h3>
              <p className="text-purple-100">
                Get lifetime access to premium extensions with bundle deals
                including all-access bundle.
              </p>
              <button className="px-4 py-2 mt-2 font-medium text-purple-600 bg-white rounded-md hover:bg-gray-100">
                Download Now
              </button>
            </div>
          </div>
          <button className="self-start text-white hover:text-gray-200 sm:self-auto">
            Dismiss 7 Days
          </button>
        </div>
      </div>

      {/* Accordion Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-2">
          {leftColumnCards.map((card) => (
            <AnimatedCard
              key={card.id}
              card={card}
              isExpanded={expandedCard === card.id}
              onToggle={() => toggleCard(card.id)}
            />
          ))}
        </div>
        <div className="space-y-2">
          {rightColumnCards.map((card) => (
            <AnimatedCard
              key={card.id}
              card={card}
              isExpanded={expandedCard === card.id}
              onToggle={() => toggleCard(card.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuperDashboard;
