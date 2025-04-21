import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: 'Alex Thompson',
    role: 'Full-time PTC User',
    content: "I've been using ClickGain for 8 months and have earned over $500 just by clicking ads during my lunch breaks. The platform is incredibly easy to use and payments are always on time.",
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: 2,
    name: 'Sarah Williams',
    role: 'Student',
    content: "As a college student, ClickGain has been a lifesaver for earning extra cash between classes. The mobile experience is smooth, and I can easily complete my daily clicks while commuting.",
    rating: 4,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: 3,
    name: 'Michael Chen',
    role: 'Freelancer',
    content: "What sets ClickGain apart is their referral program. I've grown a network of over 50 active users, and the passive income from their clicks has become a significant part of my monthly earnings.",
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/men/76.jpg'
  },
  {
    id: 4,
    name: 'Jessica Martinez',
    role: 'Stay-at-home Parent',
    content: "I was skeptical at first, but after consistently using ClickGain for a few weeks, I started seeing real results. It's perfect for making use of small pockets of time throughout my day.",
    rating: 4,
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
  },
  {
    id: 5,
    name: 'David Wilson',
    role: 'Retired',
    content: "The premium membership was definitely worth investing in. The higher click rates and unlimited ads have more than paid for the subscription. The customer service is also exceptional.",
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/men/54.jpg'
  }
];

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  // Handle auto-sliding
  useEffect(() => {
    const startAutoplay = () => {
      autoplayRef.current = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000); // Change slide every 5 seconds
    };

    const stopAutoplay = () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };

    startAutoplay();

    // Stop autoplay on user interaction
    if (sliderRef.current) {
      sliderRef.current.addEventListener('mouseenter', stopAutoplay);
      sliderRef.current.addEventListener('mouseleave', startAutoplay);
    }

    return () => {
      stopAutoplay();
      if (sliderRef.current) {
        sliderRef.current.removeEventListener('mouseenter', stopAutoplay);
        sliderRef.current.removeEventListener('mouseleave', startAutoplay);
      }
    };
  }, []);

  // Handle touch events for mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      // Swipe left
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }
    if (touchEndX - touchStartX > 50) {
      // Swipe right
      setActiveIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
    }
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  const goToPrevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const goToNextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  // Generate star ratings
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  // Show 1 testimonial on mobile, 3 on desktop
  const visibleTestimonials = window.innerWidth < 768 
    ? [testimonials[activeIndex]]
    : [
        testimonials[activeIndex],
        testimonials[(activeIndex + 1) % testimonials.length],
        testimonials[(activeIndex + 2) % testimonials.length]
      ];

  return (
    <section className="section-spacing">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Users Say
          </h2>
          <p className="text-muted-foreground text-lg">
            Thousands of users are already earning with ClickGain. Here are some of their stories.
          </p>
        </div>

        <div 
          ref={sliderRef}
          className="relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Desktop & Mobile Carousel */}
          <div className="overflow-hidden">
            <div className="flex transition-all duration-500 ease-in-out">
              {visibleTestimonials.map((testimonial, index) => (
                <div 
                  key={`${testimonial.id}-${index}`} 
                  className="w-full md:w-1/3 p-4 flex-shrink-0"
                  style={{ transform: `translateX(${-activeIndex * 100}%)` }}
                >
                  <div className="bg-background rounded-xl p-6 shadow-md border border-border h-full flex flex-col">
                    <div className="flex items-center mb-4">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        className="h-12 w-12 rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex mb-4">
                      {renderStars(testimonial.rating)}
                    </div>
                    <p className="text-foreground flex-grow">{testimonial.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevSlide}
            className="absolute top-1/2 -left-2 md:-left-6 transform -translate-y-1/2 h-10 w-10 rounded-full bg-background shadow-md flex items-center justify-center z-10 border border-border"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goToNextSlide}
            className="absolute top-1/2 -right-2 md:-right-6 transform -translate-y-1/2 h-10 w-10 rounded-full bg-background shadow-md flex items-center justify-center z-10 border border-border"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2.5 rounded-full transition-all ${
                  index === activeIndex ? 'w-8 bg-primary' : 'w-2.5 bg-primary/30'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
