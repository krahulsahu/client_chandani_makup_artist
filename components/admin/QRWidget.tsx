'use client';

import { Download, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface QRWidgetProps {
  qrDataUrl: string;
  reviewUrl: string;
}

export default function QRWidget({ qrDataUrl, reviewUrl }: QRWidgetProps) {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = 'chandani_review_qr.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Scan & Leave a Review</title>
          <style>
            body {
              font-family: 'Playfair Display', Georgia, serif;
              text-align: center;
              background-color: #FAF6F0;
              color: #1F1613;
              padding: 50px;
            }
            .container {
              border: 3px double #D4AF37;
              padding: 40px;
              max-width: 450px;
              margin: 0 auto;
              background-color: #FFFFFF;
              box-shadow: 0 10px 30px rgba(0,0,0,0.05);
              border-radius: 8px;
            }
            h1 {
              font-size: 28px;
              margin-bottom: 5px;
              letter-spacing: 2px;
              text-transform: uppercase;
            }
            p.artist {
              font-size: 14px;
              font-style: italic;
              color: #AF8F58;
              margin-top: 0;
              margin-bottom: 30px;
              letter-spacing: 1px;
            }
            img {
              width: 250px;
              height: 250px;
              border: 1px solid #EAE5DA;
              padding: 10px;
              background-color: #FAF6F0;
            }
            p.instruction {
              font-family: 'Montserrat', sans-serif;
              font-size: 16px;
              margin-top: 30px;
              color: #2C221E;
              font-weight: 500;
            }
          </style>
        </head>
        <body onload="window.print(); window.close();">
          <div class="container">
            <h1>Chandani Kumari</h1>
            <p class="artist">Luxury Makeup & Hair Styling</p>
            <img src="${qrDataUrl}" alt="Review QR Code" />
            <p class="instruction">Scan the QR code to submit your review instantly</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <Card className="border-[#EAE5DA] bg-[#FDFBF7] shadow-md h-full flex flex-col justify-between">
      <CardHeader className="pb-3">
        <CardTitle className="font-serif text-xl text-[#2C221E] tracking-wide">
          Review QR Code
        </CardTitle>
        <CardDescription className="text-xs text-[#AF8F58]">
          Clients can scan this QR code at your studio or wedding booth to submit reviews.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center flex-1 space-y-4">
        <div className="border border-[#EAE5DA] p-2 bg-[#FAF6F0] rounded-lg">
          <img src={qrDataUrl} alt="Review QR Code" className="w-48 h-48 object-contain" />
        </div>
        <p className="text-[11px] text-center break-all text-gray-500 font-mono">
          {reviewUrl}
        </p>
        <div className="flex w-full gap-2 pt-2">
          <Button
            onClick={handleDownload}
            variant="outline"
            className="flex-1 border-[#C5A880] text-[#2C221E] hover:bg-[#F5F2EB] text-xs h-9"
          >
            <Download className="w-3.5 h-3.5 mr-2" />
            Download PNG
          </Button>
          <Button
            onClick={handlePrint}
            className="flex-1 bg-[#2C221E] hover:bg-[#AF8F58] text-[#FFFDD0] text-xs h-9"
          >
            <Printer className="w-3.5 h-3.5 mr-2" />
            Print Card
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
