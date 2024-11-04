from django.db import models

class Reservation(models.Model):
    service_name = models.CharField(max_length=100)
    service_price = models.DecimalField(max_digits=10, decimal_places=2)
    email = models.EmailField()

    def __str__(self):
        return self.service_name
    


class ContactMessage(models.Model):
    SUBJECT_CHOICES = [
        ('project', "I'd like to start a project"),
        ('question', "I'd like to ask a question"),
        ('proposal', "I'd like to make a proposal"),
    ]

    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15, blank=True, null=True)
    subject = models.CharField(max_length=50, choices=SUBJECT_CHOICES)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=20,
        choices=[('new', 'New'), ('in_progress', 'In Progress'), ('resolved', 'Resolved')],
        default='new'
    )

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Contact Message"
        verbose_name_plural = "Contact Messages"

    def __str__(self):
        return f'Message from {self.name} - {self.get_subject_display()}'
