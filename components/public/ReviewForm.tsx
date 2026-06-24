'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { submitReview } from '@/lib/actions/reviewActions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Star, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const reviewSchema = z.object({
  clientName: z.string().min(2, 'Name must be at least 2 characters'),
  phoneNumber: z.string().min(10, 'Please enter a valid phone number (minimum 10 digits)'),
  email: z.string().email('Please enter a valid email').optional().or(z.literal('')),
  eventType: z.string().min(1, 'Please select the event type'),
  rating: z.number().min(1, 'Please select a star rating').max(5),
  reviewMessage: z.string().min(10, 'Review message must be at least 10 characters'),
  clientPhoto: z.string().optional()
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

export default function ReviewForm() {
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const [hoveredRating, setHoveredRating] = useState(0);

  const eventTypes = [
    'Bridal Makeup', 'Reception Makeup', 'Engagement Makeup', 
    'Party Makeup', 'Haldi Makeup', 'Mehndi Makeup', 
    'Groom Makeup', 'Hair Styling', 'Saree Draping', 'Dupatta Styling'
  ];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      clientName: '',
      phoneNumber: '',
      email: '',
      eventType: '',
      rating: 0,
      reviewMessage: '',
      clientPhoto: ''
    }
  });

  const rating = watch('rating');

  const onSubmit = (data: ReviewFormValues) => {
    setError('');
    startTransition(async () => {
      try {
        const res = await submitReview(data);
        if (res.success) {
          setSubmitted(true);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to submit review. Please try again.');
      }
    });
  };

  if (submitted) {
    return (
      <div className="text-center py-12 px-6 bg-[#FDFBF7] border border-[#EAE5DA] rounded-2xl max-w-md mx-auto shadow-md space-y-6 animate-fade-in">
        <div className="flex justify-center">
          <CheckCircle2 className="w-16 h-16 text-[#D4AF37]" />
        </div>
        <div className="space-y-2">
          <h2 className="font-serif text-2xl text-[#2C221E] tracking-wider uppercase font-bold">
            Thank You!
          </h2>
          <p className="font-sans text-sm text-[#AF8F58]">
            Your review has been successfully submitted for moderation.
          </p>
        </div>
        <p className="text-xs text-gray-500 font-sans max-w-xs mx-auto leading-relaxed">
          To maintain standard authenticity, all client reviews are verified by our team. Once approved, your feedback will appear on the portfolio site!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto bg-[#FDFBF7] border border-[#EAE5DA] rounded-2xl p-6 md:p-8 shadow-md">
      <div className="text-center mb-8 space-y-2">
        <h2 className="font-serif text-2xl text-[#2C221E] tracking-wide uppercase font-semibold">
          Share Your Experience
        </h2>
        <p className="font-sans text-xs text-[#AF8F58] max-w-sm mx-auto">
          We loved glaming you up! Tell us about your makeover and styling details.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
        {/* Name */}
        <div className="space-y-1.5">
          <Label htmlFor="clientName" className="text-xs tracking-wider uppercase font-semibold text-[#2C221E]">
            Your Name *
          </Label>
          <Input
            id="clientName"
            type="text"
            placeholder="Enter your name"
            {...register('clientName')}
            className={cn("bg-white border-[#EAE5DA] h-10", errors.clientName && "border-red-500 focus-visible:ring-red-500")}
          />
          {errors.clientName && <p className="text-[10px] text-red-500 font-medium">{errors.clientName.message}</p>}
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <Label htmlFor="phoneNumber" className="text-xs tracking-wider uppercase font-semibold text-[#2C221E]">
            Phone Number *
          </Label>
          <Input
            id="phoneNumber"
            type="tel"
            placeholder="e.g. +91 99999 99999"
            {...register('phoneNumber')}
            className={cn("bg-white border-[#EAE5DA] h-10", errors.phoneNumber && "border-red-500 focus-visible:ring-red-500")}
          />
          {errors.phoneNumber && <p className="text-[10px] text-red-500 font-medium">{errors.phoneNumber.message}</p>}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs tracking-wider uppercase font-semibold text-[#2C221E]">
            Email Address (Optional)
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="e.g. client@example.com"
            {...register('email')}
            className={cn("bg-white border-[#EAE5DA] h-10", errors.email && "border-red-500 focus-visible:ring-red-500")}
          />
          {errors.email && <p className="text-[10px] text-red-500 font-medium">{errors.email.message}</p>}
        </div>

        {/* Event Type Dropdown */}
        <div className="space-y-1.5">
          <Label htmlFor="eventType" className="text-xs tracking-wider uppercase font-semibold text-[#2C221E]">
            Event Type *
          </Label>
          <select
            id="eventType"
            {...register('eventType')}
            className={cn(
              "w-full h-10 rounded-md border border-[#EAE5DA] bg-white px-3 py-2 text-sm focus-visible:ring-1 focus-visible:ring-[#D4AF37] outline-none font-sans",
              errors.eventType && "border-red-500"
            )}
          >
            <option value="">-- Select styling service received --</option>
            {eventTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.eventType && <p className="text-[10px] text-red-500 font-medium">{errors.eventType.message}</p>}
        </div>

        {/* Interactive Star Rating Selector */}
        <div className="space-y-1.5 flex flex-col items-center py-2 border-y border-[#F5F2EB]">
          <Label className="text-xs tracking-wider uppercase font-semibold text-[#2C221E] mb-1">
            Overall Rating *
          </Label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setValue('rating', star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="focus:outline-none transition-transform duration-150 hover:scale-110 cursor-pointer"
              >
                <Star 
                  className={cn(
                    "w-8 h-8",
                    (hoveredRating || rating) >= star
                      ? "fill-[#D4AF37] text-[#D4AF37]"
                      : "text-gray-300"
                  )}
                />
              </button>
            ))}
          </div>
          {errors.rating && <p className="text-[10px] text-red-500 font-medium mt-1">{errors.rating.message}</p>}
        </div>

        {/* Review Message */}
        <div className="space-y-1.5">
          <Label htmlFor="reviewMessage" className="text-xs tracking-wider uppercase font-semibold text-[#2C221E]">
            Review Message *
          </Label>
          <Textarea
            id="reviewMessage"
            placeholder="Tell us what you liked about Chandani's work, makeup finish, hairstyle durability, and comfort..."
            {...register('reviewMessage')}
            rows={4}
            className={cn("bg-white border-[#EAE5DA]", errors.reviewMessage && "border-red-500 focus-visible:ring-red-500")}
          />
          {errors.reviewMessage && <p className="text-[10px] text-red-500 font-medium">{errors.reviewMessage.message}</p>}
        </div>

        {/* Client Photo URL */}
        <div className="space-y-1.5">
          <Label htmlFor="clientPhoto" className="text-xs tracking-wider uppercase font-semibold text-[#2C221E]">
            Client Photo URL (Optional)
          </Label>
          <Input
            id="clientPhoto"
            type="text"
            placeholder="Link to your gorgeous photo (Unsplash, Drive, etc.)"
            {...register('clientPhoto')}
            className="bg-white border-[#EAE5DA] h-10"
          />
        </div>

        {error && (
          <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded p-2 text-center">
            {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-[#2C221E] hover:bg-[#AF8F58] text-[#FFFDD0] font-sans tracking-widest uppercase transition-colors duration-300 py-3 mt-4"
        >
          {isPending ? 'Submitting Testimonial...' : 'Submit Review'}
        </Button>
      </form>
    </div>
  );
}
