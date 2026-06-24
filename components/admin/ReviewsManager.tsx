'use client';

import { useState, useTransition } from 'react';
import { 
  approveReview, 
  rejectReview, 
  toggleFeaturedReview, 
  deleteReview 
} from '@/lib/actions/reviewActions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Star, Check, X, Trash2, ShieldAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface ReviewsManagerProps {
  reviews: any[];
}

export default function ReviewsManager({ reviews }: ReviewsManagerProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'pending' | 'approved' | 'rejected'>('All');

  const handleApprove = (id: string) => {
    startTransition(async () => {
      try {
        await approveReview(id);
        router.refresh();
      } catch (err: any) {
        alert(err.message || 'Failed to approve review.');
      }
    });
  };

  const handleReject = (id: string) => {
    startTransition(async () => {
      try {
        await rejectReview(id);
        router.refresh();
      } catch (err: any) {
        alert(err.message || 'Failed to reject review.');
      }
    });
  };

  const handleToggleFeatured = (id: string) => {
    startTransition(async () => {
      try {
        await toggleFeaturedReview(id);
        router.refresh();
      } catch (err: any) {
        alert(err.message || 'Failed to toggle featured status.');
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this review permanently?')) return;

    startTransition(async () => {
      try {
        await deleteReview(id);
        router.refresh();
      } catch (err: any) {
        alert(err.message || 'Failed to delete review.');
      }
    });
  };

  // Filters & searches
  const filteredReviews = reviews.filter((review) => {
    const matchesSearch = 
      review.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.reviewMessage.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.eventType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || review.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Action panel */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search reviews by name, content, event..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white border-[#EAE5DA]"
          />
        </div>

        {/* Status Filters */}
        <div className="flex gap-2">
          {['All', 'pending', 'approved', 'rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status as any)}
              className={cn(
                "px-4 py-1.5 rounded-full font-sans text-xs tracking-wider uppercase transition-all border font-medium cursor-pointer",
                statusFilter === status
                  ? "bg-[#2C221E] text-[#FFFDD0] border-[#2C221E]"
                  : "bg-white text-gray-600 border-[#EAE5DA] hover:border-[#D4AF37]"
              )}
            >
              {status === 'All' ? 'All Reviews' : `${status}`}
            </button>
          ))}
        </div>

      </div>

      {/* Reviews Table */}
      <Card className="border-[#EAE5DA] bg-[#FDFBF7] shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-[#FAF6F0]">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-serif font-bold text-[#2C221E]">Client Details</TableHead>
                <TableHead className="font-serif font-bold text-[#2C221E] max-w-xs">Message</TableHead>
                <TableHead className="font-serif font-bold text-[#2C221E]">Rating</TableHead>
                <TableHead className="font-serif font-bold text-[#2C221E]">Status</TableHead>
                <TableHead className="font-serif font-bold text-[#2C221E]">Featured</TableHead>
                <TableHead className="font-serif font-bold text-[#2C221E] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500 font-sans">
                    No reviews found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredReviews.map((review) => (
                  <TableRow key={review._id} className="hover:bg-[#FAF6F0] transition-colors border-b border-[#FAF6F0]">
                    
                    {/* Client details */}
                    <TableCell className="font-sans">
                      <p className="font-semibold text-[#2C221E]">{review.clientName}</p>
                      <p className="text-xs text-gray-500">{review.phoneNumber}</p>
                      <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide mt-1">{review.eventType}</p>
                    </TableCell>

                    {/* Review text */}
                    <TableCell className="font-sans text-xs text-gray-600 max-w-xs truncate italic">
                      "{review.reviewMessage}"
                    </TableCell>

                    {/* Stars */}
                    <TableCell>
                      <div className="flex text-amber-400 text-xs">
                        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                      </div>
                    </TableCell>

                    {/* Status badge */}
                    <TableCell>
                      <span className={cn(
                        "inline-flex items-center text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full border font-sans",
                        review.status === 'approved' && "bg-green-50 text-green-700 border-green-200",
                        review.status === 'pending' && "bg-amber-50 text-amber-700 border-amber-200 animate-pulse",
                        review.status === 'rejected' && "bg-red-50 text-red-700 border-red-200"
                      )}>
                        {review.status}
                      </span>
                    </TableCell>

                    {/* Featured toggle */}
                    <TableCell>
                      <button
                        onClick={() => handleToggleFeatured(review._id)}
                        className={cn(
                          "inline-flex items-center text-xs px-2.5 py-0.5 rounded-full border transition-colors font-sans font-semibold cursor-pointer",
                          review.isFeatured
                            ? "bg-amber-100 text-amber-800 border-amber-300"
                            : "bg-gray-100 text-gray-500 border-gray-200 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200"
                        )}
                      >
                        <Star className={cn("w-3 h-3 mr-1", review.isFeatured && "fill-current")} />
                        {review.isFeatured ? 'Featured' : 'Regular'}
                      </button>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {review.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleApprove(review._id)}
                              className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200 h-8 text-[11px] px-2.5"
                            >
                              <Check className="w-3.5 h-3.5 mr-1" /> Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleReject(review._id)}
                              className="bg-red-50 hover:bg-red-100 text-red-700 border-red-200 h-8 text-[11px] px-2.5"
                            >
                              <X className="w-3.5 h-3.5 mr-1" /> Reject
                            </Button>
                          </>
                        )}
                        {review.status === 'rejected' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleApprove(review._id)}
                            className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200 h-8 text-[11px] px-2.5"
                          >
                            <Check className="w-3.5 h-3.5 mr-1" /> Approve
                          </Button>
                        )}
                        {review.status === 'approved' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleReject(review._id)}
                            className="bg-red-50 hover:bg-red-100 text-red-700 border-red-200 h-8 text-[11px] px-2.5"
                          >
                            <X className="w-3.5 h-3.5 mr-1" /> Revoke
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(review._id)}
                          className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-[#F5F2EB]"
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </Button>
                      </div>
                    </TableCell>

                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </div>
  );
}
