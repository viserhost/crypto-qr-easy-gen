
import React from 'react';
import { Star } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useIsMobile } from '@/hooks/use-mobile';

// Expanded testimonial data
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
  },
  {
    id: 6,
    name: 'Emily Rodriguez',
    role: 'Digital Nomad',
    content: "ClickGain has been my go-to platform while traveling. No matter where I am in the world, I can log in and earn a consistent income. The international payment options are a huge plus.",
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/women/28.jpg'
  }
];

const Testimonials: React.FC = () => {
  const isMobile = useIsMobile();
  
  // Generate star ratings
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section id="testimonials" className="section-spacing">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Users Say
          </h2>
          <p className="text-muted-foreground text-lg">
            Thousands of users are already earning with ClickGain. Here are some of their stories.
          </p>
        </div>

        <Carousel
          opts={{ 
            align: "start", 
            loop: true,
            slidesToScroll: isMobile ? 1 : 3
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className={isMobile ? "basis-full" : "basis-1/3"}>
                <Card className="h-full border border-border">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-4">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        className="h-12 w-12 rounded-full"
                      />
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex mb-2">
                      {renderStars(testimonial.rating)}
                    </div>
                    <p className="text-foreground">{testimonial.content}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-8 flex justify-center">
            <CarouselPrevious className="static mx-2 transform-none" />
            <CarouselNext className="static mx-2 transform-none" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
