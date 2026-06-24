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
                    <TableCell className="font-sans text-sm text-gray-600">
                      <p className="font-medium text-[#2C221E]">{inquiry.eventType}</p>
                      <span className="inline-flex items-center text-[10px] text-gray-400 mt-1">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(inquiry.createdAt).toLocaleDateString()}
                      </span>
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
              Follow-up Notes
            </DialogTitle>
            <DialogDescription className="text-xs text-gray-500 font-sans">
              Add custom tracking notes for lead: {selectedInquiry?.name}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Label htmlFor="notes">Notes/Call summary</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Spoke on June 25, bridal trial scheduled for July 12. Quoted ₹12,000."
              rows={4}
              className="bg-white border-[#EAE5DA] mt-1.5"
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
