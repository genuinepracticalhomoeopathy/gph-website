import React from 'react';

interface TestimonialProps {
  name: string;
  quote: string;
}

const TestimonialCard: React.FC<TestimonialProps> = ({ name, quote }) => {
  return (
    <div className="p-6 shadow-lg rounded-lg bg-white">
      <div className="flex items-center mb-4">
        
        <div>
          <h4 className="font-bold text-slate-500">{name}</h4>
          {/* <p className="text-text/60 text-sm text-black">{role}</p> */}
        </div>
      </div>
      
      <p className="text-text/80 italic text-slate-900">{quote}</p>
    </div>
  );
};

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: "Dr. Anjali Lamture",
      quote: "I am Dr Anjali Lamture practicing homeopath in mumbai i know Dr. Santosh mahanor since 2008 when I was studying UG i tried many ways to understand homoeopathy . But always stuck down with uncertainty . Genuine practical homeopathy is easiest and shortest way to treat patients as well as to earn money . Adding cherry on cake is marketing tips delivered by sir genuinely speaking is it's jackpot for me .Genuine practical homeopathy is definitely game changer in t field of homeopathy thanks sir 🙏",
    },
    {
      name: "Dr. Sana",
      quote: "Genuine practical homeopathy is teach us how to practice genuinely and real homeopathic practice. It guide us how to build confidence in homeopathic practice . It is the real Hahnemanian method homeopathic practice. There are lot's of confusing methods in homeopathy and we are get confused in them which method we follow. to get cure and to treat patients but now I think this is the real scientific method of practice in homeopathy.",
    },
   
  ];

  return (
    <section id="testimonials" className="py-20 bg-primary/5">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          What Our Students Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;