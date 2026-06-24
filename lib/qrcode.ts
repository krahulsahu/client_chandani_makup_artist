import QRCode from 'qrcode';

/**
 * Generates a Base64-encoded PNG Data URL of a QR Code pointing to the target URL.
 * Styled with the branding colors (Dark Brown on Cream).
 */
export async function generateQRCode(url: string): Promise<string> {
  try {
    const dataUrl = await QRCode.toDataURL(url, {
      width: 350,
      margin: 2,
      color: {
        dark: '#1F1613',  // Dark Brown
        light: '#FAF6F0'  // Cream
      }
    });
    return dataUrl;
  } catch (err) {
    console.error('Error generating QR code:', err);
    throw new Error('Failed to generate QR code');
  }
}
