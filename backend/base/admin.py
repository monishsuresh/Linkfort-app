from django.contrib import admin
from .models import Profile, Post, Message, Rating, Exchange

# Register models so they appear in Django admin (/admin/)

admin.site.register(Profile) # User profile with reputation fields
admin.site.register(Post)    # Study posts created by users
admin.site.register(Message) # Messages exchanged between users
admin.site.register(Rating) # Trust badges awarded to users
admin.site.register(Exchange) # Exchanges between users
admin.site.index_title = "Linkfort Admin Panel"
admin.site.site_header = "Linkfort Administration"
admin.site.site_title = "Linkfort Admin"
# Customize admin interface titles
