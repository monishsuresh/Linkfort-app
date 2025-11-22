from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Rating, Profile, Exchange
from django.contrib.auth.models import User
from django.db.models import Avg, Q


@receiver(post_save, sender=Rating)
def update_profile_rating(sender, instance, created, **kwargs):
    if created:
        ratee = instance.ratee
        ratings = ratee.received_ratings.all()
        ratee.ratings_count = ratings.count()
        ratee.average_score = ratings.aggregate(Avg("score"))["score__avg"] or 0
        ratee.save()
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance, nickname=f"user_{instance.id}")

@receiver(post_save, sender=Exchange)
def update_profile_exchange(sender, instance, **kwargs):
    for profile in [instance.initiator, instance.receiver]:
        exchanges = Exchange.objects.filter(Q(initiator=profile) | Q(receiver=profile), completed=True)
        profile.exchange_count = exchanges.count()
        profile.save()
