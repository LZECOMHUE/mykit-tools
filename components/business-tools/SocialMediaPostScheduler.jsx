'use client';

import { useState } from 'react';

export default function SocialMediaPostScheduler() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ day: 'Monday', time: '09:00', platform: 'instagram', content: '' });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const platforms = ['Instagram', 'Twitter', 'Facebook', 'LinkedIn'];

  const bestTimes = {
    instagram: '09:00 - 11:00',
    twitter: '17:00 - 19:00',
    facebook: '13:00 - 15:00',
    linkedin: '08:00 - 10:00',
  };

  const addPost = () => {
    if (newPost.content.trim()) {
      setPosts([...posts, { ...newPost, id: Date.now() }]);
      setNewPost({ day: 'Monday', time: '09:00', platform: 'instagram', content: '' });
    }
  };

  const removePost = (id) => {
    setPosts(posts.filter((p) => p.id !== id));
  };

  return (
    <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 md:p-8 space-y-6">
      <div className="space-y-4">
        <h3 className="font-heading text-lg font-bold text-text-primary">
          Schedule Post
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <select
            value={newPost.day}
            onChange={(e) => setNewPost({ ...newPost, day: e.target.value })}
            className="px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          >
            {days.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <input
            type="time"
            value={newPost.time}
            onChange={(e) => setNewPost({ ...newPost, time: e.target.value })}
            className="px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />

          <select
            value={newPost.platform}
            onChange={(e) => setNewPost({ ...newPost, platform: e.target.value })}
            className="col-span-2 px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          >
            {platforms.map((p) => (
              <option key={p} value={p.toLowerCase()}>{p}</option>
            ))}
          </select>
        </div>

        <textarea
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          placeholder="Post content..."
          className="w-full h-24 px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent resize-none"
        />

        <button
          onClick={addPost}
          className="w-full px-4 py-2 bg-accent text-white rounded-[var(--radius-input)] font-medium hover:bg-blue-700"
        >
          Add to Schedule
        </button>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-6">
        <h3 className="font-heading text-lg font-bold text-text-primary mb-4">
          Weekly Schedule
        </h3>

        {posts.length === 0 ? (
          <p className="text-center text-text-secondary py-8">No posts scheduled yet</p>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <div key={post.id} className="bg-surface rounded-[var(--radius-input)] p-3 border border-border">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-text-primary">{post.day} at {post.time}</p>
                    <p className="text-sm text-text-secondary capitalize">{post.platform}</p>
                  </div>
                  <button
                    onClick={() => removePost(post.id)}
                    className="text-error hover:bg-red-100 px-2 py-1 rounded text-sm"
                  >
                    Remove
                  </button>
                </div>
                <p className="text-sm text-text-primary">{post.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-6">
        <h3 className="font-heading text-lg font-bold text-text-primary mb-4">
          Best Posting Times
        </h3>

        <div className="space-y-2">
          {Object.entries(bestTimes).map(([platform, time]) => (
            <div key={platform} className="flex justify-between items-center bg-surface rounded-[var(--radius-input)] p-3">
              <span className="font-medium text-text-primary capitalize">{platform}</span>
              <span className="text-sm text-text-secondary font-mono">{time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
