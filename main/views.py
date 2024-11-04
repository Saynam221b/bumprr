from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib import messages
from .models import ContactMessage
import razorpay
from .forms import ReservationForm
from .models import Reservation

def index(request):
    return render(request, 'main/index.html') 

def reservation(request):
    return render(request, 'main/reservation.html')



def contact(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        phone = request.POST.get('telephone')  # Added phone
        subject = request.POST.get('subject')  # Added subject
        message = request.POST.get('message')

        # Validate the inputs
        if not name or not email or not message:
            messages.error(request, 'Please fill in all required fields.')
            return redirect('contact')

        try:
            # Save the message in the database
            contact_message = ContactMessage.objects.create(
                name=name,
                email=email,
                phone=phone,
                subject=subject,
                message=message
            )
            
            # Check if the request is an AJAX call
            if request.is_ajax():
                return JsonResponse({'success': True})

            # If not an AJAX call, add a success message and redirect
            messages.success(request, 'Thank you for your message!')
            return redirect('contact')

        except Exception as e:
            messages.error(request, 'There was an error saving your message. Please try again later.')
            return redirect('contact')

    return render(request, 'main/contact.html')

# reservations/views.py


def make_reservation(request):
    if request.method == 'POST':
        service_price = request.POST.get('service_price')
        email = request.POST.get('email')
        
        client = razorpay.Client(auth=("YOUR_KEY_ID", "YOUR_SECRET_KEY"))
        # Create an order
        order_amount = int(service_price) * 100  # Razorpay accepts amount in paise
        order_currency = 'INR'
        order_receipt = 'order_rcptid_11'
        payment_capture = '1'  # Auto capture

        # Creating order
        order = client.order.create(dict(amount=order_amount, currency=order_currency, receipt=order_receipt, payment_capture=payment_capture))
        
        return render(request, 'checkout.html', {
            'order_id': order['id'],
            'amount': order['amount'],
            'currency': order['currency'],
            'email': email,
        })
    return render(request, 'reservation.html')
