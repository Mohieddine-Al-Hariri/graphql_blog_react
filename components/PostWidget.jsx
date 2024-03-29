import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';


import { grpahCMSImageLoader } from '../util';
import { getSimilarPosts, getRecentPosts } from '../services';

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) => {
        setRelatedPosts(result);
      });
    } else {
      getRecentPosts().then((result) => {
        setRelatedPosts(result);
      });
    }
  }, [slug]);


  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">{slug ? 'Related Posts' : 'Recent Posts'}</h3>
      {relatedPosts.map((post, index) => (
        <Link href={`/post/${post.slug}`}  key={index}>
          <div key={index} className="flex items-center w-full mb-4 hover:scale-105 transition duration-200">
            <div className="w-16 flex-none object-cover">
              <Image
                loader={grpahCMSImageLoader}
                alt={post.title}
                height="35"
                width="35"
                unoptimized
                className="align-middle rounded-full aspect-square object-cover"
                src={post?.featuredImage?.url}
              />
            </div>
            <div className="flex-grow ml-4">
              <p className="text-gray-500 font-xs">{moment(post.createdAt).format('MMM DD, YYYY')}</p>
              <p className="text-md ">{post.title}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostWidget;
