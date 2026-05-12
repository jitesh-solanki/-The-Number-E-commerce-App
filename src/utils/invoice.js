import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Format price in Indian Rupees
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN').format(price);
};

// Generate PDF Invoice
export const generateInvoice = async (order, user) => {
  const element = document.createElement('div');
  element.style.width = '800px';
  element.style.padding = '40px';
  element.style.backgroundColor = 'white';
  element.style.fontFamily = 'Arial, sans-serif';
  
  element.innerHTML = `
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="color: #4f46e5; margin: 0;">THE NUMBER</h1>
      <p style="color: #6b7280; margin: 5px 0;">Premium Fashion Store</p>
      <p style="color: #6b7280; margin: 0;">123 Luxury Street, New York, NY 10001</p>
      <p style="color: #6b7280; margin: 0;">Email: hello@thenumber.com | Phone: +91 98765 43210</p>
    </div>
    
    <hr style="border: 1px solid #e5e7eb;" />
    
    <div style="display: flex; justify-content: space-between; margin: 20px 0;">
      <div>
        <h3 style="margin: 0 0 5px 0;">Bill To:</h3>
        <p style="margin: 0; color: #374151;"><strong>${order.customerName}</strong></p>
        <p style="margin: 0; color: #6b7280;">${order.customerEmail}</p>
        <p style="margin: 0; color: #6b7280;">${order.customerPhone || 'N/A'}</p>
        <p style="margin: 0; color: #6b7280;">${order.shippingAddress}</p>
      </div>
      <div style="text-align: right;">
        <h3 style="margin: 0 0 5px 0;">Invoice Details:</h3>
        <p style="margin: 0; color: #374151;"><strong>Order ID:</strong> ${order.id}</p>
        <p style="margin: 0; color: #374151;"><strong>Order Date:</strong> ${order.date}</p>
        <p style="margin: 0; color: #374151;"><strong>Payment Method:</strong> ${order.paymentMethod || 'Credit Card'}</p>
        <p style="margin: 0; color: #374151;"><strong>Payment Status:</strong> Paid</p>
      </div>
    </div>
    
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
      <thead>
        <tr style="background-color: #f3f4f6;">
          <th style="padding: 12px; text-align: left; border: 1px solid #e5e7eb;">Product</th>
          <th style="padding: 12px; text-align: center; border: 1px solid #e5e7eb;">Quantity</th>
          <th style="padding: 12px; text-align: right; border: 1px solid #e5e7eb;">Price</th>
          <th style="padding: 12px; text-align: right; border: 1px solid #e5e7eb;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${order.items.map(item => `
          <tr>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${item.name}</td>
            <td style="padding: 10px; text-align: center; border: 1px solid #e5e7eb;">${item.quantity}</td>
            <td style="padding: 10px; text-align: right; border: 1px solid #e5e7eb;">₹${formatPrice(item.price)}</td>
            <td style="padding: 10px; text-align: right; border: 1px solid #e5e7eb;">₹${formatPrice(item.price * item.quantity)}</td>
          </tr>
        `).join('')}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" style="padding: 12px; text-align: right; border: 1px solid #e5e7eb;"><strong>Subtotal:</strong></td>
          <td style="padding: 12px; text-align: right; border: 1px solid #e5e7eb;">₹${formatPrice(order.subtotal)}</td>
        </tr>
        <tr>
          <td colspan="3" style="padding: 12px; text-align: right; border: 1px solid #e5e7eb;"><strong>Shipping:</strong></td>
          <td style="padding: 12px; text-align: right; border: 1px solid #e5e7eb;">${order.shipping === 0 ? 'Free' : `₹${formatPrice(order.shipping)}`}</td>
        </tr>
        <tr>
          <td colspan="3" style="padding: 12px; text-align: right; border: 1px solid #e5e7eb;"><strong>Tax (10%):</strong></td>
          <td style="padding: 12px; text-align: right; border: 1px solid #e5e7eb;">₹${formatPrice(order.tax)}</td>
        </tr>
        <tr style="background-color: #f0fdf4;">
          <td colspan="3" style="padding: 12px; text-align: right; border: 1px solid #e5e7eb;"><strong>Total:</strong></td>
          <td style="padding: 12px; text-align: right; border: 1px solid #e5e7eb;"><strong>₹${formatPrice(order.total)}</strong></td>
        </tr>
      </tfoot>
    </table>
    
    <hr style="border: 1px solid #e5e7eb;" />
    
    <div style="text-align: center; margin-top: 30px;">
      <p style="color: #6b7280; margin: 5px 0;">Thank you for shopping with The Number!</p>
      <p style="color: #9ca3af; font-size: 12px; margin: 5px 0;">For any queries, please contact our support team.</p>
      <p style="color: #9ca3af; font-size: 12px; margin: 5px 0;">This is a system generated invoice, no signature required.</p>
    </div>
  `;
  
  document.body.appendChild(element);
  
  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#ffffff',
      logging: false
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(`Invoice_${order.id}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Failed to generate invoice. Please try again.');
  } finally {
    document.body.removeChild(element);
  }
};