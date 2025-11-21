from rest_framework import serializers
from .models import Post, Profile, Message, TrustBadge
from django.contrib.auth.models import User


# Post API representation

class PostSerializer(serializers.ModelSerializer):
    created_by_nickname = serializers.CharField(
        source='created_by.nickname', read_only=True)  # Exposes author's nickname without needing a nested serializer
        

    class Meta:
        model = Post
        fields = ['id', 'title', 'description', 'location_area',
                  'created_by_nickname', 'created_at']




# Message API representation.


class MessageSerializer(serializers.ModelSerializer):
    sender_nickname = serializers.CharField(
        source='sender.nickname', read_only=True
    )
    receiver_nickname = serializers.CharField(
        source='receiver.nickname', read_only=True
    )

    class Meta:
        model = Message
        fields = [
            'id',
            'sender_nickname',    # Read-only convenience field

            'receiver',            # Writable FK (ID) to set the receiver

            'receiver_nickname',  # Read-only convenience field

            'content',
            'timestamp'
        ]


# TrustBadge API representation.

class TrustBadgeSerializer(serializers.ModelSerializer):
    giver_nickname = serializers.CharField(source='giver.nickname', read_only=True)
    receiver_nickname = serializers.CharField(source='receiver.nickname', read_only=True)

    class Meta:
        model = TrustBadge
        fields = [
            'id',
            'giver_nickname',     # Read-only convenience field

            'receiver',           # Writable FK (ID) to set the receiver
            'receiver_nickname',    # Read-only convenience field
            'badge_name',
            'description',
            'created_at'
        ]

# Profile API representation.

class ProfileSerializer(serializers.ModelSerializer):
    received_badges = TrustBadgeSerializer(many=True, read_only=True)  # Nested badges received by this profile


    class Meta:
        model = Profile
        fields = [
            "id", "user", "nickname", "location_area",
            "profile_image", "verified",
            "exchanges", "on_time_percentage", "rating",
            "received_badges"   
        ]

# Registration serializer that also auto-creates a Profile.

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "password", "password2"]

    def validate(self, data):
        if data["password"] != data["password2"]:
            raise serializers.ValidationError("Passwords do not match")
        return data

    def create(self, validated_data):
        validated_data.pop("password2")
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data.get("email"),
            password=validated_data["password"]
        )

        # Auto-create a Profile after user registration.

        Profile.objects.create(user=user, nickname=user.username)
        return user
    
# User update serializer (basic fields).

class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email"]

# Change password serializer (basic validation).

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    new_password2 = serializers.CharField(required=True)

    def validate(self, data):
        if data["new_password"] != data["new_password2"]:
            raise serializers.ValidationError("New passwords do not match")
        return data

