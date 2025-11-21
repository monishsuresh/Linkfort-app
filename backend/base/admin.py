from django.contrib import admin
from .models import Profile, Post, Message, TrustBadge

# Register models so they appear in Django admin (/admin/)

admin.site.register(Profile) # User profile with reputation fields
admin.site.register(Post)    # Study posts created by users
admin.site.register(Message) # Messages exchanged between users
admin.site.register(TrustBadge) # Trust badges awarded to users