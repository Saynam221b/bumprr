from django import forms

class ReservationForm(forms.Form):
    email = forms.EmailField()
    service_price = forms.ChoiceField(choices=[
        (100, 'Service 1 - $100'),
        (200, 'Service 2 - $200'),
        (300, 'Service 3 - $300'),
    ])
