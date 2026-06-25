'use client';

import { useState, useTransition } from 'react';
import { updateContactStatus, deleteContact } from '@/lib/actions/contactActions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Mail, Phone, Calendar, Check, Archive, Trash2, Edit } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface InquiriesManagerProps {
  inquiries: any[];
}

export default function InquiriesManager({ inquiries }: InquiriesManagerProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'new' | 'contacted' | 'archived'>('All');
  
  // Dialog state for view/edit notes
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
  const [notes, setNotes] = useState('');
  const [isNotesOpen, setIsNotesOpen] = useState(false);

  const handleUpdateStatus = (id: string, status: 'new' | 'contacted' | 'archived') => {
    startTransition(async () => {
      try {
        await updateContactStatus(id, status);
        router.refresh();
      } catch (err: any) {
        alert(err.message || 'Failed to update status.');
      }
    });
  };

  const handleSaveNotes = () => {
    if (!selectedInquiry) return;
    
    startTransition(async () => {
      try {
        await updateContactStatus(selectedInquiry._id, selectedInquiry.status, notes);
        setIsNotesOpen(false);
        router.refresh();
      } catch (err: any) {
        alert(err.message || 'Failed to save notes.');
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    
    startTransition(async () => {
      try {
        await deleteContact(id);
        router.refresh();
      } catch (err: any) {
        alert(err.message || 'Failed to delete inquiry.');
      }
    });
  };

  const handleOpenNotes = (inquiry: any) => {
    setSelectedInquiry(inquiry);
    setNotes(inquiry.notes || '');
    setIsNotesOpen(true);
  };

  // Filter items
  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch = 
      inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.eventType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || inquiry.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search inquiries by name, contact, event..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white border-[#EAE5DA]"
          />
        </div>

        {/* Tab Filters */}
        <div className="flex gap-2">
          {['All', 'new', 'contacted', 'archived'].map((status) => (
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
              {status === 'All' ? 'All Leads' : `${status}`}
            </button>
          ))}
        </div>

      </div>

      {/* Leads Table */}
      <Card className="border-[#EAE5DA] bg-[#FDFBF7] shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-[#FAF6F0]">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-serif font-bold text-[#2C221E]">Submitter</TableHead>
                <TableHead className="font-serif font-bold text-[#2C221E]">Event Details</TableHead>
                <TableHead className="font-serif font-bold text-[#2C221E] max-w-xs">Message</TableHead>
                <TableHead className="font-serif font-bold text-[#2C221E]">Status</TableHead>
                <TableHead className="font-serif font-bold text-[#2C221E]">Notes</TableHead>
                <TableHead className="font-serif font-bold text-[#2C221E] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInquiries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500 font-sans">
                    No leads or inquiries found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredInquiries.map((inquiry) => (
                  <TableRow key={inquiry._id} className="hover:bg-[#FAF6F0] transition-colors border-b border-[#FAF6F0]">
                    
                    {/* Submitter */}
                    <TableCell className="font-sans">
                      <p className="font-semibold text-[#2C221E]">{inquiry.name}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                        <Phone className="w-3 h-3 text-gray-400" />
                        <a href={`tel:${inquiry.phone}`} className="hover:text-[#D4AF37]">{inquiry.phone}</a>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-gray-500 mt-0.5">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <a href={`mailto:${inquiry.email}`} className="hover:text-[#D4AF37]">{inquiry.email}</a>
                      </div>
                    </TableCell>

                    {/* Event & Date */}
                    <TableCell className="font-sans text-xs text-gray-600">
                      <p className="font-semibold text-[#2C221E] text-sm">{inquiry.eventType}</p>
                      <span className="inline-flex items-center text-[10px] text-gray-400 mt-1">
                        <Calendar className="w-3 h-3 mr-1" />
                        Created: {new Date(inquiry.createdAt).toLocaleDateString()}
                      </span>
                      {inquiry.eventDate && (
                        <p className="text-[10px] text-amber-800 font-semibold mt-1">
                          Date: {inquiry.eventDate}
                        </p>
                      )}
                      {inquiry.eventLocation && (
                        <p className="text-[10px] text-gray-500">
                          Location: {inquiry.eventLocation}
                        </p>
                      )}
                      {inquiry.budget && (
                        <p className="text-[10px] text-[#AF8F58] font-medium">
                          Budget: {inquiry.budget}
                        </p>
                      )}
                    </TableCell>

                    {/* Message body */}
                    <TableCell className="font-sans text-xs text-gray-600 max-w-xs truncate italic">
                      "{inquiry.message}"
                    </TableCell>

                    {/* Status badge */}
                    <TableCell>
                      <span className={cn(
                        "inline-flex items-center text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full border font-sans",
                        inquiry.status === 'new' && "bg-amber-50 text-amber-700 border-amber-200 animate-pulse",
                        inquiry.status === 'contacted' && "bg-green-50 text-green-700 border-green-200",
                        inquiry.status === 'archived' && "bg-gray-50 text-gray-700 border-gray-200"
                      )}>
                        {inquiry.status}
                      </span>
                    </TableCell>

                    {/* Notes preview */}
                    <TableCell className="font-sans text-xs max-w-[120px] truncate text-gray-500">
                      {inquiry.notes ? (
                        <span className="flex items-center text-[#AF8F58] font-medium cursor-pointer" onClick={() => handleOpenNotes(inquiry)}>
                          <Edit className="w-3.5 h-3.5 mr-1" /> View Note
                        </span>
                      ) : (
                        <button onClick={() => handleOpenNotes(inquiry)} className="text-[10px] text-gray-400 hover:text-[#2C221E] flex items-center hover:underline cursor-pointer">
                          Add Note
                        </button>
                      )}
                    </TableCell>

                    {/* Action buttons */}
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {inquiry.status === 'new' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateStatus(inquiry._id, 'contacted')}
                            className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200 h-8 text-[11px] px-2.5"
                          >
                            <Check className="w-3.5 h-3.5 mr-1" /> Call Made
                          </Button>
                        )}
                        {inquiry.status !== 'archived' ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateStatus(inquiry._id, 'archived')}
                            className="bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200 h-8 text-[11px] px-2.5"
                          >
                            <Archive className="w-3.5 h-3.5 mr-1" /> Archive
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateStatus(inquiry._id, 'new')}
                            className="bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-200 h-8 text-[11px] px-2.5"
                          >
                            Restore
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(inquiry._id)}
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

      {/* Edit Notes Modal */}
      <Dialog open={isNotesOpen} onOpenChange={setIsNotesOpen}>
        <DialogContent className="max-w-md bg-[#FDFBF7] border-[#EAE5DA]">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl text-[#2C221E]">
              Inquiry & Follow-up Details
            </DialogTitle>
            <DialogDescription className="text-xs text-gray-500 font-sans">
              Detailed inquiry information for {selectedInquiry?.name}
            </DialogDescription>
          </DialogHeader>

          {selectedInquiry && (
            <div className="space-y-3 py-2 text-xs font-sans text-gray-600 border-b border-[#FAF6F0] pb-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="font-semibold text-gray-400">Email</p>
                  <p className="text-sm font-medium text-[#2C221E]">{selectedInquiry.email}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-400">Phone</p>
                  <p className="text-sm font-medium text-[#2C221E]">{selectedInquiry.phone}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="font-semibold text-gray-400">Service requested</p>
                  <p className="text-sm font-medium text-[#2C221E]">{selectedInquiry.eventType}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-400">Submitted on</p>
                  <p className="text-sm font-medium text-[#2C221E]">{new Date(selectedInquiry.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 border-t border-[#FAF6F0] pt-2">
                <div>
                  <p className="font-semibold text-gray-400">Event Date</p>
                  <p className="text-sm font-medium text-amber-700">{selectedInquiry.eventDate || 'N/A'}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-400 font-sans">Event Location</p>
                  <p className="text-sm font-medium text-[#2C221E]">{selectedInquiry.eventLocation || 'N/A'}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-400 font-sans">Budget</p>
                  <p className="text-sm font-medium text-[#AF8F58]">{selectedInquiry.budget || 'N/A'}</p>
                </div>
              </div>
              <div className="border-t border-[#FAF6F0] pt-2">
                <p className="font-semibold text-gray-400">Additional Notes</p>
                <p className="text-xs text-[#2C221E] bg-white border border-[#EAE5DA] p-2 rounded-md italic mt-1 max-h-24 overflow-y-auto whitespace-pre-wrap">
                  "{selectedInquiry.message || 'No additional notes provided'}"
                </p>
              </div>
            </div>
          )}

          <div className="py-2">
            <Label htmlFor="notes" className="text-xs uppercase font-semibold text-[#2C221E] tracking-wider">Follow-up Notes / Activity Log</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Spoke on June 25, bridal trial scheduled for July 12. Quoted ₹12,000."
              rows={3}
              className="bg-white border-[#EAE5DA] mt-1.5 text-sm"
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsNotesOpen(false)}
              className="border-[#EAE5DA] text-gray-700 h-9"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveNotes}
              disabled={isPending}
              className="bg-[#2C221E] hover:bg-[#AF8F58] text-[#FFFDD0] h-9"
            >
              {isPending ? 'Saving...' : 'Save Notes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
