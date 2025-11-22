from rest_framework import serializers
from .models import Post, Profile, Message, Rating, Exchange
from django.contrib.auth.models import User
from django.db.models import Q, Avg



# Post API representation

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = [
            "id",
            "title",            # Item title
            "description",      # Detailed description
            "location_area",    # Area name (string)
            "exact_lat",        # Optional latitude
            "exact_lng",        # Optional longitude
            "post_type",        # Type of post (item, event, borrow, request)
            "market_type",      # Rent or Sale (only for item)
            "price",            # Price of item
            "currency",         # Currency code
            "status",           # Availability status
            "exchange_count",   # Number of exchanges
            "event_start_at",   # Start time for events
            "created_by",       # Profile who created the post
            "created_at",       # Timestamp of creation
        ]
        # These fields are automatically set by backend, not editable by user
        read_only_fields = ["id", "created_by", "created_at", "exchange_count"]

    # validate method enforces rules depending on post_type and market_type
    def validate(self, data):
        # If post_type is event, market_type must be null and event_start_at required
        if data.get("post_type") == "event":
            if data.get("market_type"):
                raise serializers.ValidationError("Event posts cannot have market_type.")
            if not data.get("event_start_at"):
                raise serializers.ValidationError("Event posts must have a start time.")

        # If post_type is item, market_type and price are required
        if data.get("post_type") == "item":
            if not data.get("market_type"):
                raise serializers.ValidationError("Item posts must have market_type (rent or sale).")
            if not data.get("price"):
                raise serializers.ValidationError("Item posts must include a price.")

        return data






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

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ["id", "rater", "ratee", "score", "comment", "created_at"]
        read_only_fields = ["id", "rater", "created_at"]

    def validate(self, data):
        rater = self.context["request"].user.profile
        ratee = data.get("ratee")

        # Self-rating engeli
        if rater == ratee:
            raise serializers.ValidationError("You cannot rate yourself.")

        # Duplicate rating engeli
        if Rating.objects.filter(rater=rater, ratee=ratee).exists():
            raise serializers.ValidationError("You have already rated this user.")

        # Score aralığı kontrolü
        if data.get("score") < 1 or data.get("score") > 5:
            raise serializers.ValidationError("Score must be between 1 and 5.")

        # Mesajlaşma + Diyalog şartı
        sent_count = Message.objects.filter(sender=rater, receiver=ratee).count()
        received_count = Message.objects.filter(sender=ratee, receiver=rater).count()

        if sent_count < 2 or received_count < 2:
            raise serializers.ValidationError(
                "You can only rate after a mutual dialogue (at least 2 messages each way)."
            )

        return data

    def create(self, validated_data):
        validated_data["rater"] = self.context["request"].user.profile
        return super().create(validated_data)



# Profile API representation.

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)
    my_items = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = [
            "id", "nickname", "username", "location_area", "bio",
            "is_verified", "average_score", "ratings_count",
            "exchange_count", "on_time_ratio", "my_items"
        ]
        read_only_fields = ["average_score", "ratings_count", "exchange_count", "on_time_ratio"]

    def get_my_items(self, obj):
        posts = obj.post_set.filter(post_type="item").order_by("-created_at")
        return [
            {
                "id": p.id,
                "title": p.title,
                "status": p.status,
                "created_at": p.created_at,
            }
            for p in posts
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

class ExchangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exchange
        fields = ["id", "initiator", "receiver", "created_at", "completed"]
        read_only_fields = ["initiator", "created_at"]

    def create(self, validated_data):
        validated_data["initiator"] = self.context["request"].user.profile
        return super().create(validated_data)
