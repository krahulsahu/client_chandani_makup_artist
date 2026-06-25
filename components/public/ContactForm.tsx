'use client';

import { useState, useTransition, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { submitContact } from '@/lib/actions/contactActions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckCircle2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Please enter a valid phone number (minimum 10 digits)'),
  email: z.string().email('Please enter a valid email address'),
  eventType: z.string().min(1, 'Please select the event type'),
  eventDate: z.string().min(1, 'Please select the event date'),
  eventLocation: z.string().min(2, 'Please enter the event location'),
  budget: z.string().optional().or(z.literal('')),
  message: z.string().optional().or(z.literal(''))
});

type ContactFormValues = z.infer<typeof contactSchema>;

const eventTypes = [
  'Bridal Makeup', 'Reception Makeup', 'Engagement Makeup', 
  'Party Makeup', 'Haldi Makeup', 'Mehndi Makeup', 
  'Groom Makeup', 'Hair Styling', 'Saree Draping', 'Dupatta Styling'
];

export default function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get('service');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      eventType: '',
      eventDate: '',
      eventLocation: '',
      budget: '',
      message: ''
    }
  });

  // Pre-fill event type if query parameter is present
  useEffect(() => {
    if (serviceParam) {
      // Find matching option
      const match = eventTypes.find(t => t.toLowerCase().includes(serviceParam.toLowerCase()));
      if (match) {
        setValue('eventType', match);
        setValue('message', `Hi Chandani, I would like to inquire about booking the "${serviceParam}" package for my upcoming event.`);
      }
    }
  }, [serviceParam, setValue]);

  const onSubmit = (data: ContactFormValues) => {
    setError('');
    startTransition(async () => {
      try {
        const res = await submitContact(data);
        if (res.success) {
          setSubmitted(true);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to submit inquiry. Please try again.');
      }
    });
  };

  if (submitted) {
    return (
      <div className="text-center py-12 px-6 bg-[#FDFBF7] border border-[#EAE5DA] rounded-2xl shadow-md space-y-6 animate-fade-in max-w-lg mx-auto">
        <div className="flex justify-center">
          <CheckCircle2 className="w-16 h-16 text-[#D4AF37]" />
        </div>
        <div className="space-y-2">
          <h2 className="font-serif text-2xl text-[#2C221E] tracking-wider uppercase font-bold">
            Inquiry Received
          </h2>
          <p className="font-sans text-sm text-[#AF8F58]">
            Your booking inquiry has been sent directly to Chandani Kumari.
          </p>
        </div>
        <p className="text-xs text-gray-500 font-sans max-w-xs mx-auto leading-relaxed">
          We will review your event requirements and call or email you shortly with slot availability and pricing quotes.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFBF7] border border-[#EAE5DA] rounded-2xl p-6 md:p-8 shadow-md">
      <h3 className="font-serif text-2xl text-[#2C221E] tracking-wide mb-6">
        Send an Inquiry
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Name */}
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-xs tracking-wider uppercase font-semibold text-[#2C221E]">
            Full Name *
          </Label>
          <Input
            id="name"
            placeholder="Enter your name"
            {...register('name')}
            className={cn("bg-white border-[#EAE5DA] h-10", errors.name && "border-red-500 focus-visible:ring-red-500")}
          />
          {errors.name && <p className="text-[10px] text-red-500 font-medium">{errors.name.message}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Phone */}
          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-xs tracking-wider uppercase font-semibold text-[#2C221E]">
              Phone Number *
            </Label>
            <Input
              id="phone"
              placeholder="+91 99999 99999"
              {...register('phone')}
              className={cn("bg-white border-[#EAE5DA] h-10", errors.phone && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.phone && <p className="text-[10px] text-red-500 font-medium">{errors.phone.message}</p>}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs tracking-wider uppercase font-semibold text-[#2C221E]">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              {...register('email')}
              className={cn("bg-white border-[#EAE5DA] h-10", errors.email && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.email && <p className="text-[10px] text-red-500 font-medium">{errors.email.message}</p>}
          </div>
        </div>

        {/* Event Type Dropdown */}
        <div className="space-y-1.5">
          <Label htmlFor="eventType" className="text-xs tracking-wider uppercase font-semibold text-[#2C221E]">
            Event / Styling Service *
          </Label>
          <select
            id="eventType"
            {...register('eventType')}
            className={cn(
              "w-full h-10 rounded-md border border-[#EAE5DA] bg-white px-3 py-2 text-sm focus-visible:ring-1 focus-visible:ring-[#D4AF37] outline-none font-sans",
              errors.eventType && "border-red-500"
            )}
          >
            <option value="">-- Select styling service requested --</option>
            {eventTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.eventType && <p className="text-[10px] text-red-500 font-medium">{errors.eventType.message}</p>}
        </div>

        {/* Event Date & Location Group */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Event Date */}
          <div className="space-y-1.5">
            <Label htmlFor="eventDate" className="text-xs tracking-wider uppercase font-semibold text-[#2C221E]">
              Event Date *
            </Label>
            <Input
              id="eventDate"
              type="date"
              {...register('eventDate')}
              className={cn("bg-white border-[#EAE5DA] h-10", errors.eventDate && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.eventDate && <p className="text-[10px] text-red-500 font-medium">{errors.eventDate.message}</p>}
          </div>

          {/* Event Location */}
          <div className="space-y-1.5">
            <Label htmlFor="eventLocation" className="text-xs tracking-wider uppercase font-semibold text-[#2C221E]">
              Event Location *
            </Label>
            <Input
              id="eventLocation"
              type="text"
              placeholder="e.g. Rajajinagar, Bengaluru"
              {...register('eventLocation')}
              className={cn("bg-white border-[#EAE5DA] h-10", errors.eventLocation && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.eventLocation && <p className="text-[10px] text-red-500 font-medium">{errors.eventLocation.message}</p>}
          </div>
        </div>

        {/* Budget */}
        <div className="space-y-1.5">
          <Label htmlFor="budget" className="text-xs tracking-wider uppercase font-semibold text-[#2C221E]">
            Estimated Budget (Optional)
          </Label>
          <Input
            id="budget"
            type="text"
            placeholder="e.g. ₹15,000 - ₹20,000"
            {...register('budget')}
            className="bg-white border-[#EAE5DA] h-10"
          />
        </div>

        {/* Additional Notes */}
        <div className="space-y-1.5">
          <Label htmlFor="message" className="text-xs tracking-wider uppercase font-semibold text-[#2C221E]">
            Additional Notes (Optional)
          </Label>
          <Textarea
            id="message"
            placeholder="Share any special preferences, skin type, hair styling inspiration, number of guest makeovers needed..."
            {...register('message')}
            rows={4}
            className="bg-white border-[#EAE5DA]"
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
          className="w-full bg-[#2C221E] hover:bg-[#AF8F58] text-[#FFFDD0] font-sans tracking-widest uppercase transition-colors duration-300 py-3 mt-2"
        >
          {isPending ? 'Sending Message...' : 'Send Booking Request'}
        </Button>
      </form>
    </div>
  );
}
