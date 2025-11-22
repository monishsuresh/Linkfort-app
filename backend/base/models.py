from django.db import models
from django.core.exceptions import ValidationError
# Create your models here.
from django.contrib.auth.models import User
from django.db import models

# Represents a user profile with trust/reputation stats.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)     # One profile per user
    nickname = models.CharField(max_length=100, blank=True)         # Display name
    location_area = models.CharField(max_length=100, blank=True)    # General location area (e.g., city or neighborhood)
    profile_image = models.ImageField(upload_to='profile_images/', blank=True, null=True)   # Profile picture
    verified = models.BooleanField(default=False)                   # Verification status

    # Trust / reputation stats
    exchanges = models.PositiveIntegerField(default=0)              # Number of successful exchanges
    on_time_percentage = models.PositiveIntegerField(default=100)   # Percentage of on-time exchanges
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=5.0)     # Average rating out of 5

    def __str__(self):
        return f"{self.user.username} Profile"                   

# Represents a post/listing created by a Profile.

class Post(models.Model):
    title = models.CharField(max_length=100)                 
    description = models.TextField()
    location_area = models.CharField(max_length=100)           
    exact_lat = models.FloatField(null=True, blank=True)                # Optional latitude for precise location
    exact_lng = models.FloatField(null=True, blank=True)                # Optional longitude for precise location
    created_by = models.ForeignKey(Profile, on_delete=models.CASCADE)   # Profile who created the post
    created_at = models.DateTimeField(auto_now_add=True)                # Timestamp of post creation

    def __str__(self):
        return self.title
          
 # Direct messages between profiles.

class Message(models.Model):
    sender = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='sent_messages')     
    receiver = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='received_messages')   
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True) 

    def __str__(self):
        return f"{self.sender} → {self.receiver}"

# Trust badges given from one profile to another.

class TrustBadge(models.Model):
    giver = models.ForeignKey(
        'Profile',
        on_delete=models.CASCADE,
        related_name='given_badges'
    )
    receiver = models.ForeignKey(
        'Profile',
        on_delete=models.CASCADE,
        related_name='received_badges'
    )
    badge_name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['giver', 'receiver'],
                name='unique_giver_receiver_badge'
            )
        ]

    def __str__(self):
        return f"{self.giver.nickname} → {self.receiver.nickname}: {self.badge_name}"
