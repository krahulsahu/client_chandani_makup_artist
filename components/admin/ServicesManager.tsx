'use client';

import { useState, useTransition } from 'react';
import { createService, updateService, deleteService } from '@/lib/actions/serviceActions';
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
import { Plus, Search, Edit2, Trash2, Check, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ServicesManagerProps {
  services: any[];
}

export default function ServicesManager({ services }: ServicesManagerProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);

  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Bridal');
  const [duration, setDuration] = useState('60');
  const [priceMin, setPriceMin] = useState('5000');
  const [priceMax, setPriceMax] = useState('15000');
  const [includedFeatures, setIncludedFeatures] = useState('');
  const [galleryImages, setGalleryImages] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState('');

  const categories = [
    'Bridal', 'Reception', 'Engagement', 'Party', 
    'Haldi', 'Mehndi', 'Groom Makeup', 'Hair Styling', 
    'Saree Draping', 'Dupatta Styling'
  ];

  const handleOpenAdd = () => {
    setEditingService(null);
    setName('');
    setDescription('');
    setCategory('Bridal');
    setDuration('60');
    setPriceMin('5000');
    setPriceMax('15000');
    setIncludedFeatures('');
    setGalleryImages('');
    setIsActive(true);
    setError('');
    setIsOpen(true);
  };

  const handleOpenEdit = (service: any) => {
    setEditingService(service);
    setName(service.name);
    setDescription(service.description);
    setCategory(service.category);
    setDuration(service.duration.toString());
    setPriceMin(service.priceRange.min.toString());
    setPriceMax(service.priceRange.max.toString());
    setIncludedFeatures((service.includedFeatures || []).join(', '));
    setGalleryImages((service.galleryImages || []).join(', '));
    setIsActive(service.isActive);
    setError('');
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !description || !priceMin || !priceMax || !duration) {
      setError('Please fill in all required fields.');
      return;
    }

    const serviceData = {
      name,
      description,
      category,
      duration: Number(duration),
      priceRange: {
        min: Number(priceMin),
        max: Number(priceMax),
        currency: 'INR'
      },
      includedFeatures: includedFeatures.split(',').map(f => f.trim()).filter(Boolean),
      galleryImages: galleryImages.split(',').map(img => img.trim()).filter(Boolean),
      isActive
    };

    startTransition(async () => {
      try {
        if (editingService) {
          await updateService(editingService._id, serviceData);
        } else {
          await createService(serviceData);
        }
        setIsOpen(false);
        router.refresh();
      } catch (err: any) {
        setError(err.message || 'An error occurred.');
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    
    startTransition(async () => {
      try {
        await deleteService(id);
        router.refresh();
      } catch (err: any) {
        alert(err.message || 'Failed to delete service.');
      }
    });
  };

  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search services by name or category..."
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
          Add Service
        </Button>
      </div>

      {/* Services Table */}
      <Card className="border-[#EAE5DA] bg-[#FDFBF7] shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-[#FAF6F0]">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-serif font-bold text-[#2C221E]">Service Name</TableHead>
                <TableHead className="font-serif font-bold text-[#2C221E]">Category</TableHead>
                <TableHead className="font-serif font-bold text-[#2C221E]">Duration</TableHead>
                <TableHead className="font-serif font-bold text-[#2C221E]">Price Range</TableHead>
                <TableHead className="font-serif font-bold text-[#2C221E]">Status</TableHead>
                <TableHead className="font-serif font-bold text-[#2C221E] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500 font-sans">
                    No services found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredServices.map((service) => (
                  <TableRow key={service._id} className="hover:bg-[#FAF6F0] transition-colors border-b border-[#FAF6F0]">
                    <TableCell className="font-sans font-semibold text-[#2C221E]">
                      {service.name}
                    </TableCell>
                    <TableCell className="font-sans text-sm text-gray-600">
                      {service.category}
                    </TableCell>
                    <TableCell className="font-sans text-sm text-gray-600">
                      {service.duration} mins
                    </TableCell>
                    <TableCell className="font-sans text-sm text-gray-600 font-medium">
                      ₹{service.priceRange.min.toLocaleString()} - ₹{service.priceRange.max.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {service.isActive ? (
                        <span className="inline-flex items-center text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                          <Check className="w-3 h-3 mr-1" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-200">
                          <X className="w-3 h-3 mr-1" /> Inactive
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenEdit(service)}
                          className="h-8 w-8 text-[#AF8F58] hover:text-[#2C221E] hover:bg-[#F5F2EB]"
                        >
                          <Edit2 className="h-4.5 w-4.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(service._id)}
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
                {editingService ? 'Edit Service Package' : 'Create Service Package'}
              </DialogTitle>
              <DialogDescription className="text-gray-500 font-sans text-xs">
                Provide details for your makeup, hairstyling, or draping package.
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="name">Service Name *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Premium HD Bridal Makeup"
                  required
                  className="bg-white border-[#EAE5DA]"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what is included in this makeover package..."
                  required
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
                <Label htmlFor="duration">Duration (in minutes) *</Label>
                <Input
                  id="duration"
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                  className="bg-white border-[#EAE5DA]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="priceMin">Minimum Price (₹) *</Label>
                <Input
                  id="priceMin"
                  type="number"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  required
                  className="bg-white border-[#EAE5DA]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="priceMax">Maximum Price (₹) *</Label>
                <Input
                  id="priceMax"
                  type="number"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  required
                  className="bg-white border-[#EAE5DA]"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="includedFeatures">Features/Inclusions (comma separated)</Label>
                <Input
                  id="includedFeatures"
                  value={includedFeatures}
                  onChange={(e) => setIncludedFeatures(e.target.value)}
                  placeholder="e.g. Skin Prep, Airbrush Makeup, Lash Extensions, Hair Styling"
                  className="bg-white border-[#EAE5DA]"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="galleryImages">Gallery Image URLs (comma separated)</Label>
                <Input
                  id="galleryImages"
                  value={galleryImages}
                  onChange={(e) => setGalleryImages(e.target.value)}
                  placeholder="e.g. https://example.com/img1.jpg, https://example.com/img2.jpg"
                  className="bg-white border-[#EAE5DA]"
                />
              </div>

              <div className="flex items-center space-x-2 md:col-span-2 pt-2">
                <input
                  id="isActive"
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="h-4 w-4 rounded border-[#EAE5DA] text-[#D4AF37] focus:ring-[#D4AF37]"
                />
                <Label htmlFor="isActive" className="text-sm font-medium text-gray-700 cursor-pointer">
                  Visible on website (Active package)
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
                {isPending ? 'Saving...' : 'Save Service'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
