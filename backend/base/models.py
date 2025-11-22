from django.db import models
from django.core.exceptions import ValidationError
# Create your models here.
from django.contrib.auth.models import User
from django.db import models

# Represents a user profile with trust/reputation stats.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    nickname = models.CharField(max_length=100, unique=True)
    location_area = models.CharField(max_length=100, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)

    # Trust & rating metrics
    is_verified = models.BooleanField(default=False)
    ratings_count = models.PositiveIntegerField(default=0)       # communication rating count
    average_score = models.FloatField(default=0.0)               # communication rating average
    exchange_count = models.PositiveIntegerField(default=0)      # successful exchanges
    on_time_ratio = models.FloatField(default=100.0)             # % of on-time exchanges

    def __str__(self):
        return self.nickname



# Represents a post/listing created by a Profile.

class Post(models.Model):
    POST_TYPE_CHOICES = [
        ("item", "Item"),       # eşya paylaşımı
        ("event", "Event"),     # etkinlik duyurusu
        ("borrow", "Borrow"),   # ödünç verilecek eşya
        ("request", "Request"), # ihtiyaç duyulan eşya
    ]
    MARKET_TYPE_CHOICES = [
        ("rent", "Rent"),
        ("sale", "Sale"),
    ]
    STATUS_CHOICES = [
        ("available", "Available"),
        ("reserved", "Reserved"),
        ("borrowed", "Borrowed"),
        ("sold", "Sold"),
        ("inactive", "Inactive"),
    ]

    title = models.CharField(max_length=100)  # Item title
    description = models.TextField(max_length=500)  # Detailed description
    location_area = models.CharField(max_length=100)  # Area name (e.g. district or neighborhood)

    exact_lat = models.FloatField(null=True, blank=True)  # Optional latitude
    exact_lng = models.FloatField(null=True, blank=True)  # Optional longitude

    post_type = models.CharField(max_length=10, choices=POST_TYPE_CHOICES)  # Type of post
    market_type = models.CharField(max_length=10, choices=MARKET_TYPE_CHOICES, null=True, blank=True)  # Rent or Sale

    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # Price of item
    currency = models.CharField(max_length=3, default="EUR")  # Currency code

    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="available")  # Availability status
    exchange_count = models.PositiveIntegerField(default=0)  # Number of exchanges

    event_start_at = models.DateTimeField(null=True, blank=True)  # Start time for events only

    created_by = models.ForeignKey(Profile, on_delete=models.CASCADE)  # Creator profile
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp of creation

    def __str__(self):
        return f"{self.title} ({self.post_type})"

          
 # Direct messages between profiles.

class Message(models.Model):
    sender = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='sent_messages')     
    receiver = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='received_messages')   
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True) 

    def __str__(self):
        return f"{self.sender} → {self.receiver}"

# Trust badges given from one profile to another.

class Rating(models.Model):
    rater = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="given_ratings")
    ratee = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="received_ratings")
    score = models.IntegerField()  # 1–5
    comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("rater", "ratee")

    def __str__(self):
        return f"{self.rater.nickname} → {self.ratee.nickname} ({self.score})"


class Exchange(models.Model):
    initiator = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="initiated_exchanges")
    receiver = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="received_exchanges")
    created_at = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)  