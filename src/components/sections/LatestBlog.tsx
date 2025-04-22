
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Sample blog data (would typically come from an API)
const blogPosts = [
  {
    id: 1,
    title: '10 Ways to Maximize Your ClickGain Earnings',
    excerpt: 'Discover proven strategies that can help you double your earnings on our platform with just a few simple tweaks to your daily routine.',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80',
    date: 'April 15, 2025',
    author: 'Sarah Johnson'
  },
  {
    id: 2,
    title: 'Understanding the ClickGain Referral System',
    excerpt: 'Learn how our multi-tiered referral program works and why it's considered one of the most generous in the paid-to-click industry.',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80',
    date: 'April 10, 2025',
    author: 'Mike Chen'
  },
  {
    id: 3,
    title: 'From Beginner to Pro: A ClickGain Success Story',
    excerpt: 'Read how David turned his spare time into a steady income stream, earning over $500 monthly by implementing these simple techniques.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    date: 'April 5, 2025',
    author: 'Tina Roberts'
  }
];

const LatestBlog: React.FC = () => {
  return (
    <section id="blog" className="section-spacing">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Latest Blog</h2>
          <p className="text-muted-foreground text-lg">
            Stay updated with the latest tips, strategies, and success stories from our community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg">
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-center mb-2 text-sm text-muted-foreground">
                  <span>{post.date}</span>
                  <span>{post.author}</span>
                </div>
                <h3 className="text-xl font-bold line-clamp-2">{post.title}</h3>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full group" asChild>
                  <Link to={`/blog/${post.id}`}>
                    Read More 
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link to="/blog" className="group">
              View All Blogs 
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LatestBlog;
