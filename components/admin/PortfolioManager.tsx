'use client';

import { useState, useTransition } from 'react';
import { createPortfolioItem, updatePortfolioItem, deletePortfolioItem } from '@/lib/actions/portfolioActions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Search, Edit2, Trash2, Calendar, Star, StarOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PortfolioManagerProps {
  portfolioItems: any[];
}

export default function PortfolioManager({ portfolioItems }: PortfolioManagerProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Bridal');
  const [eventDate, setEventDate] = useState('');
  const [images, setImages] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    'Bridal', 'Reception', 'Engagement', 'Party', 
    'Haldi', 'Mehndi', 'Hair Styling', 'Saree Draping'
  ];

  const handleOpenAdd = () => {
    setEditingItem(null);
    setTitle('');
    setDescription('');
    setCategory('Bridal');
    
    // Default to current date in YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];
    setEventDate(today);
    
    setImages('');
    setIsFeatured(false);
    setError('');
    setIsOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setEditingItem(item);
    setTitle(item.title);
    setDescription(item.description || '');
    setCategory(item.category);
    
    const formattedDate = new Date(item.eventDate).toISOString().split('T')[0];
    setEventDate(formattedDate);
    
    setImages((item.images || []).join(', '));
    setIsFeatured(item.isFeatured || false);
    setError('');
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title || !eventDate || !images) {
      setError('Please fill in all required fields (Title, Event Date, Images).');
      return;
    }

    const imageArray = images.split(',').map(img => img.trim()).filter(Boolean);
    if (imageArray.length === 0) {
      setError('Please provide at least one valid image URL.');
      return;
    }

    const portfolioData = {
      title,
      description,
      category,
      eventDate: new Date(eventDate),
      images: imageArray,
      isFeatured
    };

    startTransition(async () => {
      try {
        if (editingItem) {
          await updatePortfolioItem(editingItem._id, portfolioData);
        } else {
          await createPortfolioItem(portfolioData);
        }
        setIsOpen(false);
        router.refresh();
      } catch (err: any) {
        setError(err.message || 'An error occurred.');
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this portfolio item?')) return;
    
    startTransition(async () => {
      try {
        await deletePortfolioItem(id);
        router.refresh();
      } catch (err: any) {
        alert(err.message || 'Failed to delete portfolio.');
      }
    });
  };

  const filteredItems = portfolioItems.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search portfolios by title or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white border-[#EAE5DA]"
          />
        </div>
        <Button
          onClick={handleOpenAdd}
          className="bg-[#2C221E] hover:bg-[#AF8F58] text-[#FFFDD0] font-sans tracking-wide"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Portfolio Showcase
        </Button>
      </div>

      {/* Portfolios Table */}
      <Card className="border-[#EAE5DA] bg-[#FDFBF7] shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-[#FAF6F0]">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-serif font-bold text-[#2C221E] w-20">Preview</TableHead>
                <TableHead className="font-serif font-bold text-[#2C221E]">Project Title</TableHead>
                <TableHead className="font-serif font-bold text-[#2C221E]">Category</TableHead>
                <TableHead className="font-serif font-bold text-[#2C221E]">Event Date</TableHead>
                <TableHead className="font-serif font-bold text-[#2C221E]">Featured</TableHead>
                <TableHead className="font-serif font-bold text-[#2C221E] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500 font-sans">
                    No portfolio items found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredItems.map((item) => (
                  <TableRow key={item._id} className="hover:bg-[#FAF6F0] transition-colors border-b border-[#FAF6F0]">
                    <TableCell>
                      {item.images && item.images.length > 0 ? (
                        <img 
                          src={item.images[0]} 
                          alt={item.title} 
                          className="w-10 h-10 object-cover rounded-md border border-[#EAE5DA]" 
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-100 rounded-md border border-[#EAE5DA]" />
                      )}
                    </TableCell>
                    <TableCell className="font-sans font-semibold text-[#2C221E]">
                      {item.title}
                    </TableCell>
                    <TableCell className="font-sans text-sm text-gray-600">
                      {item.category}
                    </TableCell>
                    <TableCell className="font-sans text-sm text-gray-600">
                      <span className="inline-flex items-center">
                        <Calendar className="w-3 h-3 mr-1 text-gray-400" />
                        {new Date(item.eventDate).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </TableCell>
                    <TableCell>
                      {item.isFeatured ? (
                        <span className="inline-flex items-center text-xs text-[#D4AF37] font-semibold">
                          <Star className="w-3 h-3 mr-1 fill-current" /> Featured
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-xs text-gray-400">
                          <StarOff className="w-3 h-3 mr-1" /> Regular
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenEdit(item)}
                          className="h-8 w-8 text-[#AF8F58] hover:text-[#2C221E] hover:bg-[#F5F2EB]"
                        >
                          <Edit2 className="h-4.5 w-4.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(item._id)}
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

      {/* Add/Edit Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl bg-[#FDFBF7] border-[#EAE5DA]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl text-[#2C221E]">
                {editingItem ? 'Edit Portfolio Showcase' : 'Create Portfolio Showcase'}
              </DialogTitle>
              <DialogDescription className="text-gray-500 font-sans text-xs">
                Upload image assets and define category associations for display on your gallery layout.
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="title">Project Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Elegant Gold Bridal Look"
                  required
                  className="bg-white border-[#EAE5DA]"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell clients about the makeover style, styling choices, hair draping, or the event..."
                  rows={3}
                  className="bg-white border-[#EAE5DA]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-10 rounded-md border border-[#EAE5DA] bg-white px-3 py-2 text-sm focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventDate">Event Date *</Label>
                <Input
                  id="eventDate"
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  required
                  className="bg-white border-[#EAE5DA]"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="images">Showcase Images URLs * (comma separated)</Label>
                <Textarea
                  id="images"
                  value={images}
                  onChange={(e) => setImages(e.target.value)}
                  placeholder="e.g. https://images.unsplash.com/photo-1, https://images.unsplash.com/photo-2"
                  required
                  rows={3}
                  className="bg-white border-[#EAE5DA]"
                />
              </div>

              <div className="flex items-center space-x-2 md:col-span-2 pt-2">
                <input
                  id="isFeatured"
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="h-4 w-4 rounded border-[#EAE5DA] text-[#D4AF37] focus:ring-[#D4AF37]"
                />
                <Label htmlFor="isFeatured" className="text-sm font-medium text-gray-700 cursor-pointer">
                  Feature this on the home page showcase grid
                </Label>
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2 mb-4">
                {error}
              </div>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="border-[#EAE5DA] text-gray-700 h-9"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-[#2C221E] hover:bg-[#AF8F58] text-[#FFFDD0] h-9"
              >
                {isPending ? 'Saving...' : 'Save Portfolio Item'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
